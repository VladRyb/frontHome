import React, { useEffect, useMemo, useState } from "react";
import Loader from "../components/Loader/Loader";
import api from "../api";
import { alertShow } from "../redux/alertStore";
import { useDispatch } from "react-redux";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Create, Delete, ElectricBolt, Opacity } from "@mui/icons-material";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { LoadingButton } from "@mui/lab";

interface PriceState {
  [key: string]: string | number;
  cold: string | number;
  drainage: string | number;
  electricity: string | number;
  hot: string | number;
  internet: string | number;
  rent: string | number;
  __v: string | number;
  _id: string | number;
}

interface ITitlePrice {
  title: string;
  key: string;
}

interface IPeriods {
  _id: number;
  date: string;
  hot: string;
  cold: string;
  drainage: string;
  electricity: string;
}

interface IData {
  date?: any;
  hot?: string;
  cold?: string;
  electricity?: string;
}

const titlePrice = [
  {
    title: "Аренда",
    key: "rent",
  },
  {
    title: "Гор.вода",
    key: "hot",
  },
  {
    title: "Хол.вода",
    key: "cold",
  },
  {
    title: "Водоотвод",
    key: "drainage",
  },
  {
    title: "Свет",
    key: "electricity",
  },
  {
    title: "Интернет",
    key: "internet",
  },
];

const titlePeriod = [
  {
    title: "Гор.вода",
    key: "hot",
    icon: <Opacity color="error" sx={{ marginLeft: 1 }} />,
  },
  {
    title: "Хол.вода",
    key: "cold",
    icon: <Opacity color="primary" sx={{ marginLeft: 1 }} />,
  },
  {
    title: "Водоотвод",
    key: "drainage",
    icon: <Opacity sx={{ marginLeft: 2 }} />,
  },
  {
    title: "Свет",
    key: "electricity",
    icon: <ElectricBolt color="primary" sx={{ marginLeft: 1 }} />,
  },
];

function Home() {
  // const data = useRef<any>(null);
  const dispatch = useDispatch();

  const [data, setData] = useState<IData | null>(null);

  const [price, setPrice] = useState<PriceState | null>(null);
  const [lastPeriod, setLastPeriod] = useState<any>(null);

  const [periods, setPeriods] = useState<IPeriods[] | null>(null);

  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const [typeModal, setTypeModal] = useState<"create" | "edit">("create");

  const editData = (key: string, value: string) => {
    setData((prev) => {
      return { ...prev, [key]: value };
    });
  };

  const saveData = async (data: IData) => {
    if (
      data.cold?.trim() === "" &&
      data.hot?.trim() === "" &&
      data.electricity?.trim() === ""
    )
      return;
    try {
      let response;
      if (typeModal === "create") response = await api.postPeriod(data);
      else response = await api.editPeriod(data);
      setPeriods(response.period);
      setLastPeriod(response.period[0]);
      handleClose();
      dispatch(
        alertShow({
          textAlert:
            typeModal === "create"
              ? "Показания добавлены"
              : "Показания отредактированы",
        })
      );
    } catch (error) {
      handleClose();
    }
  };

  const handleDataEdit = () => {
    setTypeModal("edit");
    setData(lastPeriod);
    setOpen(true);
  };

  // const handleDateChange = (date: any) => {
  //   setSelectedDate(date);
  // };

  const calcSum = (price: any, periods: any) => {
    const delta = periods.slice(0, 2).reduce((acum: any, elem: any) => ({
      hot: acum.hot - elem.hot,
      cold: acum.cold - elem.cold,
      electricity: acum.electricity - elem.electricity,
    }));

    const sum =
      Number(price.hot) * delta.hot +
      Number(price.cold) * delta.cold +
      Number(price.electricity) * delta.electricity +
      Number(price.drainage) * delta.cold +
      Number(price.drainage) * delta.cold +
      Number(price.rent) +
      Number(price.internet);

    return sum;
  };

  const fetchPrice = async () => {
    try {
      const response = await api.getData();
      setPrice(response.price);
      setPeriods(response.period);
      setLastPeriod(response.period[0]);
    } catch (error) {}
  };

  const handleOpen = (): void => {
    setTypeModal("create");
    setData((prev) => {
      return { ...prev, date: new Date() };
    });

    setOpen(true);
  };

  const handleOpenDelete = (): void => {
    setOpenDelete(true);
  };

  const handleClose = (): void => {
    setData(null);
    setOpen(false);
  };

  const handleCloseDelete = (): void => {
    setOpenDelete(false);
  };

  const handlerDeletePeriod = () => {
    fetchDeletePeriod(lastPeriod._id);
  };

  const fetchDeletePeriod = async (id: string) => {
    try {
      const response = await api.deletePeriod(id);
      setPeriods(response.period);
      setLastPeriod(response.period[0]);
      handleCloseDelete();
      dispatch(alertShow({ textAlert: "Показания удалены" }));
    } catch (error) {}
  };

  const money = useMemo(() => {
    if (periods && periods.length !== 0) {
      const indexPeriod = periods.findIndex(
        (item: any) => item._id === lastPeriod._id
      );
      const newPeriods = periods.slice(indexPeriod, indexPeriod + 2);
      return calcSum(price, newPeriods);
    }
    // eslint-disable-next-line
  }, [lastPeriod]);

  useEffect(() => {
    fetchPrice();
  }, []);

  if (!periods && !price) {
    return <Loader />;
  }

  return (
    <div>
      <div className="home_container">
        <Card>
          <CardContent className="home_top_block">
            <div className="last_container">
              <div className="last_header">
                <Typography variant="h6" className="card_title">
                  Предыдушие показания
                </Typography>
                {lastPeriod && (
                  <div className="last_header_actions">
                    <FormControl style={{ width: 200 }}>
                      <Select
                        id="simple-select"
                        value={lastPeriod?._id || ""}
                        onChange={(e) => {
                          const last = periods?.find(
                            (item) => item?._id === e.target.value
                          );
                          setLastPeriod(last);
                        }}
                      >
                        {periods &&
                          periods?.map((elem) => (
                            <MenuItem key={elem?._id} value={elem?._id}>
                              {elem?.date}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                    <Box className="button_group">
                      <IconButton onClick={handleDataEdit}>
                        <Create fontSize="large" />
                      </IconButton>
                      <IconButton onClick={handleOpenDelete}>
                        <Delete fontSize="large" color="error" />
                      </IconButton>
                    </Box>
                  </div>
                )}
              </div>

              {lastPeriod && (
                <div className="last_block">
                  {titlePeriod?.map((elem) => (
                    <div key={elem?.key}>
                      <span className="title">
                        {elem?.title}
                        {elem.icon}
                      </span>
                      <span>{lastPeriod?.[elem?.key]}</span>
                    </div>
                  ))}
                </div>
              )}
              <div className="last_block_bot">
                <div>
                  <h4>Сумма: {money} руб.</h4>
                </div>
                <div>
                  <Button variant="contained" onClick={handleOpen}>
                    Добавить новые показания
                  </Button>
                </div>
              </div>
            </div>

            <Card className="price_container">
              <CardContent>
                <Typography variant="h6" className="card_title">
                  Тариф
                </Typography>
                {price && (
                  <div className="price_block">
                    {titlePrice?.map((item: ITitlePrice, i) => (
                      <div key={item?.key}>
                        <span>{item?.title}</span>
                        <span>{price?.[item?.key]} руб.</span>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </CardContent>
        </Card>
        <div></div>
      </div>
      {open && (
        <Dialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <DialogTitle id="customized-dialog-title">
            {typeModal === "create" ? (
              <>Добавить новые показания</>
            ) : (
              <>Редактировать показаний</>
            )}
          </DialogTitle>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (data) saveData(data);
            }}
          >
            <DialogContent dividers>
              <div className="modal_body">
                <DesktopDatePicker
                  openTo="month"
                  views={["year", "month"]}
                  label="Месяц и год"
                  value={data?.date || new Date()}
                  onChange={(date: any) => {
                    console.log(date?.toString());
                    editData(
                      "date",
                      `${date?.toLocaleString("en-US", {
                        month: "short",
                        year: "numeric",
                      })}`
                    );
                  }}
                  renderInput={(props: any) => {
                    props = {
                      ...props,
                      inputProps: {
                        ...props.inputProps,
                        placeholder: "дд.мм.гггг",
                      },
                    };

                    return (
                      <TextField
                        {...props}
                        sx={{ height: 78 }}
                        required
                        label="Дата записи"
                        type="date"
                        fullWidth
                        helperText=" "
                        variant="outlined"
                      />
                    );
                  }}
                />
                <TextField
                  label={titlePrice[1].title}
                  onChange={(e) => editData(titlePrice[1].key, e.target.value)}
                  value={data?.hot || ""}
                  required
                  variant="outlined"
                  helperText={" "}
                />
                <TextField
                  label={titlePrice[2].title}
                  onChange={(e) => editData(titlePrice[2].key, e.target.value)}
                  value={data?.cold || ""}
                  required
                  variant="outlined"
                  helperText={" "}
                />
                <TextField
                  label={titlePrice[4].title}
                  onChange={(e) => editData(titlePrice[4].key, e.target.value)}
                  value={data?.electricity || ""}
                  required
                  variant="outlined"
                  helperText={" "}
                />
              </div>
            </DialogContent>
            <DialogActions>
              <LoadingButton type="submit" variant="contained">
                Сохранить
              </LoadingButton>
            </DialogActions>
          </form>
        </Dialog>
      )}
      {openDelete && (
        <Dialog
          onClose={handleCloseDelete}
          aria-labelledby="customized-dialog-title"
          open={openDelete}
          style={{ minWidth: 400 }}
        >
          <DialogTitle id="customized-dialog-title">
            Удалить показания
          </DialogTitle>
          <DialogContent dividers>
            <div style={{ minWidth: 400, padding: "12px 0px" }}>
              Вы точно хотите удалить?
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handlerDeletePeriod} color="primary">
              Удалить
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
}

export default Home;

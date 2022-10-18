import React, { useEffect, useState } from "react";
import Loader from "../components/Loader/Loader";
import api from "../api";
import { alertShow } from "../redux/alertStore";
import { useDispatch } from "react-redux";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { Create, Delete } from "@mui/icons-material";
import { DesktopDateTimePicker } from "@mui/lab";

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
];

function Home() {
  // const data = useRef<any>(null);
  const dispatch = useDispatch();

  const [data, setData] = useState<IData | null>(null);

  const [price, setPrice] = useState<PriceState | null>(null);
  const [lastPeriod, setLastPeriod] = useState<any>(null);
  const [money, setMoney] = useState<number | null>(null);

  const [periods, setPeriods] = useState<IPeriods[] | null>(null);

  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const [typeModal, setTypeModal] = useState<"create" | "edit">("create");
  // const [selectedDate, setSelectedDate] = React.useState(new Date());

  const editData = (key: string, value: string) => {
    setData((prev) => {
      return { ...prev, [key]: value };
    });
  };

  const saveData = async (data: IData) => {
    console.log(data);

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

    setMoney(sum);
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

  useEffect(() => {
    if (periods && periods.length !== 0) {
      const indexPeriod = periods.findIndex(
        (item: any) => item._id === lastPeriod._id
      );
      const newPeriods = periods.slice(indexPeriod, indexPeriod + 2);
      calcSum(price, newPeriods);
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
        <div className="home_top_block app_card">
          <div className="last_container">
            <div className="last_title">
              <h3>Предыдушие показания</h3>
              {lastPeriod && (
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <FormControl style={{ width: 200 }}>
                    {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={lastPeriod._id || ""}
                      onChange={(e) => {
                        const last = periods?.find(
                          (item) => item._id === e.target.value
                        );
                        setLastPeriod(last);
                      }}
                    >
                      {periods &&
                        periods.map((elem) => (
                          <MenuItem key={elem._id} value={elem._id}>
                            {elem.date}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                  <span>
                    <span style={{ padding: "0px 12px" }}>
                      <Create onClick={handleDataEdit} />
                    </span>
                    <span style={{ padding: "0px 12px" }}>
                      <Delete onClick={handleOpenDelete} />
                    </span>
                  </span>
                </div>
              )}
            </div>

            {lastPeriod && (
              <div className="last_block">
                {titlePeriod.map((elem) => (
                  <div key={elem.key}>
                    <span>{elem.title}</span>
                    <span>{lastPeriod[elem.key]}</span>
                  </div>
                ))}
              </div>
            )}
            <div className="last_block_bot">
              <div>
                <h4>Сумма: {money} руб.</h4>
              </div>
              <div>
                <Button onClick={handleOpen}>Добавить новые показания</Button>
              </div>
            </div>
          </div>
          <div className="price_container">
            <div>
              <h3>Тариф</h3>
            </div>
            {price && (
              <div className="price_block">
                {titlePrice.map((item: ITitlePrice, i) => (
                  <div key={item.key}>
                    <span>{item.title}</span>
                    <span>{price[item.key]} руб.</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
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
                <DesktopDateTimePicker
                  variant="inline"
                  openTo="month"
                  views={["year", "month"]}
                  label="Месяц и год"
                  helperText="Start from year selection"
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
                  style={{ margin: 24 }}
                  required
                />
                <FormControl style={{ margin: 24 }}>
                  <InputLabel id="login-label">
                    {titlePrice[1].title}
                  </InputLabel>
                  <Input
                    onChange={(e) =>
                      editData(titlePrice[1].key, e.target.value)
                    }
                    value={data?.hot || ""}
                    required
                  />
                </FormControl>
                <FormControl style={{ margin: 24 }}>
                  <InputLabel id="login-label">
                    {titlePrice[2].title}
                  </InputLabel>
                  <Input
                    onChange={(e) =>
                      editData(titlePrice[2].key, e.target.value)
                    }
                    value={data?.cold || ""}
                    required
                  />
                </FormControl>
                <FormControl style={{ margin: 24 }}>
                  <InputLabel id="login-label">
                    {titlePrice[4].title}
                  </InputLabel>
                  <Input
                    onChange={(e) =>
                      editData(titlePrice[4].key, e.target.value)
                    }
                    value={data?.electricity || ""}
                    required
                  />
                </FormControl>
              </div>
            </DialogContent>
            <DialogActions>
              <Button
                type="submit"
                // onClick={seveData}
                color="primary"
              >
                Сохранить
              </Button>
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

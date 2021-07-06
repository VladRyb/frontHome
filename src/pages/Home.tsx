import React, { useEffect, useRef, useState } from "react";
import { getData, postPeriod } from "../api/endpoints/data";
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
} from "@material-ui/core";
import { DatePicker } from "@material-ui/pickers";
import CreateSharpIcon from "@material-ui/icons/CreateSharp";
import DeleteSharpIcon from "@material-ui/icons/DeleteSharp";
import Loader from "../components/Loader/Loader";
import api from "../api";
import { alertShow } from "../redux/alertStore";
import { useDispatch } from "react-redux";

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
    title: "Интертет",
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
  const data = useRef<any>(null);
  const dispatch = useDispatch();

  const [price, setPrice] = useState<PriceState | null>(null);
  const [lastPeriod, setLastPeriod] = useState<any>(null);
  const [money, setMoney] = useState<number | null>(null);

  const [periods, setPeriods] = useState<any>(null);

  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const seveData = async () => {
    if (
      data.current[1].value.trim() === "" &&
      data.current[2].value.trim() === "" &&
      data.current[3].value.trim() === ""
    )
      return;
    try {
      const response = await postPeriod({
        date: data.current[0].value,
        hot: data.current[1].value,
        cold: data.current[2].value,
        electricity: data.current[3].value,
      });
      setPeriods(response.period);
      setLastPeriod(response.period[0]);
      handleClose();
      dispatch(alertShow({ textAlert: "Показания добавлены" }));
    } catch (error) {
      handleClose();
    }
  };

  const handleDateChange = (date: any) => {
    setSelectedDate(date);
  };

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
      const response = await getData();
      setPrice(response.price);
      setPeriods(response.period);
      setLastPeriod(response.period[0]);
    } catch (error) {}
  };

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleOpenDelete = (): void => {
    setOpenDelete(true);
  };

  const handleClose = (): void => {
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
        <div className="home_top_block box_shadow">
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
                      value={lastPeriod || ""}
                      onChange={(e) => {
                        setLastPeriod(e.target.value);
                      }}
                    >
                      {periods.map((elem: any) => (
                        <MenuItem key={elem._id} value={elem}>
                          {elem.date}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <span>
                    <span style={{ padding: "0px 12px" }}>
                      {/* <CreateSharpIcon /> */}
                    </span>
                    <span style={{ padding: "0px 12px" }}>
                      <DeleteSharpIcon onClick={handleOpenDelete} />
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
            Добавить новые показания
          </DialogTitle>
          <DialogContent dividers>
            <form ref={data} className="modal_body">
              <DatePicker
                variant="inline"
                openTo="year"
                views={["year", "month"]}
                label="Year and Month"
                helperText="Start from year selection"
                value={selectedDate}
                onChange={handleDateChange}
                style={{ margin: 24 }}
              />
              <FormControl style={{ margin: 24 }}>
                <InputLabel id="login-label">{titlePrice[1].title}</InputLabel>
                <Input />
              </FormControl>
              <FormControl style={{ margin: 24 }}>
                <InputLabel id="login-label">{titlePrice[2].title}</InputLabel>
                <Input />
              </FormControl>
              <FormControl style={{ margin: 24 }}>
                <InputLabel id="login-label">{titlePrice[4].title}</InputLabel>
                <Input />
              </FormControl>
            </form>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={seveData} color="primary">
              Сохранить
            </Button>
          </DialogActions>
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

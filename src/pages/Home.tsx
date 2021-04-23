import React, { useEffect, useRef, useState } from "react";
import { getPrice, postPeriod } from "../api/endpoints/price";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Input,
  InputLabel,
  Typography,
} from "@material-ui/core";
import { DatePicker } from "@material-ui/pickers";

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

  const [price, setPrice] = useState<PriceState | null>(null);
  const [period, setPeriod] = useState<any>(null);
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const seveData = async () => {
    if (!data) return;
    try {
      const response = await postPeriod({
        date: data.current[0].value,
        hot: data.current[1].value,
        cold: data.current[2].value,
        electricity: data.current[3].value,
      });
      handleClose();
    } catch (error) {
      handleClose();
    }
  };

  const handleDateChange = (date: any) => {
    setSelectedDate(date);
  };

  const calcSum = ({ price, period }: any) => {
    const res = price.rent + price.rent;
  };

  const fetchPrice = async () => {
    try {
      const response = await getPrice();
      setPrice(response.price);
      setPeriod(response.period);
    } catch (error) {}
  };

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  useEffect(() => {
    fetchPrice();
  }, []);
  return (
    <div>
      <div className="home_container">
        <div className="home_top_block box_shadow">
          <div className="last_container">
            <div>
              <h3>Предыдушие показания</h3>
            </div>

            {period && (
              <div className="last_block">
                {titlePeriod.map((elem) => (
                  <div key={elem.key}>
                    <span>{elem.title}</span>
                    <span>{period[elem.key]}</span>
                  </div>
                ))}
              </div>
            )}
            <div className="last_block_bot">
              <div>
                <Button onClick={handleOpen}>Добавить новые показания</Button>
              </div>
              <div>
                <h4>Сумма: 31 300 руб.</h4>
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
    </div>
  );
}

export default Home;

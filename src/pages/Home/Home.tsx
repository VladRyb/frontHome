import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Create, Delete, ElectricBolt, Opacity } from "@mui/icons-material";
import Loader from "../../components/Loader/Loader";
import ModalDelete from "./components/ModalDelete";
import { alertShow } from "../../redux/alertStore";
import CardPrice from "./components/CardPrice";
import ModalData from "./components/ModalData";
import { useDispatch } from "react-redux";
import api from "../../api";
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { Data, Periods, PriceState, TitlePeriod } from "../../interface/home";
import moment from "moment";

const titlePeriod: TitlePeriod[] = [
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
  const dispatch = useDispatch();

  const [price, setPrice] = useState<PriceState | null>(null);
  const [lastPeriod, setLastPeriod] = useState<Periods | null>(null);

  const [periods, setPeriods] = useState<Periods[] | null>(null);

  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const [typeModal, setTypeModal] = useState<"create" | "edit">("create");

  const fetchCreate = async (data: Data) => {
    try {
      const response = await api.postPeriod(data);
      setPeriods(response.period);
      setLastPeriod(response.period[0]);
      handleClose();
      dispatch(
        alertShow({
          textAlert: "Показания добавлены",
        })
      );
    } catch (error) {
      handleClose();
    }
  };

  const fetchUpdate = async (data: Omit<Periods, "drainage">) => {
    try {
      const response = await api.patchPeriod(data);
      setPeriods(response.period);
      setLastPeriod(response.period[0]);
      handleClose();
      dispatch(
        alertShow({
          textAlert: "Показания изменены",
        })
      );
    } catch (error) {
      handleClose();
    }
  };

  const handelSubmitModalData = useCallback(
    (value: Data) => {
      console.log(value);

      if (typeModal === "create") fetchCreate(value);
      if (typeModal === "edit" && lastPeriod)
        fetchUpdate({ _id: lastPeriod?._id, ...value });
    },
    // eslint-disable-next-line
    [typeModal]
  );

  const handleDataEdit = () => {
    setTypeModal("edit");
    setOpen(true);
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
    setOpen(true);
  };

  const handleOpenDelete = (): void => {
    setOpenDelete(true);
  };

  const handleClose = useCallback((): void => {
    setOpen(false);
  }, []);

  const handleCloseDelete = useCallback((): void => {
    setOpenDelete(false);
  }, []);

  const handlerDeletePeriod = () => {
    lastPeriod && fetchDeletePeriod(lastPeriod?._id);
  };

  const fetchDeletePeriod = async (id: Periods["_id"]) => {
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
        (item) => item._id === lastPeriod?._id
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
                          const last =
                            periods?.find(
                              (item) => item?._id === e.target.value
                            ) || null;
                          setLastPeriod(last);
                        }}
                      >
                        {periods &&
                          periods?.map((elem) => (
                            <MenuItem key={elem?._id} value={elem?._id}>
                              {moment(elem?.date).format("MMMM yyyy")}
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
                  <h4>Сумма: {money?.toFixed(0)} руб.</h4>
                </div>
                <div>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleOpen}
                  >
                    Добавить
                  </Button>
                </div>
              </div>
            </div>

            <CardPrice price={price} />
          </CardContent>
        </Card>
        <div></div>
      </div>
      {open && (
        <ModalData
          open={open}
          handleClose={handleClose}
          onSubmit={handelSubmitModalData}
          typeModal={typeModal}
          initState={lastPeriod}
        />
      )}
      {openDelete && (
        <ModalDelete
          open={openDelete}
          handleClose={handleCloseDelete}
          handleDelete={handlerDeletePeriod}
        />
      )}
    </div>
  );
}

export default Home;

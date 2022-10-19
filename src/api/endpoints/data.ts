import { Data, Periods } from "../../interface/home";
import server from "../server";

export const getData = () => {
  return server.get(`/data`).then(({ data }) => {
    return data;
  });
};

export const postPeriod = (data: Data) => {
  return server.post(`/new_period`, data).then(({ data }) => {
    return data;
  });
};

export const patchPeriod = (data: Omit<Periods, "drainage">) => {
  return server.patch(`/period/${data._id}`, data).then(({ data }) => {
    return data;
  });
};

export const deletePeriod = (id: Periods["_id"]) => {
  return server.delete(`/period/${id}`).then(({ data }) => {
    return data;
  });
};

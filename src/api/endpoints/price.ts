import server from "../server";

export const getPrice = () => {
  return server.get(`/price`).then(({ data }) => {
    return data;
  });
};

export const postPeriod = (data: any) => {
  return server.post(`/new_period`, data).then(({ data }) => {
    return data;
  });
};

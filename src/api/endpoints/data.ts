import server from "../server";

export const getData = () => {
  return server.get(`/data`).then(({ data }) => {
    return data;
  });
};

export const postPeriod = (data: any) => {
  return server.post(`/new_period`, data).then(({ data }) => {
    return data;
  });
};

export const deletePeriod = (id: any) => {
  return server.delete(`/period/${id}`).then(({ data }) => {
    return data;
  });
};

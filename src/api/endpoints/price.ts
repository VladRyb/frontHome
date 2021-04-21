import server from "../server";

export const getPrice = () => {
  return server.get(`/price`).then(({ data }) => {
    return data.price;
  });
};

type TitlePrice = {
  title: string;
  key: "rent" | "hot" | "cold" | "drainage" | "electricity" | "internet";
};

export const titlePrice: TitlePrice[] = [
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

export const helperText = {
  required: "Обязательное поле",
};

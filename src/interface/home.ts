export interface PriceState {
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

export interface Periods {
  _id: number | string;
  date: string;
  hot: string;
  cold: string;
  drainage: string;
  electricity: string;
}

export interface Data {
  date: string;
  hot: string;
  cold: string;
  electricity: string;
}

export interface TitlePeriod {
  title: string;
  key: "hot" | "cold" | "drainage" | "electricity";
  icon?: any;
}

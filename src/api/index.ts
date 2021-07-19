// аггрегатор endpoints API
import * as auth from "./endpoints/auth";
import * as price from "./endpoints/data";

// eslint-disable-next-line
export default {
  ...auth,
  ...price,
};

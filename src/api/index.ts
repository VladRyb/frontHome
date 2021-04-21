// аггрегатор endpoints API
import * as auth from "./endpoints/auth";
import * as price from "./endpoints/price";

export default {
  ...auth,
  ...price,
};

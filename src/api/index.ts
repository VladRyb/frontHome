// аггрегатор endpoints API
import * as auth from "./endpoints/auth";
import * as price from "./endpoints/data";

export default {
  ...auth,
  ...price,
};

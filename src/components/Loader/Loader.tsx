import React from "react";
import style from "./Loader.module.scss";

const Loader = () => (
  <div className={style.container}>
    <div className={style.coll}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
);

export default Loader;

import React from "react";
import { Paper } from "@mui/material";

const Layout = (props: any) => {
  return (
    <Paper elevation={0} className="layout">
      <div className="header"></div>
      <div className="layout_block">{props.children}</div>
    </Paper>
  );
};

export default Layout;

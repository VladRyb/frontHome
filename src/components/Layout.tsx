import React from "react";

const Layout = (props: any) => {
  return (
    <div className="layout">
      <div className="header"></div>
      <div className="layout_block">{props.children}</div>
    </div>
  );
};

export default Layout;

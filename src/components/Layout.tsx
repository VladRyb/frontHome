import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { auth } from "../api/endpoints/auth";
import { setUserCreate } from "../redux/authStore";
import { getLoginPath } from "../routes";
import Loader from "./Loader/Loader";

const Layout = (props: any) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [load, setLoad] = useState(false);

  const checkAuth = async () => {
    setLoad(true);
    try {
      const isAuth = await auth();
      dispatch(setUserCreate(isAuth.user));
    } catch (error) {
      history.push(getLoginPath());
      console.log(error);
    }
    setLoad(false);
  };

  useEffect(() => {
    checkAuth();
    // eslint-disable-next-line
  }, []);

  if (load) {
    return <Loader />;
  }

  return (
    <div className="layout">
      <div className="header"></div>
      <div className="layout_block">{props.children}</div>
    </div>
  );
};

export default Layout;

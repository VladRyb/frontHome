import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { postLogin } from "../api/endpoints/auth";
import { setUserCreate } from "../redux/authStore";
import { getHomePath } from "../routes";
import Cookie from "js-cookie";
import { Button, TextField } from "@material-ui/core";
import { alertClose, alertShow } from "../redux/alertStore";
import { Alert } from "../components/Alert";

function Login() {
  const dispatch = useDispatch();
  const history = useHistory();

  const alert = useSelector((store: any) => store.alert);

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const [checker, setCheker] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!login && !password) {
      setCheker(true);
      return;
    }
    Cookie.remove("key");
    const userBody = {
      username: login,
      password: password,
    };
    try {
      const userState = await postLogin(userBody);
      Cookie.set("key", userState.token);
      dispatch(setUserCreate(userState.user));
      setLogin("");
      setPassword("");
      history.push(getHomePath());
    } catch (error) {
      console.log(error);
      dispatch(alertShow({ textAlert: "Неправильный логин или пароль" }));
    }
  };

  const handleCloseAlert = () => {
    dispatch(alertClose());
  };

  return (
    <div className="login_container">
      <div className="login_form_block box_shadow">
        <form onSubmit={(e) => handleSubmit(e)}>
          <TextField
            // name="name"
            className={checker ? "login_no_value" : ""}
            label="Логин"
            onChange={(e: any) => setLogin(e.target.value)}
            value={login}
          />
          <TextField
            className={checker ? "login_no_value" : ""}
            label="Пароль"
            type="password"
            onChange={(e: any) => setPassword(e.target.value)}
            value={password}
          />
          <Button type="submit">Войти</Button>
        </form>
      </div>
      {alert.textAlert && (
        <Alert
          textAlert={alert.textAlert}
          handleCloseAlert={handleCloseAlert}
        />
      )}
    </div>
  );
}

export default Login;

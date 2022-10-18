import React, { useState } from "react";
import { useHistory } from "react-router";
import { postLogin } from "../api/endpoints/auth";
import { setUserCreate } from "../redux/authStore";
import { getHomePath } from "../routes";
import Cookie from "js-cookie";
import { alertShow } from "../redux/alertStore";
import { useDispatch } from "react-redux";
import { TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";

function Login() {
  const dispatch = useDispatch();
  const history = useHistory();

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
      setCheker(true);
      dispatch(alertShow({ textAlert: "Неправильный логин или пароль" }));
    }
  };

  return (
    <div className="login_container">
      <div className="login_form_block app_card">
        <form onSubmit={(e) => handleSubmit(e)}>
          <TextField
            // name="name"
            label="Логин"
            onChange={(e: any) => setLogin(e.target.value)}
            value={login}
            error={checker}
            variant={"outlined"}
          />
          <TextField
            label="Пароль"
            type="password"
            onChange={(e: any) => setPassword(e.target.value)}
            value={password}
            error={checker}
            variant={"outlined"}
          />
          <LoadingButton type="submit" variant={"outlined"}>
            Войти
          </LoadingButton>
        </form>
      </div>
    </div>
  );
}

export default Login;

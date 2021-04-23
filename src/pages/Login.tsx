import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { postLogin } from "../api/endpoints/auth";
import { setUserCreate } from "../redux/authStore";
import { getHomePath } from "../routes";
import Cookie from "js-cookie";
import { Button, TextField } from "@material-ui/core";

function Login() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!login && !password) return;
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
    }
  };

  return (
    <div className="login_container">
      <div className="login_form_block box_shadow">
        <form>
          <TextField
            name="login"
            label="Логин"
            onChange={(e: any) => setLogin(e.target.value)}
            value={login}
          />
          <TextField
            label="Пароль"
            type="password"
            onChange={(e: any) => setPassword(e.target.value)}
            value={password}
          />
          <Button onClick={handleSubmit}>Войти</Button>
        </form>
      </div>
    </div>
  );
}

export default Login;

import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { login } from "../api/endpoints/auth";
import { setUserCreate } from "../redux/authStore";
import { getHomePath } from "../routes";
import Cookie from "js-cookie";
import {
  Button,
  FormControl,
  FormGroup,
  Input,
  InputLabel,
  TextField,
} from "@material-ui/core";

function Login() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useRef<any>(null);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    Cookie.remove("key");
    const userBody = {
      username: user.current[0].value,
      password: user.current[1].value,
    };
    try {
      const userState = await login(userBody);
      Cookie.set("key", userState.token);
      dispatch(setUserCreate(userState.user));
      history.push(getHomePath());
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="login_container">
      <div className="login_form_block box_shadow">
        <form ref={user} autoComplete="on">
          <FormControl>
            <InputLabel id="login-label">Логин</InputLabel>
            <Input />
          </FormControl>
          <FormControl>
            <InputLabel id="password-label">Пароль</InputLabel>
            <Input />
          </FormControl>
          <Button onClick={handleSubmit}>Войти</Button>
        </form>
      </div>
    </div>
  );
}

export default Login;

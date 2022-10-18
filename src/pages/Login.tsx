import React, { useState } from "react";
import { Card, CardContent, Grid, TextField, Typography } from "@mui/material";
import { setUserCreate } from "../redux/authStore";
import { postLogin } from "../api/endpoints/auth";
import { alertShow } from "../redux/alertStore";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { LoadingButton } from "@mui/lab";
import { getHomePath } from "../routes";
import Cookie from "js-cookie";

function Login() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const [checker, setCheker] = useState(false);

  const [loader, setLoader] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoader(true);
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
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="login_container">
      <Card>
        <CardContent className={"login_form_block"}>
          <form onSubmit={(e) => handleSubmit(e)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h5" className="login_form_title">
                  Авторизация
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Логин"
                  disabled={loader}
                  onChange={(e: any) => setLogin(e.target.value)}
                  value={login}
                  error={checker}
                  variant={"outlined"}
                  fullWidth
                  helperText={" "}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Пароль"
                  type="password"
                  disabled={loader}
                  onChange={(e: any) => setPassword(e.target.value)}
                  value={password}
                  error={checker}
                  variant={"outlined"}
                  fullWidth
                  helperText={" "}
                />
              </Grid>
              <Grid item xs={12}>
                <LoadingButton
                  type="submit"
                  variant={"contained"}
                  size={"large"}
                  loading={loader}
                >
                  Войти
                </LoadingButton>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Login;

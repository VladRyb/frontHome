import React, { useState } from "react";
import { Card, CardContent, Grid, TextField, Typography } from "@mui/material";
import { setUserCreate } from "../redux/authStore";
import { postLogin } from "../api/endpoints/auth";
import { alertShow } from "../redux/alertStore";
import { helperText } from "../helpers/options";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { LoadingButton } from "@mui/lab";
import { getHomePath } from "../routes";
import { useFormik } from "formik";
import Cookie from "js-cookie";
import * as yup from "yup";

const validationSchema = yup.object({
  username: yup.string().trim().required(helperText.required),
  password: yup.string().trim().required(helperText.required),
});

type FormikTypeShema = yup.InferType<typeof validationSchema>;

function Login() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [loader, setLoader] = useState(false);

  const handleSubmit = async (value: FormikTypeShema) => {
    setLoader(true);
    Cookie.remove("key");
    try {
      const userState = await postLogin(value);
      Cookie.set("key", userState.token);
      dispatch(setUserCreate(userState.user));
      history.push(getHomePath());
    } catch (error) {
      console.log(error);
      dispatch(alertShow({ textAlert: "Неправильный логин или пароль" }));
      formik.setErrors({
        username: "Проверьте логин",
        password: "Проверьте пароль",
      });
    } finally {
      setLoader(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <div className="login_container">
      <Card>
        <CardContent className={"login_form_block"}>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h5" className="login_form_title">
                  Авторизация
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Логин"
                  name={"username"}
                  fullWidth
                  variant={"outlined"}
                  disabled={loader}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.username}
                  error={
                    formik.touched.username && Boolean(formik.errors.username)
                  }
                  helperText={
                    (formik.touched.username && formik.errors.username) || " "
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Пароль"
                  type="password"
                  variant={"outlined"}
                  fullWidth
                  disabled={loader}
                  name={"password"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={
                    (formik.touched.password && formik.errors.password) || " "
                  }
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

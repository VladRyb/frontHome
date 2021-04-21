import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { login } from "../api/endpoints/auth";
import { setUserCreate } from "../redux/authStore";
import { getHomePath } from "../routes";
import Cookie from "js-cookie";
// import { postLogin, postSignup } from "../api/server";

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
    <div>
      <form ref={user} onSubmit={(e) => handleSubmit(e)}>
        <input type="text" />
        <input type="password" />
        <input type="submit" value="JR" />
      </form>
    </div>
  );
}

export default Login;

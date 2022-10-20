import React, { Suspense } from "react";
import routes, { getHomePath } from "./routes";
import { Alert } from "./components/Alert";
import { useSelector } from "react-redux";
import Layout from "./components/Layout";
import Home from "./pages/Home/Home";
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
  RouteComponentProps,
} from "react-router-dom";
import Loader from "./components/Loader/Loader";

function App() {
  const isAuth = useSelector((state: any) => state.auth.isAuth);

  return (
    <BrowserRouter>
      <Alert />
      <Switch>
        {isAuth && (
          <Route exact path="/">
            <Layout>
              <Home />
            </Layout>
          </Route>
        )}

        <Route>
          <Layout>
            <Switch>
              {/* Стандартный роутинг приложения на основе файла routes.js. Для большинства страниц используется загрузка через React Lazy */}
              {routes.map(
                (
                  {
                    path,
                    component,
                    componentPath,
                    componentProps = {},
                    exact,
                  },
                  index
                ) => {
                  const Component: React.FC<RouteComponentProps> =
                    component ||
                    React.lazy(() => import("./pages" + componentPath));
                  return (
                    <Route
                      key={index}
                      exact={exact !== undefined ? exact : true}
                      path={path}
                      render={(props) => (
                        <Suspense fallback={<Loader />}>
                          <Component {...props} {...componentProps} />
                        </Suspense>
                      )}
                    />
                  );
                }
              )}
              <Route path="*">
                <Redirect to={getHomePath()} />
              </Route>
            </Switch>
          </Layout>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

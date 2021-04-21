const prefix: string = process.env.PREFIX || "";

interface Route {
  path: string;
  componentPath: string;
  exact?: boolean;
  component?: React.FC;
  componentProps?: object;
}

const routes: Route[] = [
  {
    path: `${prefix}/`,
    componentPath: "/Home",
  },
  {
    path: `${prefix}/login`,
    componentPath: "/Login",
  },
];

export default routes;

export const getHomePath = () => `${prefix}/`;
export const getLoginPath = () => `${prefix}/login`;

export { prefix };

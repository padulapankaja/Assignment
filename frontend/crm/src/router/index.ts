import SignIn from "../pages/signin/signin";
import Dashboard from "../pages/dashboard/index";

const indexRoutes = [
  {
    path: "/",
    name: "SignIn",
    component: SignIn,
    exact: true,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    exact: true,
  },
  {
    path: "/dashboard/customer/:id",
    name: "Dashboard",
    component: Dashboard,
    exact: true,
  },
];

export default indexRoutes;

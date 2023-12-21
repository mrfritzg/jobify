import { createBrowserRouter, RouterProvider } from "react-router-dom";

import {
  AddJob,
  Admin,
  AllJobs,
  DashboardLayout,
  DeleteJob,
  EditJob,
  Error,
  HomeLayout,
  Landing,
  Login,
  Profile,
  Register,
  Stats,
} from "./pages";

// Actions for Form data from
// the register page
import { action as registerAction } from "./pages/Register";
import { action as loginAction } from "./pages/Login";

// import loaders from pages
import { loader as dashboardLoader } from "./pages/DashboardLayout";

// checks the default theme
export const checkDefaultTheme = () => {
  // if the true value is already in local storage
  // then the isDarkTheme will be set to true, else false
  const isDarkTheme = localStorage.getItem("darkTheme") === "true";
  document.body.classList.toggle("dark-theme", isDarkTheme);
  return isDarkTheme;
};

// invokes the function on app load
checkDefaultTheme();

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "Login",
        element: <Login />,
        action: loginAction,
      },
      {
        path: "Register",
        element: <Register />,
        action: registerAction,
      },
      {
        path: "Dashboard",
        element: <DashboardLayout />,
        loader: dashboardLoader,
        children: [
          {
            index: true,
            element: <AddJob />,
          },
          {
            path: "stats",
            element: <Stats />,
          },
          {
            path: "all-jobs",
            element: <AllJobs />,
          },
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "admin",
            element: <Admin />,
          },
        ],
      },
    ],
  },
  {
    path: "/addjob",
    element: <AddJob />,
  },
  {
    path: "/Admin",
    element: <Admin />,
  },
  {
    path: "/AllJobs",
    element: <AllJobs />,
  },
  {
    path: "/DeleteJob",
    element: <DeleteJob />,
  },
  {
    path: "/EditJob",
    element: <EditJob />,
  },
  {
    path: "/Profile",
    element: <Profile />,
  },

  {
    path: "/Stats",
    element: <Stats />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};
export default App;

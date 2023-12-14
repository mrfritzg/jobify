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

import { action as registerAction } from "./pages/Register";

export const checkDefaultTheme = () => {
  const isDarkTheme = localStorage.getItem("darkTheme") === "true";
  document.body.classList.toggle("dark-theme", isDarkTheme);
  return isDarkTheme;
};

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
      },
      {
        path: "Register",
        element: <Register />,
        action: registerAction,
      },
      {
        path: "Dashboard",
        element: <DashboardLayout />,
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

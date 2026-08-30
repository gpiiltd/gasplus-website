import { createBrowserRouter, RouterProvider } from "react-router-dom";
import type { RouteObject } from "react-router-dom";
import routeNames from "./routes";
import MainLayout from "../pages/MainLayout";
import Landing from "../pages/Landing";
import About from "../pages/About";

const routes: RouteObject[] = [
  {
    path: routeNames.landing,
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: routeNames.about,
        element: <About />,
      },
    ],
  },
  {
    path: routeNames.notFound,
    element: <>Page not found</>,
  },
];

const router = createBrowserRouter(routes);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
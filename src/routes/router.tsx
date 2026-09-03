import { createBrowserRouter, RouterProvider } from "react-router-dom";
import type { RouteObject } from "react-router-dom";
import routeNames from "./routes";
import MainLayout from "../pages/MainLayout";
import Landing from "../pages/Landing";
import About from "../pages/About";
import Contact from "../pages/Contact";
import PrivacyPolicyPage from "../pages/policies/PrivacyPolicyPage";
import TermsOfUsePage from "../pages/policies/TermsOfUsePage";

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
      {
        path: routeNames.contact,
        element: <Contact />,
      },
       {
        path: routeNames.privacy_policy,
        element: <PrivacyPolicyPage />,
      },
         {
        path: routeNames.terms_of_use,
        element: <TermsOfUsePage />,
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
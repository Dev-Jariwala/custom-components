import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "../component/sidebar/Layout";
import Home from "../component/Home";

const Routes = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default Routes;

import Home from "../pages/Home";
import Login from "../pages/Login";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import Register from "../pages/Register";

const Routes = () => {
  const token = localStorage.getItem("accessToken");
  const nonAuthenticatedRoutes = [
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ];

  const router = createBrowserRouter([
    {
      element: <ProtectedRoute />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
      ],
    },
    ...(!token ? nonAuthenticatedRoutes : []),
  ]);
  return <RouterProvider router={router} />;
};

export default Routes;

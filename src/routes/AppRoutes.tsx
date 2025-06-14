import { createBrowserRouter } from "react-router-dom";
import PageNotFound from "../components/pages/PageNotFound";
import LoginPage from "../features/auth/pages/LoginPage";
import { Layout } from "../layouts/Layout";
import OrderList from "../features/order/pages/OrderList";
import OrderFormPage from "../features/order/pages/OrderFormPage";
import PartyList from "../features/party/pages/PartyList";
import PartyFormPage from "../features/party/pages/PartyFormPage";
import StaffList from "../features/staff/pages/StaffList";
import StaffFormPage from "../features/staff/pages/StaffFormPage";
import Dashboard from "../features/dashboard/pages/Dashboard";

const routes = createBrowserRouter([
  {
    path: "/auth/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "", element: <Dashboard /> },
      { path: "order", element: <OrderList /> },
      { path: "order/create", element: <OrderFormPage /> },
      { path: "order/edit/:id", element: <OrderFormPage /> },

      { path: "party", element: <PartyList /> },
      { path: "party/create", element: <PartyFormPage /> },
      { path: "party/edit/:id", element: <PartyFormPage /> },

      { path: "staff", element: <StaffList /> },
      { path: "staff/create", element: <StaffFormPage /> },
      { path: "staff/edit/:id", element: <StaffFormPage /> },
    ],
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

export default routes;

import { Routes, Route } from "react-router-dom";
import OrderList from "./features/order/pages/OrderList";
import { Layout } from "./layouts/Layout";
import Dashboard from "./features/dashboard/pages/Dashboard";
import OrderFormPage from "./features/order/pages/OrderFormPage";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/orders" element={<OrderList />} />
        <Route path="/orders/create" element={<OrderFormPage />} />
      </Routes>
    </Layout>
  );
}

export default App;

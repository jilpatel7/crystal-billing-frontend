import { Routes, Route } from "react-router-dom";
import OrderList from "./features/order/pages/OrderList";
import { Layout } from "./layouts/Layout";
import Dashboard from "./features/dashboard/pages/Dashboard";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/orders" element={<OrderList />} />
      </Routes>
    </Layout>
  );
}

export default App;

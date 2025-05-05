import { Routes, Route } from "react-router-dom";
import OrderList from "./features/order/pages/OrderList";
import { Layout } from "./layouts/Layout";
import Dashboard from "./features/dashboard/pages/Dashboard";
import OrderFormPage from "./features/order/pages/OrderFormPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/orders" element={<OrderList />} />
          <Route path="/orders/create" element={<OrderFormPage />} />
        </Routes>
      </Layout>
    </QueryClientProvider>
  );
}

export default App;

import { Routes, Route } from "react-router-dom";
import OrderList from "./features/order/pages/OrderList";
import { Layout } from "./layouts/Layout";
import Dashboard from "./features/dashboard/pages/Dashboard";
import OrderFormPage from "./features/order/pages/OrderFormPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import PartyList from "./features/party/pages/PartyList";
import StaffList from "./features/staff/pages/StaffList";
import PartyFormPage from "./features/party/pages/PartyFormPage";
import StaffFormPage from "./features/staff/pages/StaffFormPage";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/orders" element={<OrderList />} />
          <Route path="/orders/create" element={<OrderFormPage />} />
          <Route path="/party" element={<PartyList />} />
          <Route path="/party/create" element={<PartyFormPage />} />
          <Route path="/party/edit/:id" element={<PartyFormPage />} />
          <Route path="/staff" element={<StaffList />} />
          <Route path="/staff/create" element={<StaffFormPage />} />
          <Route path="/staff/edit/:id" element={<StaffFormPage />} />
        </Routes>
      </Layout>
      <Toaster richColors position="top-right" />
    </QueryClientProvider>
  );
}

export default App;

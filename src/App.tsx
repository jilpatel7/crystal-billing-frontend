import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import routes from "./routes/AppRoutes";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={routes} />
      <Toaster richColors position="top-right" />
    </QueryClientProvider>
  );
}

export default App;

import "./global.css";
import React from "react";
import AppRoutes from "./AppRoutes";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import Auth0ProviderWithNavigate from "./auth/Auth0ProviderWithNavigate";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <QueryClientProvider client={queryClient}>
        <Auth0ProviderWithNavigate>
          <AppRoutes />
        </Auth0ProviderWithNavigate>
      </QueryClientProvider>
    </Router>
  </React.StrictMode>
);

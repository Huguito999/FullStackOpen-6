import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ReactDOM from 'react-dom/client';
import App from "./App";
import { NotificationProvider } from "./components/NotificationContext";

const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById("root")); 

root.render(
  <QueryClientProvider client={queryClient}>
    <NotificationProvider>
    <App />
    </NotificationProvider>
  </QueryClientProvider>
);

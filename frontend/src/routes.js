// src/routes.js
import SalesExecDashboard from "./pages/salesExecutive/Dashboard";
import Prospect from "./pages/salesExecutive/Prospect";
import SalesManagerDashboard from "./pages/salesManager/Dashboard";

export const roleBasedRoutes = {
  salesExecutive: [
    { path: "/salesExecutive", element: SalesExecDashboard },
    { path: "prospect", element: Prospect },
  ],
  salesManager: [
    { path: "dashboard", element: SalesManagerDashboard },
  ],
};

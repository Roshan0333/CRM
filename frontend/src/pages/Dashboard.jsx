import { roleDashboardMap } from "../routes/roleDashboardMap";

export default function Dashboard() {
  const role = localStorage.getItem("role");
  const DashboardComponent = roleDashboardMap[role];

  if (!DashboardComponent) {
    return <h2>No dashboard assigned</h2>;
  }

  return <DashboardComponent />;
}

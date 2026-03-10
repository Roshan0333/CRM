import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { roleBasedRoutes } from "../routes";

// Import all role-based headers and sidebars
import SalesExecutiveHeader from "../components/salesExecutive/Header";
import SalesExecutiveSidebar from "../components/salesExecutive/Sidebar";

import SalesTeamLeadHeader from "../components/salesTeamLead/Header";
import SalesTeamLeadSidebar from "../components/salesTeamLead/Sidebar";

import SalesManagerSidebar from "../components/salesManager/Sidebar";
import SalesManagerHeader from "../components/salesManager/Header";

import ManagementTLSidebar from "../components/managementTL/sidebar";
import ManagementTLHeader from "../components/managementTL/header";

import ManagementEmployeeSideber from "../components/managementEmployee/Sidebar";
import ManagementEmployeeHeader from "../components/managementEmployee/Header";

import ManagerManagementSidebar from "../components/managerManagement/Sidebar";
import ManagerManagementHeader from "../components/managerManagement/Header";

import FeedbackManagerSidebar from "../components/feedbackmanager/Sidebar";
import FeedbackManagerHeader from "../components/feedbackmanager/Header";

import FeedbackEmployeeSidebar from "../components/feedbackEmployee/Sidebar";
import FeedbackEmployeeHeader from "../components/feedbackEmployee/Header";

import FinanceSidebar from "../components/finance/Sidebar";
import FinanceHeader from "../components/finance/Header";

import AccountantSidebar from "../components/accountant/Sidebar";
import AccountantHeader from "../components/accountant/Header";

import Profile from "../pages/Profile";

export default function RoleLayout() {
  const role = localStorage.getItem("role");
  const currentRoutes = roleBasedRoutes[role] || [];

  const renderRoutes = () => (
    <Routes>
      {currentRoutes.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          element={route.element}
        />
      ))}
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );

  switch (role) {
    case "salesExecutive":
      return (
        <>
          <SalesExecutiveSidebar />
          <div>
            <SalesExecutiveHeader />
            {renderRoutes()}
          </div>
        </>
      );

    case "salesTeamLead":
      return (
        <>
          <SalesTeamLeadSidebar />
          <div>
            <SalesTeamLeadHeader />
            {renderRoutes()}
          </div>
        </>
      );

    case "salesManager":
      return (
        <>
          <SalesManagerSidebar />
          <div>
            <SalesManagerHeader />
            {renderRoutes()}
          </div>
        </>
      );

    case "managementTL":
      return (
        <>
          <ManagementTLSidebar />
          <div>
            <ManagementTLHeader />
            {renderRoutes()}
          </div>
        </>
      );

    case "managementEmployee":
      return (
        <>
          <ManagementEmployeeSideber />
          <div>
            <ManagementEmployeeHeader />
            {renderRoutes()}
          </div>
        </>
      );

    case "managerManagement":
      return (
        <>
          <ManagerManagementSidebar />
          <div>
            <ManagerManagementHeader />
            {renderRoutes()}
          </div>
        </>
      );

    case "feedbackManager":
      return (
        <>
          <FeedbackManagerSidebar />
          <div>
            <FeedbackManagerHeader />
            {renderRoutes()}
          </div>
        </>
      );

    case "feedbackEmployee":
      return (
        <>
          <FeedbackEmployeeSidebar />
          <div>
            <FeedbackEmployeeHeader />
            {renderRoutes()}
          </div>
        </>
      );

    case "finance":
      return (
        <>
          <FinanceSidebar />
          <div>
            <FinanceHeader />
            {renderRoutes()}
          </div>
        </>
      );

    case "accountant":
      return (
        <>
          <AccountantSidebar />
          <div>
            <AccountantHeader />
            {renderRoutes()}
          </div>
        </>
      );

    default:
      return <Navigate to="/" replace />;
  }
}

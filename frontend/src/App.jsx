// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import "./App.css";
// import { roleBasedRoutes } from "./routes";

// // Import all role-based headers and sidebars
// import SalesExecutiveHeader from "./components/salesExecutive/Header";
// import SalesExecutiveSidebar from "./components/salesExecutive/Sidebar";

// import SalesTeamLeadHeader from "./components/salesTeamLead/Header";
// import SalesTeamLeadSidebar from "./components/salesTeamLead/Sidebar";

// import SalesManagerSidebar from "./components/salesManager/Sidebar";
// import SalesManagerHeader from "./components/salesManager/Header";

// import ManagementTLSidebar from "./components/managementTL/sidebar";
// import ManagementTLHeader from "./components/managementTL/header";

// import ManagementEmployeeSideber from "./components/managementEmployee/Sidebar";
// import ManagementEmployeeHeader from "./components/managementEmployee/Header";

// import ManagerManagementSidebar from "./components/managerManagement/Sidebar";
// import ManagerManagementHeader from "./components/managerManagement/Header";

// import FeedbackManagerSidebar from "./components/feedbackmanager/Sidebar";
// import FeedbackManagerHeader from "./components/feedbackmanager/Header";

// import FeedbackEmployeeSidebar from "./components/feedbackEmployee/Sidebar";
// import FeedbackEmployeeHeader from "./components/feedbackEmployee/Header";

// import FinanceSidebar from "./components/finance/Sidebar";
// import FinanceHeader from "./components/finance/Header";

// import AccountantSidebar from "./components/accountant/Sidebar";
// import AccountantHeader from "./components/accountant/Header";

// function App() {
//   const role = localStorage.getItem("role") || "salesExecutive"; // Example fallback
//   const currentRoutes = roleBasedRoutes[role] || [];

//   const renderLayout = () => {
//     switch (role) {
//       case "salesExecutive":
//         return (
//           <>
//             <SalesExecutiveSidebar />
//             <div>
//               <SalesExecutiveHeader />
//               <Routes>
//                 {currentRoutes.map((route, index) => (
//                   <Route
//                     key={index}
//                     path={route.path}
//                     element={route.element}
//                   />
//                 ))}
//               </Routes>
//             </div>
//           </>
//         );

//       case "salesTeamLead":
//         return (
//           <>
//             <SalesTeamLeadSidebar />
//             <div>
//               <SalesTeamLeadHeader />
//               <Routes>
//                 {currentRoutes.map((route, index) => (
//                   <Route
//                     key={index}
//                     path={route.path}
//                     element={route.element}
//                   />
//                 ))}
//               </Routes>
//             </div>
//           </>
//         );
//       case "salesManager":
//         return (
//           <>
//             <SalesManagerSidebar />
//             <div>
//               <SalesManagerHeader />
//               <Routes>
//                 {currentRoutes.map((route, index) => (
//                   <Route
//                     key={index}
//                     path={route.path}
//                     element={route.element}
//                   />
//                 ))}
//               </Routes>
//             </div>
//           </>
//         );

//       case "managementTL":
//         return (
//           <>
//             <ManagementTLSidebar />
//             <div>
//               <ManagementTLHeader />
//               <Routes>
//                 {currentRoutes.map((route, index) => (
//                   <Route
//                     key={index}
//                     path={route.path}
//                     element={route.element}
//                   />
//                 ))}
//               </Routes>
//             </div>
//           </>
//         );

//       case "managementEmployee":
//         return (
//           <>
//             <ManagementEmployeeSideber />
//             <div>
//               <ManagementEmployeeHeader />
//               <Routes>
//                 {currentRoutes.map((route, index) => (
//                   <Route
//                     key={index}
//                     path={route.path}
//                     element={route.element}
//                   />
//                 ))}
//               </Routes>
//             </div>
//           </>
//         );

//       case "managerManagement":
//         return (
//           <>
//             <ManagerManagementSidebar />
//             <div>
//               <ManagerManagementHeader />
//               <Routes>
//                 {currentRoutes.map((route, index) => (
//                   <Route
//                     key={index}
//                     path={route.path}
//                     element={route.element}
//                   />
//                 ))}
//               </Routes>
//             </div>
//           </>
//         );

//       case "feedbackManager":
//         return (
//           <>
//             <FeedbackManagerSidebar />
//             <div>
//               <FeedbackManagerHeader />
//               <Routes>
//                 {currentRoutes.map((route, index) => (
//                   <Route
//                     key={index}
//                     path={route.path}
//                     element={route.element}
//                   />
//                 ))}
//               </Routes>
//             </div>
//           </>
//         );

//       case "feedbackEmployee":
//         return (
//           <>
//             <FeedbackEmployeeSidebar />
//             <div>
//               <FeedbackEmployeeHeader />
//               <Routes>
//                 {currentRoutes.map((route, index) => (
//                   <Route
//                     key={index}
//                     path={route.path}
//                     element={route.element}
//                   />
//                 ))}
//               </Routes>
//             </div>
//           </>
//         );

//       case "finance":
//         return (
//           <>
//             <FinanceSidebar />
//             <div>
//               <FinanceHeader />
//               <Routes>
//                 {currentRoutes.map((route, index) => (
//                   <Route
//                     key={index}
//                     path={route.path}
//                     element={route.element}
//                   />
//                 ))}
//               </Routes>
//             </div>
//           </>
//         );
//       case "accountant":
//         return (
//           <>
//             <AccountantSidebar />
//             <div>
//               <AccountantHeader />
//               <Routes>
//                 {currentRoutes.map((route, index) => (
//                   <Route
//                     key={index}
//                     path={route.path}
//                     element={route.element}
//                   />
//                 ))}
//               </Routes>
//             </div>
//           </>
//         );

//       default:
//         return <div>Role not found</div>;
//     }
//   };

//   return <Router>{renderLayout()}</Router>;
// }

// export default App;
// src/App.jsx
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import "./App.css";
import { roleBasedRoutes } from "./routes";

/* AUTH PAGES */
import LoginForm from "./components/auth/LoginForm";
import RegisterForm from "./components/auth/RegisterForm";
import Profile from "./pages/Profile";

/* ROLE BASED COMPONENTS */
import SalesExecutiveHeader from "./components/salesExecutive/Header";
import SalesExecutiveSidebar from "./components/salesExecutive/Sidebar";

import SalesTeamLeadHeader from "./components/salesTeamLead/Header";
import SalesTeamLeadSidebar from "./components/salesTeamLead/Sidebar";

import SalesManagerSidebar from "./components/salesManager/Sidebar";
import SalesManagerHeader from "./components/salesManager/Header";

import ManagementTLSidebar from "./components/managementTL/sidebar";
import ManagementTLHeader from "./components/managementTL/header";

import ManagementEmployeeSidebar from "./components/managementEmployee/Sidebar";
import ManagementEmployeeHeader from "./components/managementEmployee/Header";

import ManagerManagementSidebar from "./components/managerManagement/Sidebar";
import ManagerManagementHeader from "./components/managerManagement/Header";

import FeedbackManagerSidebar from "./components/feedbackmanager/Sidebar";
import FeedbackManagerHeader from "./components/feedbackmanager/Header";

import FeedbackEmployeeSidebar from "./components/feedbackEmployee/Sidebar";
import FeedbackEmployeeHeader from "./components/feedbackEmployee/Header";

import FinanceSidebar from "./components/finance/Sidebar";
import FinanceHeader from "./components/finance/Header";

import AccountantSidebar from "./components/accountant/Sidebar";
import AccountantHeader from "./components/accountant/Header";
import SE_Dashboard from "./pages/salesExecutive/Dashboard";
import UserData from "./pages/salesExecutive/UserData"
/* 🔐 AUTH GUARD */
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/" replace />;
};

function RoleLayout() {
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
      {/* <Route path="/profile" element={<Profile />} /> */}
      {/* unknown path असेल तर default */}
      <Route path="*" element={<Navigate to="/app" replace />} />
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
          <ManagementEmployeeSidebar />
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

export default function App() {
  return (
    <Router>
      <Routes>
        {/* 🔓 PUBLIC ROUTES */}
        <Route path="/" element={<LoginForm />} />
       <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/salesExecutive" element={<SE_Dashboard />} />
        <Route path="/salesexecutive/userdata" element={<UserData/>} />
        

        

        {/* 🔐 PROTECTED APP (role-based layout) */}
        <Route
          path="/app/*"
          element={
            <ProtectedRoute>
              <RoleLayout />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

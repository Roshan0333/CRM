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
// import React from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate
// } from "react-router-dom";

// import "./App.css";
// import { roleBasedRoutes } from "./routes";

// /* AUTH PAGES */
// import LoginForm from "./components/auth/LoginForm";
// import RegisterForm from "./components/auth/RegisterForm";
// import Profile from "./pages/Profile";

// /* ROLE BASED COMPONENTS */
// import SalesExecutiveHeader from "./components/salesExecutive/Header";
// import SalesExecutiveSidebar from "./components/salesExecutive/Sidebar";

// import SalesTeamLeadHeader from "./components/salesTeamLead/Header";
// import SalesTeamLeadSidebar from "./components/salesTeamLead/Sidebar";

// import SalesManagerSidebar from "./components/salesManager/Sidebar";
// import SalesManagerHeader from "./components/salesManager/Header";

// import ManagementTLSidebar from "./components/managementTL/sidebar";
// import ManagementTLHeader from "./components/managementTL/header";

// import ManagementEmployeeSidebar from "./components/managementEmployee/Sidebar";
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
// import SE_Dashboard from "./pages/salesExecutive/Dashboard";
// import UserData from "./pages/salesExecutive/UserData"
// /* 🔐 AUTH GUARD */
// const ProtectedRoute = ({ children }) => {
//   const token = localStorage.getItem("token");
//   return token ? children : <Navigate to="/" replace />;
// };

// function RoleLayout() {
//   const role = localStorage.getItem("role");
//   const currentRoutes = roleBasedRoutes[role] || [];

//   const renderRoutes = () => (
//     <Routes>
//       {currentRoutes.map((route, index) => (
//         <Route
//           key={index}
//           path={route.path}
//           element={route.element}
//         />
//       ))}
//       {/* <Route path="/profile" element={<Profile />} /> */}
//       {/* unknown path असेल तर default */}
//       <Route path="*" element={<Navigate to="/app" replace />} />
//     </Routes>
//   );

//   switch (role) {
//     case "salesExecutive":
//       return (
//         <>
//           <SalesExecutiveSidebar />
//           <div>
//             <SalesExecutiveHeader />
//             {renderRoutes()}
//           </div>
//         </>
//       );

//     case "salesTeamLead":
//       return (
//         <>
//           <SalesTeamLeadSidebar />
//           <div>
//             <SalesTeamLeadHeader />
//             {renderRoutes()}
//           </div>
//         </>
//       );

//     case "salesManager":
//       return (
//         <>
//           <SalesManagerSidebar />
//           <div>
//             <SalesManagerHeader />
//             {renderRoutes()}
//           </div>
//         </>
//       );

//     case "managementTL":
//       return (
//         <>
//           <ManagementTLSidebar />
//           <div>
//             <ManagementTLHeader />
//             {renderRoutes()}
//           </div>
//         </>
//       );

//     case "managementEmployee":
//       return (
//         <>
//           <ManagementEmployeeSidebar />
//           <div>
//             <ManagementEmployeeHeader />
//             {renderRoutes()}
//           </div>
//         </>
//       );

//     case "managerManagement":
//       return (
//         <>
//           <ManagerManagementSidebar />
//           <div>
//             <ManagerManagementHeader />
//             {renderRoutes()}
//           </div>
//         </>
//       );

//     case "feedbackManager":
//       return (
//         <>
//           <FeedbackManagerSidebar />
//           <div>
//             <FeedbackManagerHeader />
//             {renderRoutes()}
//           </div>
//         </>
//       );

//     case "feedbackEmployee":
//       return (
//         <>
//           <FeedbackEmployeeSidebar />
//           <div>
//             <FeedbackEmployeeHeader />
//             {renderRoutes()}
//           </div>
//         </>
//       );

//     case "finance":
//       return (
//         <>
//           <FinanceSidebar />
//           <div>
//             <FinanceHeader />
//             {renderRoutes()}
//           </div>
//         </>
//       );

//     case "accountant":
//       return (
//         <>
//           <AccountantSidebar />
//           <div>
//             <AccountantHeader />
//             {renderRoutes()}
//           </div>
//         </>
//       );

//     default:
//       return <Navigate to="/" replace />;
//   }
// }

// export default function App() {
//   return (
//     <Router>
//       <Routes>
//         {/* 🔓 PUBLIC ROUTES */}
//         <Route path="/" element={<LoginForm />} />
//        <Route path="/login" element={<LoginForm />} />
//         <Route path="/register" element={<RegisterForm />} />
//         <Route path="/salesExecutive" element={<SE_Dashboard />} />
//         <Route path="/salesexecutive/userdata" element={<UserData/>} />




//         {/* 🔐 PROTECTED APP (role-based layout) */}
//         <Route
//           path="/app/*"
//           element={
//             <ProtectedRoute>
//               <RoleLayout />
//             </ProtectedRoute>
//           }
//         />
//       </Routes>
//     </Router>
//   );
// }


// export default App;
// src / App.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"

import "./App.css"

/* AUTH PAGES */
import LoginForm from "./components/auth/LoginForm";
import RegisterForm from "./components/auth/RegisterForm";
import Profile from "./pages/Profile";

/* ROLE BASED COMPONENTS */

// salesExecutive
import SalesExecutiveHeader from "./components/salesExecutive/Header";
import SalesExecutiveSidebar from "./components/salesExecutive/Sidebar";
import SE_Dashboard from "./pages/salesExecutive/Dashboard";
import SE_Prospect from "./pages/salesExecutive/Prospect";
import SE_Report from "./pages/salesExecutive/Report";
import SE_SalesReport from "./pages/salesExecutive/SalesReport";
import SE_UserData from "./pages/salesExecutive/UserData";

// salesTeam
import SalesTeamLeadHeader from "./components/salesTeamLead/Header";
import SalesTeamLeadSidebar from "./components/salesTeamLead/Sidebar";
import TL_Dashboard from "./pages/salesTeamLead/Dashboard";
import TL_TransferData from "./pages/salesTeamLead/TransferData";
import TL_TotalSales from "./pages/salesTeamLead/TotalSales";
import TL_UntouchedData from "./pages/salesTeamLead/UntouchedData";
import TL_TeamMember from "./pages/salesTeamLead/TeamMember";
import TL_ProspectForm from "./pages/salesTeamLead/ProspectForm";
import TL_Prospect from "./pages/salesTeamLead/Prospect";
import TL_Report from "./pages/salesTeamLead/Report";

// salesManager
import SalesManagerSidebar from "./components/salesManager/Sidebar";
import SalesManagerHeader from "./components/salesManager/Header";
import SM_Dashboard from "./pages/salesManager/Dashboard";
import SM_ManagerReport from "./pages/salesManager/managerReport";
import SM_TotalSales from "./pages/salesManager/TotalSales";
import SM_Salary from "./pages/salesManager/Salary";
import SM_UntouchedData from "./pages/salesManager/UntouchedData";
import SM_ProspectForm from "./pages/salesManager/ProspectForm";
import SM_TeamMember from "./pages/salesManager/TeamMember";
import SM_TeamReport from "./pages/salesManager/Report";
import SM_TransferData from "./pages/salesManager/Transferdata";
import SM_TransferDataToFin from "./pages/salesManager/TransferDataToFin";
import SM_TotalProspect from "./pages/salesManager/TotalProspect"


// managementTL
import ManagementTLSidebar from "./components/managementTL/sidebar";
import ManagementTLHeader from "./components/managementTL/header";
import M_Dashboard from "./pages/managementTL/Dashboard";
import M_MyProjects from "./pages/managementTL/MyProjects";
import M_TransferProjects from "./pages/managementTL/TransferProject";
import M_TeamMember from "./pages/managementTL/TeamMember";
import M_Report from "./pages/managementTL/Report";
import M_Payout from "./pages/managementTL/Payout";
import M_Review from "./pages/managementTL/Review";

// managementEmployee
import ManagementEmployeeSidebar from "./components/managementEmployee/Sidebar";
import ManagementEmployeeHeader from "./components/managementEmployee/Header";
import ME_Dashboard from "./pages/managementEmployee/Dashboard";
import ME_MyProjects from "./pages/managementEmployee/Myprojects";
import ME_CompleteProjects from "./pages/managementEmployee/CompleteProjects";
import ME_PayOut from "./pages/managementEmployee/PayOut";
import ME_Help from "./pages/managementEmployee/Help";


// managerManagement
import ManagerManagementSidebar from "./components/managerManagement/Sidebar";
import ManagerManagementHeader from "./components/managerManagement/Header";
import MM_Dashboard from "./pages/managerManagement/Dashboard";
import MM_ManagerReport from "./pages/managerManagement/managerReport";
import MM_RecieveData from "./pages/managerManagement/RecieveData";
import MM_Review from "./pages/managerManagement/Review";
import MM_TotalProjects from "./pages/managerManagement/TotalProjects";
import MM_TransferDataFDBK from "./pages/managerManagement/TransferDataFDBK";
import MM_WorkingProject from "./pages/managerManagement/WorkingProject";
import MM_TeamMember from "./pages/managerManagement/TeamMember";
import MM_TeamReport from "./pages/managerManagement/TeamReport";
import MM_Salary from "./pages/managerManagement/ManagerSalary";

// feedbackManager
import FeedbackManagerSidebar from "./components/feedbackmanager/Sidebar";
import FeedbackManagerHeader from "./components/feedbackmanager/Header";
import FM_Dashboard from "./pages/feedbackManager/Dashboard";
import FM_Feedbacks from "./pages/feedbackManager/Feedbacks";
import FM_Salary from "./pages/feedbackManager/FeedbackSalary";
import FM_Complaint from "./pages/feedbackManager/Complaints";
import FM_TeamReport from "./pages/feedbackManager/TeamReport";
import FM_TeamMember from "./pages/feedbackManager/TeamMember";

// feedbackEmployee
import FeedbackEmployeeSidebar from "./components/feedbackEmployee/Sidebar";
import FeedbackEmployeeHeader from "./components/feedbackEmployee/Header";
import FE_Dashboard from "./pages/feedBackEmployee/Dashboard";
import FE_Feedbacks from "./pages/feedBackEmployee/Feedbacks";
import FE_Complaints from "./pages/feedbackEmployee/Complaints";
import FE_Salary from "./pages/feedBackEmployee/Salary";

// finance
import FinanceSidebar from "./components/finance/Sidebar";
import FinanceHeader from "./components/finance/Header";
import F_Dashboard from "./pages/finance/Dashboard";
import F_Employeemanagement from "./pages/finance/Employeemanagement";
import F_ClientManagement from "./pages/finance/ClientManagement";
import F_InvoiceUI from "./pages/finance/FinanceInvoice";
import F_TransferDataToAccountant from "./pages/finance/TransferDataToAccountant";
import F_AddEmployeePayout from "./pages/finance/AddEmployeePayout";
import F_Reports from "./pages/finance/Reports";
import F_Payout from "./pages/finance/Payout";

// accountant
import AccountantSidebar from "./components/accountant/Sidebar";
import AccountantHeader from "./components/accountant/Header";
import A_Dashboard from "./pages/accountant/Dashboard";
import A_ClientManagement from "./pages/accountant/ClientManagement";
import A_Invoice from "./pages/accountant/Invoice";
import A_PreviousClients from "./pages/accountant/PreviousClients";

function App() {

  const [role, setRole] = useState(null);

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    setRole(storedRole);
    console.log(storedRole)
  }, []);

  useEffect(()=>{
    console.log(role)
  },[role])

  return (
    <>
      <Router>
        {!role && (
          <Routes>
            {/* 🔓 PUBLIC ROUTES */}
            <Route path="/" element={<LoginForm onLoginSuccess={setRole}/>} />
            <Route path="/login" element={<LoginForm onLoginSuccess={setRole}/>} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        )}

        {/* 🧑‍💼 ROLE BASED Routes */}
        {role === "sales executive" && <SalesExecutive />}
        {role === "sales team lead" && <SalesTeamLead />}
        {role === "sales manager" && <SalesManager />}
        {role === "management tl" && <ManagementTL />}
        {role == "management employee" && <ManagementEmployee />}
        {role === "management manager" && <ManagerManagement />}
        {role === "feedback manager" && <FeedbackManager />}
        {role === "feedback employee" && <FeedbackEmployee />}
        {role === "finance employee" && <Finance />}
        {role === "accountant" && <Accountant />}
      </Router>

    </>
  )
}


function SalesExecutive() {
  return (
    <>
      <SalesExecutiveSidebar />
      <div>
        <SalesExecutiveHeader />
        <Routes>
          <Route path="/" element={<SE_Dashboard />}/>
          <Route path="/salesexecutive/dashboard" element={<SE_Dashboard />} />
          <Route path="/salesexecutive/prospect" element={<SE_Prospect />} />
          <Route path="/salesexecutive/sales-report" element={<SE_SalesReport />} />
          <Route path="/salesexecutive/report" element={<SE_Report />} />
          <Route path="/salesexecutive/userdata" element={<SE_UserData />} />
          <Route path="*" element={<h2>Page Not Found</h2>} />
        </Routes>
      </div>
    </>
  )
}

function SalesTeamLead() {
  return (
    <>
      <SalesTeamLeadSidebar />
      <div>
        <SalesTeamLeadHeader />
        <Routes>
          <Route path="/" element={<TL_Dashboard />} />
          <Route path="/salesTeamLead/dashboard" element={<TL_Dashboard />} />
          <Route path="/salesTeamLead/transfer-data" element={<TL_TransferData />} />
          <Route path="/salesTeamLead/total-sales" element={<TL_TotalSales />} />
          <Route path="/salesTeamLead/untouched-data" element={<TL_UntouchedData />} />
          <Route path="/salesTeamLead/prospect" element={<TL_Prospect />} />
          <Route path="/salesTeamLead/team-member" element={<TL_TeamMember />} />
          <Route path="/salesTeamLead/prospect-form" element={<TL_ProspectForm />} />
          <Route path="/salesTeamLead/report" element={<TL_Report />} />
          <Route path="*" element={<h2>Page Not Found</h2>} />
        </Routes>
      </div>
    </>
  )
}

function SalesManager() {
  return (
    <>
      <SalesManagerSidebar />
      <div>
        <SalesManagerHeader />
        <Routes>
          <Route path="/" element={<SM_Dashboard />} />
          <Route path="/salesManager/dashboard" element={<SM_Dashboard />} />
          <Route path="/salesManager/manager-report" element={<SM_ManagerReport />} />
          <Route path="/salesManager/total-sales" element={<SM_TotalSales />} />
          <Route path="/salesManager/salary" element={<SM_Salary />} />
          <Route path="/salesManager/untouched-data" element={<SM_UntouchedData />} />
          <Route path="/salesManager/prospect-form" element={<SM_ProspectForm />} />
          <Route path="/salesManager/team-member" element={<SM_TeamMember />} />
          <Route path="/salesManager/transfer-data-fin" element={<SM_TransferDataToFin />} />
          <Route path="/salesManager/report" element={<SM_TeamReport />} />
          <Route path="/salesManager/transfer-data" element={<SM_TransferData />} />
          <Route path="/salesManager/total-prospect" element={<SM_TotalProspect />} />
          <Route path="*" element={<h2>Page Not Found</h2>} />
        </Routes>
      </div>
    </>
  )
}

function ManagementTL() {
  return (
    <>
      <ManagementTLSidebar />
      <div>
        <ManagementTLHeader />
        <Routes>
          <Route path="/" element={<M_Dashboard />} />
          <Route path="/managementTL/dashboard" element={<M_Dashboard />} />
          <Route path="/managementTL/projects" element={<M_MyProjects />} />
          <Route path="/managementTL/transfer-projects" element={<M_TransferProjects />} />
          <Route path="/managementTL/report" element={<M_Report />} />
          <Route path="/managementTL/team-member" element={<M_TeamMember />} />
          <Route path="/managementTL/payout" element={<M_Payout />} />
          <Route path="/managementTL/review" element={<M_Review />} />
          <Route path="*" element={<h2>Page Not Found</h2>} />
        </Routes>
      </div>
    </>
  )
}

function ManagementEmployee() {
  return (
    <>
      <ManagementEmployeeSidebar />
      <div>
        <ManagementEmployeeHeader />
        <Routes>
          <Route path="/" element={<ME_Dashboard />} />
          <Route path="/managementemployee/dashboard" element={<ME_Dashboard />} />
          <Route path="/managementemployee/my-projects" element={<ME_MyProjects />} />
          <Route path="/managementemployee/complete-projects" element={<ME_CompleteProjects />} />
          <Route path="/managementemployee/payout" element={<ME_PayOut />} />
          <Route path="/managementemployee/help" element={<ME_Help />} />
          <Route path="*" element={<h2>Page Not Found</h2>} />
        </Routes>
      </div>
    </>
  )
}

function ManagerManagement() {
  return (
    <>
      <ManagerManagementSidebar />
      <div>
        <ManagerManagementHeader />
        <Routes>
          <Route path="/" element={<MM_Dashboard />} />
          <Route path="/managermanagement/dashboard" element={<MM_Dashboard />} />
          <Route path="/managermanagement/total-projects" element={<MM_TotalProjects />} />
          <Route path="/managermanagement/working-projects" element={<MM_WorkingProject />} />
          <Route path="/managermanagement/team-members" element={<MM_TeamMember />} />
          <Route path="/managermanagement/manager-report" element={<MM_ManagerReport />} />
          <Route path="/managermanagement/team-report" element={<MM_TeamReport />} />
          <Route path="/managermanagement/recived-data" element={<MM_RecieveData />} />
          <Route path="/managermanagement/transfer-data-to-feedback" element={<MM_TransferDataFDBK />} />
          <Route path="/managermanagement/review" element={<MM_Review />} />
          <Route path="/managermanagement/salary" element={<MM_Salary />} />
          <Route path="*" element={<h2>Page Not Found</h2>} />
        </Routes>
      </div>
    </>
  )
}

function FeedbackManager() {
  return (
    <>
      <FeedbackManagerSidebar />
      <div>
        <FeedbackManagerHeader />
        <Routes>
          <Route path="/" element={<FM_Dashboard />} />
          <Route path="/feedbackmanager/dashboard" element={<FM_Dashboard />} />
          <Route path="/feedbackmanager/salary" element={<FM_Salary />} />
          <Route path="/feedbackmanager/feedbacks" element={<FM_Feedbacks />} />
          <Route path="/feedbackmanager/complaints" element={<FM_Complaint />} />
          <Route path="/feedbackmanager/team-report" element={<FM_TeamReport />} />
          <Route path="/feedbackmanager/team-members" element={<FM_TeamMember />} />
          <Route path="*" element={<h2>Page Not Found</h2>} />
        </Routes>
      </div>
    </>
  )
}

function FeedbackEmployee() {
  return (
    <>
      <FeedbackEmployeeSidebar />
      <div>
        <FeedbackEmployeeHeader />
        <Routes>
          <Route path="/" element={<FE_Dashboard />} />
          <Route path="/feedbackemployee/dashboard" element={<FE_Dashboard />} />
          <Route path="/feedbackemployee/feedbacks" element={<FE_Feedbacks />} />
          <Route path="/feedbackemployee/complaints" element={<FE_Complaints />} />
          <Route path="/feedbackemployee/salary" element={<FE_Salary />} />
          <Route path="*" element={<h2>Page Not Found</h2>} />
        </Routes>
      </div>
    </>
  );
}

function Finance() {
  return (
    <>
      <FinanceSidebar />
      <div>
        <FinanceHeader />
        <Routes>
          <Route path="/" element={<F_Dashboard />} />
          <Route path="/finance/dashboard" element={<F_Dashboard />} />
          <Route path="/finance/employee-management" element={<F_Employeemanagement />} />
          <Route path="/finance/add-employee-payout" element={<F_AddEmployeePayout />} />
          <Route path="/finance/client-management" element={<F_ClientManagement />} />
          <Route path="/finance/invoice" element={<F_InvoiceUI />} />
          <Route path="/finance/transfer-data-to-accountant" element={<F_TransferDataToAccountant />} />
          <Route path="/finance/reports" element={<F_Reports />} />
          <Route path="/finance/payout" element={<F_Payout />} />
          <Route path="*" element={<h2>Page Not Found</h2>} />
        </Routes>
      </div>
    </>
  );
}

function Accountant() {
  return (
    <>
      <AccountantSidebar />
      <div>
        <AccountantHeader />
        <Routes>
          <Route path="/" element={<A_Dashboard />} />
          <Route path="/accountant/dashboard" element={<A_Dashboard />} />
          <Route path="/accountant/client-management" element={<A_ClientManagement />} />
          <Route path="/accountant/invoice" element={<A_Invoice />} />
          <Route path="/accountant/previous-clients" element={<A_PreviousClients />} />
          <Route path="*" element={<h2>Page Not Found</h2>} />
        </Routes>
      </div>
    </>
  );
}



export default App;
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./Components/Navbar";
import ProtectedRoute from "./Components/ProtectedRoute";
import AdminRoute from "./Components/AdminRoute";

import Home from "./Pages/Home";
import Issues from "./Pages/Issues";
import ReportIssues from "./Pages/ReportIssues";
import About from "./Pages/About";
import IssueDetails from "./Pages/IssueDetails";
import Dashboard from "./Pages/Dashboard";
import Admin from "./Pages/Admin";
import Login from "./Pages/Login";
import MyReports from "./Pages/MyReports";
import Register from "./Pages/Register";

import { IssueProvider } from "./Context/IssueContext";



function App() {
  return(
    <BrowserRouter>
      <IssueProvider>
      <Navbar />
      <Routes> 
        <Route path="/" element={<Home />} />

   <Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>
  
<Route path="/issues" element={<Issues />} />

<Route path="/issues/:issueId"element={<IssueDetails />} />

<Route
  path="/report"
  element={
    <ProtectedRoute>
      <ReportIssues />
    </ProtectedRoute>
  }
/>

<Route
  path="/my-reports"
  element={
    <ProtectedRoute>
      <MyReports />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin"
  element={
    <AdminRoute>
      <Admin />
    </AdminRoute>
  }
/>

        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />
      
        
      </Routes>
      </IssueProvider>
    </BrowserRouter>
  );
}
export default App;
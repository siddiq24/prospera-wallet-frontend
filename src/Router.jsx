import React, { Children } from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Register from "./pages/auth/Register";
import { Rules } from "./pages/Rules";
import { Home } from "./pages/landingPage/Home";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Dashboard from "./pages/dashboard/Dashboard";
import EditProfile from "./pages/profile/EditProfile";
import { LoggedNavbar, Navbar } from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import ChangePassword from "./pages/profile/ChangePassword";
import ChangePin from "./pages/profile/ChangePin";
import Login from "./pages/auth/Login";
import EnterPin from "./pages/auth/EnterPin";
import TopUp from "./pages/transaction/Topup";
import Footer from "./components/Footer";
import TransactionHistory from "./pages/dashboard/TransactionHistory";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/rules" element={<Rules />} />

        <Route path="/auth">
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="forgotpassword" element={<ForgotPassword />} />
          <Route path="pin" element={<EnterPin />} />
        </Route>

        <Route element={<HomeLayout />} >
          <Route path="/" element={<Home />} />
        </Route>

        <Route element={<DashboardLayout />}>
          <Route path='/transaction'>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="history" element={<TransactionHistory />} />
            <Route path="topup" element={<TopUp />} />
          </Route>

          <Route path="profile">
            <Route path="edit" element={<EditProfile />} />
            <Route path="change-password" element={<ChangePassword />} />
            <Route path="change-pin" element={<ChangePin />} />
          </Route>
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

function DashboardLayout() {
  return (
    <div className="relative">
      <LoggedNavbar />
      <div className="flex flex-col-reverse md:flex-row justify-between ">
        <Sidebar cName="w-min md:min-h-screen" />
        <Outlet />
        <div className="md:w-25"></div>
      </div>
    </div>
  );
}
function HomeLayout() {
  return (
    <div className="relative">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;

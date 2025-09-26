import React from "react";
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
import TopUp from "./pages/transaction/TopUp";
import Footer from "./components/Footer";
import TransactionHistory from "./pages/dashboard/TransactionHistory";
import Transfer from "./pages/transaction/Transfer";
import NotFoundPage from "./pages/error/ErrorPage";
import Header from "./components/Header";

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

        <Route element={<HomeLayout />}>
          <Route path="/" element={<Home />} />
        </Route>

        <Route element={<DashboardLayout />}>
          <Route path="/transaction">
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="history" element={<TransactionHistory />} />
            <Route path="topup" element={<TopUp />} />
            <Route path="transfer" element={<Transfer />} />
          </Route>

          <Route path="profile">
            <Route path="edit" element={<EditProfile />} />
            <Route path="change-password" element={<ChangePassword />} />
            <Route path="change-pin" element={<ChangePin />} />
          </Route>
        </Route>
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

function DashboardLayout() {
  return (
    <div className="overflow-x-hidden">
      <LoggedNavbar />
      <div className="flex flex-col-reverse md:flex-row ">
        <Sidebar cName="md:min-h-screen" />
        <div className="w-full bg-gray-50">
          <div className="md:ml-8 md:flex justify-between md:pr-20">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
function HomeLayout() {
  return (
    <div className="relative">
      <Navbar />
      <div className="mt-20">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default App;

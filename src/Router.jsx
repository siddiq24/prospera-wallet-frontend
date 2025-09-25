import React from "react"
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom"
import Register from "./pages/auth/Register";
import { Rules } from "./pages/Rules"
import Dashboard from "./pages/dashboard/Dashboard";
import EditProfile from "./pages/profile/EditProfile"
import Footer from "./components/Footer"
import { LoggedNavbar } from "./components/Navbar"
import ChangePassword from "./pages/profile/ChangePassword"
import ChangePin from "./pages/profile/ChangePin"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/rules" element={<Rules />} />
        <Route path="/register" element={<Register />} />
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />

          <Route element={<DashboardLayout />}>
            <Route path="profile">
              <Route path="edit" element={<EditProfile />} />
              <Route path="change-password" element={<ChangePassword />} />
              <Route path="change-pin" element={<ChangePin />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

function DashboardLayout() {
  return (
    <div>
      <LoggedNavbar />

      <Outlet />
    </div>
  )
}

export default App
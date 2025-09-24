import React from "react"
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom"
import Register from "./pages/auth/Register";
import { Rules } from "./pages/Rules"
import EditProfile from "./pages/profile/EditProfile"
import Dashboard from "./pages/dashboard/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/rules" element={<Rules />} />

        {/* AUTHH  */}
        <Route path="/auth">
          <Route path="register" element={<Register />} />
        </Route>

        {/* DASHBOARD */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="profile">
            <Route path="edit" element={<EditProfile />} />
          </Route>

        </Route>
      </Routes>
    </BrowserRouter>
  )
}

function DashboardLayout() {
  return (
    <div>
      <Outlet />
    </div>
  )
}

export default App
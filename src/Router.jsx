import React from "react"
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom"
import Register from "./pages/auth/Register";
import { Rules } from "./pages/Rules"
import Dashboard  from "./pages/Dashboard.jsx";
import EditProfile from "./pages/profile/EditProfile"
import Footer from "./components/Footer"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/rules" element={<Rules />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="/" element={<Dashboard />} />
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
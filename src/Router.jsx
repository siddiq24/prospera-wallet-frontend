import React from "react"
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom"
import { Rules } from "./pages/Rules"
import EditProfile from "./pages/profile/EditProfile"
import Footer from "./components/Footer"
import { LoggedNavbar } from "./components/Navbar"
import Sidebar from "./components/Sidebar"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/rules" element={<Rules />} />

        <Route path="/dashboard" element={<DashboardLayout />}>
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
      <LoggedNavbar />
      <div className="flex flex-col-reverse md:flex-row">
      <Sidebar cName="w-min" />
      <Outlet />
      </div>
    </div>
  )
}

export default App

import React from "react"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Rules } from "./pages/Rules"
import Dashboard  from "./pages/Dashboard.jsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/rules" element={<Rules />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </BrowserRouter>
    )
}
export default App
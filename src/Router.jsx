import React from "react"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Rules } from "./pages/Rules"
import EditProfile from "./pages/profile/EditProfile"

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/rules" element={<Rules />} />
                <Route path="/edit" element={<EditProfile />} />
            </Routes>
        </BrowserRouter>
    )
}
export default App
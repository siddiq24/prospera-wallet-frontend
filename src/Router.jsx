import React from "react"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Rules } from "./pages/Rules"
import EditProfile from "./pages/profile/EditProfile"
import Footer from "./components/Footer"

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/rules" element={<Rules />} />
                <Route path="/edit" element={<EditProfile />} />
                <Route path="/" element={<Footer />} />
            </Routes>
        </BrowserRouter>
    )
}
export default App
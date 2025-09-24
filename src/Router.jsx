import React from "react"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Rules } from "./pages/Rules"

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/rules" element={<Rules />} />
            </Routes>
        </BrowserRouter>
    )
}
export default App
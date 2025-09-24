import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Rules } from "./pages/Rules";
import Register from "./pages/auth/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/rules" element={<Rules />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;

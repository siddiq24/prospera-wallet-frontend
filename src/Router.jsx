import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Rules } from "./pages/Rules";
import { Home } from "./pages/landingPage/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/rules" element={<Rules />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;

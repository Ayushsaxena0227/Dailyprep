import { useState } from "react";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Landing from "./Main/Landing";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
    </Routes>
  );
}

export default App;

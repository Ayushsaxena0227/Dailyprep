import { Toaster } from "sonner";
import { Routes, Route } from "react-router-dom";
import Landing from "./Main/Landing";
import Admin from "./Main/Admin";
import React from "react";
import AllQuestions from "./Main/Landing/Allquestions";

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/all-questions" element={<AllQuestions />} />
      </Routes>
    </>
  );
}

export default App;

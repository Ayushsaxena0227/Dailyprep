import { Toaster } from "sonner";
import { Routes, Route } from "react-router-dom";
import Landing from "./Main/Landing";
import React from "react";
import AllQuestions from "./Main/Landing/Allquestions";
import AdminDashboard from "./Main/Admin";
import AdminLogin from "./Main/Admin/AdminLogin";
import { useState } from "react";
function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(
    !!localStorage.getItem("adminSecret")
  );
  return loggedIn ? (
    <AdminDashboard />
  ) : (
    <AdminLogin onLogin={() => setLoggedIn(true)} />
  );
}

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/all-questions" element={<AllQuestions />} />
      </Routes>
    </>
  );
}

export default App;

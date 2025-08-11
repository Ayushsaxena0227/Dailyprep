import { Toaster } from "sonner";
import { Routes, Route } from "react-router-dom";
import Landing from "./Main/Landing";
import React from "react";
import { useState } from "react";
import { lazy, Suspense } from "react";
const AdminDashboard = lazy(() => import("./Main/Admin"));
const AdminLogin = lazy(() => import("./Main/Admin/AdminLogin"));
const AllQuestions = lazy(() => import("./Main/Landing/Allquestions"));
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
        <Route
          path="/admin"
          element={
            <Suspense
              fallback={
                <div className="text-center text-white mt-10">
                  Loading admin...
                </div>
              }
            >
              <AdminPage />
            </Suspense>
          }
        />

        <Route
          path="/all-questions"
          element={
            <Suspense
              fallback={
                <div className="text-center text-white mt-10">
                  Loading questions...
                </div>
              }
            >
              <AllQuestions />
            </Suspense>
          }
        />
      </Routes>
    </>
  );
}

export default App;

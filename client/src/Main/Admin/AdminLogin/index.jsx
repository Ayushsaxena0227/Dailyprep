import React, { useState } from "react";

const AdminLogin = ({ onLogin }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  console.log("VITE_ADMIN_SECRET:", import.meta.env.VITE_ADMIN_SECRET);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === import.meta.env.VITE_ADMIN_SECRET) {
      localStorage.setItem("adminSecret", password);

      onLogin();
    } else {
      setError("Incorrect password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded shadow-lg w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-4 text-white">Admin Login</h2>
        <input
          type="password"
          placeholder="Admin Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 px-4 py-2 rounded bg-gray-700 border border-gray-600 text-white"
        />
        {error && <div className="text-red-400 mb-2">{error}</div>}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;

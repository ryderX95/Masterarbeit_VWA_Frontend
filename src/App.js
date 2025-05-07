// App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import ResetRequest from "./ResetRequest";

function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [token, setToken] = useState("");

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleRegister = async () => {
    if (!validateEmail(username)) {
      setIsError(true);
      setMessage("Please enter a valid email address.");
      return;
    }

    const response = await fetch("http://localhost:5000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    setIsError(!!data.error);
    setMessage(data.message || data.error);
  };

  const handleLogin = async () => {
    const response = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    setIsError(!!data.error);
    setMessage(data.message || data.error);
    if (!data.error && data.token) setToken(data.token);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300">
      <div className="bg-white shadow-2xl rounded-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Vulnerable Web App</h1>

        <input
          type="text"
          placeholder="Email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full mb-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {isError && message.toLowerCase().includes("email") && (
          <p className="text-sm text-red-600 mb-3 flex items-center gap-1">
            <span>❌</span>{message}
          </p>
        )}

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <div className="flex justify-between flex-wrap gap-2 mb-4">
          <button
            onClick={handleRegister}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Register
          </button>
          <button
            onClick={handleLogin}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
          >
            Login
          </button>
          <Link
            to="/reset"
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition text-center"
          >
            Forgot Password
          </Link>
        </div>

        {message && !message.toLowerCase().includes("email") && (
          <div
            className={`text-sm p-3 rounded transition ${
              isError
                ? "bg-red-100 text-red-700 border border-red-300"
                : "bg-green-100 text-green-800 border border-green-300"
            }`}
          >
            {message}
          </div>
        )}

        {token && (
          <div className="mt-4 text-sm bg-indigo-100 text-indigo-800 border border-indigo-300 p-3 rounded">
            Session Token: {token}
          </div>
        )}
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reset" element={<ResetRequest />} />
      </Routes>
    </Router>
  );
}

export default App;


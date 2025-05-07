// ResetRequest.js
import React, { useState } from "react";

function ResetRequest() {
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isError, setIsError] = useState(false);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleResetRequest = async () => {
    if (!validateEmail(email)) {
      setIsError(true);
      setFeedback("❌ Please enter a valid email address.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: email }),
      });

      const data = await response.json();
      setIsError(!!data.error);
      setFeedback(data.message || data.error);
    } catch (err) {
      setIsError(true);
      setFeedback("❌ An unexpected error occurred.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
          Forgot Password
        </h2>

        <input
          type="email"
          placeholder="Enter your email"
          className="w-full mb-3 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          onClick={handleResetRequest}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          Send Reset Code
        </button>

        {feedback && (
          <div
            className={`mt-4 text-sm p-3 rounded ${
              isError
                ? "bg-red-100 text-red-700 border border-red-300"
                : "bg-green-100 text-green-800 border border-green-300"
            }`}
          >
            {feedback}
          </div>
        )}
      </div>
    </div>
  );
}

export default ResetRequest;

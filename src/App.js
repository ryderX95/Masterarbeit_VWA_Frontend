import React, { useState } from "react";

function App() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [token, setToken] = useState(""); // ✅ Store session token

    const handleRegister = async () => {
        const response = await fetch("http://localhost:5000/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });
        const data = await response.json();
        setMessage(data.message);
    };

    const handleLogin = async () => {
        const response = await fetch("http://localhost:5000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });
        const data = await response.json();
        if (data.error) {
            setMessage(data.error);
        } else {
            setToken(data.token); // ✅ Store session token for further use
            setMessage(`Welcome, ${data.users.map(user => user.username).join(", ")}`);
        }
    };

    const handleForgotPassword = async () => {
        const response = await fetch("http://localhost:5000/forgot-password", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username }),
        });
        const data = await response.json();
        setMessage(data.message || data.error);
    };

    return (
        <div>
            <h1>Vulnerable Web App</h1>
            <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleRegister}>Register</button>
            <button onClick={handleLogin}>Login</button>
            <button onClick={handleForgotPassword}>Forgot Password</button> {/* ✅ Username enumeration */}
            <p>{message}</p>
            {token && <p>Session Token: {token}</p>}
        </div>
    );
}

export default App;

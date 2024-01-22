import "./App.css";
import { useState } from "react";

function App() {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/v1/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(credentials),
      });

      const json = await response.json();
      if (json.success) {
        window.location.href = "/users";
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          flexDirection: "column",
          backgroundColor: "#f5f5f5",
          gap: "20px",
        }}
      >
        <h1 style={{ textAlign: "center", fontSize: "50px" }}>Register Here</h1>
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            required
            autoFocus
            style={{ marginBottom: "10px", padding: "10px", width: "300px" }}
            onChange={handleChange}
            value={credentials.name}
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            required
            style={{ marginBottom: "10px", padding: "10px" }}
            onChange={handleChange}
            value={credentials.email}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            required
            style={{ marginBottom: "10px", padding: "10px" }}
            onChange={handleChange}
            value={credentials.password}
          />
          <button
            type="submit"
            style={{
              padding: "7px",
              fontSize: "18px",
              fontWeight: "bold",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default App;

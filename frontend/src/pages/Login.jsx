import React, { useState } from "react";
import { Link, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { login, test } from "../services/api";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(username, password);
    if (result.success) {
      navigate("/");
    } else {
      alert(result.message);
      setError(result.message);
    }
  };

  const testApi = async () => {
    const result = await test();
    console.log(result);
  };

  return (
    <>
      <h1> Login to your account here</h1>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Username"
          variant="outlined"
          margin="normal"
          fullWidth
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Password"
          variant="outlined"
          margin="normal"
          fullWidth
          required
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary">
          Login
        </Button>
      </form>
      <p>
        Not registered? <Link href="/register">Sign up here</Link>
      </p>
      <Button onClick={testApi}>Test API</Button>
    </>
  );
}

export default Login;

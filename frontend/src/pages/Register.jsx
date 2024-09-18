import React, { useState } from "react";
import { Link, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { register, test } from "../services/api";

function Register() {
  return (
    <>
      <h1> Register your account here</h1>
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
          Register
        </Button>
      </form>
    </>
  );
}

export default Register;

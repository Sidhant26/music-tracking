import React from "react";
import { isAuthenticated } from "../services/api";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";

function Home() {
  const username = localStorage.getItem("username");

  return (
    <div>
      {isAuthenticated() ? (
        <Box>
          <p>Welcome to Music Logger, {username}! </p>
          <p>
            This app allows you to search for artists and albums, view
            information about them, and log your ratings and notes. To get
            started, search for an artist or album from the links above
          </p>
        </Box>
      ) : (
        <>
          <p>
            To get started, please <Link to="/login">login</Link> or{" "}
            <Link to="/register">register</Link>. for an account
          </p>
        </>
      )}
    </div>
  );
}

export default Home;

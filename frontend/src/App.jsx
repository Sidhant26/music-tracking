import { useState } from "react";
import {
  BrowserRouter as Router,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import "./App.css";
import "./components/ArtistSearch";
import ArtistSearch from "./components/ArtistSearch";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AlbumSearch from "./components/AlbumSearch";
import AlbumPage from "./pages/AlbumPage";
import ArtistPage from "./pages/ArtistPage";
import Login from "./pages/Login";
import Register from "./pages/Register";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#03101D",
      paper: "#1e1e1e",
    },
    typography: {
      fontFamily: ["Roboto", "Helvetica", "Arial", "sans-serif"].join(","),
    },
  },
});

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/artist-search",
      element: <ArtistSearch />,
    },
    {
      path: "/album-search",
      element: <AlbumSearch />,
    },
    {
      path: "/album/:mbid",
      element: <AlbumPage />,
    },
    {
      path: "artist/:mbid",
      element: <ArtistPage />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ]);

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Navbar />
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  );
}

export default App;

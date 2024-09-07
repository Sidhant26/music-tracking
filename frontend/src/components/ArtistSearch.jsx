import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  TextField,
  Box,
  CircularProgress,
  Grid,
  Typography,
  Paper,
  Link,
} from "@mui/material";
import "./ArtistSearch.css";

const ArtistSearch = () => {
  const [artistName, setArtistName] = useState("");
  const [artistInfo, setArtistInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    setArtistName(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:5000/api/artist/search/${artistName}`
      );
      setArtistInfo(response.data);
    } catch (err) {
      alert("An error occurred while fetching artist info");
      setArtistInfo(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{ margin: "0 auto", overflow: "hidden" }}
      className="artist-search-container"
    >
      <h1>Search for an Artist</h1>
      <Box
        component="form"
        onSubmit={handleFormSubmit}
        sx={{ display: "flex", gap: 2 }}
        className="search-form"
      >
        <TextField
          id="outlined-helperText"
          label="Search Artist"
          onChange={handleInputChange}
          sx={{ maxWidth: "300px" }}
        />
        <Button
          variant="contained"
          type="submit"
          sx={{ height: "56px", maxWidth: "100px" }}
          disabled={isLoading}
        >
          {isLoading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Search"
          )}
        </Button>
      </Box>
      {isLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      ) : (
        artistInfo && (
          <Box>
            <h2>Artist Info</h2>
            {/* {artistInfo.results.artistmatches.artist.map((artist, index) => (
              <Box key={index}>
                <ul>
                  <li>
                    {artist.name}: <a href={artist.url}>{artist.url}</a>
                    <br />
                    {artist.mbid}
                  </li>
                </ul>
              </Box>
            ))} */}
            <Grid container spacing={2}>
              {artistInfo.results.artistmatches.artist.map((artist, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Paper sx={{ p: 2, height: "100%" }}>
                    <Typography variant="h6">{artist.name}</Typography>
                    <Link href={artist.url} sx={{ wordBreak: "break-all" }}>
                      {artist.url}
                    </Link>
                    <Typography variant="body2">{artist.mbid}</Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
            {/* <pre>{JSON.stringify(artistInfo, null, 2)}</pre> */}
          </Box>
        )
      )}
    </Box>
  );
};

export default ArtistSearch;

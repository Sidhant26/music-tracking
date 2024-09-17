import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  TextField,
  Box,
  CircularProgress,
  Grid2,
  Typography,
  Paper,
  Link,
} from "@mui/material";
import { styled } from "@mui/system";
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

  const ArtistLink = styled(Link)({
    marginTop: "200px",
    color: "#4fc3f7",
    textDecoration: "none",

    fontSize: "0.8rem",
    maxWidth: "100%",
  });

  return (
    <Box
      sx={{ margin: "0 auto", overflow: "hidden" }}
      className="artist-search-container"
    >
      <br></br>
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
            <Grid2
              container
              spacing={1.5}
              sx={{
                p: 3,
                m: 1.5,
                height: "100%",
                backgroundColor: "#191C28",
                borderRadius: "10px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              }}
            >
              {artistInfo.results.artistmatches.artist.map((artist, index) => (
                <Grid2
                  size={2}
                  item
                  xs={12}
                  minHeight={300}
                  sm={6}
                  md={4}
                  key={index}
                >
                  {artist.mbid ? (
                    <Link
                      href={`/artist/${artist.mbid}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Paper
                        sx={{
                          p: 2,
                          height: "100%",
                          borderRadius: "10px",
                          boxShadow: "0 4px 8px rgba(0, 0, 10)",
                        }}
                      >
                        <Typography
                          variant="h6"
                          sx={{ fontWeight: "bold", color: "#ffffff", mb: 2 }}
                        >
                          {artist.name}
                        </Typography>
                        <ArtistLink href={artist.url}>
                          View on last.fm
                        </ArtistLink>
                      </Paper>
                    </Link>
                  ) : (
                    <Paper
                      sx={{
                        p: 2,
                        height: "100%",
                        borderRadius: "10px",
                        boxShadow: "0 4px 8px rgba(0, 0, 10)",
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: "bold", color: "#ffffff", mb: 2 }}
                      >
                        {artist.name}
                      </Typography>
                      <ArtistLink href={artist.url}>View on last.fm</ArtistLink>
                      {/* <Typography variant="body2">{artist.mbid}</Typography> */}
                    </Paper>
                  )}
                </Grid2>
              ))}
            </Grid2>
            {/* <pre>{JSON.stringify(artistInfo, null, 2)}</pre> */}
          </Box>
        )
      )}
    </Box>
  );
};

export default ArtistSearch;

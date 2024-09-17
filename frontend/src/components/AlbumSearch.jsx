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
import "./AlbumSearch.css";

const AlbumSearch = () => {
  const [albumName, setAlbumName] = useState("");
  const [albumInfo, setAlbumInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    setAlbumName(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:5000/api/album/search/${albumName}`
      );
      setAlbumInfo(response.data);
    } catch (err) {
      alert("An error occurred while fetching album info");
      setAlbumInfo(null);
    } finally {
      setIsLoading(false);
    }
  };

  const AlbumPaper = styled(Box)(({ theme }) => ({
    position: "relative",
    height: "100%",
    borderRadius: "10px",
    backgroundSize: "cover",
    backgroundPosition: "center",
    "&::after": {
      content: '""',
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      height: "20%",
      background: "linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.9))",
      // backdropFilter: "blur(5px)",
      zIndex: 1,
    },
  }));

  const AlbumTitle = styled(Typography)({
    position: "absolute",
    bottom: 4,
    left: 4,
    right: 4,
    color: "#fff",
    zIndex: 2,
    textShadow: "1px 1px 2px rgba(0,0,0,0.6)",
    fontWeight: "bold",
    maxWidth: "100%",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  });

  const AlbumLink = styled(Link)({
    marginTop: "200px",
    color: "#4fc3f7",
    textDecoration: "none",

    fontSize: "0.8rem",
    maxWidth: "100%",
  });

  return (
    <Box sx={{ margin: "0 auto" }} className="album-search-container">
      <br></br>
      <h1>Search for an Album</h1>
      <Box
        component="form"
        onSubmit={handleFormSubmit}
        sx={{ display: "flex", gap: 2 }}
        className="search-form"
      >
        <TextField
          id="outlined-helperText"
          label="Search Album"
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
        albumInfo && (
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
              {albumInfo.results.albummatches.album.map((album, index) => (
                <Grid2
                  size={2}
                  item
                  xs={12}
                  minHeight={300}
                  sm={6}
                  md={4}
                  key={index}
                >
                  {album.mbid ? (
                    <Link
                      href={`/album/${album.mbid}`}
                      style={{ textDecoration: "none" }}
                    >
                      <AlbumPaper
                        sx={{
                          backgroundImage: `url(${album.image[3]["#text"]})`,
                        }}
                      >
                        <AlbumLink href={album.url}>View on last.fm</AlbumLink>
                        <AlbumTitle variant="subtitle1" noWrap>
                          {album.artist} - {album.name}
                        </AlbumTitle>
                        {/* <Typography variant="body2">{album.mbid}</Typography> */}
                      </AlbumPaper>
                    </Link>
                  ) : (
                    <AlbumPaper
                      sx={{
                        backgroundImage: `url(${album.image[3]["#text"]})`,
                      }}
                    >
                      <AlbumLink href={album.url}>View on last.fm</AlbumLink>
                      <AlbumTitle variant="subtitle1" noWrap>
                        {album.artist} - {album.name}
                      </AlbumTitle>
                      {/* <Typography variant="body2">{album.mbid}</Typography> */}
                    </AlbumPaper>
                  )}
                </Grid2>
              ))}
            </Grid2>
            {/* <pre>{JSON.stringify(albumInfo, null, 2)}</pre> */}
          </Box>
        )
      )}
    </Box>
  );
};

export default AlbumSearch;

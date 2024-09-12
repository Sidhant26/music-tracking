import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { styled } from "@mui/material/styles";
import {
  CircularProgress,
  Box,
  Grid2,
  Paper,
  Chip,
  Stack,
} from "@mui/material";
import axios from "axios";
import "./AlbumPage.css";

function AlbumPage() {
  const [album, setAlbum] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { mbid } = useParams();

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    ...theme.applyStyles("dark", {
      backgroundColor: "#1A2027",
    }),
  }));

  useEffect(() => {
    console.log("mbid has changed:", mbid);
    const fetchAlbumDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:5000/api/album/${mbid}`
        );
        setAlbum(response.data.album);
        setLoading(false);
        console.log(response.data.album);
      } catch (err) {
        setError("Failed to fetch album details");
        setLoading(false);
      }
    };

    fetchAlbumDetails();
  }, [mbid]);

  if (loading)
    return (
      <div>
        <br></br> <CircularProgress />
      </div>
    );
  if (error) return <div>{error}</div>;
  if (!album) return <div>No album found</div>;

  return (
    <div>
      <br></br>
      <Grid2 container spacing={2}>
        <Grid2 size={4}>
          <Item>
            <Box
              sx={{
                backgroundImage: `url(${album.image[5]["#text"]})`,
                minHeight: "400px",
                height: "auto",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></Box>
          </Item>
        </Grid2>
        <Grid2 size={4}>
          <h1>{album.name}</h1>
          <hr></hr>
          <h3>
            {" "}
            <span
              style={{
                fontWeight: "lighter",
                marginRight: "4rem",
                color: "#9ca3af",
              }}
            >
              Artist
            </span>{" "}
            {album.artist}
          </h3>
          <h3>
            {" "}
            <span
              style={{
                fontWeight: "lighter",
                marginRight: "5rem",
                color: "#9ca3af",
              }}
            >
              Tags
            </span>
            {album.tags.tag.map((tag, index) => (
              <Chip
                key={index}
                label={tag.name}
                color="primary"
                variant="outlined"
                style={{
                  marginRight: "0.5rem",
                  marginTop: "0.5rem",
                  width: "auto",
                }}
              />
            ))}
          </h3>
        </Grid2>
        {/* <Grid2 size={4}>
          <Item>size=4</Item>
        </Grid2> */}
        <Grid2 size={8}>
          <Item>size=8</Item>
        </Grid2>
      </Grid2>
    </div>
  );
}

export default AlbumPage;

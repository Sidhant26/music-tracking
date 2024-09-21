import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { styled } from "@mui/material/styles";
import {
  CircularProgress,
  Box,
  Grid2,
  Paper,
  Chip,
  TextField,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@mui/material";
import axios from "axios";
import "./AlbumPage.css";

function AlbumPage() {
  const [album, setAlbum] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rating, setRating] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [notes, setNotes] = useState("");
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

  function getTime(duration) {
    const minutes = Math.floor(duration / 60);
    const seconds = duration - minutes * 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }

  useEffect(() => {
    const fetchAlbumDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:5000/api/album/${mbid}`
        );
        setAlbum(response.data.album);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch album details");
        setLoading(false);
      }
    };

    fetchAlbumDetails();
  }, [mbid]);

  useEffect(() => {
    const fetchAlbumAndRating = async () => {
      try {
        setLoading(true);
        const [albumResponse, ratingResponse] = await Promise.all([
          // run asyncs concurrently
          axios.get(`http://localhost:5000/api/album/${mbid}`),
          axios.get(
            `http://localhost:5000/api/rating/${mbid}?username=${localStorage.getItem(
              "username"
            )}`
          ),
        ]);

        setAlbum(albumResponse.data.album);

        if (ratingResponse.data) {
          setRating(ratingResponse.data.rating);
          setNotes(ratingResponse.data.notes || "");
        }

        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };

    fetchAlbumAndRating();
  }, [mbid]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const tagNames = album.tags.tag.map((tag) => tag.name);
      await axios.post(`http://localhost:5000/api/rating/`, {
        username: localStorage.getItem("username"),
        albumMbid: mbid,
        albumName: album.name,
        artistName: album.artist,
        rating: rating,
        notes: notes,
        tags: tagNames,
      });
      alert("Submitted successfully");
    } catch (err) {
      alert("Error submitting rating and notes");
      setError("Failed to submit rating and notes");
    }
    setSubmitting(false);
  };

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
          <br></br>
          <List dense={false}>
            {album.tracks.track.map((track, index) => (
              <ListItem
                key={index}
                sx={{
                  backgroundColor: index % 2 === 0 ? "#13264C" : "#112144",
                  height: "32px",
                }}
              >
                <ListItemText primary={`${index + 1}.  ${track.name}`} />
                <ListItemText
                  sx={{ textAlign: "right" }}
                  primary={track.duration && getTime(track.duration)}
                />
              </ListItem>
            ))}
          </List>
        </Grid2>
        <Grid2 size={4} sx={{ maxHeight: 600 }}>
          <h1>{album.name}</h1>
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

          <form onSubmit={handleSubmit}>
            <div style={{ display: "flex" }}>
              <h3>
                {" "}
                <span
                  style={{
                    fontWeight: "lighter",
                    color: "#9ca3af",
                  }}
                >
                  Rating
                </span>{" "}
              </h3>
              <input
                type="number"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="rating-input"
                min="0"
                max="10"
                step="0.1"
                required
              />
              <h1>/10</h1>
            </div>
            <h3>
              {" "}
              <span
                style={{
                  fontWeight: "lighter",
                  marginRight: "2rem",
                  color: "#9ca3af",
                }}
              >
                About
              </span>{" "}
              {album.wiki && (
                <>
                  {(() => {
                    const summary = album.wiki.content;
                    const truncated = summary.length >= 417 ? true : false;
                    const displayText = truncated
                      ? summary.substring(0, 417)
                      : summary;

                    return (
                      <>
                        {displayText}
                        {truncated && <a href={album.url}> Learn more</a>}
                      </>
                    );
                  })()}
                </>
              )}
            </h3>
            <br></br>
            <div style={{ display: "inline-block" }}>
              <TextField
                multiline
                label="Write your thoughts about the album here"
                id="fullWidth"
                sx={{ width: "800px" }}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
              <br></br>
              <br></br>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={submitting}
              >
                {submitting ? "Submitting..." : "Submit Rating and Notes"}
              </Button>
            </div>
          </form>
        </Grid2>
        <Grid2 size={8}></Grid2>
      </Grid2>
    </div>
  );
}

export default AlbumPage;

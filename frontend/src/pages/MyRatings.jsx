import React, { useEffect, useState } from "react";
import { CircularProgress, Chip } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { Link } from "react-router-dom";

function MyRatings() {
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [topTags, setTopTags] = useState([]);
  const username = localStorage.getItem("username");

  useEffect(() => {
    const getRatings = async () => {
      try {
        setLoading(true);
        const [ratingsResponse, tagsResponse] = await Promise.all([
          axios.get(`http://localhost:5000/api/rating/user/${username}`),
          axios.get(`http://localhost:5000/api/rating/tags/${username}`),
        ]);
        const ratingsWithId = ratingsResponse.data.ratings.map(
          (rating, index) => ({
            id: rating._id,
            ...rating,
          })
        );
        setTopTags(tagsResponse.data);
        setRatings(ratingsWithId);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching ratings:", err);
        setLoading(false);
      }
    };
    getRatings();
  }, [username]);

  function handleCellClick(mbid) {
    window.location.href = `/album/${mbid}`;
  }

  const columns = [
    {
      field: "albumName",
      headerName: "Album Name",
      width: 250,
    },
    {
      field: "artistName",
      headerName: "Artist Name",
      width: 200,
    },
    {
      field: "rating",
      headerName: "Rating",
      width: 100,
    },
    {
      field: "notes",
      headerName: "Your review",
      width: 330,
    },
    {
      field: "tags",
      headerName: "Tags",
      width: 300,
    },
  ];

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div>
      {ratings.length > 0 ? (
        <div>
          <h1>{username}'s ratings</h1>
          <h2>Your favorite tags are:</h2>
          {topTags.map((tag, idx) => (
            <Chip
              key={idx}
              label={tag._id}
              color="primary"
              sx={{ margin: 0.5 }}
            />
          ))}
          <br></br>
          <br></br>
          <DataGrid
            rows={ratings}
            columns={columns}
            pageSize={10}
            onCellClick={(cell) => handleCellClick(cell.row.albumMbid)}
            sx={{ cursor: "pointer" }}
          />
        </div>
      ) : (
        <p>No ratings found</p>
      )}
    </div>
  );
}

export default MyRatings;

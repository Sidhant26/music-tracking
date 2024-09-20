import React, { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import axios from "axios";

function MyRatings() {
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);
  const username = localStorage.getItem("username");

  useEffect(() => {
    const getRatings = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:5000/api/rating/user/${username}`
        );
        setRatings(response.data.ratings);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching ratings:", err);
        setLoading(false);
      }
    };
    getRatings();
  }, [username]);
  console.log(ratings);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div>
      {ratings.length > 0 ? (
        <div>
          <h1>{username}'s ratings</h1>
          <ul>
            {ratings.map((rating) => (
              <li key={rating._id}>
                <p>Album: {rating.albumName}</p>
                <p>Artist: {rating.artistName}</p>
                <p>Rating: {rating.rating}</p>
                <p>Notes: {rating.notes}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No ratings found</p>
      )}
    </div>
  );
}

export default MyRatings;

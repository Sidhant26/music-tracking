import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CircularProgress, Box, Grid2, Paper, Chip, Link } from "@mui/material";
import axios from "axios";
import "./ArtistPage.css";

function ArtistPage() {
  const { mbid } = useParams();
  const [artist, setArtist] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [topAlbums, setTopAlbums] = useState([]);
  const [bestAlbums, setBestAlbums] = useState([]);

  // useEffect(() => {
  //   const fetchArtistDetails = async () => {
  //     try {
  //       setLoading(true);
  //       const response = await axios.get(
  //         `http://localhost:5000/api/artist/${mbid}`
  //       );
  //       if (response.data && response.data.artist) {
  //         setArtist(response.data.artist);
  //       } else {
  //         setError("Artist data not found in the response");
  //       }

  //       setLoading(false);
  //     } catch (err) {
  //       setError("Failed to fetch artist details");
  //       setLoading(false);
  //     }
  //   };

  //   fetchArtistDetails();
  // }, [mbid]);

  useEffect(() => {
    const fetchTopAlbums = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:5000/api/artist/top-albums/${mbid}`
        );
        setTopAlbums(response.data.topalbums);
        setBestAlbums(response.data.topalbums.album.slice(0, 12));
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch top albums");
        setLoading(false);
      }
    };
    fetchTopAlbums();
  }, [mbid]);

  // console.log(bestAlbums);

  if (loading)
    return (
      <div>
        <br></br> <CircularProgress />
      </div>
    );
  if (error) return <div>{error}</div>;

  return (
    <>
      <h1>{topAlbums["@attr"].artist}</h1>
      <hr></hr>
      <h2> Check out their best albums: </h2>
      <div className="best-albums">
        {bestAlbums.map((album) => (
          <div key={album.mbid} className="album">
            {album.mbid ? (
              <Link href={`/album/${album.mbid}`}>
                <img src={album.image[2]["#text"]} alt={album.name} />
              </Link>
            ) : (
              <img src={album.image[2]["#text"]} alt={album.name} />
            )}
            <p> {album.name} </p>
          </div>
        ))}
      </div>
    </>
  );
}

export default ArtistPage;

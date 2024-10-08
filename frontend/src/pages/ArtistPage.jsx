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
  const [similar, setSimilar] = useState([]);

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

  useEffect(() => {
    const getSimilar = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:5000/api/artist/similar/${mbid}`
        );
        setSimilar(response.data.similarartists.artist.slice(0, 12));
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch similar artists", err);
        setLoading(false);
      }
    };
    getSimilar();
  }, []);

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
          <div key={album.url} className="album">
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
      <br></br>
      <br></br>
      <h2> If you like them you'll also like: </h2>
      <div className="best-albums">
        {similar.map((artist) => (
          <div key={artist.url} className="album">
            {artist.mbid ? (
              <Link href={`/artist/${artist.mbid}`}>
                <img src={artist.image[2]["#text"]} alt={artist.name} />
              </Link>
            ) : (
              <img src={artist.image[2]["#text"]} alt={artist.name} />
            )}
            <p> {artist.name} </p>
          </div>
        ))}
      </div>
    </>
  );
}

export default ArtistPage;

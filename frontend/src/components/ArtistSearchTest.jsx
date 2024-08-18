import React, { useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";

const ArtistSearchTest = () => {
  const [artistName, setArtistName] = useState("");
  const [artistInfo, setArtistInfo] = useState(null);

  const handleInputChange = (e) => {
    setArtistName(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `http://localhost:5000/api/artist/search/${artistName}`
      );
      setArtistInfo(response.data);
    } catch (err) {
      alert("An error occurred while fetching artist info");
      setArtistInfo(null);
    }
  };

  return (
    <div>
      <h1>Search for an Artist</h1>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          value={artistName}
          onChange={handleInputChange}
          placeholder="Enter artist name"
        />
        <Button variant="contained" type="submit">
          Search
        </Button>
        {/* <button type="submit">Search</button> */}
      </form>
      {artistInfo && (
        <div>
          <h2>Artist Info</h2>
          {artistInfo.results.artistmatches.artist.map((artist, index) => (
            <div key={index}>
              <ul>
                <li>
                  {" "}
                  {artist.name}: <a href={artist.url}>{artist.url}</a>{" "}
                  {/* <img src={artist.image[0]["#text"]} alt="artist" /> */}
                  <br></br>
                  {artist.mbid}
                </li>
              </ul>
            </div>
          ))}
          <pre>{JSON.stringify(artistInfo, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default ArtistSearchTest;

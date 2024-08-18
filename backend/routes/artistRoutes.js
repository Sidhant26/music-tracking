const express = require("express");
const axios = require("axios");
const router = express.Router();

require("dotenv").config();

const LASTFM_API_KEY = process.env.LASTFM_API_KEY;
const LASTFM_API_URL = "http://ws.audioscrobbler.com/2.0/";

router.get("/search/:artistName", async (req, res) => {
  try {
    let artistName = req.params.artistName;

    artistName = artistName.replace(/\+/g, " ");

    const response = await axios.get(LASTFM_API_URL, {
      params: {
        method: "artist.search",
        artist: artistName,
        api_key: LASTFM_API_KEY,
        format: "json",
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error("Error searching for artist:", error.message);
    res
      .status(500)
      .json({ error: "An error occurred while searching for artist" });
  }
});

router.get("/:artistName", async (req, res) => {
  try {
    let artistName = req.params.artistName;

    artistName = artistName.replace(/\+/g, " ");

    if (!artistName) {
      return res.status(400).json({ error: "Artist name is required" });
    }

    const response = await axios.get(LASTFM_API_URL, {
      params: {
        method: "artist.getinfo",
        api_key: LASTFM_API_KEY,
        artist: artistName,
        format: "json",
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error("Error getting artist info:", error.message);
    res
      .status(500)
      .json({ error: "An error occurred while getting artist info" });
  }
});

router.get("/top-albums/:mbid", async (req, res) => {
  try {
    let mbid = req.params.mbid;

    if (!mbid) {
      return res.status(400).json({ error: "Artist MBID is required" });
    }

    const response = await axios.get(LASTFM_API_URL, {
      params: {
        method: "artist.getTopAlbums",
        api_key: LASTFM_API_KEY,
        mbid: mbid,
        format: "json",
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error("Error getting top albums:", error.message);
    res
      .status(500)
      .json({ error: "An error occurred while getting top albums" });
  }
});

module.exports = router;

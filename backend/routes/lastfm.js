const express = require("express");
const axios = require("axios");
const router = express.Router();

require("dotenv").config();

const LASTFM_API_KEY = process.env.LASTFM_API_KEY;
const LASTFM_API_URL = "http://ws.audioscrobbler.com/2.0/";

router.get("/search/album/:albumName", async (req, res) => {
  try {
    let albumName = req.params.albumName;

    albumName = albumName.replace(/\+/g, " ");

    const response = await axios.get(LASTFM_API_URL, {
      params: {
        method: "album.search",
        album: albumName,
        api_key: LASTFM_API_KEY,
        format: "json",
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error("Error searching for album:", error.message);
    res
      .status(500)
      .json({ error: "An error occurred while searching for albums" });
  }
});

router.get("/album/:artistName/:albumName", async (req, res) => {
  try {
    let { artistName, albumName } = req.params;

    artistName = artistName.replace(/\+/g, " ");
    albumName = albumName.replace(/\+/g, " ");

    if (!artistName || !albumName) {
      return res
        .status(400)
        .json({ error: "Both artist and album are required" });
    }

    const response = await axios.get(LASTFM_API_URL, {
      params: {
        method: "album.getinfo",
        api_key: LASTFM_API_KEY,
        artist: artistName,
        album: albumName,
        format: "json",
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error("Error getting album info:", error.message);
    res
      .status(500)
      .json({ error: "An error occurred while fetching album information" });
  }
});

module.exports = router;

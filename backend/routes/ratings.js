const express = require("express");
const mongoose = require("mongoose");
const Rating = require("../models/Rating");

const router = express.Router();

router.get("/test", (req, res) => {
  res.send("It works");
});

router.post("/", async (req, res) => {
  try {
    const { username, albumMbid, albumName, artistName, rating, notes } =
      req.body;

    //Rating already exists
    let existingRating = await Rating.findOne({ username, albumMbid });

    if (existingRating) {
      existingRating.rating = rating;
      existingRating.notes = notes;
      await existingRating.save();
    } else {
      existingRating = new Rating({
        username,
        albumMbid,
        albumName,
        artistName,
        rating,
        notes,
      });
      await existingRating.save();
    }

    res.status(200).json({
      message: "Rating submitted successfully",
      rating: existingRating,
    });
  } catch (error) {
    console.error("Error submitting rating:", error);
    res.status(500).json({ message: "Error submitting rating" });
  }
});

router.get("/:albumMbid", async (req, res) => {
  try {
    const { albumMbid } = req.params;
    const username = req.query.username;
    const rating = await Rating.findOne({ username, albumMbid });

    if (rating) {
      res.status(200).json(rating);
    } else {
      res.status(404).json({ message: "Rating not found" });
    }
  } catch (error) {
    console.error("Error fetching rating:", error);
    res.status(500).json({ message: "Error fetching rating" });
  }
});

router.get("/user/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const ratings = await Rating.find({ username });

    if (ratings.length > 0) {
      res.status(200).json({ ratings });
    } else {
      res.status(404).json({ message: "No ratings found for this user" });
    }
  } catch (error) {
    console.error("Error fetching user ratings:", error);
    res.status(500).json({ message: "Error fetching user ratings" });
  }
});

module.exports = router;

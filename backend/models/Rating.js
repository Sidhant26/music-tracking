const mongoose = require("mongoose");

const RatingSchema = new mongoose.Schema({
  username: { type: String, required: true },
  albumMbid: { type: String, required: true },
  albumName: { type: String, required: true },
  artistName: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 10 },
  notes: { type: String, required: false },
});

const Rating = mongoose.model("Rating", RatingSchema);

module.exports = Rating;

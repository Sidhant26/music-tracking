const mongoose = require("mongoose");

const RatingSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  albumId: { type: String, required: true },
  albumName: { type: String, required: true },
  artistName: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  dateRated: { type: Date, default: Date.now },
});

const Rating = mongoose.model("Rating", RatingSchema);

module.exports = Rating;

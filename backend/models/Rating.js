const mongoose = require("mongoose");

const RatingSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  albumId: { type: String, required: true },
  albumName: { type: String, required: true },
  artistName: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  listenStatus: {
    type: String,
    enum: ["not listened", "want to listen", "listened"],
    default: "not listened",
  },
});

const Rating = mongoose.model("Rating", RatingSchema);

module.exports = Rating;

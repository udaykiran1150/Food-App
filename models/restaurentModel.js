const mongoose = require("mongoose");

const restaurentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Tittle is required"],
    },
    imgUrl: { type: String },
    foods: { type: Array },
    time: { type: String },
    isOpen: { type: Boolean, default: true },
    pickup: { type: Boolean, default: true },
    delivery: { type: Boolean, default: true },
    logoUrl: { type: String },
    rating: { type: Number, default: 1, min: 1, max: 5 },
    ratingCount: { type: String },
    coords: {
      id: { type: String },
      latitude: { type: Number },
      latitudeDelta: { type: Number },
      longitude: { type: Number },
      longitudeDelta: { type: Number },
      address: { type: Array },
      title: { type: String },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Restaurent", restaurentSchema);

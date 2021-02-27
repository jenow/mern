const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  nbTreasureChest: {
    type: Number,
    default: 0,
  },
  catchPhrase: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true
  },
  pegLeg: {
    type: Boolean,
    required: true
  },
  eyePatch: {
    type: Boolean,
    required: true
  },
  hookHand: {
    type: Boolean,
    required: true
  }
});

const Pirate = mongoose.model("Pirate", postSchema);

module.exports = Pirate;

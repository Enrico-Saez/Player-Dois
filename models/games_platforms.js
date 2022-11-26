const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gamePlatformSchema = new Schema({
  _id: {
    type: String,
    required: true,
  },
  descricao: {
    type: String,
    required: true,
  },
  ehJogo: {
    type: Boolean,
    required: true,
  },
  imagem: {
    type: String,
    required: true,
  },
  usuarios: {
    type: Object,
    required: true,
  },
});

const GamePlatform = mongoose.model("GamePlatform", gamePlatformSchema);
module.exports = GamePlatform;

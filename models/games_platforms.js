const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gamePlatformSchema = new Schema({
  _id: {
    type: String,
    required: true,
  },
  nome: {
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
  Imagem: {
    type: String,
    required: true,
  },
  Usuarios: {
    type: Object,
    required: true,
  },
});

const GamePlatform = mongoose.model("GamePlatform", gamePlatformSchema);
module.exports = GamePlatform;

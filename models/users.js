const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  _id: {
    type: String,
    required: true,
  },
  senha: {
    type: String,
    required: true,
  },
  nome: {
    type: String,
    required: true,
  },
  sexo: {
    type: String,
    required: true,
  },
  data_nasc: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
  foto: {
    type: String,
    required: true,
  },
  aval_hab: {
    type: Object,
    required: true,
  },
  aval_sim: {
    type: Object,
    required: true,
  },
  lista_amigos: {
    type: Object,
    required: true,
  },
  lista_jogos: {
    type: Object,
    required: true,
  },
  lista_plats: {
    type: Object,
    required: true,
  },
  pessoas_com_conversa: {
    type: Object,
    required: true,
  },
  tem_novas_mensagens: {
    type: Boolean,
    required: true,
  },
  mensagens: {
    type: Object,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;

const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/users");
const GamePlatform = require("./models/games_platforms");

const app = express();

const dbURI =
  "mongodb+srv://playerdois:grupodosamuel@player-dois.ga274hy.mongodb.net/Player-Dois?retryWrites=true&w=majority";

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.status(200).render("index");
});

app.get("/messages", function (req, res) {
  res.status(200).render("messages");
});

app.get("/termos", (req, res) => {
  res.status(200).render("termos");
});

// Cadastro de usuário
app.post("/cadastroUsuario", (req, res) => {
  const user = new User({
    _id: req.body.login,
    senha: req.body.senha,
    nome: req.body.login,
    sexo: req.body.sexo,
    data_nasc: req.body.data_nasc,
    bio: " ",
    foto: "./public/foto_usuario.png",
    aval_hab: 0,
    aval_sim: 0,
    lista_jogos: [],
    lista_plats: [],
    pessoas_com_conversa: [],
    tem_novas_mensagens: false,
    mensagens: [],
  });

  user
    .save()
    .then((result) => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/login", (req, res) => {
  User.findById(req.body.login, (err, docs) => {
    if (err) {
      res.status(401).render("index");
    } else {
      if (docs.senha != req.body.senha) {
        res.status(401).render("index");
      } else {
        res.status(200).render("paginaPrincipal");
      }
    }
  });
});

app.post("/enviarMensagem", (req, res) => {});

app.use((req, res) => {
  res.status(404).render("404");
});

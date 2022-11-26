const express = require("express");
const mongoose = require("mongoose");
const upload = require("express-fileupload");
const User = require("./models/users");
const GamePlatform = require("./models/games_platforms");
const CurrentUser = require("./models/currentUser");

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

app.get("/home", (req, res) => {
  User.find()
    .then((users) => {
      GamePlatform.find()
        .then((gamesPlatforms) => {
          CurrentUser.find()
            .then((currentUser) => {
              res
                .status(200)
                .render("home", { users, gamesPlatforms, currentUser });
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/cadastro_jogos_plataformas", (req, res) => {
  res.status(200).render("cadastroJogosPlataformas");
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

app.post("/cadastroJogoPlataforma", (req, res) => {
  const file = req.files.imagem_capa;
  const filename = file.name;
  file.mv("./public/", filename);

  const gamePlatform = new GamePlatform({
    _id: req.body.nome,
    descricao: req.body.desc,
    ehJogo: true,
    imagem: "./public/" + filename,
    usuarios: [],
  });

  gamePlatform
    .save()
    .then((result) => {
      res.redirect("/cadastro_jogos_plataformas");
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/login", (req, res) => {
  User.findById(req.body.login, (err, docs) => {
    if (err) {
      res.redirect("/");
    } else {
      if (docs.senha != req.body.senha) {
        res.redirect("/");
      } else {
        CurrentUser.updateOne(
          { _id: "currentUser" },
          { currentUserLogin: req.body.login },
          function (err, docs) {
            if (err) {
              console.log(err);
            } else {
              res.redirect("home");
            }
          }
        );
      }
    }
  });
});

app.post("/enviarMensagem", (req, res) => {});

app.use((req, res) => {
  res.status(404).render("404");
});

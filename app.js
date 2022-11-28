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
app.use(upload());
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

app.get("/jogo/:jogo", (req, res) => {
  const jogo = req.params.jogo;
  User.find()
    .then((users) => {
      GamePlatform.find()
        .then((gamesPlatforms) => {
          CurrentUser.find()
            .then((currentUser) => {
              var textoBotaoInscrever = "Inscrever-se";
              users.forEach((user) => {
                if (user._id === currentUser[0].currentUserLogin) {
                  if (user.lista_jogos.includes(jogo)) {
                    textoBotaoInscrever = "Desinscrever-se";
                  }
                }
              });
              res.status(200).render("game", {
                users,
                gamesPlatforms,
                currentUser,
                jogoAtual: jogo,
                textoBotaoInscrever,
              });
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

app.get("/plataforma/:plataforma", (req, res) => {
  const plataforma = req.params.plataforma;
  User.find()
    .then((users) => {
      GamePlatform.find()
        .then((gamesPlatforms) => {
          CurrentUser.find()
            .then((currentUser) => {
              var textoBotaoInscrever = "Inscrever-se";
              users.forEach((user) => {
                if (user._id === currentUser[0].currentUserLogin) {
                  if (user.lista_plats.includes(plataforma)) {
                    textoBotaoInscrever = "Desinscrever-se";
                  }
                }
              });
              res.status(200).render("platform", {
                users,
                gamesPlatforms,
                currentUser,
                plataformaAtual: plataforma,
                textoBotaoInscrever,
              });
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

app.get("/usuario/:usuario", (req, res) => {
  const usuario = req.params.usuario;
  User.find()
    .then((users) => {
      GamePlatform.find()
        .then((gamesPlatforms) => {
          CurrentUser.find()
            .then((currentUser) => {
              const games = [];
              const platforms = [];
              gamesPlatforms.forEach((gamePlatform) => {
                if (gamePlatform.ehJogo) {
                  games.push(gamePlatform);
                } else {
                  platforms.push(gamePlatform);
                }
              });
              if (usuario === currentUser[0].currentUserLogin) {
                res.status(200).render("own_profile", {
                  users,
                  gamesPlatforms,
                  currentUser,
                  usuario,
                  games,
                  platforms,
                });
              } else {
                var textoBotaoAmigo = "Adicionar amigo";
                users.forEach((user) => {
                  if (user._id === currentUser[0].currentUserLogin) {
                    if (user.lista_amigos.includes(usuario)) {
                      textoBotaoAmigo = "Remover amigo";
                    }
                  }
                });
                res.status(200).render("player_profile", {
                  users,
                  gamesPlatforms,
                  currentUser,
                  usuario,
                  games,
                  platforms,
                  textoBotaoAmigo,
                });
              }
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

app.get("/home", (req, res) => {
  User.find()
    .then((users) => {
      GamePlatform.find()
        .then((gamesPlatforms) => {
          CurrentUser.find()
            .then((currentUser) => {
              const games = [];
              const platforms = [];
              gamesPlatforms.forEach((gamePlatform) => {
                if (gamePlatform.ehJogo) {
                  games.push(gamePlatform);
                } else {
                  platforms.push(gamePlatform);
                }
              });
              res.status(200).render("home", {
                users,
                gamesPlatforms,
                currentUser,
                games,
                platforms,
              });
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

app.post("/cadastroUsuario", (req, res) => {
  const user = new User({
    _id: req.body.login,
    senha: req.body.senha,
    nome: req.body.login,
    sexo: req.body.sexo,
    data_nasc: req.body.data_nasc,
    bio: "Escreva algo sobre você aqui!",
    foto: "foto_usuario.png",
    aval_hab: [10],
    aval_sim: [10],
    lista_amigos: [],
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

app.post("/cadastroJogo", (req, res) => {
  const file = req.files.imagem;
  const filename = file.name;
  file.mv("./public/" + filename, (err) => {
    if (err) {
      console.log(err);
    } else {
      const gamePlatform = new GamePlatform({
        _id: req.body.nome,
        descricao: req.body.desc,
        ehJogo: true,
        imagem: filename,
        usuarios: [],
      });

      gamePlatform
        .save()
        .then((result) => {
          res.redirect("/jogo/" + req.body.nome);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
});

app.post("/cadastroPlataforma", (req, res) => {
  const file = req.files.imagem;
  const filename = file.name;
  file.mv("./public/" + filename, (err) => {
    if (err) {
      console.log(err);
    } else {
      const gamePlatform = new GamePlatform({
        _id: req.body.nome,
        descricao: req.body.desc,
        ehJogo: false,
        imagem: filename,
        usuarios: [],
      });

      gamePlatform
        .save()
        .then((result) => {
          res.redirect("/plataforma/" + req.body.nome);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
});

app.post("/inscreverJogo", (req, res) => {
  User.find().then((users) => {
    GamePlatform.find().then((games) => {
      CurrentUser.find().then((currentUser) => {
        users.forEach((user) => {
          if (user._id === currentUser[0].currentUserLogin) {
            if (user.lista_jogos.includes(req.body.jogoAtual)) {
              var listaJogosAtualizada = user.lista_jogos;
              listaJogosAtualizada.splice(
                user.lista_jogos.indexOf(req.body.jogoAtual),
                1
              );
              User.updateOne(
                { _id: user._id },
                { lista_jogos: listaJogosAtualizada },
                function (err, docs) {
                  if (err) {
                    console.log(err);
                  } else {
                    games.forEach((game) => {
                      if (game._id === req.body.jogoAtual) {
                        var listaUsuarios = game.usuarios;
                        listaUsuarios.splice(
                          game.usuarios.indexOf(user._id),
                          1
                        );
                        GamePlatform.updateOne(
                          { _id: req.body.jogoAtual },
                          { usuarios: listaUsuarios },
                          function (err, docs) {
                            if (err) {
                              console.log(err);
                            } else {
                              res.redirect("back");
                            }
                          }
                        );
                      }
                    });
                  }
                }
              );
            } else {
              var listaJogosAtualizada = user.lista_jogos;
              listaJogosAtualizada.push(req.body.jogoAtual);
              User.updateOne(
                { _id: user._id },
                { lista_jogos: listaJogosAtualizada },
                function (err, docs) {
                  if (err) {
                    console.log(err);
                  } else {
                    games.forEach((game) => {
                      if (game._id === req.body.jogoAtual) {
                        var listaUsuarios = game.usuarios;
                        listaUsuarios.push(user._id);
                        GamePlatform.updateOne(
                          { _id: req.body.jogoAtual },
                          { usuarios: listaUsuarios },
                          function (err, docs) {
                            if (err) {
                              console.log(err);
                            } else {
                              res.redirect("back");
                            }
                          }
                        );
                      }
                    });
                  }
                }
              );
            }
          }
        });
      });
    });
  });
});

app.post("/inscreverPlataforma", (req, res) => {
  User.find().then((users) => {
    GamePlatform.find().then((platforms) => {
      CurrentUser.find().then((currentUser) => {
        users.forEach((user) => {
          if (user._id === currentUser[0].currentUserLogin) {
            if (user.lista_plats.includes(req.body.plataformaAtual)) {
              var listaPlataformasAtualizada = user.lista_plats;
              listaPlataformasAtualizada.splice(
                user.lista_plats.indexOf(req.body.plataformaAtual),
                1
              );
              User.updateOne(
                { _id: user._id },
                { lista_plats: listaPlataformasAtualizada },
                function (err, docs) {
                  if (err) {
                    console.log(err);
                  } else {
                    platforms.forEach((platform) => {
                      if (platform._id === req.body.plataformaAtual) {
                        var listaUsuarios = platform.usuarios;
                        listaUsuarios.splice(
                          platform.usuarios.indexOf(user._id),
                          1
                        );
                        GamePlatform.updateOne(
                          { _id: req.body.plataformaAtual },
                          { usuarios: listaUsuarios },
                          function (err, docs) {
                            if (err) {
                              console.log(err);
                            } else {
                              res.redirect("back");
                            }
                          }
                        );
                      }
                    });
                  }
                }
              );
            } else {
              var listaPlataformasAtualizada = user.lista_plats;
              listaPlataformasAtualizada.push(req.body.plataformaAtual);
              User.updateOne(
                { _id: user._id },
                { lista_plats: listaPlataformasAtualizada },
                function (err, docs) {
                  if (err) {
                    console.log(err);
                  } else {
                    platforms.forEach((platform) => {
                      if (platform._id === req.body.plataformaAtual) {
                        var listaUsuarios = platform.usuarios;
                        listaUsuarios.push(user._id);
                        GamePlatform.updateOne(
                          { _id: req.body.plataformaAtual },
                          { usuarios: listaUsuarios },
                          function (err, docs) {
                            if (err) {
                              console.log(err);
                            } else {
                              res.redirect("back");
                            }
                          }
                        );
                      }
                    });
                  }
                }
              );
            }
          }
        });
      });
    });
  });
});

app.post("/seguirJogador", (req, res) => {
  const jogador = req.body.usuario;
  User.find().then((users) => {
    CurrentUser.find().then((currentUser) => {
      users.forEach((user) => {
        if (user._id === currentUser[0].currentUserLogin) {
          if (user.lista_amigos.includes(jogador)) {
            var listaAmigosAtualizada = user.lista_amigos;
            listaAmigosAtualizada.splice(user.lista_amigos.indexOf(jogador), 1);
            User.updateOne(
              { _id: currentUser[0].currentUserLogin },
              { lista_amigos: listaAmigosAtualizada },
              function (err, docs) {
                if (err) {
                  console.log(err);
                } else {
                  console.log("Removi amigo");
                  res.redirect("back");
                }
              }
            );
          } else {
            var listaAmigosAtualizada = user.lista_amigos;
            listaAmigosAtualizada.push(jogador);
            User.updateOne(
              { _id: currentUser[0].currentUserLogin },
              { lista_amigos: listaAmigosAtualizada },
              function (err, docs) {
                if (err) {
                  console.log(err);
                } else {
                  res.redirect("back");
                }
              }
            );
          }
        }
      });
    });
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

app.post("/avaliar", (req, res) => {
  User.find().then((users) => {
    users.forEach((user) => {
      if (user._id == req.body.usuario) {
        const lista_aval_hab = user.aval_hab;
        lista_aval_hab.push(Number(req.body.habilidade));
        const lista_aval_sim = user.aval_sim;
        lista_aval_sim.push(Number(req.body.simpatia));
        User.updateOne(
          { _id: user._id },
          { aval_hab: lista_aval_hab, aval_sim: lista_aval_sim },
          function (err, docs) {
            if (err) {
              console.log(err);
            } else {
              res.redirect("back");
            }
          }
        );
      }
    });
  });
});

app.use((req, res) => {
  res.status(404).render("404");
});

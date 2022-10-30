const fs = require('fs');


// Create
function criarUsuario(login, senha, nome, sexo, idade) {
    let dados = JSON.parse(fs.readFileSync('banco_usuarios.json'));
    dados[login] = {
        login : login,
        senha: senha,
        nome: nome,
        sexo: sexo,
        idade: idade,
        bio: "",
        foto: "",
        avaliacao_hab: 0,
        avaliacao_simp: 0,
        lista_jogos: [],
        lista_plat: [],
        pessoas_com_conversa: [
            
        ],
        possui_novas_mensagens: false,
        mensagens: {
            "": [
                {
                    
                }
            ]
        }
    }
    fs.writeFileSync('banco_usuarios.json',JSON.stringify(dados, null, 2));
}



// Read
function getSenhaUsuario(chave) {
    let dados = fs.readFileSync('banco_usuarios.json');
    return JSON.parse(dados)[chave]["senha"];
}

function getNomeUsuario(chave) {
    let dados = fs.readFileSync('banco_usuarios.json');
    return JSON.parse(dados)[chave]["nome"];
}

criarUsuario("enricosaez", 123456, "EnricoSaez", "masculino", 18)
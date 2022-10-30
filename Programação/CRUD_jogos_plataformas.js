const fs = require('fs');


// Create
function cadastrarJogoPlataforma(chave, ehJogo, descricao, imagem) {
    let dados = JSON.parse(fs.readFileSync('banco_jogos_plataformas.json'));
    dados[chave] = {
        ehJogo : ehJogo,
        nome: chave,
        descricao: descricao,
        imagem_capa: imagem,
        lista_usuarios: [
            
        ]
    }
    fs.writeFileSync('banco_jogos_plataformas.json',JSON.stringify(dados, null, 2));
}

function inscreverEmJogoPlataforma(chaveUsuario, chaveJogoPlataforma) {
    let dados = JSON.parse(fs.readFileSync('banco_jogos_plataformas.json'));
    dados[chaveJogoPlataforma][lista_usuarios].push(chaveUsuario);
    fs.writeFileSync('banco_jogos_plataformas.json',JSON.stringify(dados, null, 2));
}



// Read
function getNomeJogoPlataforma(chave) {
    let dados = fs.readFileSync('banco_jogos_plataformas.json');
    return JSON.parse(dados)[chave]["nome"];
}

function getDescricaoJogoPlataforma(chave) {
    let dados = fs.readFileSync('banco_jogos_plataformas.json');
    return JSON.parse(dados)[chave]["descricao"];
}

cadastrarJogoPlataforma("Counter Strike: Global Offensive", true, "Jogo de FPS feito pela Valve", "foto_CS")
console.log(getNomeJogoPlataforma("Counter Strike: Global Offensive"))
console.log(getDescricaoJogoPlataforma("Counter Strike: Global Offensive"))
inscreverEmJogoPlataforma("Counter Strike: Global Offensive", "EnricoSaez");
console.log(fs.readFileSync('banco_jogos_plataformas.json'))
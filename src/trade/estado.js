// Salva o estado da Cripto
const save = {};

// Atualiza o estado da Cripto
function att(ticker) {
    save[ticker.simbolo] = ticker;
}

// Retorna o estado da Cripto
function listar(ticker) {
    return save[ticker.simbolo];
}

module.exports = { att, listar };
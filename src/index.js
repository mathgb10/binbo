// Chamdando minha biblioteca de Env, Express e meu Socket da Binance
require('dotenv').config();
const express = require('express');
const app = express();
require('./binance/websocket');

// Porta definida no .env se não for definida, vai exibir um erro e encerrar o processo
const PORT = process.env.PORT;
if (!PORT) {
    console.log('A variável PORT não está definida no .env.');
    process.exit(1);
}

// Apontando pra public que tem um index do "Em Construção" por hora
app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`Binbo rodando na porta ${PORT}`);
});
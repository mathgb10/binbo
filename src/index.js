// Chamdando minha biblioteca de Env, Express, meu Socket da Binance e meu Bot do Telegram
require('dotenv').config();
const express = require('express');
const app = express();
require('./binance/websocket');
require('./telegram/bot');

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
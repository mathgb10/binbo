// Usando a bibliteca de Websocket
const webSocket = require('ws');

// Cria o Socket apontando pra Binance
const socket = new webSocket(
    'wss://stream.binance.com:9443/ws/btcbrl@trade'
);

// Incia o Socket
socket.on('open', () => {
    console.log('Conectou.');
});

// Dados
socket.on('message', (data) => {
    const trade = JSON.parse(data);
    console.log('Dados:', trade);
    console.log(`Preço do BTC: ${trade.p}`);
});

// Finaliza o Socket
socket.on('close', () => {
    console.log('Desconectou.');
});
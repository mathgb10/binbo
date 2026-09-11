// Usando a bibliteca de Websocket e meu Bot do Telegram
const webSocket = require('ws');
const { processar } = require('../utils/eventos');

let mortes = 0;

function conectar() {
    
    // Cria o Socket apontando pra Binance
    // Se a conexão falhar 5 vezes, ele tenta conectar na Binance US
    let socket = mortes < 5 ? new webSocket('wss://stream.binance.com/ws/btcbrl@ticker') : new webSocket('wss://stream.binance.us/ws/btcbrl@ticker');

    // Incia o Socket
    socket.on('open', async () => {
        console.log('Conectou.');
    });

    // Dados
    socket.on('message', async (data) => {
        const trade = JSON.parse(data);
        processar(trade);
    });

    // Finaliza o Socket
    socket.on('close', () => {
        console.log('Desconectou. Vai reconectar em alguns instantes');
        setTimeout(() => {
            conectar();
        }, 5000);
    });

    socket.on('error', (error) => {
        console.error('Erro no WebSocket:', error);
        mortes++;
    });
}

conectar();
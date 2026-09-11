// Usando a bibliteca de Websocket e meu Bot do Telegram
const webSocket = require('ws');
const { processar } = require('../trade/eventos');

function conectar() {

    // Cria o Socket apontando pra Binance
    const socket = new webSocket(
        'wss://stream.binance.com/ws/btcbrl@ticker'
    );

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
    });
}

conectar();
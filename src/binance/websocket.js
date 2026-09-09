// Usando a bibliteca de Websocket e meu Bot do Telegram
const webSocket = require('ws');
const { buscarChat, enviarMensagem } = require('../telegram/bot');

function conectar() {

    // Cria o Socket apontando pra Binance
    const socket = new webSocket(
        'wss://stream.binance.com/ws/btcbrl@trade'
    );

    // Incia o Socket
    socket.on('open', async () => {
        console.log('Conectou.');
        const chats = await buscarChat();

        // For para cada chat que o bot tem acesso
        // Coleto o ID e chamo a função que dispara as mensagens
        chats.forEach(async (e) => {
            const chatId = e.message.chat.id;
            if (chatId) {
                await enviarMensagem(chatId, `Conectado ao WebSocket da Binance.`);
            }
        });
    });

    // Dados
    socket.on('message', async (data) => {
        const trade = JSON.parse(data);
        console.log('Dados:', trade);
        const msg = `
            Preço: R$${Number(trade.p).toFixed(2)}
            Símbolo: ${trade.s}
            Trade ID: ${trade.t}
        `;
        const chats = await buscarChat();

        // For para cada chat que o bot tem acesso
        // Coleto o ID e chamo a função que dispara as mensagens
        chats.forEach(async (e) => {
            const chatId = e.message.chat.id;
            if (chatId) {
                await enviarMensagem(chatId, msg);
            }
        });
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
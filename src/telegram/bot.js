// Carregando biblioteca de Env
require('dotenv').config();
// Variavel com Token do Bot definida no .env, caso não esteja vou exibir um erro e encerrar o processo
const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
if (!TOKEN) {
    console.log('A variável TELEGRAM_BOT_TOKEN não está definida no .env.');
    process.exit(1);
}

const API_URL = `https://api.telegram.org/bot${TOKEN}/`;

// Função que busca as mensagens do chat, e o mais importante ChatID
async function buscarChat() {
    const resp = await fetch(API_URL + 'getUpdates');
    const dados = await resp.json();

    if (!dados.ok) throw new Error(dados.description);

    return dados.result;
}

// Função que envia mensagem para um chat especifico
async function enviarMensagem(chatId, mensagem) {
    const resposta = await fetch(API_URL + 'sendMessage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chatId, text: mensagem })
    });

    const dados = await resposta.json();

    if (!dados.ok) throw new Error(dados.description);

    return dados;
}

// Função que envia mensagem para todos os chats disponiveis
async function enviarMsgParaTodos(tipo,porcentagem) {
    switch (tipo) {
        case 1:
            var msg = `🟢 A cripto Aumentou ${porcentagem.toFixed(2)}% em 24h`;
            break;
        case 0:
            var msg = `🔴 A cripto Caiu ${Math.abs(porcentagem).toFixed(2)}% em 24h`;
            break;
        default:
            var msg = `⚪️ A cripto se manteve estável em 24h`;
            break;
    }
    
    const chats = await buscarChat();
    chats.forEach(e => {
        enviarMensagem(e.chat_id, msg);
    });
}

module.exports = { enviarMensagem,buscarChat,enviarMsgParaTodos };
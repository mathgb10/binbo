// Carregando biblioteca de Env
require('dotenv').config();
// Variavel com Token do Bot definida no .env, caso não esteja vou exibir um erro e encerrar o processo
const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
if (!TOKEN) {
    console.log('A variável TELEGRAM_BOT_TOKEN não está definida no .env.');
    process.exit(1);
}

// Função que busca as mensagens do chat, e o mais importante ChatID
async function buscarChat() {
    const url = `https://api.telegram.org/bot${TOKEN}/getUpdates?timeout=30`;
    const resp = await fetch(url);
    const dados = await resp.json();

    if (!dados.ok) throw new Error(dados.description);

    console.log("Chat", dados)
    return dados.result;
}

// Função que envia mensagem para um chat especifico
async function enviarMensagem(chatId, mensagem) {
    const url = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

    const resposta = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chatId, text: mensagem })
    });

    const dados = await resposta.json();

    if (!dados.ok) throw new Error(dados.description);

    return dados;
}

module.exports = { enviarMensagem,buscarChat };
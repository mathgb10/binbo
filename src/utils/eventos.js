const { att } = require('./estado');
const { enviarMsgParaTodos } = require('../telegram/bot');

// Essa função me retorna os dados formatados em um objeto
function processar(ticker) {
    if (!ticker) {
        console.log("Ticker inválido");
        return;
    }

    const dadosFormatados = {
        simbolo: ticker.s,
        preco: Number(ticker.c),
        quantidade: Number(ticker.q),
        variacao_perc_24h: Number(ticker.P),
        variacao_valor_24h: Number(ticker.p),
        maior_preco_24h: Number(ticker.h),
        menor_preco_24h: Number(ticker.l),
        volume: Number(ticker.v),
        horario: Number(ticker.E), 
    };

    att(dadosFormatados);
    eventos(dadosFormatados);
} 

// Caso minha variação de preço em 24 seja maior que 1.2% disparo uma mensagem de aumento
// Caso contrário, disparo uma mensagem de queda, caso seja menor que -1.2%
function eventos(ticker){
    if (ticker.variacao_perc_24h >= 1.2) {
        enviarMsgParaTodos(1,ticker.variacao_perc_24h);
    }
    
    if(ticker.variacao_perc_24h <= -1.2){
        enviarMsgParaTodos(0,ticker.variacao_perc_24h);
    }
}

module.exports = { processar };
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

    console.log(dadosFormatados);

    att(dadosFormatados);
    eventos(dadosFormatados);
}

let ultimo_aviso;

// Caso minha variação de preço em 24 seja maior que 1.2% disparo uma mensagem de aumento
// Caso contrário, disparo uma mensagem de queda, caso seja menor que -1.2%
async function eventos(ticker) {
    if (ticker.variacao_perc_24h >= 1.2) {
        const agr = Date.now();
        console.log(`A cripto ${ticker.simbolo} aumentou ${ticker.variacao_perc_24h.toFixed(2)}% em 24h`);
        
        if ((agr - ultimo_aviso) >= 60000 || ultimo_aviso === undefined) {
            await enviarMsgParaTodos(1, ticker.variacao_perc_24h, ticker.preco);
            ultimo_aviso = agr;
        }
    }

    if (ticker.variacao_perc_24h <= -1.2) {
        const agr = Date.now();
        console.log(`A cripto ${ticker.simbolo} diminuiu ${ticker.variacao_perc_24h.toFixed(2)}% em 24h`);
        
        if ((agr - ultimo_aviso) >= 60000 || ultimo_aviso === undefined) {
            await enviarMsgParaTodos(0, ticker.variacao_perc_24h, ticker.preco);
            ultimo_aviso = agr;
        }
    }
}

module.exports = { processar };
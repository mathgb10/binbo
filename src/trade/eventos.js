// Essa função me retorna os dados formatados em um objeto
function processar(trade) {
    if (!trade) {
        console.log("Trade inválido");
        return;
    }

    const dadosFormatados = {
        simbolo: trade.s,
        preco: Number(trade.c),
        quantidade: Number(trade.q),
        variacao_perc_24h: Number(trade.P),
        variacao_valor_24h: Number(trade.p),
        maior_preco_24h: Number(trade.h),
        menor_preco_24h: Number(trade.l),
        volume: Number(trade.v),
    };

    return dadosFormatados;
} 

module.exports = { processar };
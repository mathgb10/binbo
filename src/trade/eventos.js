// Essa função me retorna os dados formatados em um objeto
function processar(ticker) {
    if (!ticker) {
        console.log("Ticker inválido");
        return;
    }

    const temp_hora = new Date(ticker)

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

    return dadosFormatados;
} 

module.exports = { processar };
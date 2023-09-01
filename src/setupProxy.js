const proxy = require("http-proxy-middleware");
const { CryptoState } = require("./Context/CryptoContext");

const {currency} = CryptoState();
module.exports = function(app){
    app.use(
        proxy(`/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`,{
            target : "https://api.coingecko.com/api/v3/coins",
            changeOrigin: true
        }),

        proxy(`/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`,{
            target : "https://api.coingecko.com/api/v3/coins",
            changeOrigin: true
        }),
    )
}
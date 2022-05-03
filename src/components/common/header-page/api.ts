import axios from "axios"

export const getPriceGAE = async () => {
    return await axios({
        method: 'GET',
        url: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=gae',
        headers: {
            'X-CMC_PRO_API_KEY': '286decef-484e-4d16-a984-0f6c53fbe478',
            'Accept': 'application/json'
        }
    }).then((res) => {
        return res.data.GAE.quote.USD.price
    })
}
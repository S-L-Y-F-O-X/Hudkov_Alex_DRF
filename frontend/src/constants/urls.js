const baseURL = '/api'

const reg = '/registration'
const auth = '/auth'
const cars = '/cars'
const exchangeRates ='/exchange-rates'
const urls = {
    reg,
    auth:{
        login:auth,
        socket:`${auth}/token`
    },
    cars,
    exchangeRates
}

export {
    baseURL,
    urls
}
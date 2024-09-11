export const calculateOtherCurrencies = (price, selectedCurrency, exchangeRates) => {
    if (!exchangeRates || !price || !exchangeRates.USD || !exchangeRates.EUR) {
        return { uahPrice: 'N/A', usdPrice: 'N/A', eurPrice: 'N/A' };
    }

    const USD = exchangeRates.USD || { sale: 1, buy: 1 };
    const EUR = exchangeRates.EUR || { sale: 1, buy: 1 };
    let uahPrice = 0, usdPrice = 0, eurPrice = 0;

    switch (selectedCurrency) {
        case 'UAH':
            uahPrice = price;
            usdPrice = USD.buy ? (price / USD.buy).toFixed(2) : 0;
            eurPrice = EUR.buy ? (price / EUR.buy).toFixed(2) : 0;
            break;
        case 'USD':
            usdPrice = price;
            uahPrice = USD.sale ? (price * USD.sale).toFixed(2) : 0;
            eurPrice = EUR.buy && USD.sale ? ((price * USD.sale) / EUR.sale).toFixed(2) : 0;
            break;
        case 'EUR':
            eurPrice = price;
            uahPrice = EUR.sale ? (price * EUR.sale).toFixed(2) : 0;
            usdPrice = USD.buy && EUR.sale ? ((price * EUR.sale) / USD.sale).toFixed(2) : 0;
            break;
        default:
            uahPrice = usdPrice = eurPrice = 0;
    }

    return { uahPrice, usdPrice, eurPrice };
};
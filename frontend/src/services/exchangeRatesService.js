import {apiService} from './apiService';


export const currencyService = {

    getExchangeRates: async () => {
        const response = await apiService.get(`/exchange-rates`);
        return response.data;
    }
};
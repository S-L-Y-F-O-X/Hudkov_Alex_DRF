import React, {useEffect, useState} from 'react';
import {currencyService} from '../services/exchangeRatesService';
import {calculateOtherCurrencies} from "../utils/currencyUtils";

const Car = ({car, onDelete, user}) => {
    const {id, brand, model, price, currency, year, region, city, body_type, owner} = car;
    const canDelete = user.is_superuser || user.is_staff || user.id === owner;
    const [exchangeRates, setExchangeRates] = useState(null);

    useEffect(() => {
        const fetchExchangeRates = async () => {
            const rates = await currencyService.getExchangeRates();
            setExchangeRates(rates);
        };

        fetchExchangeRates();
    }, []);

    const otherCurrencies = exchangeRates ? calculateOtherCurrencies(price, currency, exchangeRates) : {};

    return (
        <div>
            <div>Brand: {brand}</div>
            <div>Model: {model}</div>
            <div>Year: {year}</div>
            <div>Region: {region}</div>
            <div>City: {city}</div>
            <div>Body Type: {body_type}</div>
            <div>Price: {price} {currency}</div>
            <br/>

            {exchangeRates && (
                <div>
                    <div>Price in other currencies::</div>
                    {currency !== 'UAH' && <div>UAH: {otherCurrencies.uahPrice} UAH</div>}
                    {currency !== 'USD' && <div>USD: {otherCurrencies.usdPrice} USD</div>}
                    {currency !== 'EUR' && <div>EUR: {otherCurrencies.eurPrice} EUR</div>}
                    <hr/>
                </div>

            )}

            {canDelete && (
                <button onClick={() => onDelete(id)}>Delete my car</button>
            )}
            <br/>
        </div>
    );
};

export {Car};
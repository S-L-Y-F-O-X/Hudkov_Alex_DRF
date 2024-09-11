import React, {useState, useEffect} from "react";
import {useForm} from "react-hook-form";

import {BrandModelService} from "../services/brandModelService";
import {carService} from "../services/carService";
import {currencyService} from "../services/exchangeRatesService";
import {calculateOtherCurrencies} from "../utils/currencyUtils";

const regions = [
    {id: 1, name: "Kherson Oblast"},
    {id: 2, name: "Volyn Oblast"},
    {id: 3, name: "Rivne Oblast"},
    {id: 4, name: "Zhytomyr Oblast"},
    {id: 5, name: "Kyiv Oblast"},
    {id: 6, name: "Chernihiv Oblast"},
    {id: 7, name: "Sumy Oblast"},
    {id: 8, name: "Kharkiv Oblast"},
    {id: 9, name: "Luhansk Oblast"},
    {id: 10, name: "Donetsk Oblast"},
    {id: 11, name: "Zaporizhia Oblast"},
    {id: 12, name: "Lviv Oblast"},
    {id: 13, name: "Ivano-Frankivsk Oblast"},
    {id: 14, name: "Zakarpattia Oblast"},
    {id: 15, name: "Ternopil Oblast"},
    {id: 16, name: "Chernivtsi Oblast"},
    {id: 17, name: "Odesa Oblast"},
    {id: 18, name: "Mykolaiv Oblast"},
    {id: 19, name: "Vinnytsia Oblast"},
    {id: 20, name: "Khmelnytskyi Oblast"},
    {id: 21, name: "Cherkasy Oblast"},
    {id: 22, name: "Poltava Oblast"},
    {id: 23, name: "Dnipropetrovsk Oblast"},
    {id: 24, name: "Kirovohrad Oblast"},
    {id: 25, name: "Autonomous Republic of Crimea"}
];

const body_type = [
    {id: 1, name: "Sedan"},
    {id: 2, name: "Hatchback"},
    {id: 4, name: "Coupe"},
    {id: 3, name: "Limousine"},
    {id: 5, name: "Convertible"},
    {id: 6, name: "Wagon"},
    {id: 7, name: "Pickup Truck"},
    {id: 8, name: "Van"},
    {id: 9, name: "Minivan"},
    {id: 10, name: "Crossover"},
    {id: 11, name: "Roadster"},
    {id: 12, name: "Jeep"},
]

const currencies = ["UAH", "USD", "EUR"];

const CarForm = () => {
    const {register, handleSubmit, reset, watch} = useForm();
    const [brands, setBrands] = useState([]);
    const [models, setModels] = useState([]);
    const [exchangeRates, setExchangeRates] = useState({});
    const [selectedBrand, setSelectedBrand] = useState('');
    const selectedCurrency = watch('currency');
    const price = watch('price');

    useEffect(() => {
        const fetchExchangeRates = async () => {
            const data = await currencyService.getExchangeRates();
            setExchangeRates(data);
        };
        fetchExchangeRates();
    }, []);

    useEffect(() => {
        const fetchBrands = async () => {
            const {data} = await BrandModelService.getBrands();
            setBrands(data.data);
        };
        fetchBrands();
    }, []);

    useEffect(() => {
        const fetchModels = async () => {
            const {data} = await BrandModelService.getModels();
            const filteredModels = data.data.filter(model => model.brand === Number(selectedBrand));
            setModels(filteredModels);
        };
        fetchModels();

    }, [selectedBrand]);

    const handleBrandChange = (e) => {
        setSelectedBrand(e.target.value);
        reset({model: ''});
    };

    const save = async (data) => {
        const carData = {
            brand: brands.find(b => b.id === Number(data.brand)).name,
            model: models.find(m => m.id === Number(data.model)).name,
            price: data.price,
            currency: data.currency,
            year: data.year,
            region: data.region,
            city: data.city,
            body_type: data.body_type
        };
        await carService.create(carData);
        reset();
    };

    const otherCurrencies = calculateOtherCurrencies(price, selectedCurrency, exchangeRates);

    return (
        <form onSubmit={handleSubmit(save)}>
            <div>
                <label htmlFor="brand">Brand:</label>
                <select id="brand" {...register('brand')} onChange={handleBrandChange}>
                    <option value="">Select a brand</option>
                    {brands.map(brand => (
                        <option key={brand.id} value={brand.id}>
                            {brand.name}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor="model">Model:</label>
                <select id="model" {...register('model')} disabled={!selectedBrand}>
                    <option value="">Choose a model</option>
                    {models.map(model => (
                        <option key={model.id} value={model.id}>
                            {model.name}
                        </option>
                    ))}
                </select>
            </div>

            <input type="number" placeholder="Price" {...register('price')} />
            <div>
                <label htmlFor="currency">Currency:</label>
                <select {...register('currency')}>
                    {currencies.map(currency => (
                        <option key={currency} value={currency}>{currency}</option>
                    ))}
                </select>
            </div>

            {price && (
                <div>
                    <p>UAH Price: {otherCurrencies.uahPrice || 'N/A'}</p>
                    <p>USD Price: {otherCurrencies.usdPrice || 'N/A'}</p>
                    <p>EUR Price: {otherCurrencies.eurPrice || 'N/A'}</p>
                </div>
            )}

            <input type="text" placeholder="Year" {...register('year')} />

            <div>
                <label htmlFor="region">Region:</label>
                <select id="region" {...register('region')}>
                    <option value="">Select a region</option>
                    {regions.map(region => (
                        <option key={region.id} value={region.name}>
                            {region.name}
                        </option>
                    ))}
                </select>
            </div>

            <input type="text" placeholder="City" {...register('city')} />

            <div>
                <label htmlFor="body_type">Body Type</label>
                <select id="body_type" {...register('body_type')}>
                    <option value="">Choose a body type</option>
                    {body_type.map(body_type => (
                        <option key={body_type.id} value={body_type.name}>
                            {body_type.name}
                        </option>
                    ))}
                </select>
            </div>

            <button type="submit">Save</button>
        </form>
    );
};

export {CarForm};
import React, {useState, useEffect} from 'react';
import {BrandModelService} from "../services/BrandModelService";

const BrandAndModelManager = () => {
    const [brandName, setBrandName] = useState('');
    const [modelName, setModelName] = useState('');
    const [brands, setBrands] = useState([]);
    const [models, setModels] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState('');

    useEffect(() => {
        fetchBrands();
        fetchModels();
    }, []);

    const fetchBrands = async () => {
        const response = await BrandModelService.getBrands();
        setBrands(response.data.data);
    };

    const fetchModels = async () => {
        const response = await BrandModelService.getModels();
        setModels(response.data.data);
    };

    const handleCreateBrand = async () => {
        const response = await BrandModelService.addBrand({name: brandName});
        setBrands([...brands, response.data]);
        setBrandName('');
    };

    const handleCreateModel = async () => {
        if (!selectedBrand) {
            alert('Please select a brand first.');
            return;
        }
        if (!modelName) {
            alert('Please enter a model name.');
            return;
        }
        const modelData = {
            name: modelName,
            brand: Number(selectedBrand)
        };
        const response = await BrandModelService.createModel(modelData);
        setModels([...models, response.data]);
        setModelName('');

    };

    const handleDeleteBrand = async (brandId) => {
        await BrandModelService.deleteBrand(brandId);
        setBrands(brands.filter(brand => brand.id !== brandId));
        setModels(models.filter(model => model.brand !== brandId));
    };
    const handleDeleteModel = async (modelId) => {
        await BrandModelService.deleteModel(modelId);
        setModels(models.filter(model => model.id !== modelId));
    };

    const space = {
        marginLeft: "30px"
    }
    return (
        <div>
            <h2>Manage Car Brands</h2>
            <input
                type="text"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                placeholder="Enter brand name"
            />
            <button onClick={handleCreateBrand}>Add Brand</button>

            {Array.isArray(brands) && (
                <ul>
                    {brands.map((brand) => (
                        <li key={brand.id}>
                            {brand.name}
                            <button style={space} onClick={() => handleDeleteBrand(brand.id)}>Delete brand</button>
                        </li>
                    ))}
                </ul>
            )}

            <h2>Manage Car Models</h2>

            <select value={selectedBrand} onChange={(e) => setSelectedBrand(e.target.value)}>
                <option value="">Select a brand</option>
                {Array.isArray(brands) && brands.map((brand) => (
                    <option key={brand.id} value={brand.id}>
                        {brand.name}
                    </option>
                ))}
            </select>
            <input
                type="text"
                value={modelName}
                onChange={(e) => setModelName(e.target.value)}
                placeholder="Enter model name"
            />

            <button onClick={handleCreateModel}>Add Model</button>

            {Array.isArray(models) && (
                <ul>
                    {models.map((model) => {
                        const brand = brands.find(b => b.id === model.brand);
                        return (
                            <li key={model.id}>
                                ({brand ? brand.name : 'Unknown'}) - {model.name}
                                <button style={space} onClick={() => handleDeleteModel(model.id)}>Delete Model</button>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
};

export {BrandAndModelManager};
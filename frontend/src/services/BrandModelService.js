import {apiService} from './apiService';

const BrandModelService = {
    getBrands: () => apiService.get(`/brands`),

    getModels: (brandId) => apiService.get(`/models`, {params: {brand_id: brandId}}),

    addBrand: (brand) => apiService.post(`/brands`, brand),

    addModel: (brandId, modelName) => apiService.post(`/models`, {name: modelName, brand_id: brandId}),

    createModel: (modelData) => apiService.post(`/models`, modelData),

    deleteBrand: (id) => apiService.delete(`brands/${id}`),

    deleteModel: (modelId) => apiService.delete(`/models/${modelId}`),
};

export {BrandModelService};
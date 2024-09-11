import {apiService} from "./apiService";
import {baseURL, urls} from "../constants/urls";
import axios from "axios";


const registr = (userData) => {
    return axios.post(`${baseURL}${urls.reg}`, userData);
};

const authService = {


    getUserDetails: async () => {
        const response = await apiService.get('/users/user_details');
        return response.data;
    },

    getUserName: async () => {
        const response = await apiService.get('/users/get-user-name');
        return response.data;
    },

    async log(user) {
        const {data: {access}} = await apiService.post(urls.auth.login, user)
        localStorage.setItem('access', access)
    },

    getSocketToken() {
        return apiService.get(urls.auth.socket)
    },
    registr,
}

export {
    authService,
}
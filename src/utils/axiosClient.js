import axios from 'axios';
import { getItem, KEY_ACCESS_TOKEN, removeItem, setItem } from './localStorageManager';

export const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_SERVER_BASE_URL,
    withCredentials: true
})

axiosClient.interceptors.request.use(
    (request) => {
        const access_token = getItem(KEY_ACCESS_TOKEN);
        request.headers['Authorization'] = `Bearer ${access_token}`;

        return request;
    }
)

axiosClient.interceptors.response.use(
    async (response) => {
        const data = response.data;
        if(data.status === 'ok') {
            return data;
        }

        const originalRequest = response.config; // it contains api which is called
        const statusCode = data.statusCode;
        const error = data.error;

        if(statusCode === 401 && !originalRequest._retry) //accessToken expired
        {
            
            originalRequest._retry=true;
            const response = await axios.create({
                withCredentials: true,
            }).get(`${process.env.REACT_APP_SERVER_BASE_URL}/auth/refresh`);    //silently calling refresh api
            console.log('response from backend', response);
            
            if(response.data.status === 'ok') {
                setItem(KEY_ACCESS_TOKEN, response.data.result.accessToken); 
                originalRequest.headers['Authorization'] = `Bearer ${response.data.result.accessToken}`;

                return axios(originalRequest);
            } else {                            // means refresh token expires => logout
                removeItem(KEY_ACCESS_TOKEN);   //from local storage
                window.location.replace('./login', '_self'); //redirect to login
                return Promise.reject(error)
            }
        }

        return Promise.reject(error);
    }
)
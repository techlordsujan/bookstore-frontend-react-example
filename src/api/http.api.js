import axios from 'axios';

const httpApi = axios.create({
    baseURL: 'http://127.0.0.1:5000/api/v1',
});

httpApi.interceptors.request.use(
    function(config){
        const token = JSON.parse(localStorage.getItem('access_token'));
        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }
)

export default {
    get: httpApi.get,
    post: httpApi.post,
    put: httpApi.put,
    delete: httpApi.delete,
}
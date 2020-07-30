import axios from 'axios';

const request = axios.create({
    baseURL: 'https://conduit.productionready.io',
})
request.interceptors.request.use((config) => {
    // config.headers.Authorizatin = 
    return config
}, (error) => {
    return Promise.reject(error)
})
export default request
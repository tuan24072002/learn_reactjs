import axios from 'axios'
import NProgress from 'nprogress';
import { store } from '../redux/store';

NProgress.configure({
    showSpinner: false,
    trickleSpeed: 50,
})

const instance = axios.create({
    baseURL: 'http://localhost:8081/'
});

instance.interceptors.request.use(function (config) {
    const accessToken = store?.getState()?.user?.account?.access_token;
    config.headers["Authorization"] = `Bearer ${accessToken}`;
    NProgress.start();
    return config;
}, function (error) {
    return Promise.reject(error);
});

instance.interceptors.response.use(function (response) {
    NProgress.done();
    return response && response.data ? response.data : response;
}, function (error) {
    //token expired: EC === 999
    if (error.response && error.response.data && error.response.data.EM === 'Not authenticated the user') {
        console.log('haha');
    }
    return error && error.response && error.response.data ? error.response.data : Promise.reject(error);
});

export default instance
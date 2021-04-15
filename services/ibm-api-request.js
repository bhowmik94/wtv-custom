const moment = require('moment');
const axios = require('axios');
const qs = require('qs');

const shouldRefreshToken = (token) => {
    //should refresh before 10 minutes expires
    if(!token.access_token) return true;
    return moment().diff(token.accessTokenExpiresAt) >= -10 * 60 * 1000;
};

// const canRefreshToken = (token) => {
//     if(!token.refreshToken) return true;
//     return moment().diff(token.refreshTokenExpiresAt) < 0;
// };

let cachedToken = {};

const getIbmApiRequest = () => {
    // console.log(`inside ibm request `, process.env.IBM_API_BASE_URL)
    let config = {
        baseURL: `${process.env.IBM_API_BASE_URL}`,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            Authorization: 'Bearer ' + cachedToken.access_token
        }
    };
    let custom = axios.create(config);
    // Add a request interceptor
    custom.interceptors.request.use(function (config) {
        if (!shouldRefreshToken(cachedToken)) {
            console.log(`IBM API Request - Using the cached token `, cachedToken);
            return config;
        }
        // if (!canRefreshToken(cachedToken)){
        //     return config;
        // }

        return axios({
            method: 'POST',
            url: `${process.env.IBM_AUTH_BASE_URL}/oauth2/token`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: qs.stringify({
                grant_type: `client_credentials`,
                client_id: process.env.IBM_API_CLIENT_ID,
                client_secret: process.env.IBM_API_CLIENT_SECRET,
                token_type: `bearer`,
                scope: `broadcaster`
            })
        }).then((response) => {
            cachedToken = response.data;
            cachedToken.accessTokenExpiresAt = moment().add(cachedToken.expires_in, 'seconds');
            return Object.assign(config, {
                headers: Object.assign(config.headers, {
                    Authorization: `Bearer ${cachedToken.access_token}`
                })
            });
        }).catch((err1) => {
            console.log('IBM auth api call - API LOGIN token error: ', err1.message);
            return config;
        });
    }, function (error) {
        console.log('IBM auth api call - Request error: ', error);
        return Promise.reject(error);
    });

    // Add a response interceptor
    custom.interceptors.response.use(function (response) {
        // Do something with response data
        return response;
    }, function (error) {
        // Do something with response error
        if (error.response) {//wow this is network error (can't connect to server)// need to do something with this
            console.log('Network error : ', error.response);
        }
        return Promise.reject(error);
    });
    return custom;
};

module.exports = getIbmApiRequest;

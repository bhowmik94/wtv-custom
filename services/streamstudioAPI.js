const request = require('request');
const Promise = require('bluebird');
const env = require('dotenv').config()
const {ststRootApiUrl, ststRootHostName} = require('../config/configStreamStudio')


const ststAuth = () => {
    return new Promise((resolve,reject)=>{
        const options = {
            method: 'PUT',
            url: ststRootApiUrl + "user/login",
            body: {
                userName: process.env.STREAMSTUDIOAPIUSER,
                password: process.env.STREAMSTUDIOAPIPASSWORD,
                applicationId: process.env.STREAMSTUDIOAPPLICATIONID
            },
            headers: {
                Host: ststRootHostName,
                'Content-Type': "application/json",
            },
            json: true
        };
        request(options, (err, res, body) => {
            resolve ({statusCode: res.statusCode, token: res.body.access_token})
            reject({statusCode: res.body.code, message: res.body.message})
        })
    })
};

exports.registerUser = async (body) => {
    const webcastID = process.env.STREAMSTUDIOWEBCASTID
    return new Promise (async (resolve,reject)=>{
        const token = await ststAuth()
        const options = {
            method: 'POST',
            url: ststRootApiUrl + `/event/${webcastID}/registraton/`,
            headers: {
                Host: ststRootHostName,
                Authorization: `Bearer ${token.token}`,
                'Content-Type': "application/json",
            },
            body : {
                firstname: body.firstName,
                lastname: body.lastName,
                jobtitle: "Default",
                company: body.company,
                country: body.country,
                email: body.email
            },
            json: true
        };
        const response = await request(options, (err, res, body) => {
            if(res.body){
                resolve({message: 'success', code: 200, body: res.body.body})
            }else{
                reject({message: 'failure', code: 500, body: res.body.message})
            }
        })

    })

};

exports.getUser = async (body) => {
    const webcastID = process.env.STREAMSTUDIOWEBCASTID
    return new Promise (async (resolve,reject)=>{
        const token = await ststAuth()
        const options = {
            method: 'GET',
            url: ststRootApiUrl + `/event/${webcastID}/user/${body.email}`,
            headers: {
                Host: ststRootHostName,
                Authorization: `Bearer ${token.token}`,
                'Content-Type': "application/json",
            },
            json: true
        };
        const response = await request(options, (err, res, body) => {
            if(res.body){
                resolve({message: 'success', code: 200, body: res.body})
            }else{
                reject({message: 'failure', code: 500, body: res.body.message})
            }
        })

    })

};

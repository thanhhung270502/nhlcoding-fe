import axios from 'axios';

const URL = 'http://localhost:3000';

export const submitCode = async (code) => {
    await axios
        .post(`${URL}/coding`, { code: code })
        .then(function (response) {
            return response;
        })
        .catch(function (error) {
            console.log(error);
            return error.response;
        });
};

export const loginGoogle = async () => {
    return await axios
        .get(`${URL}/auth/google`)
        .then(function (res) {
            return res;
        })
        .catch(function (err) {
            console.log(err);
        });
};

export const getUsers = async () => {
    return await axios
        .get(`${URL}/users`)
        .then(function (res) {
            return res;
        })
        .catch(function (err) {
            console.log(err);
        });
};

export const getUser = async () => {
    return await axios
        .get(`${URL}/success`, { withCredentials: true })
        .then(function (response) {
            return response;
        })
        .catch(function (err) {
            console.log(err);
        });
};

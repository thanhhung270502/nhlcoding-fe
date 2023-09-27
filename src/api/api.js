import axios from 'axios';
import { getCookie, setCookie } from './cookie';

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

export const getUserGoogle = async () => {
    return await axios
        .get(`${URL}/auth/login/success`, { withCredentials: true })
        .then(function (response) {
            console.log({
                code: 200,
                body: response,
            });
            return {
                code: 200,
                body: response,
            };
        })
        .catch(function (err) {
            console.log({
                code: 403,
                body: err,
            });
            return {
                code: 403,
                body: err,
            };
        });
};

export const logoutGoogle = async () => {
    return await axios
        .get(`${URL}/auth/logout`, { withCredentials: true })
        .then(function (response) {})
        .catch(function (err) {});
};

export const login = async (info) => {
    const res = await axios
        .post(`${URL}/sessions/login`, info)
        .then(function (response) {
            console.log(response);
            setCookie('user_id', response.data.body.user.user_id);
            return response.data.body.user;
        })
        .catch(function (error) {
            console.log(error);
            return error.response;
        });
    return res;
};

export const getUserByID = async (user_id) => {
    const response = await axios.get(`${URL}/users/${user_id}`);
    return response;
};

export const logout = () => {
    setCookie('user_id', '', 0);
};

export const loginWithGoogle = () => {
    window.open(`${URL}/auth/google/callback`, '_self');
};

export const signup = async (info) => {
    const res = await axios
        .post(`${URL}/users`, info)
        .then(function (response) {
            console.log(response);
            setCookie('user_id', response.data.body.user.user_id);
            return response.data.body.user;
        })
        .catch(function (error) {
            console.log(error);
            return error.response;
        });
};

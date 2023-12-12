import axios from 'axios';
import { setCookie } from './cookie';

export const submitCode = async (problem_id, code, language) => {
    return await axios
        .post(`${process.env.REACT_APP_API}/problems/${problem_id}/${language}/code`, { code: code })
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            console.log(error);
            return error.response;
        });
};

export const getUsers = async () => {
    return await axios
        .get(`${process.env.REACT_APP_API}/users`)
        .then(function (res) {
            return res;
        })
        .catch(function (err) {
            console.log(err);
        });
};

export const getUserGoogle = async () => {
    return await axios
        .get(`${process.env.REACT_APP_API}/auth/login/success`, { withCredentials: true })
        .then(function (response) {
            // console.log({
            //     code: 200,
            //     body: response.data,
            // });
            var newSession = {
                accessToken: response.data.body.accessToken,
                user: response.data.body.user,
            };
            localStorage.setItem('session', JSON.stringify(newSession));
            return {
                code: 200,
                body: response.data,
            };
        })
        .catch(function (err) {
            // console.log({
            //     code: 403,
            //     body: err,
            // });
            return {
                code: 403,
                body: err,
            };
        });
};

export const logoutGoogle = async () => {
    return await axios
        .get(`${process.env.REACT_APP_API}/auth/logout`, { withCredentials: true })
        .then(function (response) {})
        .catch(function (err) {});
};

export const login = async (info) => {
    const res = await axios
        .post(`${process.env.REACT_APP_API}/sessions/login`, info)
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            console.log(error);
            return error.response;
        });
    return res;
};

export const checkAuth = async (accessToken) => {
    const res = await axios
        .get(`${process.env.REACT_APP_API}/auth/checkAuthentication`, {
            headers: {
                'access-token': accessToken,
            },
        })
        .then((res) => {
            var session = JSON.parse(localStorage.getItem('session'));
            if (res.data.login === false) {
                localStorage.setItem('session', '');
            } else {
                session['login'] = res.data.login;
                session['message'] = res.data.message;
                localStorage.setItem('session', JSON.stringify(session));
                // console.log(res);
            }
            return res.data;
        })
        .catch((error) => console.log(error));
    return res;
};

export const getUserByID = async (user_id) => {
    const response = await axios.get(`${process.env.REACT_APP_API}/users/${user_id}`);
    return response;
};

export const logout = () => {
    setCookie('user_id', '', 0);
    localStorage.setItem('session', '');
};

export const loginWithGoogle = () => {
    window.open(`${process.env.REACT_APP_API}/auth/google/callback`, '_self');
};

export const signup = async (info) => {
    return await axios
        .post(`${process.env.REACT_APP_API}/users`, info)
        .then(function (response) {
            // console.log(response);
            return response.data;
        })
        .catch(function (error) {
            console.log(error);
            return error.response;
        });
};

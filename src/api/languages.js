import axios from 'axios';
import { getCookie, setCookie } from './cookie';

const URL = 'http://localhost:3000';

export const getAllLanguages = async () => {
    return await axios
        .get(`${URL}/languages`)
        .then(function (res) {
            return res;
        })
        .catch(function (err) {
            console.log(err);
        });
};

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

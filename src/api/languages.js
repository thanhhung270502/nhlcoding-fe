import axios from 'axios';

export const getAllLanguages = async () => {
    return await axios
        .get(`${process.env.REACT_APP_API}/languages`)
        .then(function (res) {
            return res;
        })
        .catch(function (err) {
            console.log(err);
        });
};

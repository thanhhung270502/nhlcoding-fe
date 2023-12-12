import axios from 'axios';

export const getAllLevels = async () => {
    return await axios
        .get(`${process.env.REACT_APP_API}/levels`)
        .then((response) => response.data)
        .catch(function (err) {
            console.log(err);
        });
};

import axios from 'axios';
const URL = 'http://localhost:3000';

export const problemRunCode = async (problem_id, code, language) => {
    return await axios
        .post(`${URL}/problems/${problem_id}/${language}/run`, { code: code })
        .then(function (response) {
            console.log(response.data);
            return response.data;
        })
        .catch(function (error) {
            console.log(error);
            return error;
        });
};

export const getProblemLanguagesByProblemID = async (problem_id) => {
    return axios
        .get(`${URL}/problem_languages/${problem_id}`)
        .then((response) => response.data)
        .catch((error) => {
            console.log(error);
            return error.response;
        });
};

export const getLanguageByID = async (language_id) => {
    return axios
        .get(`${URL}/languages/${language_id}`)
        .then((response) => response.data)
        .catch((error) => {
            console.log(error);
            return error.response;
        });
};

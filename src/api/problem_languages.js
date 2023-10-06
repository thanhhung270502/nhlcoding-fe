import axios from 'axios';
const URL = 'http://localhost:3000';

export const getProblemLanguagesByProblemID = async (problem_id) => {
    return axios
        .get(`${URL}/problem_languages/${problem_id}`)
        .then((response) => response.data)
        .catch((error) => {
            console.log(error);
            return error.response;
        });
};

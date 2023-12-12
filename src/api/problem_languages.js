import axios from 'axios';

export const getProblemLanguagesByProblemID = async (problem_id) => {
    return axios
        .get(`${process.env.REACT_APP_API}/problem_languages/${problem_id}`)
        .then((response) => response.data)
        .catch((error) => {
            console.log(error);
            return error.response;
        });
};

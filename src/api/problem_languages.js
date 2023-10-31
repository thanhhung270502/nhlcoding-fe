import axios from 'axios';

export const getProblemLanguagesByProblemID = async (problem_id) => {
    return axios
        .get(`${process.env.LOCAL_API_URL}/problem_languages/${problem_id}`)
        .then((response) => response.data)
        .catch((error) => {
            console.log(error);
            return error.response;
        });
};

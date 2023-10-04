import axios from 'axios';
const URL = 'http://localhost:3000';

export const problemRunCode = async (problem_id, code) => {
    return await axios
        .post(`${URL}/problems/${problem_id}/python/runMore`, { code: code })
        .then(function (response) {
            console.log(response.data);
            return response.data;
        })
        .catch(function (error) {
            console.log(error);
            return error.response;
        });
};

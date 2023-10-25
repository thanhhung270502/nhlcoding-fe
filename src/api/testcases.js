import axios from 'axios';
const URL = 'http://localhost:3000';

export const getTestcaseByProblemID = async (problem_id) => {
    return await axios
        .get(`${URL}/testcases/${problem_id}`)
        .then(function (res) {
            return res.data;
        })
        .catch(function (err) {
            console.log(err);
        });
};

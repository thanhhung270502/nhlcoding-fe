import axios from 'axios';

export const getTestcaseByProblemID = async (problem_id) => {
    return await axios
        .get(`${process.env.LOCAL_API_URL}/testcases/${problem_id}`)
        .then(function (res) {
            return res.data;
        })
        .catch(function (err) {
            console.log(err);
        });
};

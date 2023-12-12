import axios from 'axios';

export const insertUserProblem = async (problem_id, user_id, status) => {
    return axios
        .post(`${process.env.REACT_APP_API}/user_problems/${user_id}/${problem_id}`, { status })
        .then((response) => response.data)
        .catch((error) => {
            console.log(error);
            return error.response;
        });
};

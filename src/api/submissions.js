import axios from 'axios';

export const getSubmissionsByUserProblemId = async (user_id, problem_id) => {
    return axios
        .get(`${process.env.REACT_APP_LOCAL_API_URL}/submissions/${user_id}/${problem_id}`)
        .then((response) => response.data)
        .catch((error) => {
            console.log(error);
            return error.response;
        });
};

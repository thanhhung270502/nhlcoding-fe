import axios from "axios";

export const insertUserProblem = async (problem_id, user_id) => {
    return axios
            .post(`${process.env.REACT_APP_LOCAL_API_URL}/user_problems/${user_id}/${problem_id}`, {})
}
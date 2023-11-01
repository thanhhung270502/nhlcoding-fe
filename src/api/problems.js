import axios from 'axios';

export const problemRunCode = async (problem_id, code, language) => {
    return await axios
        .post(`${process.env.REACT_APP_LOCAL_API_URL}/problems/${problem_id}/${language}/run-jobe`, { code: code })
        .then(function (response) {
            console.log(response.data);
            return response.data;
        })
        .catch(function (error) {
            console.log(error);
            return error;
        });
};

export const problemRunCodeWithJobe = async (problem_id, code, language) => {
    return await axios
        .post(`${process.env.REACT_APP_LOCAL_API_URL}/problems/${problem_id}/${language}/run`, { code: code })
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
        .get(`${process.env.REACT_APP_LOCAL_API_URL}/problem_languages/${problem_id}`)
        .then((response) => response.data)
        .catch((error) => {
            console.log(error);
            return error.response;
        });
};

export const getLanguageByID = async (language_id) => {
    return axios
        .get(`${process.env.REACT_APP_LOCAL_API_URL}/languages/${language_id}`)
        .then((response) => response.data)
        .catch((error) => {
            console.log(error);
            return error.response;
        });
};

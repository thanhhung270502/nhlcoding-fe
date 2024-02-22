import axios from 'axios';
import { getAccessToken } from '~/utils';

export const getAllCoursesByMe = async () => {
    return await axios
        .get(`${process.env.REACT_APP_LOCAL_API_URL}/classes/me`, {
            headers: getAccessToken(),
        })
        .then((res) => res.data)
        .catch((err) => {
            return err;
        });
};

export const getAllTopicProblemsByClass = async (class_id) => {
    return await axios
        .get(`${process.env.REACT_APP_LOCAL_API_URL}/classes/${class_id}`, {
            headers: getAccessToken(),
        })
        .then((res) => res.data)
        .catch((err) => {
            return err;
        });
};

export const getParticipantsInClass = async (class_id) => {
    return await axios
        .get(`${process.env.REACT_APP_LOCAL_API_URL}/classes/${class_id}/participants`, {
            headers: getAccessToken(),
        })
        .then((res) => res.data)
        .catch((err) => {
            return err;
        });
};

export const getProject = async () => {
    const response = await axios.get(`https://abc-summer.azurewebsites.net/projects/me`, {
        headers: getAccessToken(),
    });
    return response.data.data;
};

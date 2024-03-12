import axios from 'axios';
import { getAccessToken } from '~/utils';

// [GET]
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

export const getSubjectNameByClassID = async (class_id) => {
    return await axios
        .get(`${process.env.REACT_APP_LOCAL_API_URL}/classes/${class_id}/subjectName`, {
            headers: getAccessToken(),
        })
        .then((res) => res.data)
        .catch((err) => {
            return err;
        });
};

// [POST]
export const createTopicForClass = async (info, class_id) => {
    return await axios
        .post(`${process.env.REACT_APP_LOCAL_API_URL}/classes/${class_id}/createTopic`, info, {
            headers: getAccessToken(),
        })
        .then((res) => res.data)
        .catch((err) => {
            return err;
        });
};

// [POST]
export const createExercise = async (info) => {
    return await axios
        .post(`${process.env.REACT_APP_LOCAL_API_URL}/classes/createExercise`, info, {
            headers: getAccessToken(),
        })
        .then((res) => res.data)
        .catch((err) => {
            return err;
        });
};

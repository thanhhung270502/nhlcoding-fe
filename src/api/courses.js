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

// [GET]
export const getSubmissionTracking = async (topic_problems_id) => {
    return await axios
        .get(`${process.env.REACT_APP_LOCAL_API_URL}/submission_trackings/${topic_problems_id}/all`, {
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

// [POST]
export const createSubmissionTracking = async (info) => {
    return await axios
        .post(`${process.env.REACT_APP_LOCAL_API_URL}/submission_trackings`, info, {
            headers: getAccessToken(),
        })
        .then((res) => res.data)
        .catch((err) => {
            return err;
        });
};

// [POST]
export const privateProblemRunCode = async (problem_id, code, language, submission_trackings_id, datetime) => {
    return await axios
        .post(
            `${process.env.REACT_APP_LOCAL_API_URL}/submission_trackings/${problem_id}/${language}/${submission_trackings_id}/run`,
            { code, datetime },
            {
                headers: getAccessToken(),
            },
        )
        .then(function (response) {
            console.log(response.data);
            return response.data;
        })
        .catch(function (error) {
            console.log(error);
            return error;
        });
};

// [POST]
export const privateProblemSubmitCode = async (submission_trackings_id) => {
    return await axios
        .post(
            `${process.env.REACT_APP_LOCAL_API_URL}/submission_trackings/${submission_trackings_id}/submit`,
            {},
            {
                headers: getAccessToken(),
            },
        )
        .then(function (response) {
            console.log(response.data);
            return response.data;
        })
        .catch(function (error) {
            console.log(error);
            return error;
        });
};

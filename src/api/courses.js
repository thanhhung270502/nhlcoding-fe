import axios from 'axios';
import { getAccessToken } from '~/utils';

export const getAllCoursesByMe = async () => {
    console.log(getAccessToken());
    return await axios
        .get(`${process.env.REACT_APP_LOCAL_API_URL}/classes/me`, {
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

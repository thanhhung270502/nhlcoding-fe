import axios from 'axios';
import { getAccessToken } from '~/utils';

export const getRole = async () => {
    return await axios
        .get(`${process.env.REACT_APP_LOCAL_API_URL}/auth/checkRole`, {
            headers: getAccessToken(),
        })
        .then((res) => res.data)
        .catch((err) => {
            return err;
        });
};

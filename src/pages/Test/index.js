import { getUsers, loginGoogle } from '~/api/api';
import './test.scss';
import axios from 'axios';

function Test() {
    const getAllUsers = async (e) => {
        const res = await getUsers();
        console.log(res);
    };

    const googleAuth = () => {
        window.open(`${process.env.REACT_APP_LOCAL_API_URL}/auth/google`, '_self');
    };

    const loginWithGoogle = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_LOCAL_API_URL}/auth/google`);
            // window.location.href = response.data;
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container">
            <h2 className="pb-5">Test Page</h2>
            <a href={`${process.env.REACT_APP_LOCAL_API_URL}/auth/google`} className="btn btn-success">
                Login google
            </a>
            <button className="btn btn-info" onClick={googleAuth}>
                Login google
            </button>
            <div className="btn btn-info" onClick={getAllUsers}>
                Get all users
            </div>
        </div>
    );
}

export default Test;

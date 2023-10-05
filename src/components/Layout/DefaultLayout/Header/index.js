import { faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUserByID, getUserGoogle, login, logout, logoutGoogle, signup } from '~/api/api';
import { getCookie, setCookie } from '~/api/cookie';
import {
    LoginModal,
    LoginModalTrigger,
    ResetPasswordModal,
    SignupModal,
    SignupModalTrigger,
} from '~/components/Modals/Auth';
import './header.scss';

function Header() {
    const googleAuth = () => {
        window.open(`http://localhost:3000/auth/google/callback`, '_self');
    };

    const [dataLogin, setDataLogin] = useState({
        email: null,
        password: null,
    });

    const handleDataLoginChange = (event) => {
        const { name, value } = event.target;
        setDataLogin((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmitLogin = async (event) => {
        event.preventDefault();
        const res = await login(dataLogin);
        // console.log(res);
        window.location.href = '../';
    };

    const [dataSignUp, setDataSignUp] = useState({
        email: null,
        password: null,
        name: null,
        provider: 'manual',
        avatar: 'https://kenh14cdn.com/203336854389633024/2023/8/9/photo-6-1691581011481133485486.jpg',
        role: 0,
    });

    const handleDataSignUpChange = (event) => {
        const { name, value } = event.target;
        setDataSignUp((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmitSignUp = async (event) => {
        event.preventDefault();
        const res = await signup(dataSignUp);
        window.location.href = '../';
    };

    const [currentUser, setCurrentUser] = useState();

    const handleLogout = () => {
        logout();
        window.location.href = './';
    };

    useEffect(() => {
        (async () => {
            const user_id = getCookie('user_id');
            if (user_id) {
                await getUserByID(user_id).then((data) => {
                    console.log(data.data.body.user);
                    setCurrentUser(data.data.body.user);
                });
            } else {
                const res = await getUserGoogle();
                if (res.code === 200) {
                    await getUserByID(res.body.data.body.user.user_id).then(async (data) => {
                        await logoutGoogle();
                        console.log(data.data.body.user);
                        setCookie('user_id', data.data.body.user.user_id);
                        setCurrentUser(data.data.body.user);
                    });
                } else {
                    console.log('Not');
                    setCurrentUser(null);
                }
            }
        })();
    }, []);

    return (
        <>
            <nav className="navbar navbar-expand-lg">
                <div className="container">
                    <Link className="navbar-brand" to="/">
                        <img className="logo-image" src="/images/logo.png" alt="logo" />
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-between" id="navbarSupportedContent">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" to="/problems">
                                    Problems
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/problem">
                                    Problem
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/contribute">
                                    Contribute
                                </Link>
                            </li>
                            {/* <li className="nav-item">
                                <Link className="nav-link" to="/discuss">
                                    Discuss
                                </Link>
                            </li> */}
                        </ul>
                    </div>
                    {currentUser && (
                        <div className="d-flex gap-3">
                            <div class="dropdown">
                                <div
                                    class="d-flex align-items-center dropdown-toggle"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    <div className="top-header__username">{currentUser.name}</div>
                                    <div className="top-header__avatar">
                                        {currentUser.avatar && <img src={currentUser.avatar} alt="avt"></img>}
                                        {!currentUser.avatar && (
                                            <img
                                                src="https://kenh14cdn.com/203336854389633024/2023/8/9/photo-6-1691581011481133485486.jpg"
                                                alt="avt"
                                            ></img>
                                        )}
                                    </div>
                                </div>

                                <ul class="dropdown-menu">
                                    <li>
                                        <a class="d-flex align-items-center dropdown-item" href="/user">
                                            <div className="top-header__icon col-2">
                                                <FontAwesomeIcon icon={faUser} />
                                            </div>
                                            <div className="col-10">My Profile</div>
                                        </a>
                                    </li>
                                    <li>
                                        <hr class="dropdown-divider" />
                                    </li>
                                    <li>
                                        <button class="d-flex align-items-center dropdown-item" onClick={handleLogout}>
                                            <div className="top-header__icon col-2">
                                                <FontAwesomeIcon icon={faRightFromBracket} />
                                            </div>
                                            <div className="col-10">Log out</div>
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    )}
                    {!currentUser && (
                        <div className="d-flex gap-3">
                            <div className="btn btn-signin btn-text" onClick={() => LoginModalTrigger.open()}>
                                Đăng nhập
                            </div>
                            <div className="btn btn-success btn-text" onClick={() => SignupModalTrigger.open()}>
                                Đăng ký
                            </div>
                        </div>
                    )}
                </div>
            </nav>

            <LoginModal />
            <SignupModal />
            <ResetPasswordModal />
        </>
    );
}

export default Header;

import './header.scss';
import { Modal, useModal } from '~/components/Modals';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons';
import { ImageChangeOnHover } from '~/components/ImageChangeOnHover';
import { useEffect, useState } from 'react';
import { getUserGoogle, getUserByID, login, logout, signup, logoutGoogle } from '~/api/api';
import { getCookie, setCookie } from '~/api/cookie';

function Header() {
    const loginModal = useModal();
    const signupModal = useModal();
    const resetPasswordModal = useModal();

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
                    <a className="navbar-brand" href="/">
                        <img className="logo-image" src="/images/logo.png" alt="*" />
                    </a>
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
                        <ul className="navbar-nav mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link" href="/problems">
                                    Problems
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/problem">
                                    Problem
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/discussion">
                                    Discussion
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/contribute/reason">
                                    Contribute
                                </a>
                            </li>
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
                            <div className="btn btn-signin btn-text" onClick={() => loginModal.open()}>
                                Đăng nhập
                            </div>
                            <div className="btn btn-success btn-text" onClick={() => signupModal.open()}>
                                Đăng ký
                            </div>
                        </div>
                    )}
                </div>
            </nav>

            <Modal register={loginModal} className="header-modal">
                <div className="p-5">
                    <div className="close-icon" onClick={() => loginModal.close()}>
                        <FontAwesomeIcon icon={faClose} />
                    </div>
                    <div className="d-flex justify-content-center mb-4">
                        <img src="/images/logo_v2.png" alt="" height={75} />
                    </div>
                    <form method="POST" action="" onSubmit={handleSubmitLogin}>
                        <div className="mb-3">
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                placeholder="Địa chỉ email"
                                onChange={handleDataLoginChange}
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                name="password"
                                placeholder="Mật khẩu"
                                onChange={handleDataLoginChange}
                            />
                        </div>
                        <div className="d-flex justify-content-center">
                            <button className="login-submit" type="submit">
                                Đăng nhập
                            </button>
                        </div>
                    </form>
                    <div className="d-flex justify-content-between mb-3">
                        <div
                            className="modal-text"
                            onClick={() => {
                                loginModal.toggle();
                                resetPasswordModal.open();
                            }}
                        >
                            Quên mật khẩu?
                        </div>
                        <div
                            className="modal-text"
                            onClick={() => {
                                loginModal.toggle();
                                signupModal.open();
                            }}
                        >
                            Đăng ký
                        </div>
                    </div>
                    <div className="login-alter-text">hoặc có thể đăng nhập với</div>
                    <div className="d-flex justify-content-center gap-2 mb-4">
                        <button onClick={googleAuth} className="border-none">
                            <ImageChangeOnHover
                                defaultSrc={'/images/google.svg'}
                                hoverSrc={'/images/google-hover.svg'}
                            />
                        </button>
                        <ImageChangeOnHover defaultSrc={'/images/github.svg'} hoverSrc={'/images/github-hover.svg'} />
                    </div>
                </div>
            </Modal>

            <Modal register={signupModal} className="header-modal">
                <div className="p-5">
                    <div className="close-icon" onClick={() => signupModal.close()}>
                        <FontAwesomeIcon icon={faClose} />
                    </div>
                    <div className="d-flex justify-content-center mb-4">
                        <img src="/images/logo_v2.png" alt="" height={75}></img>
                    </div>
                    <form method="POST" action="" onSubmit={handleSubmitSignUp}>
                        <div className="mb-3">
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                name="name"
                                placeholder="Tên người dùng"
                                onChange={handleDataSignUpChange}
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                placeholder="Địa chỉ email"
                                onChange={handleDataSignUpChange}
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                name="password"
                                placeholder="Mật khẩu"
                                onChange={handleDataSignUpChange}
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="password"
                                className="form-control"
                                id="confirm-password"
                                name="confirm-password"
                                placeholder="Xác nhận mật khẩu"
                            />
                        </div>
                        <button className="login-submit" type="submit">
                            Đăng ký
                        </button>
                    </form>
                    <div className="d-flex justify-content-center align-items-center mb-3">
                        <div className="signup-alter-text">Đã có tài khoản?</div>
                        <div
                            className="modal-text"
                            onClick={() => {
                                signupModal.toggle();
                                loginModal.open();
                            }}
                        >
                            Đăng nhập
                        </div>
                    </div>
                    <div className="login-alter-text">hoặc có thể đăng nhập với</div>
                    <div className="d-flex justify-content-center gap-2 mb-4">
                        <ImageChangeOnHover defaultSrc={'/images/google.svg'} hoverSrc={'/images/google-hover.svg'} />
                        <ImageChangeOnHover defaultSrc={'/images/github.svg'} hoverSrc={'/images/github-hover.svg'} />
                    </div>
                </div>
            </Modal>

            <Modal register={resetPasswordModal} className="header-modal">
                <div className="p-5">
                    <div className="close-icon" onClick={() => resetPasswordModal.close()}>
                        <FontAwesomeIcon icon={faClose} />
                    </div>
                    <div className="d-flex justify-content-center mb-4">
                        <img src="/images/logo_v2.png" alt="" height={75}></img>
                    </div>
                    <div className="login-alter-text">
                        Quên mật khẩu? Nhập địa chỉ email của bạn bên dưới, chúng tôi sẽ gửi cho bạn một email cho phép
                        bạn đặt lại mật khẩu.
                    </div>
                    <form method="POST" action="">
                        <div className="mb-3 mt-4">
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                placeholder="Địa chỉ email"
                            />
                        </div>
                        <div className="reset-pasword-submit" type="submit">
                            Đặt lại mật khẩu
                        </div>
                    </form>
                    <div className="d-flex justify-content-center align-items-center mb-3">
                        <div className="signup-alter-text">Quay lại?</div>
                        <div
                            className="modal-text"
                            onClick={() => {
                                resetPasswordModal.toggle();
                                loginModal.open();
                            }}
                        >
                            Đăng nhập
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    );
}

export default Header;

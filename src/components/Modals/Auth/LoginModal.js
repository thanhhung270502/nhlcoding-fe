import './auth-modal.scss';
import EventEmitter from 'events';
import React, { useEffect, useState } from 'react';
import { useModal } from '../Modal';
import { Modal } from '..';
import { SignupModalTrigger } from './SignupModal';
import { ResetPasswordModalTrigger } from './ResetPasswordModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { ImageChangeOnHover } from '~/components/ImageChangeOnHover';
import { getUserByID, getUserGoogle, login, logout, logoutGoogle, signup } from '~/api/api';
import clsx from 'clsx';
import styles from '../../Contribute/contribute.module.scss';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

const ee = new EventEmitter();

const LoginModal = () => {
    const loginModal = useModal();

    const [errorEmail, setErrorEmail] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const [errorLogin, setErrorLogin] = useState('');

    useEffect(() => {
        ee.on('open', () => loginModal.open());
        ee.on('close', () => loginModal.close());
        ee.on('toggle', () => loginModal.toggle());
    });

    const googleAuth = () => {
        window.open(`${process.env.REACT_APP_LOCAL_API_URL}/auth/google/callback`, '_self');
    };

    const [dataLogin, setDataLogin] = useState({
        email: null,
        password: null,
    });

    const handleDataLoginChange = (event) => {
        const { name, value } = event.target;

        if (name === 'email' && value.length === 0) {
            localStorage.setItem('loginErrorEmail', 'Missing email');
            setErrorEmail('Missing email');
        } else if (name === 'email' && value.length > 0) {
            localStorage.setItem('loginErrorEmail', '');
            setErrorEmail('');
        }

        if (name === 'password' && value.length === 0) {
            localStorage.setItem('loginErrorPassword', 'Missing password');
            setErrorPassword('Missing password');
        } else if (name === 'password' && value.length > 0) {
            localStorage.setItem('loginErrorPassword', '');
            setErrorPassword('');
        }

        setDataLogin((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmitLogin = async (event) => {
        event.preventDefault();
        if (errorEmail.length > 0 || errorPassword.length > 0) {
            console.log('Missing');
            return;
        }

        const res = await login(dataLogin);
        if (res.code === 401) {
            setErrorLogin('Incorrect password or User is not existed');
        } else {
            var session = {
                accessToken: res.body.accessToken,
                user: res.body.user,
            };
            localStorage.setItem('session', JSON.stringify(session));
            window.location.href = '../';
        }

        // console.log(res);
    };

    useEffect(() => {
        const savedErrorEmail = localStorage.getItem('loginErrorEmail');
        const savedErrorPassword = localStorage.getItem('loginErrorPassword');

        savedErrorEmail && setErrorEmail(savedErrorEmail);
        savedErrorPassword && setErrorPassword(savedErrorPassword);
    }, []);

    return (
        <Modal register={loginModal} className="header-modal">
            <div className="p-5">
                <div className="close-icon" onClick={() => loginModal.close()}>
                    <FontAwesomeIcon icon={faClose} />
                </div>
                <div className="d-flex justify-content-center mb-4">
                    <img src="/images/logo_v2.png" alt="" height={75} />
                </div>
                <form method="POST" action="" onSubmit={handleSubmitLogin}>
                    <div className="mb-3 relative">
                        <input
                            type="email"
                            className={clsx('form-control', styles.input, `${errorEmail ? 'errorInput' : ''}`)}
                            name="email"
                            placeholder="Địa chỉ email"
                            autoComplete="off"
                            onChange={handleDataLoginChange}
                        />
                        {errorEmail && (
                            <div className="d-flex justify-content-end errorText errorPositionText">- {errorEmail}</div>
                        )}
                    </div>
                    <div className="mb-3 relative">
                        <input
                            type="password"
                            className={clsx('form-control', styles.input, `${errorPassword ? 'errorInput' : ''}`)}
                            name="password"
                            placeholder="Mật khẩu"
                            autoComplete="off"
                            onChange={handleDataLoginChange}
                        />
                        {errorPassword && (
                            <div className="d-flex justify-content-end errorText errorPositionText">
                                - {errorPassword}
                            </div>
                        )}
                    </div>
                    {errorLogin && <div className="d-flex justify-content-center errorText mb-3">{errorLogin}</div>}
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
                            loginModal.close();
                            ResetPasswordModalTrigger.open();
                        }}
                    >
                        Quên mật khẩu?
                    </div>
                    <div
                        className="modal-text"
                        onClick={() => {
                            loginModal.close();
                            SignupModalTrigger.open();
                        }}
                    >
                        Đăng ký
                    </div>
                </div>
                <div className="login-alter-text">hoặc có thể đăng nhập với</div>
                <div className="d-flex justify-content-center align-items-end ">
                    <div className="d-flex justify-content-center align-items-center btn-google" onClick={googleAuth}>
                        <FontAwesomeIcon icon={faGoogle} />
                        <span>Google</span>
                        {/*<ImageChangeOnHover defaultSrc={'/images/github.svg'} hoverSrc={'/images/github-hover.svg'} /> */}
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default LoginModal;

export const LoginModalTrigger = {
    open: () => {
        ee.emit('open');
    },
    close: () => {
        ee.emit('close');
    },
    toggle: () => {
        ee.emit('toggle');
    },
};

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
import { getCookie, setCookie } from '~/api/cookie';

const ee = new EventEmitter();

const LoginModal = () => {
    const loginModal = useModal();

    useEffect(() => {
        ee.on('open', () => loginModal.open());
        ee.on('close', () => loginModal.close());
        ee.on('toggle', () => loginModal.toggle());
    });

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
                    <div className="mb-3">
                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            placeholder="Địa chỉ email"
                            autoComplete="off"
                            onChange={handleDataLoginChange}
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            placeholder="Mật khẩu"
                            autoComplete="off"
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
                <div className="d-flex justify-content-center gap-2 mb-4">
                    <button onClick={googleAuth} className="border-none">
                        <ImageChangeOnHover defaultSrc={'/images/google.svg'} hoverSrc={'/images/google-hover.svg'} />
                    </button>
                    {/*<ImageChangeOnHover defaultSrc={'/images/github.svg'} hoverSrc={'/images/github-hover.svg'} /> */}
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

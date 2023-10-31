import './auth-modal.scss';
import EventEmitter from 'events';
import { useEffect, useState } from 'react';
import { useModal } from '../Modal';
import { Modal } from '..';
import { LoginModalTrigger } from './LoginModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { ImageChangeOnHover } from '~/components/ImageChangeOnHover';
import { getUserByID, getUserGoogle, login, logout, logoutGoogle, signup } from '~/api/api';
import { getCookie, setCookie } from '~/api/cookie';

const ee = new EventEmitter();

const SignupModal = () => {
    const signupModal = useModal();

    useEffect(() => {
        ee.on('open', () => signupModal.open());
        ee.on('close', () => signupModal.close());
        ee.on('toggle', () => signupModal.toggle());
    });

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

    const googleAuth = () => {
        window.open(`${process.env.REACT_APP_LOCAL_API_URL}/auth/google/callback`, '_self');
    };

    return (
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
                            LoginModalTrigger.open();
                        }}
                    >
                        Đăng nhập
                    </div>
                </div>
                <div className="login-alter-text">hoặc có thể đăng nhập với</div>
                <div className="d-flex justify-content-center gap-2 mb-4">
                    <button onClick={googleAuth} className="border-none">
                        <ImageChangeOnHover defaultSrc={'/images/google.svg'} hoverSrc={'/images/google-hover.svg'} />
                    </button>
                    {/*<ImageChangeOnHover defaultSrc={'/images/github.svg'} hoverSrc={'/images/github-hover.svg'} />*/}
                </div>
            </div>
        </Modal>
    );
};

export default SignupModal;

export const SignupModalTrigger = {
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

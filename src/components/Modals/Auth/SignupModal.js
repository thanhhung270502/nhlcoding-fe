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
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import clsx from 'clsx';
import styles from '../../Contribute/contribute.module.scss';

const ee = new EventEmitter();

const SignupModal = () => {
    const signupModal = useModal();

    const [errorEmail, setErrorEmail] = useState('');
    const [errorName, setErrorName] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const [errorConfirmPassword, setErrorConfirmPassword] = useState('');
    const [errorSignUp, setErrorSignUp] = useState('');

    useEffect(() => {
        ee.on('open', () => signupModal.open());
        ee.on('close', () => signupModal.close());
        ee.on('toggle', () => signupModal.toggle());
    });

    const [dataSignUp, setDataSignUp] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        name: '',
        provider: 'manual',
        avatar: 'https://kenh14cdn.com/203336854389633024/2023/8/9/photo-6-1691581011481133485486.jpg',
        role: 0,
    });

    const handleDataSignUpChange = (event) => {
        const { name, value } = event.target;
        console.log(name, value.length);

        if (name === 'email' && value.length === 0) {
            localStorage.setItem('signupErrorEmail', 'Missing email');
            setErrorEmail('Missing email');
        } else if (name === 'email' && value.length > 0) {
            localStorage.setItem('signupErrorEmail', '');
            setErrorEmail('');
        }

        if (name === 'name' && value.length === 0) {
            localStorage.setItem('signupErrorName', 'Missing name');
            setErrorName('Missing name');
        } else if (name === 'name' && value.length > 0) {
            localStorage.setItem('signupErrorName', '');
            setErrorName('');
        }

        if (name === 'password' && value.length === 0) {
            localStorage.setItem('signupErrorPassword', 'Missing password');
            setErrorPassword('Missing password');
        } else if (name === 'password' && value.length > 0) {
            localStorage.setItem('signupErrorPassword', '');
            setErrorPassword('');
        }

        if (name === 'confirmPassword' && value.length === 0) {
            localStorage.setItem('signupErrorConfirmPassword', 'Missing confirm-password');
            setErrorConfirmPassword('Missing confirm-password');
        } else if (name === 'confirmPassword' && value.length > 0) {
            localStorage.setItem('signupErrorConfirmPassword', '');
            setErrorConfirmPassword('');
        }

        var newDataSignUp = dataSignUp;
        newDataSignUp[name] = value;
        localStorage.setItem('dataSignUp', JSON.stringify(newDataSignUp));
        setDataSignUp(newDataSignUp);
    };

    const handleSubmitSignUp = async (event) => {
        event.preventDefault();
        if (errorEmail.length > 0 || errorName.length > 0) {
            console.log('Missing');
            return;
        }
        if (dataSignUp.password !== dataSignUp.confirmPassword) {
            // console.log("");
            setErrorSignUp('Password and ConfirmPassword is not the same');
            return;
        }
        const res = await signup(dataSignUp);

        if (res.code === 409) {
            setErrorSignUp('This user has already been existed');
        } else {
            const session = {
                accessToken: res.body.accessToken,
                user: res.body.user,
            };
            localStorage.setItem('session', JSON.stringify(session));
            window.location.href = '../';
        }
    };

    const googleAuth = () => {
        window.open(`${process.env.REACT_APP_LOCAL_API_URL}/auth/google/callback`, '_self');
    };

    useEffect(() => {
        const savedErrorEmail = localStorage.getItem('signupErrorEmail');
        const savedErrorName = localStorage.getItem('signupErrorName');
        const savedErrorPassword = localStorage.getItem('signupErrorPassword');
        const savedErrorConfirmPassword = localStorage.getItem('signupErrorConfirmPassword');
        const savedDataSignUp = localStorage.getItem('dataSignUp');

        savedErrorEmail && setErrorEmail(savedErrorEmail);
        savedErrorName && setErrorName(savedErrorName);
        savedErrorPassword && setErrorPassword(savedErrorPassword);
        savedErrorConfirmPassword && setErrorConfirmPassword(savedErrorConfirmPassword);
        savedDataSignUp && setDataSignUp(JSON.parse(savedDataSignUp));
    }, []);

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
                    <div className="mb-3 relative">
                        <input
                            type="text"
                            className={clsx('form-control', styles.input, `${errorName ? 'errorInput' : ''}`)}
                            id="name"
                            name="name"
                            placeholder="Tên người dùng"
                            onChange={handleDataSignUpChange}
                        />
                        {errorName && (
                            <div className="d-flex justify-content-end errorText errorPositionText">- {errorName}</div>
                        )}
                    </div>
                    <div className="mb-3 relative">
                        <input
                            type="email"
                            className={clsx('form-control', styles.input, `${errorEmail ? 'errorInput' : ''}`)}
                            id="email"
                            name="email"
                            placeholder="Địa chỉ email"
                            onChange={handleDataSignUpChange}
                        />

                        {errorEmail && (
                            <div className="d-flex justify-content-end errorText errorPositionText">- {errorEmail}</div>
                        )}
                    </div>
                    <div className="mb-3 relative">
                        <input
                            type="password"
                            className={clsx('form-control', styles.input, `${errorPassword ? 'errorInput' : ''}`)}
                            id="password"
                            name="password"
                            placeholder="Mật khẩu"
                            onChange={handleDataSignUpChange}
                        />
                        {errorPassword && (
                            <div className="d-flex justify-content-end errorText errorPositionText">
                                - {errorPassword}
                            </div>
                        )}
                    </div>
                    <div className="mb-3 relative">
                        <input
                            type="password"
                            className={clsx(
                                'form-control',
                                styles.input,
                                `${errorConfirmPassword ? 'errorInput' : ''}`,
                            )}
                            id="confirm-password"
                            name="confirmPassword"
                            placeholder="Xác nhận mật khẩu"
                            onChange={handleDataSignUpChange}
                        />
                        {errorConfirmPassword && (
                            <div className="d-flex justify-content-end errorText errorPositionText">
                                - {errorConfirmPassword}
                            </div>
                        )}
                    </div>
                    {errorSignUp && <div className="d-flex justify-content-center errorText mb-3">{errorSignUp}</div>}
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

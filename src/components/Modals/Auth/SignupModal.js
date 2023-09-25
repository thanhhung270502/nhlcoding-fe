import './auth-modal.scss';
import EventEmitter from 'events';
import { useEffect } from 'react';
import { useModal } from '../Modal';
import { Modal } from '..';
import { LoginModalTrigger } from './LoginModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { ImageChangeOnHover } from '~/components/ImageChangeOnHover';

const ee = new EventEmitter();

const SignupModal = () => {
    const signupModal = useModal();

    useEffect(() => {
        ee.on('open', () => signupModal.open());
        ee.on('close', () => signupModal.close());
        ee.on('toggle', () => signupModal.toggle());
    });

    return (
        <Modal register={signupModal} className="header-modal">
            <div className="p-5">
                <div className="close-icon" onClick={() => signupModal.close()}>
                    <FontAwesomeIcon icon={faClose} />
                </div>
                <div className="d-flex justify-content-center mb-4">
                    <img src="/images/logo_v2.png" alt="" height={75}></img>
                </div>
                <form method="POST" action="">
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            name="name"
                            placeholder="Tên người dùng"
                            autoComplete="off"
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="password"
                            className="form-control"
                            name="pasword"
                            placeholder="Mật khẩu"
                            autoComplete="off"
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="password"
                            className="form-control"
                            name="confirm-password"
                            placeholder="Xác nhận mật khẩu"
                            autoComplete="off"
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            placeholder="Địa chỉ email"
                            autoComplete="off"
                        />
                    </div>
                    <div className="login-submit" type="submit">
                        Đăng ký
                    </div>
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
                    <ImageChangeOnHover defaultSrc={'/images/google.svg'} hoverSrc={'/images/google-hover.svg'} />
                    <ImageChangeOnHover defaultSrc={'/images/github.svg'} hoverSrc={'/images/github-hover.svg'} />
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

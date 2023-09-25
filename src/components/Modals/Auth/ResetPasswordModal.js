import './auth-modal.scss';
import EventEmitter from 'events';
import { useModal } from '../Modal';
import { useEffect } from 'react';
import { Modal } from '..';
import { LoginModalTrigger } from './LoginModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

const ee = new EventEmitter();

const ResetPasswordModal = () => {
    const resetPasswordModal = useModal();

    useEffect(() => {
        ee.on('open', () => resetPasswordModal.open());
        ee.on('close', () => resetPasswordModal.close());
        ee.on('toggle', () => resetPasswordModal.toggle());
    });

    return (
        <Modal register={resetPasswordModal} className="header-modal">
            <div className="p-5">
                <div className="close-icon" onClick={() => resetPasswordModal.close()}>
                    <FontAwesomeIcon icon={faClose} />
                </div>
                <div className="d-flex justify-content-center mb-4">
                    <img src="/images/logo_v2.png" alt="" height={75}></img>
                </div>
                <div className="login-alter-text">
                    Quên mật khẩu? Nhập địa chỉ email của bạn bên dưới, chúng tôi sẽ gửi cho bạn một email cho phép bạn
                    đặt lại mật khẩu.
                </div>
                <form method="POST" action="">
                    <div className="mb-3 mt-4">
                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            placeholder="Địa chỉ email"
                            autoComplete="off"
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
                            LoginModalTrigger.open();
                        }}
                    >
                        Đăng nhập
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default ResetPasswordModal;

export const ResetPasswordModalTrigger = {
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

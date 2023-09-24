import './header.scss';
import { Modal, useModal } from '~/components/Modals';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { ImageChangeOnHover } from '~/components/ImageChangeOnHover';
import { useEffect } from 'react';
import { getUser } from '~/api/api';

function Header() {
    const loginModal = useModal();
    const signupModal = useModal();
    const resetPasswordModal = useModal();

    const getAccount = async () => {
        const res = await getUser();
        console.log(res);
    };

    const googleAuth = () => {
        window.open(`http://localhost:3000/auth/google`, '_self');
    };

    useEffect(() => {
        getAccount();
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
                    <div className="d-flex gap-3">
                        <div className="btn btn-signin btn-text" onClick={() => loginModal.open()}>
                            Đăng nhập
                        </div>
                        <div className="btn btn-success btn-text" onClick={() => signupModal.open()}>
                            Đăng ký
                        </div>
                    </div>
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
                    <form method="POST" action="">
                        <div className="mb-3">
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                placeholder="Địa chỉ email"
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                name="password"
                                placeholder="Mật khẩu"
                            />
                        </div>
                        <div className="login-submit" type="submit">
                            Đăng nhập
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
                        <button onClick={googleAuth}>
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
                    <form method="POST" action="">
                        <div className="mb-3">
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                name="name"
                                placeholder="Tên người dùng"
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="password"
                                className="form-control"
                                id="pasword"
                                name="pasword"
                                placeholder="Mật khẩu"
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
                        <div className="mb-3">
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                placeholder="Địa chỉ email"
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

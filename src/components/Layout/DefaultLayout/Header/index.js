import {
    LoginModal,
    LoginModalTrigger,
    ResetPasswordModal,
    SignupModal,
    SignupModalTrigger,
} from '~/components/Modals/Auth';
import './header.scss';
import { Link } from 'react-router-dom';

function Header() {
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
                            <li className="nav-item">
                                <Link className="nav-link" to="/discuss">
                                    Discuss
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="d-flex gap-3">
                        <div className="btn btn-signin btn-text" onClick={() => LoginModalTrigger.open()}>
                            Đăng nhập
                        </div>
                        <div className="btn btn-success btn-text" onClick={() => SignupModalTrigger.open()}>
                            Đăng ký
                        </div>
                    </div>
                </div>
            </nav>

            <LoginModal />
            <SignupModal />
            <ResetPasswordModal />
        </>
    );
}

export default Header;

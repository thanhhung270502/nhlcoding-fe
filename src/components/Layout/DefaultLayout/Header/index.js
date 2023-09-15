import images from '~/assets/images';
import './header.scss';
import LoginModal from '~/components/Modals/LoginModal';

function Header() {
    return (
        <>
            <nav class="navbar navbar-expand-lg">
                <div class="container">
                    <a class="navbar-brand" href="/">
                        <img className="logo-image" src={images.logo} alt="*" />
                    </a>
                    <button
                        class="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse justify-content-between" id="navbarSupportedContent">
                        <ul class="navbar-nav mb-2 mb-lg-0">
                            <li class="nav-item">
                                <a class="nav-link" href="/problem">
                                    Problems
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="/">
                                    Discussion
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="/">
                                    Helpers
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="d-flex gap-3">
                        <a className="btn btn-signin btn-text" href="/account/login">
                            Đăng nhập
                        </a>
                        <a className="btn btn-success btn-text" href="/account/signup">
                            Đăng ký
                        </a>
                    </div>
                </div>
            </nav>

            <LoginModal />
        </>
    );
}

export default Header;

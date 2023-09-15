import images from '~/assets/images';
import './header.scss';

function Header() {
    return (
        <nav class="navbar navbar-expand-lg">
            <div className="container">
                <div class="container-fluid d-flex">
                    <a class="navbar-brand" href="/">
                        <img src={images.logo} alt="" />
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
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <a class="nav-link" href="/problems">
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
                </div>
            </div>
        </nav>
    );
}

export default Header;

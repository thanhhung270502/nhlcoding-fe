import { Link } from 'react-router-dom';
import './footer.scss';

function Footer() {
    return (
        <div className="container d-flex footer-container">
            <span className="copy-right">Copyright © 2023 HNL-Goal Coding</span>
            <nav>
                <div className="container-fluid">
                    <div className="d-flex">
                        <Link class="footer-nav" to="/">
                            Home
                        </Link>
                        <Link class="footer-nav" to="/about">
                            About Us
                        </Link>
                        <Link class="footer-nav" to="/support">
                            Support
                        </Link>
                        <Link class="footer-nav" to="/privacy">
                            Privacy Policy
                        </Link>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Footer;

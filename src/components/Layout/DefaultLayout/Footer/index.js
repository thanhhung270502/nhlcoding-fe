import { Link } from 'react-router-dom';
import './footer.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';

function Footer() {
    return (
        <div className="footer">
            <div className="container footer-container">
                <div className="footer-navbar">
                    <div className="footer-secondary me-3">Copyright © 2023 HNL-Goal Coding</div>
                    <Link className="footer-nav" to="/">
                        Home
                    </Link>
                    <Link className="footer-nav" to="/about">
                        About Us
                    </Link>
                    <Link className="footer-nav" to="/support">
                        Support
                    </Link>
                    <Link className="footer-nav" to="/privacy">
                        Privacy Policy
                    </Link>
                </div>
                <div className="footer-contacts">
                    <span className="footer-secondary">Contact us</span>
                    <a
                        href="https://www.facebook.com/"
                        rel="noreferrer"
                        target="_blank"
                        className="footer-icon icon-facebook"
                    >
                        <FontAwesomeIcon icon={faFacebook} />
                    </a>
                    <a
                        href="https://www.linkedin.com/"
                        rel="noreferrer"
                        target="_blank"
                        className="footer-icon icon-linkedin"
                    >
                        <FontAwesomeIcon icon={faLinkedin} />
                    </a>
                    <a
                        href="https://www.instagram.com/"
                        rel="noreferrer"
                        target="_blank"
                        className="footer-icon icon-instagram"
                    >
                        <FontAwesomeIcon icon={faInstagram} />
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Footer;

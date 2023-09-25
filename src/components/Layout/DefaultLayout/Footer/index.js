import { Link } from 'react-router-dom';
import './footer.scss';

function Footer() {
    return (
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
                <a href="https://www.facebook.com/" rel="noreferrer" target="_blank">
                    <img src="/images/facebook.svg" alt="facebook" className="footer-contact" />
                </a>
                <a href="https://www.linkedin.com/" rel="noreferrer" target="_blank">
                    <img src="/images/linkedin.svg" alt="linkedin" className="footer-contact" />
                </a>
                <a href="https://www.instagram.com/" rel="noreferrer" target="_blank">
                    <img src="/images/instagram.svg" alt="instagram" className="footer-contact" />
                </a>
            </div>
        </div>
    );
}

export default Footer;

import { Link } from 'react-router-dom';
import './footer.scss';

function Footer() {
    return (
        <div className="container footer-container">
            <div className="footer-navbar">
                <div className="footer-secondary me-3">Copyright © 2023 HNL-Goal Coding</div>
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
            <div className="footer-contacts">
                <span className="footer-secondary">Contact us</span>
                <Link to="https://www.facebook.com/">
                    <img src="/images/facebook.svg" alt="facebook" className="footer-contact" />
                </Link>
                <Link to="https://www.linkedin.com/">
                    <img src="/images/linkedin.svg" alt="linkedin" className="footer-contact" />
                </Link>
                <Link to="https://www.instagram.com/">
                    <img src="/images/instagram.svg" alt="instagram" className="footer-contact" />
                </Link>
            </div>
        </div>
    );
}

export default Footer;

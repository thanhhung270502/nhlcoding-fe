import './not-found.scss';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="not-found-container">
            <div className="not-found-info">
                <img src="/images/404.png" alt="404" height={300} />
                <div className="ms-4 mt-4">
                    <h3>Page Not Found</h3>
                    <p>
                        We're sorry, but the page you're <br />
                        looking for does not exist.
                    </p>
                    <div className="d-flex btn btn-back-home mt-5">
                        <div className="me-2">
                            <FontAwesomeIcon fontSize={18} icon={faHome} />
                        </div>
                        <Link to="/">Back to home</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFound;

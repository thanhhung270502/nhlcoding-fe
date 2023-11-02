import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate } from 'react-router-dom';
import './contribute.scss';
import { createProblem } from '~/api/problems';

const Contribute = ({ contributeStep, mainChild, rightChild }) => {
    const routeStep = [
        '/contribute',
        '/contribute/reason',
        '/contribute/question',
        '/contribute/solutions',
        '/contribute/testcases',
        '/contribute/success',
    ];

    const navigate = useNavigate();

    const handleSubmit = async () => {
        // validate form data

        const submitData = {
            code: localStorage.code ? localStorage.code : '',
            desc: localStorage.desc ? localStorage.desc : '',
            reason: localStorage.reason ? localStorage.reason : '',
            selectedOption: localStorage.selectedOption ? JSON.parse(localStorage.selectedOption) : null,
            solutions: localStorage.solutions ? localStorage.solutions : '',
            testcases: localStorage.testcases ? JSON.parse(localStorage.testcases) : [],
            title: localStorage.title ? localStorage.title : '',
            validate: localStorage.validate ? true : false,
        };

        // run code if "validate" is "true"

        console.log(submitData);
        const res = await createProblem(submitData);

        // send data to back-end server

        // clear localStorage() - actually used after response is successful
        localStorage.clear();

        navigate('/contribute/success');
    };

    return (
        <div className="container">
            <div className={`contribute-navbar-container ${contributeStep === 5 ? 'disabled-div' : ''}`}>
                <div className="contribute-navbar-line">
                    <div className="contribute-navbar-line-segment-container">
                        <div className={`contribute-navbar-line-segment contribute-navbar-line-segment-entered`}></div>
                    </div>
                    <div className="contribute-navbar-line-segment-container">
                        <div
                            className={`contribute-navbar-line-segment ${
                                contributeStep >= 2 ? 'contribute-navbar-line-segment-entered' : ''
                            }`}
                        ></div>
                    </div>
                    <div className="contribute-navbar-line-segment-container">
                        <div
                            className={`contribute-navbar-line-segment ${
                                contributeStep >= 3 ? 'contribute-navbar-line-segment-entered' : ''
                            }`}
                        ></div>
                    </div>
                    <div className="contribute-navbar-line-segment-container">
                        <div
                            className={`contribute-navbar-line-segment ${
                                contributeStep >= 4 ? 'contribute-navbar-line-segment-entered' : ''
                            }`}
                        ></div>
                    </div>
                    <div className="contribute-navbar-line-segment-container">
                        <div
                            className={`contribute-navbar-line-segment ${
                                contributeStep >= 5 ? 'contribute-navbar-line-segment-entered' : ''
                            }`}
                        ></div>
                    </div>
                </div>
                <div className="w-100">
                    <div className="contribute-navbar-steps">
                        <Link to="/contribute/reason">
                            <div className="contribute-navbar-step">
                                <div
                                    className={`contribute-navbar-step-label ${
                                        contributeStep === 1 ? 'contribute-navbar-step-label-active' : ''
                                    }`}
                                >
                                    Reason
                                </div>
                                <div
                                    className={`contribute-navbar-step-circle ${
                                        contributeStep >= 1 ? 'contribute-navbar-step-circle-entered' : ''
                                    }`}
                                >
                                    <svg
                                        height="36"
                                        width="36"
                                        className={`contribute-navbar-step-svg ${
                                            contributeStep >= 1 ? 'contribute-navbar-step-svg-entered' : ''
                                        }`}
                                    >
                                        <circle cx="18" cy="18" r="12.5"></circle>
                                    </svg>
                                </div>
                            </div>
                        </Link>
                        <Link to="/contribute/question">
                            <div className="contribute-navbar-step">
                                <div
                                    className={`contribute-navbar-step-label ${
                                        contributeStep === 2 ? 'contribute-navbar-step-label-active' : ''
                                    }`}
                                >
                                    Question
                                </div>
                                <div
                                    className={`contribute-navbar-step-circle ${
                                        contributeStep >= 2 ? 'contribute-navbar-step-circle-entered' : ''
                                    }`}
                                >
                                    <svg
                                        height="36"
                                        width="36"
                                        className={`contribute-navbar-step-svg ${
                                            contributeStep >= 2 ? 'contribute-navbar-step-svg-entered' : ''
                                        }`}
                                    >
                                        <circle cx="18" cy="18" r="12.5"></circle>
                                    </svg>
                                </div>
                            </div>
                        </Link>
                        <Link to="/contribute/solutions">
                            <div className="contribute-navbar-step">
                                <div
                                    className={`contribute-navbar-step-label ${
                                        contributeStep === 3 ? 'contribute-navbar-step-label-active' : ''
                                    }`}
                                >
                                    Solutions
                                </div>
                                <div
                                    className={`contribute-navbar-step-circle ${
                                        contributeStep >= 3 ? 'contribute-navbar-step-circle-entered' : ''
                                    }`}
                                >
                                    <svg
                                        height="36"
                                        width="36"
                                        className={`contribute-navbar-step-svg ${
                                            contributeStep >= 3 ? 'contribute-navbar-step-svg-entered' : ''
                                        }`}
                                    >
                                        <circle cx="18" cy="18" r="12.5"></circle>
                                    </svg>
                                </div>
                            </div>
                        </Link>
                        <Link to="/contribute/testcases">
                            <div className="contribute-navbar-step">
                                <div
                                    className={`contribute-navbar-step-label ${
                                        contributeStep === 4 ? 'contribute-navbar-step-label-active' : ''
                                    }`}
                                >
                                    Testcases
                                </div>
                                <div
                                    className={`contribute-navbar-step-circle ${
                                        contributeStep >= 4 ? 'contribute-navbar-step-circle-entered' : ''
                                    }`}
                                >
                                    <svg
                                        height="36"
                                        width="36"
                                        className={`contribute-navbar-step-svg ${
                                            contributeStep >= 4 ? 'contribute-navbar-step-svg-entered' : ''
                                        }`}
                                    >
                                        <circle cx="18" cy="18" r="12.5"></circle>
                                    </svg>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="contribute-body-main col-md-7">{mainChild}</div>
                <div className="contribute-body-right col-md-5">{rightChild}</div>
            </div>
            {contributeStep < 5 && (
                <div className="contribute-footer-container">
                    <div className="contribute-footer">
                        {contributeStep !== 1 ? (
                            <Link to={routeStep[contributeStep - 1]} className="contribute-nav-btn">
                                <FontAwesomeIcon icon={faArrowLeft} />
                            </Link>
                        ) : (
                            <div></div>
                        )}
                        {contributeStep !== 4 ? (
                            <Link to={routeStep[contributeStep + 1]} className="contribute-nav-btn">
                                <FontAwesomeIcon icon={faArrowRight} />
                            </Link>
                        ) : (
                            <div className="btn btn-submit-contribute" type="submit" onClick={handleSubmit}>
                                Submit
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Contribute;

import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate } from 'react-router-dom';
import './contribute.scss';
import { createProblem } from '~/api/problems';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Contribute = ({ contributeStep, mainChild, rightChild }) => {
    const routeStep = [
        '/contribute',
        '/contribute/reason',
        '/contribute/question',
        '/contribute/solutions',
        '/contribute/codes',
        '/contribute/testcases',
        '/contribute/success',
    ];

    const navigate = useNavigate();

    const handleSubmit = async () => {
        // validate form data
        var errors = [];

        var reason = localStorage.getItem('reason');
        if (!reason) {
            errors.push('reason');
        }

        var question = JSON.parse(localStorage.getItem('question'));
        if (!question) {
            errors.push('question');
        } else {
            if (question.title === '') errors.push('question.title');
            if (question.description === '') errors.push('question.description');
            if (question.languages.length === 0) errors.push('question.languages');
            if (question.level === '') errors.push('question.level');
        }

        var solutions = localStorage.getItem('solutions');
        if (!solutions) {
            errors.push('solutions');
        }

        var testcases = JSON.parse(localStorage.getItem('testcases'));
        if (!testcases) {
            errors.push('testcases');
        }

        var validate = JSON.parse(localStorage.getItem('validate'));

        var cpp_code = JSON.parse(localStorage.getItem('cpp_code'));
        var python_code = JSON.parse(localStorage.getItem('python_code'));

        for (var i = 0; i < question.languages.length; i++) {
            // python
            if (question.languages[i].id === 1) {
                if (python_code.initialCode === '') errors.push('python_code.initialCode');
                if (python_code.solutionCode === '') errors.push('python_code.solutionCode');
                if (python_code.fullCode === '') errors.push('python_code.fullCode');
            }
            // cpp
            if (question.languages[i].id === 2) {
                if (cpp_code.initialCode === '') errors.push('cpp_code.initialCode');
                if (cpp_code.solutionCode === '') errors.push('cpp_code.solutionCode');
                if (cpp_code.fullCode === '') errors.push('cpp_code.fullCode');
            }
        }

        if (errors.length === 0) {
            var problem_languages = [];
            for (var i = 0; i < question.languages.length; i++) {
                // python
                if (question.languages[i].id === 1) {
                    problem_languages.push({
                        language_id: question.languages[i].id,
                        initialCode: python_code.initialCode,
                        solutionCode: python_code.solutionCode,
                        fullCode: python_code.fullCode,
                    });
                } else if (question.languages[i].id === 2) {
                    problem_languages.push({
                        language_id: question.languages[i].id,
                        initialCode: cpp_code.initialCode,
                        solutionCode: cpp_code.solutionCode,
                        fullCode: cpp_code.fullCode,
                    });
                }
            }

            const submitData = {
                reason: reason,
                title: question.title,
                description: question.description,
                languages: question.languages,
                level_id: question.level.id,
                solutions: solutions,
                validate: validate,
                problem_languages: problem_languages,
                testcases: testcases,
            };
            // const submitData = {
            //     code: localStorage.code ? localStorage.code : '',
            //     desc: localStorage.desc ? localStorage.desc : '',
            //     reason: localStorage.reason ? localStorage.reason : '',

            //     solutions: localStorage.solutions ? localStorage.solutions : '',
            //     testcases: localStorage.testcases ? JSON.parse(localStorage.testcases) : [],
            //     title: localStorage.title ? localStorage.title : '',
            //     validate: localStorage.validate ? true : false,
            // };

            // run code if "validate" is "true"
            console.log(submitData);
            const res = await createProblem(submitData);

            // send data to back-end server

            // clear localStorage() - actually used after response is successful
            // localStorage.clear();

            // navigate('/contribute/success');
        } else {
            var textError = 'Fields ';
            for (let i = 0; i < errors.length; i++) {
                if (i === errors.length - 1) {
                    textError += errors[i];
                } else textError += errors[i] + ', ';
            }
            textError += ' are empty';
            toast(textError);
        }
    };

    return (
        <div className="container">
            <div className={`contribute-navbar-container ${contributeStep === 6 ? 'disabled-div' : ''}`}>
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
                    <div className="contribute-navbar-line-segment-container">
                        <div
                            className={`contribute-navbar-line-segment ${
                                contributeStep >= 6 ? 'contribute-navbar-line-segment-entered' : ''
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
                        <Link to="/contribute/codes">
                            <div className="contribute-navbar-step">
                                <div
                                    className={`contribute-navbar-step-label ${
                                        contributeStep === 4 ? 'contribute-navbar-step-label-active' : ''
                                    }`}
                                >
                                    Codes
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
                        <Link to="/contribute/testcases">
                            <div className="contribute-navbar-step">
                                <div
                                    className={`contribute-navbar-step-label ${
                                        contributeStep === 5 ? 'contribute-navbar-step-label-active' : ''
                                    }`}
                                >
                                    Testcases
                                </div>
                                <div
                                    className={`contribute-navbar-step-circle ${
                                        contributeStep >= 5 ? 'contribute-navbar-step-circle-entered' : ''
                                    }`}
                                >
                                    <svg
                                        height="36"
                                        width="36"
                                        className={`contribute-navbar-step-svg ${
                                            contributeStep >= 5 ? 'contribute-navbar-step-svg-entered' : ''
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
            <div className="row mb-5">
                <div className="contribute-body-main col-md-7">{mainChild}</div>
                <div className="contribute-body-right col-md-5">{rightChild}</div>
            </div>
            <ToastContainer />
            {contributeStep < 6 && (
                <div className="d-flex justify-content-center contribute-footer-container">
                    <div className="col-6 contribute-footer">
                        {contributeStep !== 1 ? (
                            <Link className="contribute-nav-btn" to={routeStep[contributeStep - 1]}>
                                <FontAwesomeIcon icon={faArrowLeft} />
                            </Link>
                        ) : (
                            <div></div>
                        )}
                        {contributeStep !== 5 ? (
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

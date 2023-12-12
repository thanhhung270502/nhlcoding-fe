import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createProblem, validateDescription } from '~/api/problems';
import styles from './contribute.module.scss';
import './contribute.scss';

const Contribute = ({ contributeStep, mainChild, rightChild }) => {
    const routeStep = [
        '/contribute',
        '/contribute/reason',
        '/contribute/question',
        '/contribute/instruction',
        '/contribute/codes',
        '/contribute/testcases',
        '/contribute/success',
    ];

    const navigate = useNavigate();

    const clearStorage = () => {
        localStorage.setItem('reason', '');
        localStorage.setItem('question', '');
        localStorage.setItem('instruction', '');
        localStorage.setItem('testcases', '');
        localStorage.setItem('cpp_code', '');
        localStorage.setItem('python_code', '');

        localStorage.setItem('errorReason', '');
        localStorage.setItem('errorQuestclearStorageionTitle', '');
        localStorage.setItem('errorQuestionDescription', '');
        localStorage.setItem('errorQuestionLanguages', '');
        localStorage.setItem('errorQuestionLevel', '');
        localStorage.setItem('errorInstruction', '');
        localStorage.setItem('errorPythonInitialCode', '');
        localStorage.setItem('errorPythonSolutionCode', '');
        localStorage.setItem('errorPythonFullCode', '');
        localStorage.setItem('errorCppInitialCode', '');
        localStorage.setItem('errorCppSolutionCode', '');
        localStorage.setItem('errorCppFullCode', '');
    };

    const handleSubmit = async () => {
        // validate form data
        var errors = [];
        var errorValidate = '';

        var reason = localStorage.getItem('reason');
        if (!reason) {
            errors.push('reason');
            localStorage.setItem('errorReason', 'Missing reason');
        } else {
            localStorage.setItem('errorReason', '');
        }

        var question = localStorage.getItem('question');
        var validate = JSON.parse(localStorage.getItem('validate'));
        if (!question) {
            errors.push('question');
            localStorage.setItem('errorQuestionTitle', 'Missing question.title');
            localStorage.setItem('errorQuestionDescription', 'Missing question.description');
            localStorage.setItem('errorQuestionLanguages', 'Missing question.languages');
            localStorage.setItem('errorQuestionLevel', 'Missing question.level');
        } else {
            question = JSON.parse(question);
            if (question.title === '') {
                errors.push('question.title');
                localStorage.setItem('errorQuestionTitle', 'Missing question.title');
            } else {
                localStorage.setItem('errorQuestionTitle', '');
            }

            if (question.description === '') {
                errors.push('question.description');
                localStorage.setItem('errorQuestionDescription', 'Missing question.description');
            } else {
                localStorage.setItem('errorQuestionDescription', '');
                const res = await validateDescription(question.description);
                if (res.isValid === false) {
                    errorValidate = 'question.description is invalid';
                    localStorage.setItem('errorQuestionDescription', 'Question.description is invalid');
                } else {
                    localStorage.setItem('errorQuestionDescription', '');
                }
            }

            if (question.languages.length === 0) {
                errors.push('question.languages');
                localStorage.setItem('errorQuestionLanguages', 'Missing question.languages');
            } else {
                localStorage.setItem('errorQuestionLanguages', '');
            }

            if (question.level === '') {
                errors.push('question.level');
                localStorage.setItem('errorQuestionLevel', 'Missing question.level');
            } else {
                localStorage.setItem('errorQuestionLevel', '');
            }
        }

        var instruction = localStorage.getItem('instruction');
        // if (!instruction) {
        //     errors.push('instruction');
        //     localStorage.setItem('errorInstruction', 'Missing instruction');
        // } else {
        //     localStorage.setItem('errorInstruction', '');
        // }

        var testcases = localStorage.getItem('testcases');
        if (!testcases) {
            errors.push('testcases');
            localStorage.setItem('errorTestcases', 'Missing testcases');
        } else {
            testcases = JSON.parse(testcases);
            localStorage.setItem('errorTestcases', '');
        }

        var cpp_code = localStorage.getItem('cpp_code');
        var python_code = localStorage.getItem('python_code');

        if (question)
            for (let i = 0; i < question.languages.length; i++) {
                // python
                if (question.languages[i].id === 1) {
                    if (python_code) {
                        python_code = JSON.parse(python_code);
                        if (python_code.initialCode.length === 0) {
                            errors.push('python_code.initialCode');
                            localStorage.setItem('errorPythonInitialCode', 'Missing initial code');
                        } else {
                            localStorage.setItem('errorPythonInitialCode', '');
                        }
                        if (python_code.solutionCode.length === 0) {
                            errors.push('python_code.solutionCode');
                            localStorage.setItem('errorPythonSolutionCode', 'Missing solution code');
                        } else {
                            localStorage.setItem('errorPythonSolutionCode', '');
                        }
                        if (python_code.fullCode.length === 0) {
                            errors.push('python_code.fullCode');
                            localStorage.setItem('errorPythonFullCode', 'Missing full code');
                        } else {
                            localStorage.setItem('errorPythonFullCode', '');
                        }
                    } else {
                        errors.push('python_code.initialCode');
                        localStorage.setItem('errorPythonInitialCode', 'Missing initial code');
                        errors.push('python_code.solutionCode');
                        localStorage.setItem('errorPythonSolutionCode', 'Missing solution code');
                        errors.push('python_code.fullCode');
                        localStorage.setItem('errorPythonFullCode', 'Missing full code');
                    }
                }
                // cpp
                if (question.languages[i].id === 2) {
                    if (cpp_code) {
                        cpp_code = JSON.parse(cpp_code);
                        if (cpp_code.initialCode.length === 0) {
                            errors.push('cpp_code.initialCode');
                            localStorage.setItem('errorCppInitialCode', 'Missing initial code');
                        } else {
                            localStorage.setItem('errorCppInitialCode', '');
                        }
                        if (cpp_code.solutionCode.length === 0) {
                            errors.push('cpp_code.solutionCode');
                            localStorage.setItem('errorCppSolutionCode', 'Missing solution code');
                        } else {
                            localStorage.setItem('errorCppSolutionCode', '');
                        }
                        if (cpp_code.fullCode.length === 0) {
                            errors.push('cpp_code.fullCode');
                            localStorage.setItem('errorCppFullCode', 'Missing full code');
                        } else {
                            localStorage.setItem('errorCppFullCode', '');
                        }
                    }
                }
            }

        if (errors.length === 0 && errorValidate.length === 0) {
            var problem_languages = [];
            for (let i = 0; i < question.languages.length; i++) {
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
                instruction: instruction,
                validate: validate,
                problem_languages: problem_languages,
                testcases: testcases,
            };

            // run code if "validate" is "true"
            // console.log(submitData);
            clearStorage();
            const res = await createProblem(submitData);
            // console.log(res);
            navigate('/contribute/success');
        } else {
            var textError = 'Fields ';
            for (let i = 0; i < errors.length; i++) {
                if (i === errors.length - 1) {
                    textError += errors[i];
                } else textError += errors[i] + ', ';
            }
            if (errors.length === 1) textError += ' is empty';
            else textError += ' are empty';

            if (errorValidate.length > 0) {
                textError += '; ' + errorValidate;
            }
            toast(textError);
        }
    };

    return (
        <div className={clsx('container', styles.contributeContainer)}>
            <div className={`contribute-navbar-container ${contributeStep === 6 ? 'disabled-div' : ''}`}>
                <div className="contribute-navbar-line">
                    <div className="contribute-navbar-line-segment-container">
                        <div className={`contribute-navbar-line-segment contribute-navbar-line-segment-entered`}></div>
                    </div>
                    <div className="contribute-navbar-line-segment-container">
                        <div
                            className={`contribute-navbar-line-segment ${contributeStep >= 2 ? 'contribute-navbar-line-segment-entered' : ''
                                }`}
                        ></div>
                    </div>
                    <div className="contribute-navbar-line-segment-container">
                        <div
                            className={`contribute-navbar-line-segment ${contributeStep >= 3 ? 'contribute-navbar-line-segment-entered' : ''
                                }`}
                        ></div>
                    </div>
                    <div className="contribute-navbar-line-segment-container">
                        <div
                            className={`contribute-navbar-line-segment ${contributeStep >= 4 ? 'contribute-navbar-line-segment-entered' : ''
                                }`}
                        ></div>
                    </div>
                    <div className="contribute-navbar-line-segment-container">
                        <div
                            className={`contribute-navbar-line-segment ${contributeStep >= 5 ? 'contribute-navbar-line-segment-entered' : ''
                                }`}
                        ></div>
                    </div>
                    <div className="contribute-navbar-line-segment-container">
                        <div
                            className={`contribute-navbar-line-segment ${contributeStep >= 6 ? 'contribute-navbar-line-segment-entered' : ''
                                }`}
                        ></div>
                    </div>
                </div>
                <div className="w-100">
                    <div className="contribute-navbar-steps">
                        <Link to="/contribute/reason">
                            <div className="contribute-navbar-step">
                                <div
                                    className={`contribute-navbar-step-label ${contributeStep === 1 ? 'contribute-navbar-step-label-active' : ''
                                        }`}
                                >
                                    Reason
                                </div>
                                <div
                                    className={`contribute-navbar-step-circle ${contributeStep >= 1 ? 'contribute-navbar-step-circle-entered' : ''
                                        }`}
                                >
                                    <svg
                                        height="36"
                                        width="36"
                                        className={`contribute-navbar-step-svg ${contributeStep >= 1 ? 'contribute-navbar-step-svg-entered' : ''
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
                                    className={`contribute-navbar-step-label ${contributeStep === 2 ? 'contribute-navbar-step-label-active' : ''
                                        }`}
                                >
                                    Question
                                </div>
                                <div
                                    className={`contribute-navbar-step-circle ${contributeStep >= 2 ? 'contribute-navbar-step-circle-entered' : ''
                                        }`}
                                >
                                    <svg
                                        height="36"
                                        width="36"
                                        className={`contribute-navbar-step-svg ${contributeStep >= 2 ? 'contribute-navbar-step-svg-entered' : ''
                                            }`}
                                    >
                                        <circle cx="18" cy="18" r="12.5"></circle>
                                    </svg>
                                </div>
                            </div>
                        </Link>
                        <Link to="/contribute/instruction">
                            <div className="contribute-navbar-step">
                                <div
                                    className={`contribute-navbar-step-label ${contributeStep === 3 ? 'contribute-navbar-step-label-active' : ''
                                        }`}
                                >
                                    Instruction
                                </div>
                                <div
                                    className={`contribute-navbar-step-circle ${contributeStep >= 3 ? 'contribute-navbar-step-circle-entered' : ''
                                        }`}
                                >
                                    <svg
                                        height="36"
                                        width="36"
                                        className={`contribute-navbar-step-svg ${contributeStep >= 3 ? 'contribute-navbar-step-svg-entered' : ''
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
                                    className={`contribute-navbar-step-label ${contributeStep === 4 ? 'contribute-navbar-step-label-active' : ''
                                        }`}
                                >
                                    Codes
                                </div>
                                <div
                                    className={`contribute-navbar-step-circle ${contributeStep >= 4 ? 'contribute-navbar-step-circle-entered' : ''
                                        }`}
                                >
                                    <svg
                                        height="36"
                                        width="36"
                                        className={`contribute-navbar-step-svg ${contributeStep >= 4 ? 'contribute-navbar-step-svg-entered' : ''
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
                                    className={`contribute-navbar-step-label ${contributeStep === 5 ? 'contribute-navbar-step-label-active' : ''
                                        }`}
                                >
                                    Testcases
                                </div>
                                <div
                                    className={`contribute-navbar-step-circle ${contributeStep >= 5 ? 'contribute-navbar-step-circle-entered' : ''
                                        }`}
                                >
                                    <svg
                                        height="36"
                                        width="36"
                                        className={`contribute-navbar-step-svg ${contributeStep >= 5 ? 'contribute-navbar-step-svg-entered' : ''
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

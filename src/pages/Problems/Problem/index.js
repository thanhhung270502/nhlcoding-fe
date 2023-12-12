import { faChevronDown, faGear, faRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { langs } from '@uiw/codemirror-extensions-langs';
import { xcodeLight } from '@uiw/codemirror-theme-xcode';
import CodeMirror from '@uiw/react-codemirror';
import $ from 'jquery';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Split from 'react-split-grid';

import Loading from '~/components/Loading';
import Description from './description';
import Editorial from './editorial';
import Solution from './solutions';
import Submission from './submission';

import clsx from 'clsx';
import styles from './console.module.scss';
import './console.scss';
import './problem.scss';

import { getProblemLanguagesByProblemID } from '~/api/problem_languages';
import { problemRunCode } from '~/api/problems';
import { createSubmission } from '~/api/submissions';
import { getTestcaseByProblemID } from '~/api/testcases';
import { insertUserProblem } from '~/api/user_problems';
import { getCurrentTimeFormatted } from '~/utils';

function Problem() {
    const { id } = useParams();
    const navigate = useNavigate();
    const params = new URLSearchParams(window.location.search);
    const tab = typeof params.get('tab') === 'string' ? params.get('tab') : undefined;

    useEffect(() => {
        if (!tab) {
            navigate(`/problems/${id}?tab=description`);
        }
    }, [tab, id, navigate]);

    useEffect(() => {
        document.body.style.overflowY = 'hidden';

        return () => {
            document.body.style.overflowY = 'auto';
        };
    }, []);

    useEffect(() => {
        let split = $('.split');
        split[0].style.height = 'calc(100vh - 59px)';
        split[0].style.overflow = 'hidden auto';
    }, []);

    const [code, setCode] = useState('');
    const [languages, setLanguages] = useState([]);
    const [activeLanguage, setActiveLanguage] = useState({
        id: 0,
        name: '',
        initialcode: '',
    });

    // Handle problem_languages and generate default case
    useEffect(() => {
        async function fetchProblemLanguagesByProblemID(problem_id) {
            const res = await getProblemLanguagesByProblemID(problem_id);
            // console.log(res);
            setLanguages(res.body);
            const { language_id, name, initial_code } = res.body.find(
                (item) => item.problem_id === parseInt(id)
            );
            const lang_obj = { id: language_id, name: name, initialcode: convertCode(initial_code) };
            if (!localStorage.getItem('active_language')) {
                setActiveLanguage(lang_obj);
                localStorage.setItem('active_language', JSON.stringify(lang_obj));
            }

            if (!localStorage.getItem(`${id}_${name}`)) {
                setCode(convertCode(initial_code));
                localStorage.setItem(`${id}_${name}`, initial_code);
            }
        }
        fetchProblemLanguagesByProblemID(id);
    }, [id]);

    // Handle change language
    const handleLanguageChange = (e) => {
        const lang_name = e.target.innerText;
        const { language_id, name, initial_code } = languages.find(
            (item) => item.name === lang_name && item.problem_id === parseInt(id),
        );
        const lang_obj = { id: language_id, name: name, initialcode: convertCode(initial_code) };

        setActiveLanguage(lang_obj);
        localStorage.setItem('active_language', JSON.stringify(lang_obj));

        if (!localStorage.getItem(`${id}_${name}`)) {
            setCode(convertCode(initial_code));
            localStorage.setItem(`${id}_${name}`, initial_code);
        } else {
            setCode(convertCode(localStorage.getItem(`${id}_${name}`)));
        }
    };

    // Handle change code
    const convertCode = (code) => {
        if (!code) return '';
        code = code.replaceAll('\\n', '\n');
        code = code.replaceAll('\\t', '\t');
        return code;
    };

    const onChange = useCallback(
        (value, viewUpdate) => {
            setCode(convertCode(value));
            const active_language = JSON.parse(localStorage.getItem('active_language'));
            if (active_language !== null && active_language !== undefined) {
                localStorage.setItem(`${id}_${active_language.name}`, value);
            } else {
                return;
            }
        },
        [id],
    );

    const handleResetCode = () => {
        const { initialcode } = JSON.parse(localStorage.getItem('active_language'));
        setCode(convertCode(initialcode));
    };

    useEffect(() => {
        const active_language = JSON.parse(localStorage.getItem('active_language'));

        if (active_language) {
            setActiveLanguage(active_language);
            setCode(convertCode(localStorage.getItem(`${id}_${active_language.name}`)));
        }
    }, [id]);

    // ---------------------------------------------------------------- //
    // File: console.js
    const [currentCaseTest, setCurrentCaseTest] = useState(0);
    const [currentCaseResult, setCurrentCaseResult] = useState(0);
    const [currentConsoleNav, setCurrentConsoleNav] = useState(0);
    const [run, setRun] = useState(false);
    const [currentResult, setCurrentResult] = useState([
        {
            success: true,
        },
    ]);
    const [testcases, setTestcases] = useState([
        {
            input: '',
            output: '',
        },
    ]);

    useEffect(() => {
        async function fetchTestcaseByProblemID(problem_id) {
            const res = await getTestcaseByProblemID(problem_id);
            setTestcases(res.body.testcases.slice(0, 3));
        }
        fetchTestcaseByProblemID(id);
    }, [id]);

    const handleToggleConsole = () => {
        var gridRow = $('.grid-row');
        var problemConsoleNav = $('.problemConsoleNav');
        var problemConsoleBody = $('.problemConsoleBody');

        if (gridRow[0].classList.contains('openConsole')) {
            gridRow[0].style.gridTemplateRows = null;
            gridRow[0].classList.remove('openConsole');
            gridRow[0].classList.add('closeConsole');
            problemConsoleNav[0].classList.add('hide');
            problemConsoleBody[0].classList.add('hide');
        } else if (gridRow[0].classList.contains('closeConsole')) {
            gridRow[0].style.gridTemplateRows = null;
            gridRow[0].classList.remove('closeConsole');
            gridRow[0].classList.add('openConsole');
            problemConsoleNav[0].classList.remove('hide');
            problemConsoleBody[0].classList.remove('hide');
        }
    };

    const handleOpenConsole = () => {
        var gridRow = $('.grid-row');
        var problemConsoleNav = $('.problemConsoleNav');
        var problemConsoleBody = $('.problemConsoleBody');

        if (gridRow[0].classList.contains('closeConsole')) {
            gridRow[0].style.gridTemplateRows = null;
            gridRow[0].classList.remove('closeConsole');
            gridRow[0].classList.add('openConsole');
            problemConsoleNav[0].classList.remove('hide');
            problemConsoleBody[0].classList.remove('hide');
        }
    };

    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState('');
    const [compileInfo, setCompileInfo] = useState('');
    const [runTime, setRunTime] = useState(0);
    const [wrongCase, setWrongCase] = useState(null);

    const handleRunCode = async () => {
        handleOpenConsole();
        setRun(true);
        setCurrentConsoleNav(1);
        setCurrentCaseResult(0);
        setIsLoading(true);

        const res = await problemRunCode(id, code, activeLanguage.name);

        if (res.message === 'Successfully') {
            setIsLoading(false);
            setStatus(res.body.status);
            setCompileInfo(res.body.compile_info);
            setCurrentResult(res.body.result);
            if (res.body.status === 'Accepted' || res.body.status === 'Wrong answer') {
                setRunTime(res.body.avg_runtime);
            }
            setWrongCase(res.body.wrong_testcase);
        } else {
            alert('Try running the code again!');
        }
    };

    const [renderSubmissions, setRenderSubmissions] = useState(true);

    const handleSubmitCode = async (e) => {
        e.preventDefault();
        handleOpenConsole();
        setRun(true);
        setCurrentConsoleNav(1);
        setCurrentCaseResult(0);
        setIsLoading(true);

        var session = localStorage.getItem('session');
        var user_id = undefined;
        if (session) {
            session = JSON.parse(session);
            user_id = session.user.id;
            // console.log(user_id);
        }

        const res = await problemRunCode(id, code, activeLanguage.name);

        if (res.message === 'Successfully') {
            setRenderSubmissions(false);
            setIsLoading(false);
            setStatus(res.body.status);
            setCompileInfo(res.body.compile_info);
            setCurrentResult(res.body.result);
            if (res.body.status === 'Accepted' || res.body.status === 'Wrong answer') {
                setRunTime(res.body.avg_runtime);
            }
            setWrongCase(res.body.wrong_testcase);

            // Need to create the user_problems first
            const problem_status = res.body.status === 'Accepted' ? 'Solved' : 'Attempted';
            // console.log(id);
            await insertUserProblem(id, user_id, problem_status);

            const props = {
                user_id,
                problem_id: id,
                status: res.body.status,
                datetime: getCurrentTimeFormatted(),
                language_id: activeLanguage.id,
                runtime: res.body.avg_runtime,
                code: code,
                wrong_testcase_id: wrongCase ? wrongCase.id : null,
            };

            const response = await createSubmission(props);
            if (response.code === 201) {
                // go to submission tab, and re-render submissions
                navigate(`/problems/${id}?tab=submissions`);
                setRenderSubmissions(true);
            }
        } else {
            alert('Try running the code again!');
        }
    };

    return (
        <div className="problem-body">
            <div className="problems">
                <Split
                    render={({ getGridProps, getGutterProps }) => (
                        <div className="grid" {...getGridProps()}>
                            <div className="split bg-white">
                                <div className="w-100 h-100">
                                    <div className="problem-sidebar">
                                        <div className="problem-sidebar-items">
                                            <div
                                                className={`problem-item ${tab === 'description' ? 'problem-item-active' : ''
                                                    }`}
                                                onClick={() => {
                                                    navigate(`/problems/${id}?tab=description`);
                                                }}
                                            >
                                                Description
                                            </div>
                                            <div
                                                className={`problem-item ${tab === 'submissions' ? 'problem-item-active' : ''
                                                    }`}
                                                onClick={() => {
                                                    navigate(`/problems/${id}?tab=submissions`);
                                                }}
                                            >
                                                Submissions
                                            </div>
                                            <div
                                                className={`problem-item ${tab === 'instruction' ? 'problem-item-active' : ''
                                                    }`}
                                                onClick={() => {
                                                    navigate(`/problems/${id}?tab=instruction`);
                                                }}
                                            >
                                                Instruction
                                            </div>
                                        </div>
                                    </div>
                                    <div className="problem-content">
                                        {tab === 'description' && <Description />}
                                        {tab === 'solutions' && <Solution />}
                                        {tab === 'submissions' && renderSubmissions && <Submission problem_id={id} />}
                                        {tab === 'instruction' && <Editorial />}
                                    </div>
                                </div>
                            </div>
                            <div className="gutter-col gutter-col-1" {...getGutterProps('column', 1)} />
                            <div className="split">
                                <Split
                                    render={({ getGridProps, getGutterProps }) => (
                                        <div className="grid-row h-100 closeConsole" {...getGridProps()}>
                                            {/* ------------ Code ------------ */}
                                            <div className="bg-white">
                                                <div className="d-flex justify-content-between align-items-center problem-code-header border-bottom">
                                                    <div className="dropdown">
                                                        <div
                                                            className="problem-languages dropdown-toggle"
                                                            type="button"
                                                            data-bs-toggle="dropdown"
                                                            aria-expanded="false"
                                                        >
                                                            {activeLanguage && activeLanguage.name}
                                                        </div>
                                                        <ul className="dropdown-menu">
                                                            {languages.map((value, index) => {
                                                                return (
                                                                    <li
                                                                        className="dropdown-item"
                                                                        onClick={handleLanguageChange}
                                                                        key={index}
                                                                    >
                                                                        {value.name}
                                                                    </li>
                                                                );
                                                            })}
                                                        </ul>
                                                    </div>
                                                    <div className="d-flex align-items-center pe-4">
                                                        <div className="icon reset-code" onClick={handleResetCode}>
                                                            <FontAwesomeIcon icon={faRotateLeft} fontSize={20} />
                                                        </div>
                                                        <div className="icon setting">
                                                            <FontAwesomeIcon icon={faGear} fontSize={20} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="mt-1">
                                                    {activeLanguage && (
                                                        <div>
                                                            {activeLanguage.id === 1 && (
                                                                <CodeMirror
                                                                    value={code}
                                                                    extensions={[langs.python()]}
                                                                    onChange={onChange}
                                                                    theme={xcodeLight}
                                                                />
                                                            )}
                                                            {activeLanguage.id === 2 && (
                                                                <CodeMirror
                                                                    value={code}
                                                                    extensions={[langs.cpp()]}
                                                                    onChange={onChange}
                                                                    theme={xcodeLight}
                                                                />
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="gutter-row gutter-row-1" {...getGutterProps('row', 1)} />
                                            {/* ------------ Console ------------ */}
                                            <div className={clsx('d-flex', 'flex-column', styles.problemConsole)}>
                                                <div className="d-flex align-items-center problemConsoleNav hide">
                                                    <div
                                                        className={`problemConsoleNavItem ${currentConsoleNav === 0 ? 'problemConsoleNavItemActive' : ''}`}
                                                        onClick={() => {
                                                            setCurrentConsoleNav(0);
                                                        }}
                                                    >Testcase</div>
                                                    <div
                                                        className={`problemConsoleNavItem ${currentConsoleNav === 1 ? 'problemConsoleNavItemActive' : ''} ms-4`}
                                                        onClick={() => {
                                                            setCurrentConsoleNav(1);
                                                        }}
                                                    >Result</div>
                                                </div>
                                                <div className={clsx('problemConsoleBody', 'hide')}>
                                                    {currentConsoleNav === 0 && (
                                                        <div>
                                                            <div
                                                                className={clsx(
                                                                    'd-flex',
                                                                    'align-items-center',
                                                                    styles.problemConsoleCaseHeader,
                                                                )}
                                                            >
                                                                {testcases.map((testcase, index) => (
                                                                    <div
                                                                        className={`problemConsoleCaseNum me-2
                                                                            ${currentCaseTest === index ? 'problemConsoleCaseNumActive' : ''}`}
                                                                        onClick={() => {
                                                                            setCurrentCaseTest(index);
                                                                        }}
                                                                    >
                                                                        Case {index + 1}
                                                                    </div>
                                                                ))}
                                                            </div>
                                                            <div
                                                                className={clsx(styles.problemConsoleCaseBody, 'pt-3')}
                                                            >
                                                                <div className={clsx(styles.smallText)}>Input:</div>
                                                                <div
                                                                    className={clsx(
                                                                        styles.problemConsoleCaseBodyContent,
                                                                    )}
                                                                >
                                                                    {testcases[currentCaseTest].input
                                                                        .split('\n')
                                                                        .map((input, index) => (
                                                                            <div key={index}>{input}</div>
                                                                        ))}
                                                                </div>
                                                            </div>
                                                            <div
                                                                className={clsx(styles.problemConsoleCaseBody, 'pt-3')}
                                                            >
                                                                <div className={clsx(styles.smallText)}>Output:</div>
                                                                <div
                                                                    className={clsx(
                                                                        styles.problemConsoleCaseBodyContent,
                                                                    )}
                                                                >
                                                                    {testcases[currentCaseTest].output}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}

                                                    {!!isLoading && currentConsoleNav === 1 && <Loading />}

                                                    {!isLoading && currentConsoleNav === 1 && run === false && (
                                                        <div className="secondary-text">You must run your code</div>
                                                    )}

                                                    {!isLoading && currentConsoleNav === 1 && run === true && (
                                                        <div>
                                                            {status !== 'Accepted' && status !== 'Wrong answer' && (
                                                                <div>
                                                                    <div
                                                                        className={` problemConsoleResult mb-4 problemConsoleResultFailure`}
                                                                    >
                                                                        {status}
                                                                    </div>

                                                                    {!!compileInfo && (
                                                                        <pre className="mt-4">{compileInfo}</pre>
                                                                    )}
                                                                </div>
                                                            )}

                                                            {(status === 'Accepted' || status === 'Wrong answer') && (
                                                                <div>
                                                                    <div className="d-flex gap-4 align-items-center mb-4">
                                                                        <div
                                                                            className={` problemConsoleResult
                                                                        ${status === 'Accepted'
                                                                                    ? 'problemConsoleResultSuccess'
                                                                                    : 'problemConsoleResultFailure'
                                                                                }
                                                                    `}
                                                                        >
                                                                            {status}
                                                                        </div>

                                                                        <div className="footer-secondary">
                                                                            Runtime: {runTime} ms
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        className={clsx(
                                                                            'd-flex',
                                                                            'align-items-center',
                                                                            styles.problemConsoleCaseHeader,
                                                                        )}
                                                                    >
                                                                        {testcases.map((testcase, index) => (
                                                                            <div
                                                                                className={` problemConsoleCaseNum me-2
                                                                                    ${currentCaseResult === index ? 'problemConsoleCaseNumActive' : ''}`}
                                                                                onClick={() => {
                                                                                    setCurrentCaseResult(index);
                                                                                }}
                                                                            >
                                                                                {currentResult &&
                                                                                    currentResult[index] && (
                                                                                        <span
                                                                                            className={`round-result ${currentResult[index]
                                                                                                .success
                                                                                                ? 'result-success'
                                                                                                : 'result-failure'
                                                                                                }`}
                                                                                        ></span>
                                                                                    )}
                                                                                <span>Case {index + 1}</span>
                                                                            </div>
                                                                        ))}
                                                                        {wrongCase !== null && (
                                                                            <div
                                                                                className={` problemConsoleCaseNum me-2
                                                                                    ${currentCaseResult === testcases.length ? 'problemConsoleCaseNumActive' : ''}`}
                                                                                onClick={() => {
                                                                                    setCurrentCaseResult(testcases.length);
                                                                                }}
                                                                            >
                                                                                {currentResult &&
                                                                                    currentResult[testcases.length] && (
                                                                                        <span
                                                                                            className={`round-result result-failure`}
                                                                                        ></span>
                                                                                    )}
                                                                                <span>Case {testcases.length + 1}</span>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                    <div
                                                                        className={clsx(
                                                                            styles.problemConsoleCaseBody,
                                                                            'pt-3',
                                                                        )}
                                                                    >
                                                                        <div className={clsx(styles.smallText)}>
                                                                            Input:
                                                                        </div>
                                                                        <div
                                                                            className={clsx(
                                                                                styles.problemConsoleCaseBodyContent,
                                                                            )}
                                                                        >
                                                                            {currentCaseResult < 3 &&
                                                                                testcases[currentCaseResult].input
                                                                                    .split('\n')
                                                                                    .map((input, index) => (
                                                                                        <div key={index}>{input}</div>
                                                                                    ))}
                                                                            {currentCaseResult >= 3 &&
                                                                                wrongCase &&
                                                                                wrongCase.input
                                                                                    .split('\n')
                                                                                    .map((input, index) => (
                                                                                        <div key={index}>{input}</div>
                                                                                    ))}
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        className={clsx(
                                                                            styles.problemConsoleCaseBody,
                                                                            'pt-3',
                                                                        )}
                                                                    >
                                                                        <div className={clsx(styles.smallText)}>
                                                                            Output:
                                                                        </div>
                                                                        <div
                                                                            className={clsx(
                                                                                styles.problemConsoleCaseBodyContent,
                                                                            )}
                                                                        >
                                                                            {currentCaseResult < 3 && (
                                                                                <span>
                                                                                    {
                                                                                        currentResult[currentCaseResult]
                                                                                            .output
                                                                                    }
                                                                                </span>
                                                                            )}
                                                                            {currentCaseResult >= 3 && wrongCase && (
                                                                                <span>{wrongCase.actual_output}</span>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        className={clsx(
                                                                            styles.problemConsoleCaseBody,
                                                                            'pt-3',
                                                                        )}
                                                                    >
                                                                        <div className={clsx(styles.smallText)}>
                                                                            Expected:
                                                                        </div>
                                                                        <div
                                                                            className={clsx(
                                                                                styles.problemConsoleCaseBodyContent,
                                                                            )}
                                                                        >
                                                                            {currentCaseResult < 3 && (
                                                                                <span>
                                                                                    {
                                                                                        testcases[currentCaseResult]
                                                                                            .output
                                                                                    }
                                                                                </span>
                                                                            )}
                                                                            {currentCaseResult >= 3 && wrongCase && (
                                                                                <span>{wrongCase.output}</span>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                                <div
                                                    className={clsx(
                                                        'd-flex',
                                                        'justify-content-between',
                                                        'align-items-center',
                                                        styles.problemConsoleFooter,
                                                    )}
                                                >
                                                    <div
                                                        className={clsx(
                                                            'd-flex',
                                                            'align-items-center',
                                                            'cursor-pointer',
                                                        )}
                                                        onClick={handleToggleConsole}
                                                    >
                                                        <div className={clsx(styles.problemConsoleToggle)}>Console</div>
                                                        <FontAwesomeIcon
                                                            icon={faChevronDown}
                                                            className={clsx(styles.iconConsole)}
                                                        />
                                                    </div>
                                                    <div className={clsx('d-flex', 'align-items-center')}>
                                                        <button
                                                            type="submit"
                                                            className={clsx(styles.btnCustom, styles.btnRun)}
                                                            onClick={handleRunCode}
                                                        >
                                                            Run
                                                        </button>
                                                        <form onSubmit={handleSubmitCode}>
                                                            <button
                                                                className={clsx(styles.btnCustom, styles.btnSubmit)}
                                                            >
                                                                Submit
                                                            </button>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                />
                            </div>
                        </div>
                    )}
                />
            </div>
        </div>
    );
}

export default Problem;

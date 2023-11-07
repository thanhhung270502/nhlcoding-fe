// import { createContext, useCallback, useEffect, useState } from 'react';
import './problem.scss';
import Split from 'react-split-grid';
import $ from 'jquery';
// import { useEffect, useState } from 'react';
import Code from './code';
import Description from './description';

import Console from './console';

// File: code.js
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { langs } from '@uiw/codemirror-extensions-langs';
import { xcodeLight } from '@uiw/codemirror-theme-xcode';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faRotateLeft } from '@fortawesome/free-solid-svg-icons';

// File: console.js
import clsx from 'clsx';
import styles from './console.module.scss';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { getTestcaseByProblemID } from '~/api/testcases';
import { getLanguageByID, problemRunCode } from '~/api/problems';
import { useParams } from 'react-router-dom';
import { getProblemLanguagesByProblemID } from '~/api/problem_languages';
import Editorial from './editorial';
import './problem.scss';
import Solution from './solutions';
import Submission from './submission';
import { useNavigate, useSearchParams } from 'react-router-dom';

function Problem() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [tabParams, setTabParams] = useSearchParams();
    const tab = typeof tabParams.get('tab') === 'string' ? tabParams.get('tab') : undefined;

    useEffect(() => {
        if (!tab) {
            navigate(`/problems/${id}?tab=description`);
        }
    }, [tab]);

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

    // const handleSidebar = (e) => {
    //     var items = $('.problem-item');
    //     for (var i = 0; i < items.length; i++) {
    //         items[i].classList.remove('problem-item-active');
    //     }
    //     e.target.classList.add('problem-item-active');
    //     setSidebar(e.target.innerText);
    // };

    // ---------------------------------------------------------------- //
    // File: code.js
    // const initialCode = `def add(a, b):
    // return a + b
    //     `;
    // const initialCode = `def twoSum(nums, target):
    // """
    // :type nums: List[int]
    // :type target: int
    // :rtype: List[int]
    // """
    // # return [0,1]
    // for i in range(len(nums)):
    //     for j in range(i+1, len(nums)):
    //         if nums[i] + nums[j] == target:
    //             return [i,j]`;

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
            setLanguages(res.body);

            // console.log("Problem languages:", res.body);

            // Default language and code as cpp
            const { language_id, name, initialcode } = res.body.find(
                (item) => item.problem_id === parseInt(id) && item.language_id === 2,
            );
            const lang_obj = { id: language_id, name: name, initialcode: initialcode };
            if (!localStorage.getItem('active_language')) {
                setActiveLanguage(lang_obj);
                localStorage.setItem('active_language', JSON.stringify(lang_obj));
            }

            if (!localStorage.getItem(`${id}_${name}`)) {
                setCode(convertCode(initialcode));
                localStorage.setItem(`${id}_${name}`, initialcode);
            }
        }
        fetchProblemLanguagesByProblemID(id);
    }, [id]);

    // Handle change language
    const handleLanguageChange = (e) => {
        const lang_name = e.target.innerText;
        const { language_id, name, initialcode } = languages.find(
            (item) => item.name === lang_name && item.problem_id === parseInt(id),
        );
        const lang_obj = { id: language_id, name: name, initialcode: initialcode };

        setActiveLanguage(lang_obj);
        localStorage.setItem('active_language', JSON.stringify(lang_obj));

        if (!localStorage.getItem(`${id}_${name}`)) {
            setCode(convertCode(initialcode));
            localStorage.setItem(`${id}_${name}`, initialcode);
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

    const onChange = useCallback((value, viewUpdate) => {
        setCode(convertCode(value));
        const active_language = JSON.parse(localStorage.getItem('active_language'));
        if (active_language !== null && active_language !== undefined) {
            localStorage.setItem(`${id}_${active_language.name}`, value);
        } else {
            return;
        }
    }, []);

    const handleResetCode = () => {
        const { initialcode } = JSON.parse(localStorage.getItem('active_language'));
        setCode(convertCode(initialcode));
    };

    useEffect(() => {
        const active_language = JSON.parse(localStorage.getItem('active_language'));

        if (active_language == null) {
            console.log('Not active language yet!');
            return;
        }

        setActiveLanguage(active_language);
        setCode(convertCode(localStorage.getItem(`${id}_${active_language.name}`)));
    }, []);

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

    // console.log("case test: ", currentCaseTest);
    // console.log("case result: ", currentCaseResult);
    console.log('result: ', currentResult);

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

    useEffect(() => {
        const problemConsoleCaseNum = $('.problemConsoleCaseNum');
        // eslint-disable-next-line array-callback-return
        problemConsoleCaseNum.map((index, value) => {
            if (currentConsoleNav === 0) {
                // eslint-disable-next-line array-callback-return
                problemConsoleCaseNum.map((i, v) => {
                    if (i === currentCaseTest) {
                        problemConsoleCaseNum[i].classList.add('problemConsoleCaseNumActive');
                    } else {
                        problemConsoleCaseNum[i].classList.remove('problemConsoleCaseNumActive');
                    }
                });
            } else {
                // eslint-disable-next-line array-callback-return
                problemConsoleCaseNum.map((i, v) => {
                    if (i === currentCaseResult) {
                        problemConsoleCaseNum[i].classList.add('problemConsoleCaseNumActive');
                    } else {
                        problemConsoleCaseNum[i].classList.remove('problemConsoleCaseNumActive');
                    }
                });
            }
            value.addEventListener('click', () => {
                if (currentConsoleNav === 0) {
                    setCurrentCaseTest(index);
                } else {
                    setCurrentCaseResult(index);
                }
                // eslint-disable-next-line array-callback-return
                problemConsoleCaseNum.map((i, v) => {
                    if (i === index) {
                        problemConsoleCaseNum[i].classList.add('problemConsoleCaseNumActive');
                    } else {
                        problemConsoleCaseNum[i].classList.remove('problemConsoleCaseNumActive');
                    }
                });
            });
        });
    }, [currentCaseResult, currentCaseTest, currentConsoleNav, currentResult]);

    useEffect(() => {
        const problemConsoleNavItem = $('.problemConsoleNavItem');
        // eslint-disable-next-line array-callback-return
        problemConsoleNavItem.map((index, value) => {
            value.addEventListener('click', () => {
                setCurrentConsoleNav(index);
                // eslint-disable-next-line array-callback-return
                problemConsoleNavItem.map((i, v) => {
                    if (i === index) {
                        problemConsoleNavItem[i].classList.add('problemConsoleNavItemActive');
                    } else {
                        problemConsoleNavItem[i].classList.remove('problemConsoleNavItemActive');
                    }
                });
            });
        });
    }, []);

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

    const handleRunCode = async () => {
        handleOpenConsole();
        setRun(true);

        if (!activeLanguage) {
            console.log('Cannot get active language');
            return;
        }

        const res = await problemRunCode(id, code, activeLanguage.name);

        if (res.message === 'Successfully') {
            setCurrentResult(res.body);
        } else {
            alert('Try running the code again!');
        }
    };

    const handleSubmitCode = async (e) => {
        e.preventDefault();
        if (!run) {
            handleRunCode();
        }

        // handle submit code
    };

    useEffect(() => {
        async function fetchTestcaseByProblemID(problem_id) {
            const res = await getTestcaseByProblemID(problem_id);
            setTestcases(res.body.testcases);
        }
        fetchTestcaseByProblemID(id);
    }, [id]);

    const averageRunTime = (arr) => {
        var length = arr.length;
        var sum = 0;
        for (var i = 0; i < length; i++) {
            sum += arr[i].runtime;
        }
        return sum / length;
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
                                                className={`problem-item ${
                                                    tab === 'description' ? 'problem-item-active' : ''
                                                }`}
                                                onClick={() => {
                                                    navigate(`/problems/${id}?tab=description`);
                                                }}
                                            >
                                                Description
                                            </div>
                                            <div
                                                className={`problem-item ${
                                                    tab === 'solutions' ? 'problem-item-active' : ''
                                                }`}
                                                onClick={() => {
                                                    navigate(`/problems/${id}?tab=solutions`);
                                                }}
                                            >
                                                Solutions
                                            </div>
                                            <div
                                                className={`problem-item ${
                                                    tab === 'submissions' ? 'problem-item-active' : ''
                                                }`}
                                                onClick={() => {
                                                    navigate(`/problems/${id}?tab=submissions`);
                                                }}
                                            >
                                                Submissions
                                            </div>
                                            {/* <div className="problem-item" onClick={handleSidebar}>
                                                Discussion
                                            </div> */}
                                            <div
                                                className={`problem-item ${
                                                    tab === 'editorial' ? 'problem-item-active' : ''
                                                }`}
                                                onClick={() => {
                                                    navigate(`/problems/${id}?tab=editorial`);
                                                }}
                                            >
                                                Editorial
                                            </div>
                                        </div>
                                    </div>
                                    <div className="problem-content">
                                        {tab === 'description' && <Description />}
                                        {tab === 'solutions' && <Solution />}
                                        {tab === 'submissions' && <Submission />}
                                        {tab === 'editorial' && <Editorial />}
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
                                                            {activeLanguage !== null ? activeLanguage.name : 'cpp'}
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
                                                        <>
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
                                                            {activeLanguage.id === 'Java' && (
                                                                <CodeMirror
                                                                    value={code}
                                                                    extensions={[langs.java()]}
                                                                    onChange={onChange}
                                                                    theme={xcodeLight}
                                                                />
                                                            )}
                                                            {activeLanguage.id === 'C' && (
                                                                <CodeMirror
                                                                    value={code}
                                                                    extensions={[langs.c()]}
                                                                    onChange={onChange}
                                                                    theme={xcodeLight}
                                                                />
                                                            )}
                                                            {activeLanguage.id === 'C#' && (
                                                                <CodeMirror
                                                                    value={code}
                                                                    extensions={[langs.csharp()]}
                                                                    onChange={onChange}
                                                                    theme={xcodeLight}
                                                                />
                                                            )}
                                                            {activeLanguage.id === 'JavaScript' && (
                                                                <CodeMirror
                                                                    value={code}
                                                                    extensions={[langs.javascript()]}
                                                                    onChange={onChange}
                                                                    theme={xcodeLight}
                                                                />
                                                            )}
                                                            {activeLanguage.id === 'PHP' && (
                                                                <CodeMirror
                                                                    value={code}
                                                                    extensions={[langs.php()]}
                                                                    onChange={onChange}
                                                                    theme={xcodeLight}
                                                                />
                                                            )}
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="gutter-row gutter-row-1" {...getGutterProps('row', 1)} />
                                            {/* ------------ Console ------------ */}
                                            <div className={clsx('d-flex', 'flex-column', styles.problemConsole)}>
                                                <div className="d-flex align-items-center problemConsoleNav hide">
                                                    <div
                                                        className={clsx(
                                                            'problemConsoleNavItem',
                                                            'problemConsoleNavItemActive',
                                                        )}
                                                    >
                                                        Testcase
                                                    </div>
                                                    <div className={clsx('problemConsoleNavItem', 'ms-4')}>Result</div>
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
                                                                <div className={clsx('problemConsoleCaseNum')}>
                                                                    Case 1
                                                                </div>
                                                                <div className={clsx('problemConsoleCaseNum', 'mx-2')}>
                                                                    Case 2
                                                                </div>
                                                                <div className={clsx('problemConsoleCaseNum')}>
                                                                    Case 3
                                                                </div>
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
                                                                        .split(' ')
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

                                                    {currentConsoleNav === 1 && run === false && (
                                                        <div
                                                            className={clsx(
                                                                'd-flex',
                                                                'align-items-center',
                                                                'justify-content-center',
                                                                'h-100',
                                                            )}
                                                        >
                                                            You must run your code
                                                        </div>
                                                    )}

                                                    {currentConsoleNav === 1 && run === true && (
                                                        <div>
                                                            {!!currentResult[currentCaseResult].success && (
                                                                <div
                                                                    className={clsx(
                                                                        'problemConsoleResult',
                                                                        'problemConsoleResultSuccess',
                                                                        'pb-4',
                                                                    )}
                                                                >
                                                                    Accepted
                                                                </div>
                                                            )}
                                                            {!currentResult[currentCaseResult].success && (
                                                                <div
                                                                    className={clsx(
                                                                        'problemConsoleResult',
                                                                        'problemConsoleResultFailure',
                                                                        'pb-4',
                                                                    )}
                                                                >
                                                                    Wrong Answer
                                                                </div>
                                                            )}
                                                            {/*<div
                                                                    className={clsx(
                                                                        'd-flex',
                                                                        'align-items-center',
                                                                        'pt-2',
                                                                        'pb-4',
                                                                    )}
                                                                >
                                                                    <div className={clsx(styles.smallText)}>
                                                                        Runtime:{' '}
                                                                        {averageRunTime(currentResult).toFixed(2)}{' '}
                                                                        ms
                                                                    </div>
                                                                    <div className={clsx(styles.smallText, 'ps-3')}>
                                                                        Memory:{' '}
                                                                        {currentResult[0].memory.toFixed(2)} MB
                                                                    </div>
                                                                    </div>*/}
                                                            <div
                                                                className={clsx(
                                                                    'd-flex',
                                                                    'align-items-center',
                                                                    styles.problemConsoleCaseHeader,
                                                                )}
                                                            >
                                                                <div className={clsx('problemConsoleCaseNum')}>
                                                                    {currentResult && currentResult[0] && (
                                                                        <span
                                                                            className={`round-result ${
                                                                                currentResult[0].success
                                                                                    ? 'result-success'
                                                                                    : 'result-failure'
                                                                            }`}
                                                                        ></span>
                                                                    )}
                                                                    <span>Case 1</span>
                                                                </div>
                                                                <div className={clsx('problemConsoleCaseNum', ' mx-2')}>
                                                                    {currentResult && currentResult[1] && (
                                                                        <span
                                                                            className={`round-result ${
                                                                                currentResult[1].success
                                                                                    ? 'result-success'
                                                                                    : 'result-failure'
                                                                            }`}
                                                                        ></span>
                                                                    )}
                                                                    <span>Case 2</span>
                                                                </div>
                                                                <div className={clsx('problemConsoleCaseNum')}>
                                                                    {currentResult && currentResult[2] && (
                                                                        <span
                                                                            className={`round-result ${
                                                                                currentResult[2].success
                                                                                    ? 'result-success'
                                                                                    : 'result-failure'
                                                                            }`}
                                                                        ></span>
                                                                    )}
                                                                    <span>Case 3</span>
                                                                </div>
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
                                                                    {testcases[currentCaseResult].input
                                                                        .split(' ')
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
                                                                    {currentResult[currentCaseResult].output}
                                                                </div>
                                                            </div>
                                                            <div
                                                                className={clsx(styles.problemConsoleCaseBody, 'pt-3')}
                                                            >
                                                                <div className={clsx(styles.smallText)}>Expected:</div>
                                                                <div
                                                                    className={clsx(
                                                                        styles.problemConsoleCaseBodyContent,
                                                                    )}
                                                                >
                                                                    {testcases[currentCaseResult].output}
                                                                </div>
                                                            </div>
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

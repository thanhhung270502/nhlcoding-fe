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
            navigate(`/problem/${id}?tab=description`);
        }
    }, [tab]);

    useEffect(() => {
        // Disable scrolling when the component is mounted
        document.body.style.overflowY = 'hidden';

        return () => {
            // Re-enable scrolling when the component is unmounted
            document.body.style.overflowY = 'auto';
        };
    }, []);

    useEffect(() => {
        let split = $('.split');
        // console.log(split[0].offsetHeight);
        // console.log(split[1].offsetHeight);
        // if (split[0].offsetHeight > 867) {
        split[0].style.height = 'calc(100vh - 59px)';
        split[0].style.overflow = 'hidden auto';
        // } else {
        // split[0].style.height = 'calc(100vh - 59px)';
        // split[0].style.overflow = 'unset';
        // }
    }, []);

    // const handleSidebar = (e) => {
    //     var items = $('.problem-item');
    //     for (var i = 0; i < items.length; i++) {
    //         items[i].classList.remove('problem-item-active');
    //     }
    //     e.target.classList.add('problem-item-active');
    //     setSidebar(e.target.innerText);
    // };

    const openConsole = () => {};

    // ---------------------------------------------------------------- //
    // File: code.js
    // const initialCode = `def add(a, b):
    // return a + b
    //     `;
    const initialCode = `def twoSum(nums, target):
    """
    :type nums: List[int]
    :type target: int
    :rtype: List[int]
    """
    # return [0,1]
    for i in range(len(nums)):
        for j in range(i+1, len(nums)):
            if nums[i] + nums[j] == target:
                return [i,j]`;

    const [code, setCode] = useState(initialCode);
    const [languages, setLanguages] = useState([
        {
            name: 'python',
            initialcode: '',
        },
        {
            name: 'cpp',
            initialcode: '',
        },
    ]);
    const [language, setLanguage] = useState(1);

    const onChange = useCallback((value, viewUpdate) => {
        setCode(value);
    }, []);

    const handleLanguageChange = (e) => {
        if (e.target.outerText === 'python') {
            console.log(e.target.outerText);
            setLanguage(0);
        } else if (e.target.outerText === 'cpp') {
            console.log(e.target.outerText);
            setLanguage(1);
        }
    };

    useEffect(() => {
        const fetchLanguageByID = async (language_id) => {
            const res = await getLanguageByID(language_id);
            console.log(res);
        };
        fetchLanguageByID(1);
    }, []);

    // ---------------------------------------------------------------- //
    // File: console.js
    const [currentCaseTest, setCurrentCaseTest] = useState(0);
    const [currentCaseResult, setCurrentCaseResult] = useState(0);
    const [currentConsoleNav, setCurrentConsoleNav] = useState(0);
    const [currentResult, setCurrentResult] = useState({
        body: [
            {
                result: 'not',
            },
        ],
    });
    const [testcases, setTestcases] = useState([
        {
            input: '',
            output: '',
        },
    ]);

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await problemRunCode(id, code, languages[language].name);
        console.log(res.message);
        if (res.message === 'Successfully') {
            setCurrentResult(res);
        } else {
            alert('Try again!');
        }
        console.log(res.body[0].result);
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

    const convertCode = (code) => {
        code = code.replaceAll('\\n', '\n');
        code = code.replaceAll('\\t', '\t');
        return code;
    };

    // Handle problem_languages
    useEffect(() => {
        async function fetchProblemLanguagesByProblemID(problem_id) {
            const res = await getProblemLanguagesByProblemID(problem_id);
            console.log(res);
            setLanguages(res.body);
            setLanguage(parseInt(res.body[0].language_id) - 1);
            if (localStorage.getItem(`${id}_${languages[language].name}`)) {
                setCode(convertCode(localStorage.getItem(`${id}_${languages[language].name}`)));
            } else {
                setCode(convertCode(res.body[0].initialcode));
            }
        }
        fetchProblemLanguagesByProblemID(id);
    }, [id]);

    useEffect(() => {
        console.log(languages[language].initialcode);
        if (localStorage.getItem(`${id}_${languages[language].name}`)) {
            setCode(convertCode(localStorage.getItem(`${id}_${languages[language].name}`)));
        } else {
            setCode(convertCode(languages[language].initialcode));
        }
    }, [language, languages]);

    useEffect(() => {
        localStorage.setItem(`${id}_${languages[language].name}`, code);
    }, [code, id, language, languages]);

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
                                                    navigate(`/problem/${id}?tab=description`);
                                                }}
                                            >
                                                Description
                                            </div>
                                            <div
                                                className={`problem-item ${
                                                    tab === 'solutions' ? 'problem-item-active' : ''
                                                }`}
                                                onClick={() => {
                                                    navigate(`/problem/${id}?tab=solutions`);
                                                }}
                                            >
                                                Solutions
                                            </div>
                                            <div
                                                className={`problem-item ${
                                                    tab === 'submissions' ? 'problem-item-active' : ''
                                                }`}
                                                onClick={() => {
                                                    navigate(`/problem/${id}?tab=submissions`);
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
                                                    navigate(`/problem/${id}?tab=editorial`);
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
                                                    <div class="dropdown">
                                                        <div
                                                            class="problem-languages dropdown-toggle"
                                                            type="button"
                                                            data-bs-toggle="dropdown"
                                                            aria-expanded="false"
                                                        >
                                                            {languages[language].name}
                                                        </div>
                                                        <ul class="dropdown-menu">
                                                            {languages.map((value) => {
                                                                return (
                                                                    <li
                                                                        className="dropdown-item"
                                                                        onClick={handleLanguageChange}
                                                                    >
                                                                        {value.name}
                                                                    </li>
                                                                );
                                                            })}
                                                        </ul>
                                                    </div>
                                                    <div className="d-flex align-items-center pe-4">
                                                        <div className="icon reset-code">
                                                            <FontAwesomeIcon icon={faRotateLeft} />
                                                        </div>
                                                        <div className="icon setting">
                                                            <FontAwesomeIcon icon={faGear} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="mt-1">
                                                    {language === 1 && (
                                                        <CodeMirror
                                                            value={code}
                                                            extensions={[langs.cpp()]}
                                                            onChange={onChange}
                                                            theme={xcodeLight}
                                                        />
                                                    )}
                                                    {language === 'Java' && (
                                                        <CodeMirror
                                                            value={code}
                                                            extensions={[langs.java()]}
                                                            onChange={onChange}
                                                            theme={xcodeLight}
                                                        />
                                                    )}
                                                    {language === 0 && (
                                                        <CodeMirror
                                                            value={code}
                                                            extensions={[langs.python()]}
                                                            onChange={onChange}
                                                            theme={xcodeLight}
                                                        />
                                                    )}
                                                    {language === 'C' && (
                                                        <CodeMirror
                                                            value={code}
                                                            extensions={[langs.c()]}
                                                            onChange={onChange}
                                                            theme={xcodeLight}
                                                        />
                                                    )}
                                                    {language === 'C#' && (
                                                        <CodeMirror
                                                            value={code}
                                                            extensions={[langs.csharp()]}
                                                            onChange={onChange}
                                                            theme={xcodeLight}
                                                        />
                                                    )}
                                                    {language === 'JavaScript' && (
                                                        <CodeMirror
                                                            value={code}
                                                            extensions={[langs.javascript()]}
                                                            onChange={onChange}
                                                            theme={xcodeLight}
                                                        />
                                                    )}
                                                    {language === 'PHP' && (
                                                        <CodeMirror
                                                            value={code}
                                                            extensions={[langs.php()]}
                                                            onChange={onChange}
                                                            theme={xcodeLight}
                                                        />
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
                                                                            <div>{input}</div>
                                                                        ))}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}

                                                    {currentConsoleNav === 1 &&
                                                        currentResult.body[0].result === 'not' && (
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

                                                    {currentConsoleNav === 1 &&
                                                        currentResult.body[0].result !== 'not' && (
                                                            <div>
                                                                {currentResult.body[currentCaseResult].result ===
                                                                    true && (
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
                                                                {currentResult.body[currentCaseResult].result ===
                                                                    false && (
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
                                                                        {averageRunTime(currentResult.body).toFixed(2)}{' '}
                                                                        ms
                                                                    </div>
                                                                    <div className={clsx(styles.smallText, 'ps-3')}>
                                                                        Memory:{' '}
                                                                        {currentResult.body[0].memory.toFixed(2)} MB
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
                                                                        Case 1
                                                                    </div>
                                                                    <div
                                                                        className={clsx(
                                                                            'problemConsoleCaseNum',
                                                                            'mx-2',
                                                                        )}
                                                                    >
                                                                        Case 2
                                                                    </div>
                                                                    <div className={clsx('problemConsoleCaseNum')}>
                                                                        Case 3
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    className={clsx(
                                                                        styles.problemConsoleCaseBody,
                                                                        'pt-3',
                                                                    )}
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
                                                                                <div>{input}</div>
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
                                                                        {currentResult.body[currentCaseResult].output}
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
                                                        <form onSubmit={handleSubmit}>
                                                            <button
                                                                type="submit"
                                                                className={clsx(styles.btnCustom, styles.btnRun)}
                                                            >
                                                                Run
                                                            </button>
                                                        </form>
                                                        <button className={clsx(styles.btnCustom, styles.btnSubmit)}>
                                                            Submit
                                                        </button>
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

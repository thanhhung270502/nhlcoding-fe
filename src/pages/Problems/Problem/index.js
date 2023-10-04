// import { createContext, useCallback, useEffect, useState } from 'react';
import './problem.scss';
import Split from 'react-split-grid';
import Solution from './solutions';
import $ from 'jquery';
import Submission from './submission';
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
// import testcases from './testcase.json';
import { submitCode } from '~/api/api';
import { getTestcaseByProblemID } from '~/api/testcases';
import { problemRunCode } from '~/api/problems';
import { useParams } from 'react-router-dom';

function Problem() {
    const [sidebar, setSidebar] = useState('Description');

    useEffect(() => {
        let split = $('.split');
        console.log(split[0].offsetHeight);
        console.log(split[1].offsetHeight);
        if (split[0].offsetHeight > 867) {
            split[0].style.height = 'calc(100vh - 59px)';
            split[0].style.overflow = 'hidden scroll';
        } else {
            split[0].style.height = 'calc(100vh - 59px)';
            split[0].style.overflow = 'unset';
        }
    }, []);

    const handleSidebar = (e) => {
        var items = $('.problem-item');
        for (var i = 0; i < items.length; i++) {
            items[i].classList.remove('problem-item-active');
        }
        e.target.classList.add('problem-item-active');
        setSidebar(e.target.innerText);
    };

    // ---------------------------------------------------------------- //
    // File: code.js
    const initialCode = `import sys
def add(a, b):
    return a + b

if __name__ == "__main__":
    a = int(sys.argv[1])
    b = int(sys.argv[2])
    print(add(a,b))
`;
    // const initialCode = `def twoSum(nums, target):
    //     """
    // :type nums: List[int]
    // :type target: int
    // :rtype: List[int]
    // """
    // # return [0,1]
    // for i in range(len(nums)):
    //     for j in range(i+1, len(nums)):
    //         if nums[i] + nums[j] == target:
    //             return [i,j]`;
    const [code, setCode] = useState(initialCode);
    const [language, setLanguage] = useState('Python');

    const onChange = useCallback((value, viewUpdate) => {
        setCode(value);
    }, []);

    const handleLanguageChange = (e) => {
        setLanguage(e.target.outerText);
    };

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
        console.log(problemConsoleNav);

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
    }, [currentCaseResult, currentCaseTest, currentConsoleNav]);

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
        const res = await problemRunCode(1, code);
        setCurrentResult(res);
        console.log(res.body[0].result);
    };

    const { id } = useParams();
    useEffect(() => {
        async function fetchTestcaseByProblemID(problem_id) {
            const res = await getTestcaseByProblemID(problem_id);
            console.log(res.body.testcases);
            res.body.testcases[0].input.split(' ').map((input) => console.log(input));
            setTestcases(res.body.testcases);
        }
        fetchTestcaseByProblemID(id);
    }, [id]);

    return (
        <div className="problem-body">
            <div className="problems">
                <Split
                    render={({ getGridProps, getGutterProps }) => (
                        <div className="grid" {...getGridProps()}>
                            <div className="split bg-white">
                                <div className="d-flex h-100">
                                    <div className="problem-sidebar">
                                        <div className="problem-sidebar-items">
                                            <div className="problem-item problem-item-active" onClick={handleSidebar}>
                                                Description
                                            </div>
                                            <div className="problem-item" onClick={handleSidebar}>
                                                Solutions
                                            </div>
                                            <div className="problem-item" onClick={handleSidebar}>
                                                Submissions
                                            </div>
                                            <div className="problem-item" onClick={handleSidebar}>
                                                Discussion
                                            </div>
                                            <div className="problem-item" onClick={handleSidebar}>
                                                Editorial
                                            </div>
                                        </div>
                                    </div>
                                    <div className="problem-content">
                                        {sidebar === 'Description' && <Description />}
                                        {sidebar === 'Solutions' && <Solution />}
                                        {sidebar === 'Submissions' && <Submission />}
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
                                                            {language}
                                                        </div>
                                                        <ul class="dropdown-menu">
                                                            <li
                                                                className="dropdown-item"
                                                                onClick={handleLanguageChange}
                                                            >
                                                                C++
                                                            </li>
                                                            <li
                                                                className="dropdown-item"
                                                                onClick={handleLanguageChange}
                                                            >
                                                                Java
                                                            </li>
                                                            <li
                                                                className="dropdown-item"
                                                                onClick={handleLanguageChange}
                                                            >
                                                                Python
                                                            </li>
                                                            <li
                                                                className="dropdown-item"
                                                                onClick={handleLanguageChange}
                                                            >
                                                                C
                                                            </li>
                                                            <li
                                                                className="dropdown-item"
                                                                onClick={handleLanguageChange}
                                                            >
                                                                C#
                                                            </li>
                                                            <li
                                                                className="dropdown-item"
                                                                onClick={handleLanguageChange}
                                                            >
                                                                JavaScript
                                                            </li>
                                                            <li
                                                                className="dropdown-item"
                                                                onClick={handleLanguageChange}
                                                            >
                                                                PHP
                                                            </li>
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
                                                    {language === 'C++' && (
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
                                                    {language === 'Python' && (
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
                                                                        )}
                                                                    >
                                                                        Wrong Answer
                                                                    </div>
                                                                )}
                                                                <div
                                                                    className={clsx(
                                                                        'd-flex',
                                                                        'align-items-center',
                                                                        'pt-2',
                                                                        'pb-4',
                                                                    )}
                                                                >
                                                                    <div className={clsx(styles.smallText)}>
                                                                        Runtime:{' '}
                                                                        {currentResult.body[0].runtime.toFixed(2)} ms
                                                                    </div>
                                                                    <div className={clsx(styles.smallText, 'ps-3')}>
                                                                        Memory:{' '}
                                                                        {currentResult.body[0].memory.toFixed(2)} MB
                                                                    </div>
                                                                </div>
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
                                                                        {testcases[currentCaseResult].input}
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

import clsx from 'clsx';
import $ from 'jquery';
import styles from './console.module.scss';
import './console.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import testcases from './testcase.json';
import { useContext, useEffect, useState } from 'react';
import { CodeContext } from './code';

function Console() {
    const [currentCaseTest, setCurrentCaseTest] = useState(0);
    const [currentCaseResult, setCurrentCaseResult] = useState(0);
    const [currentConsoleNav, setCurrentConsoleNav] = useState(0);

    const code = useContext(CodeContext);
    useEffect(() => {
        console.log(code);
    }, [code]);

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

    return (
        <div className={clsx('d-flex', 'flex-column', styles.problemConsole)}>
            <div className="d-flex align-items-center problemConsoleNav hide">
                <div className={clsx('problemConsoleNavItem', 'problemConsoleNavItemActive')}>Testcase</div>
                <div className={clsx('problemConsoleNavItem', 'ms-4')}>Result</div>
            </div>
            <div className="problemConsoleBody hide">
                {currentConsoleNav === 0 && (
                    <div>
                        <div className={clsx('d-flex', 'align-items-center', styles.problemConsoleCaseHeader)}>
                            <div className={clsx('problemConsoleCaseNum')}>Case 1</div>
                            <div className={clsx('problemConsoleCaseNum', 'mx-2')}>Case 2</div>
                            <div className={clsx('problemConsoleCaseNum')}>Case 3</div>
                        </div>
                        <div className={clsx(styles.problemConsoleCaseBody, 'pt-3')}>
                            <div className={clsx(styles.problemConsoleCaseBodyTitle)}>Input:</div>
                            <div className={clsx(styles.problemConsoleCaseBodyContent)}>
                                {testcases[currentCaseTest].input}
                            </div>
                        </div>
                    </div>
                )}

                {currentConsoleNav === 1 && (
                    <div>
                        <div className={clsx('problemConsoleResult')}>Accepted</div>
                        <div className={clsx('d-flex', 'align-items-center', styles.problemConsoleCaseHeader)}>
                            <div className={clsx('problemConsoleCaseNum')}>Case 1</div>
                            <div className={clsx('problemConsoleCaseNum', 'mx-2')}>Case 2</div>
                            <div className={clsx('problemConsoleCaseNum')}>Case 3</div>
                        </div>
                        <div className={clsx(styles.problemConsoleCaseBody, 'pt-3')}>
                            <div className={clsx(styles.problemConsoleCaseBodyTitle)}>Input:</div>
                            <div className={clsx(styles.problemConsoleCaseBodyContent)}>
                                {testcases[currentCaseResult].input}
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div
                className={clsx('d-flex', 'justify-content-between', 'align-items-center', styles.problemConsoleFooter)}
            >
                <div className={clsx('d-flex', 'align-items-center', 'cursor-pointer')} onClick={handleToggleConsole}>
                    <div className={clsx(styles.problemConsoleToggle)}>Console</div>
                    <FontAwesomeIcon icon={faChevronDown} className={clsx(styles.iconConsole)} />
                </div>
                <div className={clsx('d-flex', 'align-items-center')}>
                    <button className={clsx(styles.btnCustom, styles.btnRun)}>Run</button>
                    <button className={clsx(styles.btnCustom, styles.btnSubmit)}>Submit</button>
                </div>
            </div>
        </div>
    );
}

export default Console;

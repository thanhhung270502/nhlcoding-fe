import { langs } from '@uiw/codemirror-extensions-langs';
import { xcodeLight } from '@uiw/codemirror-theme-xcode';
import CodeMirror from '@uiw/react-codemirror';
import { useCallback, useEffect, useState } from 'react';
import Help from '../Help';
import Contribute from './Contribute';
import clsx from 'clsx';
import styles from './contribute.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleRight, faLightbulb, faTrash } from '@fortawesome/free-solid-svg-icons';
import { getAllLanguages } from '~/api/languages';
import $ from 'jquery';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';

const MainChild = () => {
    const [input, setInput] = useState('');
    const [errorInput, setErrorInput] = useState(undefined);
    const [output, setOutput] = useState('');
    const [errorOutput, setErrorOutput] = useState(undefined);
    const [testcases, setTestcases] = useState([]);
    const [manual, setManual] = useState(false);
    const [review, setReview] = useState(false);

    const handleAddTestcase = () => {
        // if (!input) {
        //     setErrorInput('Missing standard input');
        //     return;
        // }
        setErrorInput(undefined);
        if (!output) {
            setErrorOutput('Missing expected output');
            return;
        }
        setErrorOutput(undefined);

        const newTestcases = [...testcases, { input: input, output: output }];
        setTestcases(newTestcases);
        localStorage.setItem('testcases', JSON.stringify(newTestcases));
        localStorage.setItem('testcase-input', '');
        localStorage.setItem('testcase-output', '');
        setInput('');
        setOutput('');
    };

    const handleChangeInput = (e) => {
        const val = e.target.value;
        if (val.length <= 500) {
            setInput(val);
            localStorage.setItem('testcase-input', val);
        } else {
            setErrorInput('Maximun length of input is 500');
        }
    };

    const handleChangeOutput = (e) => {
        const val = e.target.value;
        if (val.length <= 500) {
            setOutput(val);
            localStorage.setItem('testcase-output', val);
        } else {
            setErrorOutput('Maximun length of output is 500');
        }
    };

    const dropdownToggle = (index) => {
        if (index === 0) {
            setManual(!manual);
        } else if (index === 1) {
            setReview(!review);
        }
        var dropdownMenu = $('.codeMenu');

        if (dropdownMenu[index].classList.contains('dropdownHide')) {
            dropdownMenu[index].classList.remove('dropdownHide');
        } else {
            dropdownMenu[index].classList.add('dropdownHide');
        }
    };

    const handleDeleteTestcase = (index) => {
        const deleteTestcase = testcases[index];
        const newTestcases = testcases.filter((testcase) => testcase !== deleteTestcase);
        setTestcases(newTestcases);
        localStorage.setItem('testcases', JSON.stringify(newTestcases));
    };

    useEffect(() => {
        const savedTestcases = localStorage.getItem('testcases');
        savedTestcases && setTestcases(JSON.parse(savedTestcases));

        const savedInput = localStorage.getItem('testcase-input');
        console.log(savedInput);
        savedInput && setInput(savedInput);

        const savedOutput = localStorage.getItem('testcase-output');
        savedOutput && setOutput(savedOutput);
    }, []);

    return (
        <div className="contribute-body-main-content">
            <div className="title">Share your solution code</div>
            <div className={clsx(styles.codeContainer)}>
                <div className={clsx(styles.codeDropdown)}>
                    <div
                        className={clsx(styles.testcaseToggle)}
                        onClick={() => {
                            dropdownToggle(0);
                        }}
                    >
                        <spam className="pe-3">
                            {manual && <FontAwesomeIcon icon={faAngleDown} />}
                            {!manual && <FontAwesomeIcon icon={faAngleRight} />}
                        </spam>
                        <div className={clsx(styles.codeToggleTitle)}>Add manual</div>
                    </div>
                    <div className="codeMenu dropdownCheck dropdownHide">
                        <div className={clsx(styles.testcaseContainer, 'mt-3')}>
                            <div className={clsx(styles.title)}>TestCases</div>
                            <div class="mb-3">
                                <div className="d-flex align-items-center justify-content-between">
                                    <label for="exampleFormControlInput1" class="form-label">
                                        Standard Input
                                    </label>
                                    {errorInput && (
                                        <label
                                            for="exampleFormControlInput1"
                                            className={clsx('form-label', styles.errorText)}
                                        >
                                            - {errorInput}
                                        </label>
                                    )}
                                </div>

                                <input
                                    type="text"
                                    class={clsx('form-control', `${errorInput ? 'errorInput' : ''}`)}
                                    id="exampleFormControlInput1"
                                    onChange={handleChangeInput}
                                    value={input}
                                />
                            </div>
                            <div class="mb-3">
                                <div className="d-flex align-items-center justify-content-between">
                                    <label for="exampleFormControlInput1" class="form-label">
                                        Expected Output
                                    </label>

                                    {errorOutput && (
                                        <label
                                            for="exampleFormControlInput1"
                                            className={clsx('form-label', styles.errorText)}
                                        >
                                            {errorOutput}
                                        </label>
                                    )}
                                </div>
                                <input
                                    type="text"
                                    class={clsx('form-control', `${errorOutput ? 'errorInput' : ''}`)}
                                    id="exampleFormControlInput1"
                                    onChange={handleChangeOutput}
                                    value={output}
                                />
                            </div>
                            <div className={clsx(styles.testcaseSubmit)} onClick={handleAddTestcase}>
                                Add
                            </div>
                        </div>
                    </div>
                </div>
                <div className={clsx(styles.codeDropdown)}>
                    <div
                        className={clsx(styles.testcaseToggle)}
                        onClick={() => {
                            dropdownToggle(1);
                        }}
                    >
                        <spam className="pe-3">
                            {review && <FontAwesomeIcon icon={faAngleDown} />}
                            {!review && <FontAwesomeIcon icon={faAngleRight} />}
                        </spam>
                        <div className={clsx(styles.codeToggleTitle)}>Testcase Review</div>
                    </div>
                    <div className="codeMenu dropdownCheck dropdownHide">
                        <div className={clsx(styles.testcasesSample, 'row', 'align-items-center')}>
                            {testcases.map((testcase, index) => {
                                return (
                                    <div className={clsx('col-4', 'p-3')}>
                                        <div className={clsx('p-3', styles.testcaseItem)}>
                                            <div
                                                className={clsx(
                                                    styles.testcaseTitle,
                                                    'd-flex',
                                                    'justify-content-between',
                                                    'align-items-center',
                                                )}
                                            >
                                                Test case {index}
                                                <div
                                                    className={clsx(styles.trash)}
                                                    onClick={() => handleDeleteTestcase(index)}
                                                >
                                                    <FontAwesomeIcon icon={faTrash} />
                                                </div>
                                            </div>
                                            <div className={clsx(styles.testcaseSubTitle)}>Standard Input</div>
                                            <div className={clsx(styles.testcaseContainer)}>{testcase.input}</div>
                                            <div className={clsx(styles.testcaseSubTitle)}>Expected Output</div>
                                            <div className={clsx(styles.testcaseContainer)}>{testcase.output}</div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const RightChild = () => {
    return (
        <div className="contribute-border-box mb-5">
            <FontAwesomeIcon icon={faLightbulb} fontSize={32} className="lightbulb" />
            <div className="hint">
                <p>
                    <strong>
                        Theses test cases will be used for all languages and validating with your previous code.
                    </strong>
                </p>
                <p>Note: Your test cases input should only use white spaces and/or enter to split values</p>
                <p>
                    <b className="hint-title">Sample - testcases for adding two integers</b>
                </p>
                <p>
                    <div
                        className={clsx(
                            'd-flex',
                            'align-items-center',
                            'justify-content-between',
                            styles.testcasesSample,
                        )}
                    >
                        <div>
                            <div className={clsx(styles.testcaseTitle)}>Test case 1</div>
                            <div className={clsx(styles.testcaseSubTitle)}>Standard Input</div>
                            <div className={clsx(styles.testcaseContainer)}>1 2</div>
                            <div className={clsx(styles.testcaseSubTitle)}>Expected Output</div>
                            <div className={clsx(styles.testcaseContainer)}>3</div>
                        </div>
                        <div>
                            <div className={clsx(styles.testcaseTitle)}>Test case 1</div>
                            <div className={clsx(styles.testcaseSubTitle)}>Standard Input</div>
                            <div className={clsx(styles.testcaseContainer)}>1 2</div>
                            <div className={clsx(styles.testcaseSubTitle)}>Expected Output</div>
                            <div className={clsx(styles.testcaseContainer)}>3</div>
                        </div>
                        <div>
                            <div className={clsx(styles.testcaseTitle)}>Test case 1</div>
                            <div className={clsx(styles.testcaseSubTitle)}>Standard Input</div>
                            <div className={clsx(styles.testcaseContainer)}>1 2</div>
                            <div className={clsx(styles.testcaseSubTitle)}>Expected Output</div>
                            <div className={clsx(styles.testcaseContainer)}>3</div>
                        </div>
                    </div>
                </p>
                <p>
                    <div className={clsx(styles.testcasesSample)}>
                        <div className={clsx(styles.testcaseTitle)}>Csv format</div>
                        <div className={clsx(styles.testcaseSubTitle)}>
                            If you want to import test cases from .csv file, your file should look like this
                        </div>
                        <div className={clsx(styles.testcaseImage)}>
                            <img src="/images/image_47.png" alt="" />
                        </div>
                    </div>
                </p>
            </div>
        </div>
    );
};

const Solutions = () => {
    return (
        <div>
            <form method="POST" action="/contribute/store" />
            <Contribute contributeStep={5} mainChild={<MainChild />} rightChild={<RightChild />} />;
        </div>
    );
};

export default Solutions;

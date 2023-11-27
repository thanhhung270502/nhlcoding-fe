import { langs } from '@uiw/codemirror-extensions-langs';
import { xcodeLight } from '@uiw/codemirror-theme-xcode';
import CodeMirror from '@uiw/react-codemirror';
import { useCallback, useEffect, useState } from 'react';
import Help from '../Help';
import Contribute from './Contribute';
import clsx from 'clsx';
import styles from './contribute.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faLightbulb } from '@fortawesome/free-solid-svg-icons';
import { getAllLanguages } from '~/api/languages';
import $ from 'jquery';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import { dracula } from '@uiw/codemirror-theme-dracula';

const MainChild = () => {
    const [language, setLanguage] = useState();
    const [languages, setLanguages] = useState([]);
    const [initialCode, setInitialCode] = useState('');
    const [solutionCode, setSolutionCode] = useState('');
    const [fullCode, setFullCode] = useState('');
    const [errorInitialCode, setErrorInitialCode] = useState('');
    const [errorSolutionCode, setErrorSolutionCode] = useState('');
    const [errorFullCode, setErrorFullCode] = useState('');
    const [theme, setTheme] = useState('');

    const handleChangeInitialCode = useCallback(
        (val) => {
            if (language === 'cpp') {
                if (val.length === 0) {
                    setErrorInitialCode('Missing initial code');
                    localStorage.setItem('errorCppInitialCode', 'Missing initial code');
                }
                var cppCode = localStorage.getItem('cpp_code');
                if (cppCode) {
                    cppCode = JSON.parse(cppCode);
                    cppCode['initialCode'] = val;
                    localStorage.setItem('cpp_code', JSON.stringify(cppCode));
                } else {
                    localStorage.setItem(
                        'cpp_code',
                        JSON.stringify({
                            initialCode: val,
                            solutionCode: '',
                            fullCode: '',
                        }),
                    );
                }
            } else if (language === 'python') {
                if (val.length === 0) {
                    setErrorInitialCode('Missing initial code');
                    localStorage.setItem('errorPythonInitialCode', 'Missing initial code');
                }
                var pythonCode = localStorage.getItem('python_code');
                if (pythonCode) {
                    pythonCode = JSON.parse(pythonCode);
                    pythonCode['initialCode'] = val;
                    localStorage.setItem('python_code', JSON.stringify(pythonCode));
                } else {
                    localStorage.setItem(
                        'python_code',
                        JSON.stringify({
                            initialCode: val,
                            solutionCode: '',
                            fullCode: '',
                        }),
                    );
                }
            }
            setInitialCode(val);
        },
        [language],
    );

    const handleChangeSolutionCode = useCallback(
        (val) => {
            if (language === 'cpp') {
                if (val.length === 0) {
                    setErrorSolutionCode('Missing solution code');
                    localStorage.setItem('errorCppSolutionCode', 'Missing solution code');
                }
                var cppCode = localStorage.getItem('cpp_code');
                if (cppCode) {
                    cppCode = JSON.parse(cppCode);
                    cppCode['solutionCode'] = val;
                    localStorage.setItem('cpp_code', JSON.stringify(cppCode));
                } else {
                    localStorage.setItem(
                        'cpp_code',
                        JSON.stringify({
                            initialCode: '',
                            solutionCode: val,
                            fullCode: '',
                        }),
                    );
                }
            } else if (language === 'python') {
                if (val.length === 0) {
                    setErrorSolutionCode('Missing solution code');
                    localStorage.setItem('errorPythonSolutionCode', 'Missing solution code');
                }
                var pythonCode = localStorage.getItem('python_code');
                if (pythonCode) {
                    pythonCode = JSON.parse(pythonCode);
                    pythonCode['solutionCode'] = val;
                    localStorage.setItem('python_code', JSON.stringify(pythonCode));
                } else {
                    localStorage.setItem(
                        'python_code',
                        JSON.stringify({
                            initialCode: '',
                            solutionCode: val,
                            fullCode: '',
                        }),
                    );
                }
            }
            setSolutionCode(val);
        },
        [language],
    );

    const handleChangeFullCode = useCallback(
        (val) => {
            if (language === 'cpp') {
                if (val.length === 0) {
                    setErrorFullCode('Missing full code');
                    localStorage.setItem('errorCppFullCode', 'Missing full code');
                }
                var cppCode = localStorage.getItem('cpp_code');
                if (cppCode) {
                    cppCode = JSON.parse(cppCode);
                    cppCode['fullCode'] = val;
                    localStorage.setItem('cpp_code', JSON.stringify(cppCode));
                } else {
                    localStorage.setItem(
                        'cpp_code',
                        JSON.stringify({
                            initialCode: '',
                            solutionCode: '',
                            fullCode: val,
                        }),
                    );
                }
            } else if (language === 'python') {
                if (val.length === 0) {
                    setErrorFullCode('Missing full code');
                    localStorage.setItem('errorPythonFullCode', 'Missing full code');
                }
                var pythonCode = localStorage.getItem('python_code');
                if (pythonCode) {
                    pythonCode = JSON.parse(pythonCode);
                    pythonCode['fullCode'] = val;
                    localStorage.setItem('python_code', JSON.stringify(pythonCode));
                } else {
                    localStorage.setItem(
                        'python_code',
                        JSON.stringify({
                            initialCode: '',
                            solutionCode: '',
                            fullCode: val,
                        }),
                    );
                }
            }
            setFullCode(val);
        },
        [language],
    );

    const dropdownToggle = (index, id) => {
        if (id === 1) {
            setLanguage('python');
        } else if (id === 2) {
            setLanguage('cpp');
        }
        var dropdownMenu = $('.codeMenu');

        if (dropdownMenu[index].classList.contains('dropdownHide')) {
            for (var i = 0; i < dropdownMenu.length; i++) {
                dropdownMenu[i].classList.add('dropdownHide');
            }
            dropdownMenu[index].classList.remove('dropdownHide');
        } else {
            dropdownMenu[index].classList.add('dropdownHide');
        }
    };

    const handleCheckEmpty = (type) => {
        if (language === 'cpp') {
            if (type === 'initialCode') {
                if (initialCode.length === 0) {
                    setErrorInitialCode('Missing initial code');
                    localStorage.setItem('errorCppInitialCode', 'Missing initial code');
                }
            }
            if (type === 'fullCode') {
                if (fullCode.length === 0) {
                    setErrorFullCode('Missing full code');
                    localStorage.setItem('errorCppFullCode', 'Missing full code');
                }
            }
            if (type === 'solutionCode') {
                if (solutionCode.length === 0) {
                    setErrorSolutionCode('Missing solution code');
                    localStorage.setItem('errorCppSolutionCode', 'Missing solution code');
                }
            }
        } else if (language === 'python') {
            if (type === 'initialCode') {
                if (initialCode.length === 0) {
                    setErrorInitialCode('Missing initial code');
                    localStorage.setItem('errorPythonInitialCode', 'Missing initial code');
                }
            }
            if (type === 'fullCode') {
                if (fullCode.length === 0) {
                    setErrorFullCode('Missing full code');
                    localStorage.setItem('errorPythonFullCode', 'Missing full code');
                }
            }
            if (type === 'solutionCode') {
                if (solutionCode.length === 0) {
                    setErrorSolutionCode('Missing solution code');
                    localStorage.setItem('errorPythonSolutionCode', 'Missing solution code');
                }
            }
        }
    };

    useEffect(() => {
        if (language === 'cpp') {
            var cppCode = localStorage.getItem('cpp_code');
            if (cppCode) {
                cppCode = JSON.parse(cppCode);
                setInitialCode(cppCode.initialCode);
                setFullCode(cppCode.fullCode);
                setSolutionCode(cppCode.solutionCode);
            } else {
                setInitialCode('');
                setFullCode('');
                setSolutionCode('');
            }
            const savedErrorPythonInitialCode = localStorage.getItem('errorPythonInitialCode');
            const savedErrorPythonSolutionCode = localStorage.getItem('errorPythonSolutionCode');
            const savedErrorPythonFullCode = localStorage.getItem('errorPythonFullCode');
            savedErrorPythonInitialCode && setErrorInitialCode(savedErrorPythonInitialCode);
            savedErrorPythonSolutionCode && setErrorSolutionCode(savedErrorPythonSolutionCode);
            savedErrorPythonFullCode && setErrorFullCode(savedErrorPythonFullCode);
        } else if (language === 'python') {
            var pythonCode = localStorage.getItem('python_code');
            if (pythonCode) {
                pythonCode = JSON.parse(pythonCode);
                setInitialCode(pythonCode.initialCode);
                setFullCode(pythonCode.fullCode);
                setSolutionCode(pythonCode.solutionCode);
            } else {
                setInitialCode('');
                setFullCode('');
                setSolutionCode('');
            }
            const savedErrorPythonInitialCode = localStorage.getItem('errorPythonInitialCode');
            const savedErrorPythonSolutionCode = localStorage.getItem('errorPythonSolutionCode');
            const savedErrorPythonFullCode = localStorage.getItem('errorPythonFullCode');
            savedErrorPythonInitialCode && setErrorInitialCode(savedErrorPythonInitialCode);
            savedErrorPythonSolutionCode && setErrorSolutionCode(savedErrorPythonSolutionCode);
            savedErrorPythonFullCode && setErrorFullCode(savedErrorPythonFullCode);
        }
    }, [language]);

    useEffect(() => {
        (async () => {
            var langs = localStorage.getItem('question');
            if (langs) {
                langs = JSON.parse(langs);
                setLanguages(langs['languages']);
            }
        })();
        setTheme(localStorage.getItem('theme'));
    }, []);

    useEffect(() => {
        if (language === 'cpp') {
            if (initialCode.length > 0) {
                setErrorInitialCode(undefined);
                localStorage.setItem('errorCppInitialCode', '');
            }
            if (solutionCode.length > 0) {
                setErrorSolutionCode(undefined);
                localStorage.setItem('errorCppSolutionCode', '');
            }
            if (fullCode.length > 0) {
                setErrorFullCode(undefined);
                localStorage.setItem('errorCppFullCode', '');
            }
        } else if (language === 'python') {
            if (initialCode.length > 0) {
                setErrorInitialCode(undefined);
                localStorage.setItem('errorPythonInitialCode', '');
            }
            if (solutionCode.length > 0) {
                setErrorSolutionCode(undefined);
                localStorage.setItem('errorPythonSolutionCode', '');
            }
            if (fullCode.length > 0) {
                setErrorFullCode(undefined);
                localStorage.setItem('errorPythonFullCode', '');
            }
        }
    }, [fullCode.length, initialCode.length, language, solutionCode.length]);

    return (
        <div className="contribute-body-main-content">
            <div className="title">Share your solution code</div>
            <div className={clsx(styles.codeContainer)}>
                {languages.map((lang, index) => {
                    return (
                        <div className={clsx(styles.codeDropdown)}>
                            <div
                                className="d-flex align-items-center codeToggle"
                                onClick={() => {
                                    dropdownToggle(index, lang.id);
                                }}
                            >
                                <spam className="pe-3">
                                    <FontAwesomeIcon icon={faAngleRight} />
                                </spam>
                                <div className={clsx(styles.codeToggleTitle)}>Code {lang.name}</div>
                            </div>
                            <div className="codeMenu dropdownCheck dropdownHide">
                                <div className={clsx(styles.codeItem)}>
                                    <div className="d-flex align-items-center justify-content-between">
                                        <div className={styles.codeItemTitle}>Initial Code</div>
                                        {errorInitialCode && (
                                            <label
                                                for="exampleFormControlInput1"
                                                className={clsx('form-label', styles.errorText)}
                                            >
                                                - {errorInitialCode}
                                            </label>
                                        )}
                                    </div>
                                    <div className={clsx(styles.codeScript, `${errorInitialCode ? 'errorInput' : ''}`)}>
                                        {lang.name === 'python' && (
                                            <CodeMirror
                                                value={initialCode}
                                                extensions={[langs.python()]}
                                                onChange={handleChangeInitialCode}
                                                onClick={() => {
                                                    handleCheckEmpty('initialCode');
                                                }}
                                                theme={theme === 'light' ? xcodeLight : dracula}
                                            />
                                        )}
                                        {lang.name === 'cpp' && (
                                            <CodeMirror
                                                value={initialCode}
                                                extensions={[langs.cpp()]}
                                                onChange={handleChangeInitialCode}
                                                onClick={() => {
                                                    handleCheckEmpty('initialCode');
                                                }}
                                                theme={theme === 'light' ? xcodeLight : dracula}
                                            />
                                        )}
                                    </div>
                                </div>
                                <div className={clsx(styles.codeItem)}>
                                    <div className="d-flex align-items-center justify-content-between">
                                        <div className={styles.codeItemTitle}>Solution Code</div>
                                        {errorSolutionCode && (
                                            <label
                                                for="exampleFormControlInput1"
                                                className={clsx('form-label', styles.errorText)}
                                            >
                                                - {errorSolutionCode}
                                            </label>
                                        )}
                                    </div>
                                    <div
                                        className={clsx(styles.codeScript, `${errorSolutionCode ? 'errorInput' : ''}`)}
                                    >
                                        {lang.name === 'python' && (
                                            <CodeMirror
                                                value={solutionCode}
                                                extensions={[langs.python()]}
                                                onChange={handleChangeSolutionCode}
                                                onClick={() => {
                                                    handleCheckEmpty('solutionCode');
                                                }}
                                                theme={theme === 'light' ? xcodeLight : dracula}
                                            />
                                        )}
                                        {lang.name === 'cpp' && (
                                            <CodeMirror
                                                value={solutionCode}
                                                extensions={[langs.cpp()]}
                                                onChange={handleChangeSolutionCode}
                                                onClick={() => {
                                                    handleCheckEmpty('solutionCode');
                                                }}
                                                theme={theme === 'light' ? xcodeLight : dracula}
                                            />
                                        )}
                                    </div>
                                </div>
                                <div className={clsx(styles.codeItem)}>
                                    <div className="d-flex align-items-center justify-content-between">
                                        <div className={styles.codeItemTitle}>Full Code</div>
                                        {errorFullCode && (
                                            <label
                                                for="exampleFormControlInput1"
                                                className={clsx('form-label', styles.errorText)}
                                            >
                                                - {errorFullCode}
                                            </label>
                                        )}
                                    </div>
                                    <div className={clsx(styles.codeScript, `${errorFullCode ? 'errorInput' : ''}`)}>
                                        {lang.name === 'python' && (
                                            <CodeMirror
                                                value={fullCode}
                                                extensions={[langs.python()]}
                                                onChange={handleChangeFullCode}
                                                onClick={() => {
                                                    handleCheckEmpty('fullCode');
                                                }}
                                                theme={theme === 'light' ? xcodeLight : dracula}
                                            />
                                        )}
                                        {lang.name === 'cpp' && (
                                            <CodeMirror
                                                value={fullCode}
                                                extensions={[langs.cpp()]}
                                                onChange={handleChangeFullCode}
                                                onClick={() => {
                                                    handleCheckEmpty('fullCode');
                                                }}
                                                theme={theme === 'light' ? xcodeLight : dracula}
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

const RightChild = () => {
    const initialCode = '```cpp\nint add(int a, int b) {\n\n}\n```';
    const solutionCode = '```cpp\nint add(int a, int b) {\n\treturn a + b;\n}\n```';
    const fullCode =
        '```cpp\n#include <iostream>\nusing namespace std;\n\n{{ANSWER}}\t// must have to replace with code\n\nint main() {\n\tint a, b;\n\tcin >> a >> b;\n\tcout << add(a, b);\n\treturn 0;\n}\n```';
    return (
        <div className="contribute-border-box mb-5">
            <FontAwesomeIcon icon={faLightbulb} fontSize={32} className="lightbulb" />
            <div className="hint">
                <p>
                    <strong>
                        For each language, there are 3 code blocks needed for us to validate if your solution is correct
                        or not.
                    </strong>
                </p>
                <p>
                    <b className="hint-title">Sample - cpp code for adding two integers</b>
                </p>
                <p>
                    <strong>Initial Code</strong>
                </p>
                <div className={clsx(styles.sampleCodeContainer)}>
                    <ReactMarkdown
                        children={initialCode}
                        remarkPlugins={[remarkMath]}
                        rehypePlugins={[rehypeKatex]}
                        components={{
                            code({ node, inline, children, ...rest }) {
                                return (
                                    <code {...rest} className="preview-code">
                                        {children}
                                    </code>
                                );
                            },
                        }}
                    />
                </div>
                <p>
                    <strong>Solution Code</strong>
                </p>
                <div className={clsx(styles.sampleCodeContainer)}>
                    <ReactMarkdown
                        children={solutionCode}
                        remarkPlugins={[remarkMath]}
                        rehypePlugins={[rehypeKatex]}
                        components={{
                            code({ node, inline, children, ...rest }) {
                                return (
                                    <code {...rest} className="preview-code">
                                        {children}
                                    </code>
                                );
                            },
                        }}
                    />
                </div>
                <p>
                    <strong>Full Code</strong>
                </p>
                <div className={clsx(styles.sampleCodeContainer)}>
                    <ReactMarkdown
                        children={fullCode}
                        remarkPlugins={[remarkMath]}
                        rehypePlugins={[rehypeKatex]}
                        components={{
                            code({ node, inline, children, ...rest }) {
                                return (
                                    <code {...rest} className="preview-code">
                                        {children}
                                    </code>
                                );
                            },
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

const Solutions = () => {
    return (
        <div>
            <form method="POST" action="/contribute/store" />
            <Contribute contributeStep={4} mainChild={<MainChild />} rightChild={<RightChild />} />;
        </div>
    );
};

export default Solutions;

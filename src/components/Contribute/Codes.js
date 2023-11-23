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

const MainChild = () => {
    const [language, setLanguage] = useState('cpp');
    const [languages, setLanguages] = useState([]);
    const [initialCode, setInitialCode] = useState('');
    const [solutionCode, setSolutionCode] = useState('');
    const [fullCode, setFullCode] = useState('');

    const handleChangeInitialCode = useCallback(
        (val) => {
            if (language === 'cpp') {
                var cppCode = JSON.parse(localStorage.getItem('cpp_code'));
                if (cppCode) {
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
                var pythonCode = JSON.parse(localStorage.getItem('python_code'));
                if (pythonCode) {
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
            // setInitialCode(val);
            console.log('val:', val);
        },
        [language],
    );

    const handleChangeSolutionCode = useCallback(
        (val) => {
            if (language === 'cpp') {
                var cppCode = JSON.parse(localStorage.getItem('cpp_code'));
                if (cppCode) {
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
                var pythonCode = JSON.parse(localStorage.getItem('python_code'));
                if (pythonCode) {
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
            // setSolutionCode(val);
            console.log('val:', val);
        },
        [language],
    );

    const handleChangeFullCode = useCallback(
        (val) => {
            if (language === 'cpp') {
                var cppCode = JSON.parse(localStorage.getItem('cpp_code'));
                if (cppCode) {
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
                var pythonCode = JSON.parse(localStorage.getItem('python_code'));
                if (pythonCode) {
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
            console.log('val:', val);
        },
        [language],
    );

    const dropdownToggle = (index, id) => {
        console.log('index: ', index);
        console.log('id: ', id);
        if (id === 1) {
            setLanguage('python');
        } else if (id === 2) {
            setLanguage('cpp');
        }
        var dropdownMenu = $('.codeMenu');

        if (dropdownMenu[index].classList.contains('dropdownHide')) {
            for (var i = 0; i < dropdownMenu.length; i++) {
                console.log(i);
                dropdownMenu[i].classList.add('dropdownHide');
            }
            dropdownMenu[index].classList.remove('dropdownHide');
        } else {
            dropdownMenu[index].classList.add('dropdownHide');
        }
    };

    useEffect(() => {
        console.log(language);
        if (language === 'cpp') {
            var cppCode = JSON.parse(localStorage.getItem('cpp_code'));
            if (cppCode) {
                setInitialCode(cppCode.initialCode);
                setFullCode(cppCode.fullCode);
                setSolutionCode(cppCode.solutionCode);
            }
        } else if (language === 'python') {
            var pythonCode = JSON.parse(localStorage.getItem('python_code'));
            if (pythonCode) {
                setInitialCode(pythonCode.initialCode);
                setFullCode(pythonCode.fullCode);
                setSolutionCode(pythonCode.solutionCode);
            } else {
                setInitialCode('');
                setFullCode('');
                setSolutionCode('');
            }
        }
    }, [language]);

    useEffect(() => {
        (async () => {
            const langs = JSON.parse(localStorage.getItem('question'));
            if (langs) {
                setLanguages(langs['languages']);
            }
        })();
    }, []);

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
                                    <div className={styles.codeItemTitle}>Initial Code</div>
                                    <div className={clsx(styles.codeScript)}>
                                        {lang.name === 'python' && (
                                            <CodeMirror
                                                value={initialCode}
                                                extensions={[langs.python()]}
                                                onChange={handleChangeInitialCode}
                                                theme={xcodeLight}
                                            />
                                        )}
                                        {lang.name === 'cpp' && (
                                            <CodeMirror
                                                value={initialCode}
                                                extensions={[langs.cpp()]}
                                                onChange={handleChangeInitialCode}
                                                theme={xcodeLight}
                                            />
                                        )}
                                    </div>
                                </div>
                                <div className={clsx(styles.codeItem)}>
                                    <div className={styles.codeItemTitle}>Solution Code</div>
                                    <div className={clsx(styles.codeScript)}>
                                        <CodeMirror
                                            value={solutionCode}
                                            extensions={[langs.cpp()]}
                                            onChange={handleChangeSolutionCode}
                                            theme={xcodeLight}
                                        />
                                    </div>
                                </div>
                                <div className={clsx(styles.codeItem)}>
                                    <div className={styles.codeItemTitle}>Full Code</div>
                                    <div className={clsx(styles.codeScript)}>
                                        <CodeMirror
                                            value={fullCode}
                                            extensions={[langs.cpp()]}
                                            onChange={handleChangeFullCode}
                                            theme={xcodeLight}
                                        />
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
        '```cpp\n#include <iostream>\nusing namespace std;\n\n{{ANSWER}}    // must have to replace code for grading\n\nint add(int a, int b) {\n\treturn a + b;\n}\n\nint main() {\n\tint a, b;\n\tcin >> a >> b;\n\tcout << add(a, b) << endl;\n\treturn 0;\n}\n```';
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

import { useCallback, useState } from 'react';
import './coding.scss';
import CodeMirror from '@uiw/react-codemirror';
import Split from 'react-split-grid';
import { python } from '@codemirror/lang-python';
import { dracula } from '@uiw/codemirror-theme-dracula';
import { submitCode } from '~/api/api';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { sublime } from '@uiw/codemirror-theme-sublime';
import { eclipse } from '@uiw/codemirror-theme-eclipse';
import { langs } from '@uiw/codemirror-extensions-langs';

function Coding() {
    const [code, setCode] = useState('print(a)');
    const [result, setResult] = useState(3);
    const [language, setLanguage] = useState('C++');
    const onChange = useCallback((value, viewUpdate) => {
        setCode(value);
        console.log('value:', value);
    }, []);

    const handleLanguageChange = (e) => {
        setLanguage(e.target.outerText);
        console.log(language);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(code);
        const res = await submitCode(code);
        console.log(res);
    };
    return (
        <div className="problem-body">
            <div className="">
                <Split
                    render={({ getGridProps, getGutterProps }) => (
                        <div className="grid" {...getGridProps()}>
                            <div className="split-left">
                                <div className="bg-white bg-border-radius h-100 p-3">
                                    <div className="problem-title">1. Two Sum</div>
                                    <div className="problem-description pt-3">
                                        Given an array of integers nums and an integer target, return indices of the two
                                        numbers such that they add up to target. <br />
                                        You may assume that each input would have exactly one solution, and you may not
                                        use the same element twice. <br />
                                        You can return the answer in any order.
                                    </div>
                                    <div className="problem-testcase py-3">
                                        <div className="problem-testcase-title">Example 1:</div>
                                        <div className="problem-testcase-input">
                                            Input: nums = [2,7,11,15], target = 9
                                        </div>
                                        <div className="problem-testcase-output">Output: [0,1]</div>
                                    </div>
                                    <div className="problem-testcase py-3">
                                        <div className="problem-testcase-title">Example 2:</div>
                                        <div className="problem-testcase-input">Input: nums = [3,2,4], target = 6</div>
                                        <div className="problem-testcase-output">Output: [1,2]</div>
                                    </div>
                                    <div className="problem-testcase py-3">
                                        <div className="problem-testcase-title">Example 3:</div>
                                        <div className="problem-testcase-input">Input: nums = [3,3], target = 6</div>
                                        <div className="problem-testcase-output">Output: [0,1]</div>
                                    </div>
                                </div>
                            </div>
                            <div className="gutter-col gutter-col-1" {...getGutterProps('column', 1)} />
                            <div className="">
                                <Split
                                    render={({ getGridProps, getGutterProps }) => (
                                        <div className="grid-row h-100" {...getGridProps()}>
                                            <div className="bg-white bg-border-radius">
                                                <div className="problem-code-header border-bottom">
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
                                                </div>
                                                <div className="mt-1">
                                                    {language === 'C++' && (
                                                        <CodeMirror
                                                            value={code}
                                                            extensions={[langs.cpp()]}
                                                            onChange={onChange}
                                                            theme={eclipse}
                                                        />
                                                    )}
                                                    {language === 'Java' && (
                                                        <CodeMirror
                                                            value={code}
                                                            extensions={[langs.java()]}
                                                            onChange={onChange}
                                                            theme={eclipse}
                                                        />
                                                    )}
                                                    {language === 'Python' && (
                                                        <CodeMirror
                                                            value={code}
                                                            extensions={[langs.python()]}
                                                            onChange={onChange}
                                                            theme={eclipse}
                                                        />
                                                    )}
                                                    {language === 'C' && (
                                                        <CodeMirror
                                                            value={code}
                                                            extensions={[langs.c()]}
                                                            onChange={onChange}
                                                            theme={eclipse}
                                                        />
                                                    )}
                                                    {language === 'C#' && (
                                                        <CodeMirror
                                                            value={code}
                                                            extensions={[langs.csharp()]}
                                                            onChange={onChange}
                                                            theme={eclipse}
                                                        />
                                                    )}
                                                    {language === 'JavaScript' && (
                                                        <CodeMirror
                                                            value={code}
                                                            extensions={[langs.javascript()]}
                                                            onChange={onChange}
                                                            theme={eclipse}
                                                        />
                                                    )}
                                                    {language === 'PHP' && (
                                                        <CodeMirror
                                                            value={code}
                                                            extensions={[langs.php()]}
                                                            onChange={onChange}
                                                            theme={eclipse}
                                                        />
                                                    )}
                                                </div>
                                            </div>
                                            <div className="gutter-row gutter-row-1" {...getGutterProps('row', 1)} />
                                            <div className="bg-white">
                                                <div className="bg-white bg-border-radius p-3 mt-3">
                                                    <form onSubmit={handleSubmit}>
                                                        <div className="problem-solve">
                                                            <div className="problem-solve-title">Result</div>
                                                            {result === 1 && (
                                                                <div className="problem-solve-success">Accepted</div>
                                                            )}
                                                            {result === 2 && (
                                                                <div className="problem-solve-failure">Failure</div>
                                                            )}
                                                        </div>
                                                        x
                                                        <button type="submit" className="btn btn-success">
                                                            Submit
                                                        </button>
                                                    </form>
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

export default Coding;

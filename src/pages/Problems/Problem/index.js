import { useCallback, useState } from 'react';
import './problem.scss';
import CodeMirror from '@uiw/react-codemirror';
import Split from 'react-split-grid';
import { python } from '@codemirror/lang-python';
import { dracula } from '@uiw/codemirror-theme-dracula';
import { submitCode } from '~/api/api';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { sublime } from '@uiw/codemirror-theme-sublime';
import { eclipse } from '@uiw/codemirror-theme-eclipse';
import { langs } from '@uiw/codemirror-extensions-langs';
import Description from './description';

function Problem() {
    const [code, setCode] = useState('print(a)');
    const [result, setResult] = useState(3);
    const [language, setLanguage] = useState('C++');
    // const []
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
            <div className="problems">
                <Split
                    render={({ getGridProps, getGutterProps }) => (
                        <div className="grid" {...getGridProps()}>
                            <div className="split bg-white">
                                <div className="d-flex h-100">
                                    <div className="problems-header">
                                        <div className="problems-nav">
                                            <div className="problems-item problems-item-active">Description</div>
                                            <div className="problems-item">Submissions</div>
                                            <div className="problems-item">Solutions</div>
                                            <div className="problems-item">Discussion</div>
                                            <div className="problems-item">Editorial</div>
                                        </div>
                                    </div>
                                    <div className="problems-content">
                                        <Description />
                                    </div>
                                </div>
                            </div>
                            <div className="gutter-col gutter-col-1" {...getGutterProps('column', 1)} />
                            <div className="split">
                                <Split
                                    render={({ getGridProps, getGutterProps }) => (
                                        <div className="grid-row h-100" {...getGridProps()}>
                                            <div className="bg-white">
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
                                                <div className="">
                                                    <div className="problems-console">
                                                        <div className="d-flex justify-content-between aligns-item-center">
                                                            <div className="console">Console</div>
                                                            <div className=""></div>
                                                        </div>
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

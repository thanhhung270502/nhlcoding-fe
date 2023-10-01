import { useCallback, useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { langs } from '@uiw/codemirror-extensions-langs';
import { eclipse } from '@uiw/codemirror-theme-eclipse';
import { materialLight } from '@uiw/codemirror-theme-material';
import { xcodeLight } from '@uiw/codemirror-theme-xcode';
// import { python } from '@codemirror/lang-python';
// import { dracula } from '@uiw/codemirror-theme-dracula';
// import { submitCode } from '~/api/api';
// import { vscodeDark } from '@uiw/codemirror-theme-vscode';
// import { sublime } from '@uiw/codemirror-theme-sublime';
const initialCode = `int main() {
    cout << "Hello World!" << endl;
    return 0;
}
`;

function Code() {
    const [code, setCode] = useState(initialCode);
    const [language, setLanguage] = useState('C++');

    const onChange = useCallback((value, viewUpdate) => {
        setCode(value);
        console.log('value:', value);
    }, []);

    const handleLanguageChange = (e) => {
        setLanguage(e.target.outerText);
        console.log(language);
    };
    return (
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
                        <li className="dropdown-item" onClick={handleLanguageChange}>
                            C++
                        </li>
                        <li className="dropdown-item" onClick={handleLanguageChange}>
                            Java
                        </li>
                        <li className="dropdown-item" onClick={handleLanguageChange}>
                            Python
                        </li>
                        <li className="dropdown-item" onClick={handleLanguageChange}>
                            C
                        </li>
                        <li className="dropdown-item" onClick={handleLanguageChange}>
                            C#
                        </li>
                        <li className="dropdown-item" onClick={handleLanguageChange}>
                            JavaScript
                        </li>
                        <li className="dropdown-item" onClick={handleLanguageChange}>
                            PHP
                        </li>
                    </ul>
                </div>
                <div className="d-flex align-items-center pe-4">
                    <div className="icon reset-code">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-arrow-counterclockwise"
                            viewBox="0 0 16 16"
                        >
                            <path
                                fillRule="evenodd"
                                d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z"
                            />
                            <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z" />
                        </svg>
                    </div>
                    <div className="icon setting">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-gear-fill"
                            viewBox="0 0 16 16"
                        >
                            <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z" />
                        </svg>
                    </div>
                </div>
            </div>
            <div className="mt-1">
                {language === 'C++' && (
                    <CodeMirror value={code} extensions={[langs.cpp()]} onChange={onChange} theme={xcodeLight} />
                )}
                {language === 'Java' && (
                    <CodeMirror value={code} extensions={[langs.java()]} onChange={onChange} theme={xcodeLight} />
                )}
                {language === 'Python' && (
                    <CodeMirror value={code} extensions={[langs.python()]} onChange={onChange} theme={xcodeLight} />
                )}
                {language === 'C' && (
                    <CodeMirror value={code} extensions={[langs.c()]} onChange={onChange} theme={xcodeLight} />
                )}
                {language === 'C#' && (
                    <CodeMirror value={code} extensions={[langs.csharp()]} onChange={onChange} theme={xcodeLight} />
                )}
                {language === 'JavaScript' && (
                    <CodeMirror value={code} extensions={[langs.javascript()]} onChange={onChange} theme={xcodeLight} />
                )}
                {language === 'PHP' && (
                    <CodeMirror value={code} extensions={[langs.php()]} onChange={onChange} theme={xcodeLight} />
                )}
            </div>
        </div>
    );
}

export default Code;

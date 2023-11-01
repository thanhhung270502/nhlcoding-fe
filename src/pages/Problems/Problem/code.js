import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { langs } from '@uiw/codemirror-extensions-langs';
import { eclipse } from '@uiw/codemirror-theme-eclipse';
import { materialLight } from '@uiw/codemirror-theme-material';
import { xcodeLight } from '@uiw/codemirror-theme-xcode';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faRotateLeft } from '@fortawesome/free-solid-svg-icons';
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

// export const CodeContext = createContext({
//     code: '',
//     setCode: () => {},
// });
export const CodeContext = createContext();

function Code() {
    const [code, setCode] = useState(initialCode);
    const [language, setLanguage] = useState('C++');

    const onChange = useCallback((value, viewUpdate) => {
        setCode(value);
        // console.log('value:', value);
    }, []);

    const handleLanguageChange = (e) => {
        setLanguage(e.target.outerText);
        // console.log(language);
    };

    // useEffect(() => {
    //     console.log(code);
    // }, [code]);
    return (
        <CodeContext.Provider value={code}>
            <div className="bg-white">
                <div className="d-flex justify-content-between align-items-center problem-code-header border-bottom">
                    <div className="dropdown">
                        <div
                            className="problem-languages dropdown-toggle"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            {language}
                        </div>
                        <ul className="dropdown-menu">
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
                        {/*<svg>
                            <path
                                fillRule="evenodd"
                                d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z"
                            />
                            <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z" />
    </svg>*/}
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
                        <CodeMirror
                            value={code}
                            extensions={[langs.javascript()]}
                            onChange={onChange}
                            theme={xcodeLight}
                        />
                    )}
                    {language === 'PHP' && (
                        <CodeMirror value={code} extensions={[langs.php()]} onChange={onChange} theme={xcodeLight} />
                    )}
                </div>
            </div>
        </CodeContext.Provider>
    );
}

export default Code;

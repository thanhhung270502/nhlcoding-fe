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

export const CodeContext = createContext();

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
        <CodeContext.Provider value={code}>
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

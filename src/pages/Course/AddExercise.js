import clsx from 'clsx';
import styles from './course.module.scss';
import { useCallback, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleRight, faAngleUp, faCheck } from '@fortawesome/free-solid-svg-icons';
import { faSlack } from '@fortawesome/free-brands-svg-icons';
import { getAllLanguages } from '~/api/languages';
import { getAllLevels } from '~/api/levels';

import CodeMirror from '@uiw/react-codemirror';
import { langs } from '@uiw/codemirror-extensions-langs';
import { dracula } from '@uiw/codemirror-theme-dracula';
import { xcodeLight } from '@uiw/codemirror-theme-xcode';

const { default: CourseComponent } = require('~/components/Course');

const MainChild = () => {
    const [openFieldForm, setOpenFieldForm] = useState(true);
    const [openFieldForms, setOpenFieldForms] = useState([]);

    const [theme, setTheme] = useState('');

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const [languages, setLanguages] = useState([]);
    const [languages_, setLanguages_] = useState([]);
    const [openLanguages, setOpenLanguages] = useState(false);

    const [levels, setLevels] = useState([]);
    const [level_, setLevel_] = useState(null);
    const [openLevel, setOpenLevel] = useState(false);

    const [initialCodes, setInitialCodes] = useState([]);
    const [solutionCodes, setSolutionCodes] = useState([]);
    const [fullCodes, setFullCodes] = useState([]);

    const [inputTestcase, setInputTestcase] = useState('');
    const [outputTestcase, setOutputTestcase] = useState('');

    const [testcases, setTestcases] = useState([
        {
            input: '12 34',
            output: '56',
        },
    ]);

    const [errorTitle, setErrorTitle] = useState('');
    const [errorDescription, setErrorDescription] = useState('');
    const [errorLanguage, setErrorLanguage] = useState('');
    const [errorLevel, setErrorLevel] = useState('');

    const handleOpenFieldForms = (index) => {
        const updateOpens = [...openFieldForms];
        updateOpens[index] = !updateOpens[index];
        setOpenFieldForms(updateOpens);
    };

    const handleChangeTitle = (text) => {
        setTitle(text);
    };

    const handleChangeDescription = (text) => {
        setDescription(text);
    };

    const checkLanguage = (languages, language) => {
        for (let i = 0; i < languages.length; i++) {
            if (languages[i].id === language.id) return true;
        }
        return false;
    };

    const handleSelectLanguages = (language) => {
        let newLanguage;
        if (checkLanguage(languages_, language)) {
            newLanguage = languages_.filter((element) => element.id !== language.id);
            setLanguages_(newLanguage);
        } else {
            newLanguage = [...languages_, language];
            setLanguages_(newLanguage);
        }
    };

    const convertLanguages = (languages) => {
        if (languages.length > 0) {
            var stringLanguages = languages[0]['name'];
            for (var i = 1; i < languages.length; i++) {
                stringLanguages = stringLanguages + ', ' + languages[i]['name'];
            }
            return stringLanguages;
        }
    };

    // Level
    const handleSelectLevel = (level) => {
        setLevel_(level);
    };

    // Code
    const handleCheckEmpty = (type) => {
        // if (language === 'cpp') {
        //     if (type === 'initialCode') {
        //         if (initialCode.length === 0) {
        //             setErrorInitialCode('Missing initial code');
        //             localStorage.setItem('errorCppInitialCode', 'Missing initial code');
        //         }
        //     }
        //     if (type === 'fullCode') {
        //         if (fullCode.length === 0) {
        //             setErrorFullCode('Missing full code');
        //             localStorage.setItem('errorCppFullCode', 'Missing full code');
        //         }
        //     }
        //     if (type === 'solutionCode') {
        //         if (solutionCode.length === 0) {
        //             setErrorSolutionCode('Missing solution code');
        //             localStorage.setItem('errorCppSolutionCode', 'Missing solution code');
        //         }
        //     }
        // } else if (language === 'python') {
        //     if (type === 'initialCode') {
        //         if (initialCode.length === 0) {
        //             setErrorInitialCode('Missing initial code');
        //             localStorage.setItem('errorPythonInitialCode', 'Missing initial code');
        //         }
        //     }
        //     if (type === 'fullCode') {
        //         if (fullCode.length === 0) {
        //             setErrorFullCode('Missing full code');
        //             localStorage.setItem('errorPythonFullCode', 'Missing full code');
        //         }
        //     }
        //     if (type === 'solutionCode') {
        //         if (solutionCode.length === 0) {
        //             setErrorSolutionCode('Missing solution code');
        //             localStorage.setItem('errorPythonSolutionCode', 'Missing solution code');
        //         }
        //     }
        // }
    };

    // Testcases
    const handleChangeInputTestcase = (text) => {
        setInputTestcase(text);
    };

    const handleChangeOutputTestcase = (text) => {
        setOutputTestcase(text);
    };

    const handleChangeCode = (val, language, type) => {
        if (type === 'initial') {
            const updateCode = [...initialCodes];
            updateCode[language.id] = val;
            setInitialCodes(updateCode);
        } else if (type === 'solution') {
            const updateCode = [...solutionCodes];
            updateCode[language.id] = val;
            setSolutionCodes(updateCode);
        } else if (type === 'full') {
            const updateCode = [...fullCodes];
            updateCode[language.id] = val;
            setFullCodes(updateCode);
        }
    };

    const handleAddTestcase = () => {
        const newTestCases = [...testcases, { input: inputTestcase, output: outputTestcase }];
        setTestcases(newTestCases);
        setInputTestcase('');
        setOutputTestcase('');
    };

    useEffect(() => {
        setOpenFieldForms(new Array(100).fill(true));
        setInitialCodes(new Array(100).fill(''));
        setTheme(localStorage.getItem('theme'));

        (async () => {
            const fetchLanguages = await getAllLanguages();
            setLanguages(fetchLanguages.data);

            const fetchLevels = await getAllLevels();
            setLevels(fetchLevels);
        })();
    }, []);

    return (
        <div className={clsx(styles.addExercise)}>
            <div className={clsx(styles.header)} onClick={() => setOpenFieldForm(!openFieldForm)}>
                <div className={clsx(styles.headerTitle)}>
                    <span>
                        <FontAwesomeIcon icon={faSlack} />
                    </span>
                    ADD NEW EXERICSE TO ...
                </div>
                {openFieldForm && (
                    <div className={clsx(styles.headerIcon)}>
                        <FontAwesomeIcon icon={faAngleUp} />
                    </div>
                )}
                {!openFieldForm && (
                    <div className={clsx(styles.headerIcon)}>
                        <FontAwesomeIcon icon={faAngleDown} />
                    </div>
                )}
            </div>
            {openFieldForm && (
                <div className={clsx(styles.body)}>
                    <div className={clsx(styles.formField)}>
                        <div
                            className={clsx(styles.formTitle)}
                            onClick={() => {
                                handleOpenFieldForms(0);
                            }}
                        >
                            <div className={clsx(styles.title)}>General Information</div>
                            <div className={clsx(styles.formDropdown)}>
                                {openFieldForms[0] && <FontAwesomeIcon icon={faAngleUp} />}
                                {!openFieldForms[0] && <FontAwesomeIcon icon={faAngleDown} />}
                            </div>
                        </div>
                        {openFieldForms[0] && (
                            <div>
                                <div className={clsx(styles.formInput)}>
                                    <div className={clsx(styles.label)}>Title *</div>
                                    <div className={clsx(styles.input)}>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="exampleFormControlInput1"
                                            value={title}
                                            onChange={(event) => handleChangeTitle(event.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className={clsx(styles.formInput)}>
                                    <div className={clsx(styles.label)}>Languages *</div>
                                    <div className={clsx(styles.input)}>
                                        <div
                                            className={clsx(styles.dropdown)}
                                            onClick={() => setOpenLanguages(!openLanguages)}
                                        >
                                            <div className={clsx(styles.dropdownName)}>
                                                {languages_.length > 0
                                                    ? convertLanguages(languages_)
                                                    : 'Select one or more languages...'}
                                            </div>
                                            <div className={clsx(styles.dropdownIcon)}>
                                                {openLanguages && <FontAwesomeIcon icon={faAngleUp} />}
                                                {!openLanguages && <FontAwesomeIcon icon={faAngleDown} />}
                                            </div>
                                        </div>
                                        {openLanguages && (
                                            <div className={clsx(styles.dropdownBody)}>
                                                {languages.map((language, indexLanguage) => {
                                                    return (
                                                        <div
                                                            className={clsx(styles.dropdownItem)}
                                                            onClick={() => handleSelectLanguages(language)}
                                                        >
                                                            <div className={clsx(styles.dropdownItemTitle)}>
                                                                {language.name}
                                                            </div>
                                                            {checkLanguage(languages_, language) && (
                                                                <div className={clsx(styles.dropdownItemIcon)}>
                                                                    <FontAwesomeIcon icon={faCheck} />
                                                                </div>
                                                            )}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className={clsx(styles.formInput)}>
                                    <div className={clsx(styles.label)}>Level *</div>
                                    <div className={clsx(styles.input)}>
                                        <div className={clsx(styles.dropdown)} onClick={() => setOpenLevel(!openLevel)}>
                                            <div className={clsx(styles.dropdownName)}>
                                                {level_ ? level_.name : 'Select level...'}
                                            </div>
                                            <div className={clsx(styles.dropdownIcon)}>
                                                {openLevel && <FontAwesomeIcon icon={faAngleUp} />}
                                                {!openLevel && <FontAwesomeIcon icon={faAngleDown} />}
                                            </div>
                                        </div>
                                        {openLevel && (
                                            <div className={clsx(styles.dropdownBody)}>
                                                {levels.map((level, indexLanguage) => {
                                                    return (
                                                        <div
                                                            className={clsx(styles.dropdownItem)}
                                                            onClick={() => handleSelectLevel(level)}
                                                        >
                                                            <div className={clsx(styles.dropdownItemTitle)}>
                                                                {level.name}
                                                            </div>
                                                            {level_ && level.id === level_.id && (
                                                                <div className={clsx(styles.dropdownItemIcon)}>
                                                                    <FontAwesomeIcon icon={faCheck} />
                                                                </div>
                                                            )}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className={clsx(styles.formInput)}>
                                    <div className={clsx(styles.label)}>Description *</div>
                                    <div className={clsx(styles.input)}>
                                        <textarea
                                            type="text"
                                            className={clsx('form-control', styles.textarea)}
                                            id="exampleFormControlInput1"
                                            placeholder="Type your description about the question here."
                                            value={description}
                                            onChange={(event) => handleChangeDescription(event.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className={clsx(styles.formField)}>
                        <div
                            className={clsx(styles.formTitle)}
                            onClick={() => {
                                handleOpenFieldForms(6);
                            }}
                        >
                            <div className={clsx(styles.title)}>Timer</div>
                            <div className={clsx(styles.formDropdown)}>
                                {openFieldForms[6] && <FontAwesomeIcon icon={faAngleUp} />}
                                {!openFieldForms[6] && <FontAwesomeIcon icon={faAngleDown} />}
                            </div>
                        </div>
                        {openFieldForms[6] && (
                            <div>
                                <div className={clsx(styles.formInput)}>
                                    <div className={clsx(styles.label)}>Start time *</div>
                                    <div className={clsx(styles.input)}>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="exampleFormControlInput1"
                                            value={title}
                                            onChange={(event) => handleChangeTitle(event.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className={clsx(styles.formInput)}>
                                    <div className={clsx(styles.label)}>Languages *</div>
                                    <div className={clsx(styles.input)}>
                                        <div
                                            className={clsx(styles.dropdown)}
                                            onClick={() => setOpenLanguages(!openLanguages)}
                                        >
                                            <div className={clsx(styles.dropdownName)}>
                                                {languages_.length > 0
                                                    ? convertLanguages(languages_)
                                                    : 'Select one or more languages...'}
                                            </div>
                                            <div className={clsx(styles.dropdownIcon)}>
                                                {openLanguages && <FontAwesomeIcon icon={faAngleUp} />}
                                                {!openLanguages && <FontAwesomeIcon icon={faAngleDown} />}
                                            </div>
                                        </div>
                                        {openLanguages && (
                                            <div className={clsx(styles.dropdownBody)}>
                                                {languages.map((language, indexLanguage) => {
                                                    return (
                                                        <div
                                                            className={clsx(styles.dropdownItem)}
                                                            onClick={() => handleSelectLanguages(language)}
                                                        >
                                                            <div className={clsx(styles.dropdownItemTitle)}>
                                                                {language.name}
                                                            </div>
                                                            {checkLanguage(languages_, language) && (
                                                                <div className={clsx(styles.dropdownItemIcon)}>
                                                                    <FontAwesomeIcon icon={faCheck} />
                                                                </div>
                                                            )}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className={clsx(styles.formInput)}>
                                    <div className={clsx(styles.label)}>Level *</div>
                                    <div className={clsx(styles.input)}>
                                        <div className={clsx(styles.dropdown)} onClick={() => setOpenLevel(!openLevel)}>
                                            <div className={clsx(styles.dropdownName)}>
                                                {level_ ? level_.name : 'Select level...'}
                                            </div>
                                            <div className={clsx(styles.dropdownIcon)}>
                                                {openLevel && <FontAwesomeIcon icon={faAngleUp} />}
                                                {!openLevel && <FontAwesomeIcon icon={faAngleDown} />}
                                            </div>
                                        </div>
                                        {openLevel && (
                                            <div className={clsx(styles.dropdownBody)}>
                                                {levels.map((level, indexLanguage) => {
                                                    return (
                                                        <div
                                                            className={clsx(styles.dropdownItem)}
                                                            onClick={() => handleSelectLevel(level)}
                                                        >
                                                            <div className={clsx(styles.dropdownItemTitle)}>
                                                                {level.name}
                                                            </div>
                                                            {level_ && level.id === level_.id && (
                                                                <div className={clsx(styles.dropdownItemIcon)}>
                                                                    <FontAwesomeIcon icon={faCheck} />
                                                                </div>
                                                            )}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className={clsx(styles.formInput)}>
                                    <div className={clsx(styles.label)}>Description *</div>
                                    <div className={clsx(styles.input)}>
                                        <textarea
                                            type="text"
                                            className={clsx('form-control', styles.textarea)}
                                            id="exampleFormControlInput1"
                                            placeholder="Type your description about the question here."
                                            value={description}
                                            onChange={(event) => handleChangeDescription(event.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    {languages_.length > 0 &&
                        languages_.map((lang, indexLang) => {
                            return (
                                <div className={clsx(styles.formField)}>
                                    <div
                                        className={clsx(styles.formTitle)}
                                        onClick={() => {
                                            handleOpenFieldForms(lang.id);
                                        }}
                                    >
                                        <div className={clsx(styles.title)}>Code {lang.name}</div>
                                        <div className={clsx(styles.formDropdown)}>
                                            {openFieldForms[lang.id] && <FontAwesomeIcon icon={faAngleUp} />}
                                            {!openFieldForms[lang.id] && <FontAwesomeIcon icon={faAngleDown} />}
                                        </div>
                                    </div>
                                    {openFieldForms[lang.id] && (
                                        <div>
                                            <div className={clsx('d-flex', 'align-items-center, pt-3')}>
                                                <div className={clsx(styles.label)}>Initial Code</div>
                                                <div className={clsx(styles.input, styles.inputCode)}>
                                                    <CodeMirror
                                                        value={initialCodes[lang.id]}
                                                        extensions={[
                                                            lang.name === 'cpp' ? langs.cpp() : langs.python(),
                                                        ]}
                                                        onChange={(val) => handleChangeCode(val, lang, 'initial')}
                                                        onClick={() => {
                                                            handleCheckEmpty('initialCode');
                                                        }}
                                                        theme={theme === 'light' ? xcodeLight : dracula}
                                                    />
                                                </div>
                                            </div>
                                            <div className={clsx('d-flex', 'align-items-center, pt-3')}>
                                                <div className={clsx(styles.label)}>Solution Code</div>
                                                <div className={clsx(styles.input, styles.inputCode)}>
                                                    <CodeMirror
                                                        value={solutionCodes[lang.id]}
                                                        extensions={[
                                                            lang.name === 'cpp' ? langs.cpp() : langs.python(),
                                                        ]}
                                                        onChange={(val) => handleChangeCode(val, lang, 'solution')}
                                                        onClick={() => {
                                                            handleCheckEmpty('solutionCode');
                                                        }}
                                                        theme={theme === 'light' ? xcodeLight : dracula}
                                                    />
                                                </div>
                                            </div>
                                            <div className={clsx('d-flex', 'align-items-center, pt-3')}>
                                                <div className={clsx(styles.label)}>Full Code</div>
                                                <div className={clsx(styles.input, styles.inputCode)}>
                                                    <CodeMirror
                                                        value={fullCodes[lang.id]}
                                                        extensions={[
                                                            lang.name === 'cpp' ? langs.cpp() : langs.python(),
                                                        ]}
                                                        onChange={(val) => handleChangeCode(val, lang, 'full')}
                                                        onClick={() => {
                                                            handleCheckEmpty('initialCode');
                                                        }}
                                                        theme={theme === 'light' ? xcodeLight : dracula}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}

                    <div className={clsx(styles.formField)}>
                        <div
                            className={clsx(styles.formTitle)}
                            onClick={() => {
                                handleOpenFieldForms(3);
                            }}
                        >
                            <div className={clsx(styles.title)}>Testcases</div>
                            <div className={clsx(styles.formDropdown)}>
                                {openFieldForms[3] && <FontAwesomeIcon icon={faAngleUp} />}
                                {!openFieldForms[3] && <FontAwesomeIcon icon={faAngleDown} />}
                            </div>
                        </div>
                        {openFieldForms[3] && (
                            <div>
                                <div className={clsx(styles.testCaseField)}>
                                    <div
                                        className={clsx(styles.testCaseHeader)}
                                        onClick={() => {
                                            handleOpenFieldForms(4);
                                        }}
                                    >
                                        <div className={clsx(styles.testCaseIcon)}>
                                            {openFieldForms[4] && <FontAwesomeIcon icon={faAngleDown} />}
                                            {!openFieldForms[4] && <FontAwesomeIcon icon={faAngleRight} />}
                                        </div>
                                        <div className={clsx(styles.testCaseTitle)}>Add new testcase...</div>
                                    </div>
                                    {openFieldForms[4] && (
                                        <div className={clsx(styles.testCaseFillField)}>
                                            <div className={clsx(styles.testCaseFillItem)}>
                                                <div className={clsx(styles.label)}>Standard Input</div>
                                                <div className={clsx(styles.input)}>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="exampleFormControlInput1"
                                                        value={inputTestcase}
                                                        onChange={(event) =>
                                                            handleChangeInputTestcase(event.target.value)
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            <div className={clsx(styles.testCaseFillItem)}>
                                                <div className={clsx(styles.label)}>Expected Output</div>
                                                <div className={clsx(styles.input)}>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="exampleFormControlInput1"
                                                        value={outputTestcase}
                                                        onChange={(event) =>
                                                            handleChangeOutputTestcase(event.target.value)
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            <div className={clsx('d-flex', styles.testCaseFillField)}>
                                                <div
                                                    className={clsx(
                                                        styles.button,
                                                        styles.buttonAdd,
                                                        styles.buttonAddTestcase,
                                                    )}
                                                    onClick={handleAddTestcase}
                                                >
                                                    Add
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className={clsx(styles.testCaseField)}>
                                    <div
                                        className={clsx(styles.testCaseHeader)}
                                        onClick={() => {
                                            handleOpenFieldForms(5);
                                        }}
                                    >
                                        <div className={clsx(styles.testCaseIcon)}>
                                            {openFieldForms[5] && <FontAwesomeIcon icon={faAngleDown} />}
                                            {!openFieldForms[5] && <FontAwesomeIcon icon={faAngleRight} />}
                                        </div>
                                        <div className={clsx(styles.testCaseTitle)}>Testcase Review</div>
                                    </div>
                                    {openFieldForms[5] && (
                                        <div className={clsx(styles.testCaseReviewField)}>
                                            <div
                                                className={clsx(
                                                    'd-flex',
                                                    'align-items-center',
                                                    styles.testCaseTableHeader,
                                                )}
                                            >
                                                <div className={clsx(styles.textCenter, styles.borderCol, 'col-6')}>
                                                    Standard Input
                                                </div>
                                                <div className={clsx(styles.textCenter, styles.borderCol, 'col-6')}>
                                                    Expected Output
                                                </div>
                                            </div>
                                            <div className={clsx(styles.testCaseTableBody)}>
                                                {testcases.map((testcase, idxTestcase) => {
                                                    return (
                                                        <div
                                                            className={clsx(
                                                                'd-flex',
                                                                'align-items-center',
                                                                styles.testCaseTableRow,
                                                            )}
                                                        >
                                                            <div
                                                                className={clsx(
                                                                    styles.textCenter,
                                                                    styles.borderCol,
                                                                    'col-6',
                                                                )}
                                                            >
                                                                {testcase.input}
                                                            </div>
                                                            <div
                                                                className={clsx(
                                                                    styles.textCenter,
                                                                    styles.borderCol,
                                                                    'col-6',
                                                                )}
                                                            >
                                                                {testcase.output}
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                        <div
                            className={clsx(
                                'd-flex',
                                'align-items-center',
                                'justify-content-center',
                                'pt-5',
                                styles.testCaseFillItem,
                            )}
                        >
                            <div className={clsx(styles.button, styles.buttonAdd)}>Save and back to my class</div>
                            <div className={clsx(styles.button, styles.buttonCancel)}>Cancel</div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const AddExercise = () => {
    return <CourseComponent state="course" mainChild={<MainChild />} />;
};

export default AddExercise;

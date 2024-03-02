import { useEffect, useRef, useState } from 'react';
import Contribute from './Contribute';
// import CustomEditor from '../CKEditor';
import { faCaretDown, faCheck, faLightbulb } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getAllLanguages } from '~/api/languages';

import clsx from 'clsx';
import $ from 'jquery';
import styles from './contribute.module.scss';
import { getAllLevels } from '~/api/levels';
import { validateDescription } from '~/api/problems';
import MarkDown from '../MarkDown';

const MainChild = ({ descriptionData, setDescriptionData }) => {
    // State
    const [titleText, setTitleText] = useState('');
    const [levels, setLevels] = useState([]);
    const [level, setLevel] = useState(undefined);
    const [languages, setLanguages] = useState([]);
    const [currentLanguages, setCurrentLanguages] = useState([]);
    const [isChecked, setIsChecked] = useState(false);
    const [errorTitle, setErrorTitle] = useState(undefined);
    const [errorDescription, setErrorDescription] = useState(undefined);
    const [errorLanguages, setErrorLanguages] = useState(undefined);
    const [errorLevel, setErrorLevel] = useState(undefined);
    const [languagesOpen, setLanguagesOpen] = useState(false);
    const [levelOpen, setLevelOpen] = useState(false);

    let languagesRef = useRef();
    let levelRef = useRef();

    useEffect(() => {
        let handler = (e) => {
            // if (e.target) {
            if (!languagesRef.current.contains(e.target)) {
                setLanguagesOpen(false);
            }
        };

        document.addEventListener('mousedown', handler);

        return () => {
            document.removeEventListener('mousedown', handler);
        };
    });

    useEffect(() => {
        let handler = (e) => {
            // if (e.target) {
            if (!levelRef.current.contains(e.target)) {
                setLevelOpen(false);
            }
        };

        document.addEventListener('mousedown', handler);

        return () => {
            document.removeEventListener('mousedown', handler);
        };
    });

    const dropdownToggle = (index) => {
        // console.log(event);
        var dropdownMenu = $('.dropdownQuestion');
        if (dropdownMenu[index].classList.contains('dropdownHide')) {
            dropdownMenu[index].classList.remove('dropdownHide');
        } else {
            dropdownMenu[index].classList.add('dropdownHide');
        }
    };

    const handleChangeTitle = (event) => {
        const inputValue = event.target.value;
        if (inputValue.length === 0) {
            setErrorTitle('Missing question title');
            localStorage.setItem('errorQuestionTitle', 'Missing question title');
        }
        if (inputValue.length <= 150) {
            setTitleText(inputValue);
            var question = localStorage.getItem('question');
            if (question) {
                question = JSON.parse(question);
                question['title'] = inputValue;
                localStorage.setItem('question', JSON.stringify(question));
            } else {
                localStorage.setItem(
                    'question',
                    JSON.stringify({
                        title: inputValue,
                        languages: [],
                        description: '',
                        level: '',
                    }),
                );
            }
        }
    };

    const checkLanguage = (languages, language) => {
        for (let i = 0; i < languages.length; i++) {
            if (languages[i].id === language.id) return true;
        }
        return false;
    };

    const handleCheckboxChange = () => {
        const updatedCheckedState = !isChecked;
        setIsChecked(updatedCheckedState);
        localStorage.setItem('validate', updatedCheckedState.toString());
    };

    const handleSelectLanguages = (language) => {
        var newCurrentLanguage;
        if (checkLanguage(currentLanguages, language)) {
            newCurrentLanguage = currentLanguages.filter((element) => element.id !== language.id);
            setCurrentLanguages(newCurrentLanguage);
        } else {
            newCurrentLanguage = [...currentLanguages, language];
            setCurrentLanguages(newCurrentLanguage);
        }
        var question = localStorage.getItem('question');
        if (question) {
            question = JSON.parse(question);
            question['languages'] = newCurrentLanguage;
            localStorage.setItem('question', JSON.stringify(question));
        } else {
            localStorage.setItem(
                'question',
                JSON.stringify({
                    title: '',
                    languages: newCurrentLanguage,
                    level: '',
                    description: '',
                }),
            );
        }
    };

    const handleChangeDescription = (e) => {
        const inputValue = e.target.value;
        if (inputValue.length === 0) {
            setErrorDescription('Missing question description');
            localStorage.setItem('errorQuestionDescription', 'Missing question description');
        }
        if (inputValue.length <= 5000) {
            setDescriptionData(inputValue);

            var question = localStorage.getItem('question');
            if (question) {
                question = JSON.parse(question);
                question['description'] = inputValue;
                localStorage.setItem('question', JSON.stringify(question));
            } else {
                localStorage.setItem(
                    'question',
                    JSON.stringify({
                        title: '',
                        languages: [],
                        level: '',
                        description: inputValue,
                    }),
                );
            }
        }
    };

    const handleSelectLevels = (level) => {
        setLevel(level);

        var question = localStorage.getItem('question');
        if (question) {
            question = JSON.parse(question);
            question['level'] = level;
            localStorage.setItem('question', JSON.stringify(question));
        } else {
            localStorage.setItem(
                'question',
                JSON.stringify({
                    title: '',
                    languages: [],
                    level: level,
                    description: '',
                }),
            );
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

    const handleValidateDescription = async () => {
        const res = await validateDescription(descriptionData);
    };

    const handleCheckEmpty = (type) => {
        if (type === 'languages') {
            if (currentLanguages.length === 0) {
                setErrorLanguages('Required languages');
                localStorage.setItem('errorQuestionLanguages', 'Missing question languages');
            }
        }
        if (type === 'level') {
            // console.log(level);
            if (level === undefined) {
                setErrorLevel('Required level');
                localStorage.setItem('errorQuestionLevel', 'Missing question level');
            }
        }
    };

    useEffect(() => {
        (async () => {
            const res = await getAllLanguages();
            console.log(res.data);
            setLanguages(res.data);
            const res2 = await getAllLevels();
            setLevels(res2);
            var question = localStorage.getItem('question');

            if (question) {
                question = JSON.parse(question);
                setTitleText(question['title']);
                setCurrentLanguages(question['languages']);
                setDescriptionData(question['description']);
                setLevel(question['level']);
            }

            const savedCheckedState = localStorage.getItem('validate');
            if (savedCheckedState !== null) {
                setIsChecked(savedCheckedState === 'true');
            }

            const savedErrorTitle = localStorage.getItem('errorQuestionTitle');
            const savedErrorDescription = localStorage.getItem('errorQuestionDescription');
            const savedErrorLanguages = localStorage.getItem('errorQuestionLanguages');
            const savedErrorLevel = localStorage.getItem('errorQuestionLevel');

            savedErrorTitle && setErrorTitle(savedErrorTitle);
            savedErrorDescription && setErrorDescription(savedErrorDescription);
            savedErrorLanguages && setErrorLanguages(savedErrorLanguages);
            savedErrorLevel && setErrorLevel(savedErrorLevel);
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        console.log(typeof level);
        if (titleText.length > 0) {
            setErrorTitle(undefined);
            localStorage.setItem('errorQuestionTitle', '');
        }

        if (descriptionData.length > 0) {
            setErrorDescription(undefined);
            localStorage.setItem('errorQuestionDescription', '');
        }

        if (level !== undefined && !(typeof level === 'string')) {
            console.log('here');
            setErrorLevel(undefined);
            localStorage.setItem('errorQuestionLevel', '');
        }

        if (currentLanguages.length > 0) {
            setErrorLanguages(undefined);
            localStorage.setItem('errorQuestionLanguages', '');
        }
    }, [currentLanguages.length, descriptionData.length, level, titleText.length]);

    return (
        <div className="contribute-body-main-content">
            <div className="title">Please describe your question.</div>
            <div className="d-flex gap-4">
                <div className="col-12">
                    <div className="d-flex align-items-center justify-content-between">
                        <div className="subtitle">Title *</div>
                        {errorTitle && (
                            <label for="exampleFormControlInput1" className={clsx('form-label', styles.errorText)}>
                                - {errorTitle}
                            </label>
                        )}
                    </div>
                    <input
                        type="text"
                        className={clsx('form-control', styles.input, 'w-100', `${errorTitle ? 'errorInput' : ''}`)}
                        id="question-title"
                        name="question-title"
                        value={titleText}
                        onChange={handleChangeTitle}
                        onClick={handleChangeTitle}
                    />
                    <div
                        className={clsx(
                            'd-flex',
                            'align-items-center',
                            'justify-content-end',
                            `${errorTitle ? 'errorText' : ''}`,
                            'pt-2',
                        )}
                    >
                        {titleText.length}/150
                    </div>
                </div>
            </div>

            <div className="d-flex mb-3">
                <div className="col-6 pe-2">
                    <div className="d-flex align-items-center justify-content-between">
                        <div className="subtitle">Languages *</div>
                        {errorLanguages && (
                            <label for="exampleFormControlInput1" className={clsx('form-label', styles.errorText)}>
                                - {errorLanguages}
                            </label>
                        )}
                    </div>
                    <div className={clsx(styles.dropdown, `${errorLanguages ? 'errorInput' : ''}`)} ref={languagesRef}>
                        <div
                            className="dropdownToggleQuestion"
                            onClick={() => {
                                // dropdownToggle(0);
                                setLanguagesOpen(!languagesOpen);
                                handleCheckEmpty('languages');
                            }}
                        >
                            <div className={clsx(styles.name, `${errorLanguages ? 'errorText' : ''}`)}>
                                {currentLanguages.length > 0
                                    ? convertLanguages(currentLanguages)
                                    : 'Select one or languages ...'}
                            </div>
                            <FontAwesomeIcon icon={faCaretDown} />
                        </div>
                        <div className={`${languagesOpen ? '' : 'dropdownHide'} dropdownQuestion`}>
                            {languages.map((language) => {
                                if (checkLanguage(currentLanguages, language))
                                    return (
                                        <div
                                            className={clsx(
                                                styles.dropdownItem,
                                                'd-flex',
                                                'align-items-center',
                                                'justify-content-between',
                                            )}
                                            onClick={() => {
                                                handleSelectLanguages(language);
                                            }}
                                        >
                                            {language.name}
                                            <span>
                                                <FontAwesomeIcon icon={faCheck} />
                                            </span>
                                        </div>
                                    );
                                else {
                                    return (
                                        <div
                                            className={clsx(styles.dropdownItem, 'd-flex', 'align-items-center')}
                                            onClick={() => {
                                                handleSelectLanguages(language);
                                            }}
                                        >
                                            {language.name}
                                        </div>
                                    );
                                }
                            })}
                        </div>
                    </div>
                </div>
                <div className="col-6 ps-2">
                    <div className="d-flex align-items-center justify-content-between">
                        <div className="subtitle">Level *</div>
                        {errorLevel && (
                            <label for="exampleFormControlInput1" className={clsx('form-label', styles.errorText)}>
                                - {errorLevel}
                            </label>
                        )}
                    </div>
                    <div class={clsx(styles.dropdown, `${errorLevel ? 'errorInput' : ''}`)} ref={levelRef}>
                        <div
                            className="dropdownToggleQuestion"
                            onClick={() => {
                                // dropdownToggle(1);
                                setLevelOpen(!levelOpen);
                                handleCheckEmpty('level');
                            }}
                        >
                            <div className={clsx(styles.name, `${errorLevel ? 'errorText' : ''}`)}>
                                {level ? level.name : 'Select level ...'}
                            </div>
                            <FontAwesomeIcon icon={faCaretDown} />
                        </div>
                        <div className={`${levelOpen ? '' : 'dropdownHide'} dropdownQuestion`}>
                            {levels.map((curLevel) => {
                                if (level && curLevel.id === level.id)
                                    return (
                                        <div
                                            className={clsx(
                                                styles.dropdownItem,
                                                'd-flex',
                                                'align-items-center',
                                                'justify-content-between',
                                            )}
                                            onClick={() => {
                                                handleSelectLevels(curLevel);
                                            }}
                                        >
                                            {curLevel.name}
                                            <span>
                                                <FontAwesomeIcon icon={faCheck} />
                                            </span>
                                        </div>
                                    );
                                else {
                                    return (
                                        <div
                                            className={clsx(styles.dropdownItem, 'd-flex', 'align-items-center')}
                                            onClick={() => {
                                                handleSelectLevels(curLevel);
                                            }}
                                        >
                                            {curLevel.name}
                                        </div>
                                    );
                                }
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <div className="d-flex align-items-center justify-content-between">
                <div className="subtitle">Description *</div>
                {errorDescription && (
                    <label for="exampleFormControlInput1" className={clsx('form-label', styles.errorText)}>
                        - {errorDescription}
                    </label>
                )}
            </div>
            <textarea
                className={clsx('textarea', 'form-control', `${errorDescription ? 'errorInput' : ''}`)}
                value={descriptionData}
                onChange={handleChangeDescription}
                onClick={handleChangeDescription}
                name="description"
                placeholder="Type your description about the question here."
            ></textarea>
            <div
                className={clsx(
                    'd-flex',
                    'align-items-center',
                    'justify-content-end',
                    `${errorDescription ? 'errorText' : ''}`,
                    'pt-2',
                )}
            >
                {descriptionData.length}/5000
            </div>
        </div>
    );
};

const RightChild = ({ descriptionData }) => {
    return (
        <div className="contribute-border-box preview-description">
            <div className="hint">
                <p className="d-flex gap-2">
                    <FontAwesomeIcon icon={faLightbulb} fontSize={32} className="lightbulb" />
                    <strong>
                        Clearly describe your question, and check our question set to make sure your problem isn't
                        already there.
                    </strong>
                </p>
                <p>
                    <b className="hint-title">Displayed decription</b>
                </p>
            </div>
            <MarkDown text={descriptionData} />
        </div>
    );
};

const Question = () => {
    const [descriptionData, setDescriptionData] = useState('');
    // const setDescriptionDataCallback = useCallback(
    //     (inputValue) => {
    //         setDescriptionData(inputValue);
    //     },
    //     [setDescriptionData],
    // );

    return (
        <Contribute
            contributeStep={2}
            mainChild={<MainChild descriptionData={descriptionData} setDescriptionData={setDescriptionData} />}
            rightChild={<RightChild descriptionData={descriptionData} />}
        />
    );
};

export default Question;

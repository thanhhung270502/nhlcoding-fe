import { useEffect, useState } from 'react';
import ReactSelect from 'react-select';
import Contribute from './Contribute';
// import CustomEditor from '../CKEditor';
import { faCaretDown, faCheck, faLightbulb } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'katex/dist/katex.min.css';
import ReactMarkdown from 'react-markdown';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import { getAllLanguages } from '~/api/languages';

import clsx from 'clsx';
import styles from './contribute.module.scss';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import language from 'react-syntax-highlighter/dist/esm/languages/hljs/1c';

const MainChild = ({ descriptionData, setDescriptionData }) => {
    const [titleText, setTitleText] = useState('');

    const dropdownToggle = () => {
        var dropdownMenu = $('.dropdownQuestion');
        if (dropdownMenu[0].classList.contains('dropdownHide')) {
            dropdownMenu[0].classList.remove('dropdownHide');
        } else {
            dropdownMenu[0].classList.add('dropdownHide');
        }
    };
    const handleChangeTitle = (event) => {
        const inputValue = event.target.value;
        if (inputValue.length <= 150) {
            setTitleText(inputValue);
            var question = JSON.parse(localStorage.getItem('question'));
            if (question) {
                question['title'] = inputValue;
                localStorage.setItem('question', JSON.stringify(question));
            } else {
                localStorage.setItem(
                    'question',
                    JSON.stringify({
                        title: inputValue,
                        languages: '',
                        description: '',
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

    const [languages, setLanguages] = useState([]);
    const [currentLanguages, setCurrentLanguages] = useState([]);
    const [isChecked, setIsChecked] = useState(false);
    useEffect(() => {
        (async () => {
            const res = await getAllLanguages();
            setLanguages(res.data);
            var question = JSON.parse(localStorage.getItem('question'));

            if (question) {
                setTitleText(question['title']);
                setCurrentLanguages(question['languages']);
                setDescriptionData(question['description']);
            }

            const savedCheckedState = localStorage.getItem('validate');
            if (savedCheckedState !== null) {
                setIsChecked(savedCheckedState === 'true');
            }
        })();
    }, []);

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
        var question = JSON.parse(localStorage.getItem('question'));
        if (question) {
            question['languages'] = newCurrentLanguage;
            localStorage.setItem('question', JSON.stringify(question));
        } else {
            localStorage.setItem(
                'question',
                JSON.stringify({
                    title: '',
                    languages: newCurrentLanguage,
                    description: '',
                }),
            );
        }
    };

    const handleChangeDescription = (e) => {
        const inputValue = e.target.value;
        if (inputValue.length <= 5000) {
            setDescriptionData(inputValue);

            var question = JSON.parse(localStorage.getItem('question'));
            if (question) {
                question['description'] = inputValue;
                localStorage.setItem('question', JSON.stringify(question));
            } else {
                localStorage.setItem(
                    'question',
                    JSON.stringify({
                        title: '',
                        languages: '',
                        description: inputValue,
                    }),
                );
            }
        }
    };

    return (
        <div className="contribute-body-main-content">
            <div className="title">Please describe your question.</div>
            <div className="d-flex gap-4 mb-3">
                <div className="question-title">
                    <div className="subtitle">Title *</div>
                    <input
                        type="text"
                        className="form-control w-100"
                        id="question-title"
                        name="question-title"
                        value={titleText}
                        onChange={handleChangeTitle}
                    />
                    <div className="char-counter">{titleText.length}/150</div>
                </div>
                <div className="question-category">
                    <div className="subtitle">Languages *</div>
                    <div class={clsx(styles.dropdown)}>
                        <div className="dropdownToggleQuestion" onClick={dropdownToggle}>
                            <div className={clsx(styles.name)}>Select languages</div>
                            <FontAwesomeIcon icon={faCaretDown} />
                        </div>
                        <div className="dropdownHide dropdownQuestion">
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
            </div>
            <div className="subtitle">Description *</div>
            <textarea
                className="textarea"
                value={descriptionData}
                onChange={handleChangeDescription}
                name="description"
                placeholder="Type your decription about the question here."
            ></textarea>
            <div className="char-counter">{descriptionData.length}/5000</div>
            <div className="mt-3">
                <label className="d-flex gap-2 align-items-center">
                    <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} className="checkbox" />
                    <div>Validate description</div>
                </label>
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
            <ReactMarkdown
                children={descriptionData}
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

import React, { useState } from 'react';
import Contribute from './Contribute';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb } from '@fortawesome/free-solid-svg-icons';
import ReactSelect from 'react-select';
import CustomEditor from '../CKEditor';

const MainChild = () => {
    const [titleText, setTitleText] = useState('');
    const handleChangeTitle = (event) => {
        const inputValue = event.target.value;
        if (inputValue.length <= 150) {
            setTitleText(inputValue);
        }
    };

    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
    ];

    const [descriptionData, setDescriptionData] = useState('');
    const handleChangeDescription = (_, editor) => {
        const inputValue = editor.getData();
        if (inputValue.length <= 5000) {
            setDescriptionData(inputValue);
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
                    <div className="subtitle">Category *</div>
                    <ReactSelect options={options} />
                </div>
            </div>
            <div className="subtitle">Description *</div>
            <CustomEditor data={descriptionData} handleChange={handleChangeDescription} />
            <div className="char-counter">{descriptionData.length}/5000</div>
        </div>
    );
};

const RightChild = () => {
    return (
        <div className="contribute-border-box">
            <FontAwesomeIcon icon={faLightbulb} fontSize={32} className="lightbulb" />
            <div className="hint">
                <p>
                    <strong>
                        In order to better understand the question, we would love to see thorough explanations about the
                        context of the question.
                    </strong>
                </p>
                <p>
                    <b className="hint-title">Sample</b>
                </p>
                <p>
                    I received this problem at an on-site at Google for a SWE new grad position. We spent about half an
                    hour on this problem.
                </p>
                <p>
                    I want to contribute this question because there are multiple solutions using different techniques
                    (i.e. DP, recursion, math) that perform better than the brute force solution. I think this question
                    would be a LeetCode Medium.
                </p>
            </div>
        </div>
    );
};

const Question = () => {
    return <Contribute contributeStep={2} mainChild={<MainChild />} rightChild={<RightChild />} />;
};

export default Question;

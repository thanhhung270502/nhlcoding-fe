import React, { useState } from 'react';
import Contribute from './Contribute';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb } from '@fortawesome/free-solid-svg-icons';

const MainChild = () => {
    const placeholder = `Describe your thoughts and possible solutions`;

    const [text, setText] = useState('');

    const handleChange = (event) => {
        const inputValue = event.target.value;
        if (inputValue.length <= 10000) {
            setText(inputValue);
        }
    };
    return (
        <div className="contribute-body-main-content">
            <div className="title">Share your solution *</div>

            <form method="" action="">
                <textarea
                    className="textarea"
                    placeholder={placeholder}
                    value={text}
                    onChange={handleChange}
                    name="solutions"
                />
            </form>
            <div className="char-counter">{text.length}/10000</div>
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
                    I want to contribute this Solutions because there are multiple solutions using different techniques
                    (i.e. DP, recursion, math) that perform better than the brute force solution. I think this question
                    would be a LeetCode Medium.
                </p>
            </div>
        </div>
    );
};

const Solutions = () => {
    return <Contribute contributeStep={3} mainChild={<MainChild />} rightChild={<RightChild />} />;
};

export default Solutions;

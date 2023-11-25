import { faLightbulb } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import Contribute from './Contribute';
import clsx from 'clsx';
import styles from './contribute.module.scss';

const MainChild = () => {
    const placeholder = `Providing complete background information about this question will help us better understand it and increase the chances that the contribution is approved and published.

- Where have you seen this question? 
- Was it in a coding challenge, phone screen, or an on-site interview? 
- How difficult do you think the question is? 
- Is there anything special about this question that motivates you to contribute?`;

    const [text, setText] = useState('');
    const [errorReason, setErrorReason] = useState(undefined);

    const handleChange = (event) => {
        const inputValue = event.target.value;
        if (inputValue.length <= 5000) {
            setText(inputValue);
            localStorage.setItem('reason', inputValue);
        }
    };

    useEffect(() => {
        const savedValue = localStorage.getItem('reason');
        const savedErrorReason = localStorage.getItem('errorReason');
        if (savedValue) {
            setText(savedValue);
        }
        if (savedErrorReason) {
            setErrorReason(savedErrorReason);
        }
    }, []);

    useEffect(() => {
        if (text.length > 0) {
            setErrorReason(undefined);
            localStorage.setItem('errorReason', '');
        }
    }, [text]);

    return (
        <div className="contribute-body-main-content">
            <div className="title">Before you start...</div>

            <div className="subtitle">Why are you contributing this question? *</div>
            {errorReason && (
                <label for="exampleFormControlInput1" className={clsx('form-label', styles.errorText)}>
                    - {errorReason}
                </label>
            )}
            <form method="POST" action="/contribute/store">
                <textarea
                    className={clsx('textarea', 'form-control', `${errorReason ? 'errorInput' : ''}`)}
                    placeholder={placeholder}
                    value={text}
                    onChange={handleChange}
                    name="reason"
                />
            </form>
            <div className={clsx('char-counter', `${errorReason ? 'errorText' : ''}`)}>{text.length}/5000</div>
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

const Reason = () => {
    return <Contribute contributeStep={1} mainChild={<MainChild />} rightChild={<RightChild />} />;
};

export default Reason;

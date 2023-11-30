import { langs } from '@uiw/codemirror-extensions-langs';
import { xcodeLight } from '@uiw/codemirror-theme-xcode';
import CodeMirror from '@uiw/react-codemirror';
import { useCallback, useEffect, useState } from 'react';
import Help from '../Help';
import Contribute from './Contribute';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb } from '@fortawesome/free-solid-svg-icons';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

const MainChild = ({ solutionData, setSolutionData }) => {
    const placeholder = `Describe your thoughts and possible solutions`;

    const [text, setText] = useState('');

    const handleChange = (event) => {
        const inputValue = event.target.value;
        if (inputValue.length <= 5000) {
            setSolutionData(inputValue);
            localStorage.setItem('solutions', inputValue);
        }
    };

    useEffect(() => {
        const savedValue = localStorage.getItem('solutions');
        if (savedValue) {
            setSolutionData(savedValue);
        }
    }, []);

    return (
        <div className="contribute-body-main-content">
            <div className="title">Share your solution *</div>
            <textarea
                className="form-control textarea"
                placeholder={placeholder}
                value={solutionData}
                onChange={handleChange}
                name="solutions"
            />
            <div className="d-flex justify-content-end pt-2">{solutionData.length}/5000</div>
        </div>
    );
};

const RightChild = ({ solutionData }) => {
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
                    <b className="hint-title">Displayed solutions</b>
                </p>
            </div>
            <ReactMarkdown
                children={solutionData}
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

const Solutions = () => {
    const [solutionData, setSolutionData] = useState('');
    return (
        <div>
            <form method="POST" action="/contribute/store" />
            <Contribute
                contributeStep={3}
                mainChild={<MainChild solutionData={solutionData} setSolutionData={setSolutionData} />}
                rightChild={<RightChild solutionData={solutionData} />}
            />
            ;
        </div>
    );
};

export default Solutions;

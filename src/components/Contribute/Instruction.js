import { faLightbulb } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import Contribute from './Contribute';

const MainChild = ({ instructionData, setInstructionData }) => {
    const placeholder = `Describe your thoughts and possible instruction`;

    const handleChange = (event) => {
        const inputValue = event.target.value;
        if (inputValue.length <= 5000) {
            setInstructionData(inputValue);
            localStorage.setItem('instruction', inputValue);
        }
    };

    useEffect(() => {
        const savedValue = localStorage.getItem('instruction');
        if (savedValue) {
            setInstructionData(savedValue);
        }
    }, []);

    return (
        <div className="contribute-body-main-content">
            <div className="title">Share your instruction</div>
            <textarea
                className="form-control textarea"
                placeholder={placeholder}
                value={instructionData}
                onChange={handleChange}
                name="instruction"
            />
            <div className="d-flex justify-content-end pt-2">{instructionData.length}/5000</div>
        </div>
    );
};

const RightChild = ({ instructionData }) => {
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
                    <b className="hint-title">Displayed instruction</b>
                </p>
            </div>
            <ReactMarkdown
                children={instructionData}
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

const Instruction = () => {
    const [instructionData, setInstructionData] = useState('');
    return (
        <div>
            <form method="POST" action="/contribute/store" />
            <Contribute
                contributeStep={3}
                mainChild={<MainChild instructionData={instructionData} setInstructionData={setInstructionData} />}
                rightChild={<RightChild instructionData={instructionData} />}
            />
            ;
        </div>
    );
};

export default Instruction;

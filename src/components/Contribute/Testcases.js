import React, { useState } from 'react';
import Contribute from './Contribute';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb } from '@fortawesome/free-solid-svg-icons';

const MainChild = () => {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');

    const [testcases, setTestcases] = useState([]);

    const handleAddTestcase = () => {
        if (!input || !output) return;

        setTestcases([...testcases, { input: input, output: output }]);
        setInput('');
        setOutput('');
    };

    return (
        <div className="contribute-body-main-content">
            <div className="title">Create test cases *</div>

            <form method="" action="" />

            <div className="subtitle">Input *</div>
            <input
                type="text"
                className="form-control w-100 mb-3"
                id="tc-input"
                name="tc-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />

            <div className="subtitle">Output *</div>
            <input
                type="text"
                className="form-control w-100 mb-3"
                id="tc-output"
                name="tc-output"
                value={output}
                onChange={(e) => setOutput(e.target.value)}
            />
            <div className="d-flex justify-content-end">
                <div className="btn btn-add" onClick={handleAddTestcase}>
                    Add +
                </div>
            </div>
            <div className="testcases-box">
                <div>
                    <b>Added test cases here</b>
                </div>
                {testcases &&
                    testcases.map((testcase, index) => {
                        return (
                            <div key={index}>
                                <br />
                                Input: {testcase.input}
                                <br />
                                Ouput: {testcase.output}
                            </div>
                        );
                    })}
            </div>
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

const Testcases = () => {
    return <Contribute contributeStep={4} mainChild={<MainChild />} rightChild={<RightChild />} />;
};

export default Testcases;

import { langs } from '@uiw/codemirror-extensions-langs';
import { xcodeLight } from '@uiw/codemirror-theme-xcode';
import ReactCodeMirror from '@uiw/react-codemirror';
import { useCallback, useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import Help from '../Help';
import Contribute from './Contribute';

const MainChild = ({ testcases, setTestcases }) => {
    const [testcode, setTestcode] = useState('');
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');

    const handleChangeInput = (e) => {
        const val = e.target.value;
        if (val.length <= 500) {
            setInput(val);
            localStorage.setItem('testcase-input', val);
        }
    };

    const handleChangeOutput = (e) => {
        const val = e.target.value;
        if (val.length <= 500) {
            setOutput(val);
            localStorage.setItem('testcase-output', val);
        }
    };

    const handleChangeCode = useCallback((val, viewUpdate) => {
        setTestcode(val);
        localStorage.setItem('testcase-code', val);
    }, []);

    const handleAddTestcase = () => {
        if (!input || !output || !testcode) return;

        if (!testcases) {
            testcases = [];
        }

        const newTestcases = [...testcases, { input: input, output: output, testcode: testcode }];
        setTestcases(newTestcases);
        localStorage.setItem('testcases', JSON.stringify(newTestcases));

        setInput('');
        setOutput('');
        setTestcode('');
    };

    useEffect(() => {
        const savedTestcode = localStorage.getItem('testcase-code');
        savedTestcode && setTestcode(savedTestcode);

        const savedInput = localStorage.getItem('testcase-input');
        savedInput && setInput(savedInput);

        const savedOutput = localStorage.getItem('testcase-output');
        savedOutput && setOutput(savedOutput);
    }, []);

    return (
        <div className="contribute-body-main-content">
            <div className="d-flex gap-1">
                <div className="title">Create test case</div>
                <Help content="Provide test case with code used for running and validating" />
            </div>

            <div className="subtitle">Input *</div>
            <textarea className="form-control w-10" value={input} onChange={handleChangeInput}></textarea>
            <div className="char-counter">{input.length}/500</div>

            <div className="subtitle">Output *</div>
            <textarea className="form-control w-100" value={output} onChange={handleChangeOutput}></textarea>
            <div className="char-counter">{output.length}/500</div>

            <div className="subtitle">Test Code *</div>
            <div className="code-block">
                <ReactCodeMirror
                    value={testcode}
                    extensions={[langs.cpp()]}
                    onChange={handleChangeCode}
                    theme={xcodeLight}
                    height="240px"
                />
            </div>

            <div className="d-flex justify-content-end">
                <div className="btn btn-add" onClick={handleAddTestcase}>
                    Add +
                </div>
            </div>
        </div>
    );
};

const RightChild = ({ testcases, setTestcases }) => {
    useEffect(() => {
        const savedTestcases = JSON.parse(localStorage.getItem('testcases'));
        savedTestcases && setTestcases(savedTestcases);
    }, [setTestcases]);

    return (
        <div className="contribute-body-main-content">
            <div className="d-flex gap-1">
                <form method="POST" action="/contribute/store" />
                <div className="title">Added test cases</div>
            </div>
            {!testcases.length && <div className="no-testcases-text">Your test cases will be displayed here.</div>}
            {!!testcases.length && (
                <div className="testcases-container">
                    <Table bordered hover>
                        <thead>
                            <tr className="testcase-header">
                                <th>#</th>
                                <th>Input</th>
                                <th>Output</th>
                            </tr>
                        </thead>
                        <tbody>
                            {testcases.map((testcase, index) => (
                                <tr key={index} className="testcase-data">
                                    <td>{index + 1}</td>
                                    <td>
                                        <pre>{testcase.input}</pre>
                                    </td>
                                    <td>
                                        <pre>{testcase.output}</pre>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>

                // testcases.map((testcase, index) => {
                //     return (
                //         <div key={index} className="testcase-container">
                //             <div className="testcase-input">
                //                 {/* <h4>Input</h4> */}
                //                 <code>{testcase.input}</code>
                //             </div>
                //             <div className="testcase-output">
                //                 {/* <h4>Output</h4>/+ */}
                //                 <pre>{testcase.output}</pre>
                //             </div>
                //         </div>
                //     );
            )}
        </div>
    );
};

const Testcases = () => {
    const [testcases, setTestcases] = useState([]);
    return (
        <Contribute
            contributeStep={5}
            mainChild={<MainChild testcases={testcases} setTestcases={setTestcases} />}
            rightChild={<RightChild testcases={testcases} setTestcases={setTestcases} />}
        />
    );
};

export default Testcases;

import { langs } from '@uiw/codemirror-extensions-langs';
import { xcodeLight } from '@uiw/codemirror-theme-xcode';
import CodeMirror from '@uiw/react-codemirror';
import { useCallback, useEffect, useState } from 'react';
import Help from '../Help';
import Contribute from './Contribute';

const MainChild = () => {
    const placeholder = `Describe your thoughts and possible solutions`;

    const [text, setText] = useState('');

    const handleChange = (event) => {
        const inputValue = event.target.value;
        if (inputValue.length <= 5000) {
            setText(inputValue);
            localStorage.setItem('solutions', inputValue);
        }
    };

    useEffect(() => {
        const savedValue = localStorage.getItem('solutions');
        if (savedValue) {
            setText(savedValue);
        }
    }, []);

    return (
        <div className="contribute-body-main-content">
            <div className="title">Share your solution *</div>
            <textarea
                className="textarea"
                placeholder={placeholder}
                value={text}
                onChange={handleChange}
                name="solutions"
            />
            <div className="char-counter">{text.length}/5000</div>
        </div>
    );
};

const RightChild = () => {
    const [code, setCode] = useState('');

    const handleChangeCode = useCallback((val, viewUpdate) => {
        setCode(val);
        localStorage.setItem('code', val);
    }, []);

    useEffect(() => {
        const savedValue = localStorage.getItem('code');
        if (savedValue) {
            setCode(savedValue);
        }
    }, []);

    return (
        <div className="contribute-body-main-content">
            <div className="d-flex gap-1">
                <div className="title">Share your code</div>
                <Help
                    content="A sample answer can be entered here and used for checking by the question author and
                            optionally shown to students during review. It is also used by the bulk tester script. The
                            correctness of a non-empty answer is checked when saving unless 'Validate on save' is
                            unchecked"
                />
            </div>
            <div className="code-block">
                <CodeMirror
                    value={code}
                    extensions={[langs.cpp()]}
                    onChange={handleChangeCode}
                    theme={xcodeLight}
                    height="320px"
                />
            </div>
        </div>
    );
};

const Solutions = () => {
    return (
        <>
            <form method="POST" action="/contribute/store" />
            <Contribute contributeStep={4} mainChild={<MainChild />} rightChild={<RightChild />} />;
        </>
    );
};

export default Solutions;

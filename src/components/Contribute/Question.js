import { useEffect, useState } from 'react';
import ReactSelect from 'react-select';
import Contribute from './Contribute';
// import CustomEditor from '../CKEditor';
import { faLightbulb } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'katex/dist/katex.min.css';
import ReactMarkdown from 'react-markdown';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';

const MainChild = ({ descriptionData, setDescriptionData }) => {
    const [titleText, setTitleText] = useState('');
    const handleChangeTitle = (event) => {
        const inputValue = event.target.value;
        if (inputValue.length <= 150) {
            setTitleText(inputValue);
            localStorage.setItem('title', inputValue);
        }
    };

    const options = [
        { value: 'cpp_function', label: 'Cpp Function' },
        { value: 'cpp_program', label: 'Cpp Program' },
        { value: 'python3', label: 'Python3 Program' },
    ];
    const [selectedOption, setSelectedOption] = useState(null);
    const handleSelectChange = (option) => {
        setSelectedOption(option);
        localStorage.setItem('selectedOption', JSON.stringify(option));
    };

    const handleChangeDescription = (e) => {
        const inputValue = e.target.value;
        if (inputValue.length <= 5000) {
            setDescriptionData(inputValue);
            localStorage.setItem('desc', inputValue);
        }
    };

    useEffect(() => {
        const savedTitle = localStorage.getItem('title');
        const savedOption = localStorage.getItem('selectedOption');
        const savedDesc = localStorage.getItem('desc');

        savedTitle && setTitleText(savedTitle);
        savedOption && setSelectedOption(JSON.parse(savedOption));
        savedDesc && setDescriptionData(savedDesc);
    }, [setDescriptionData]);

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
                    <ReactSelect value={selectedOption} onChange={handleSelectChange} options={options} />
                </div>
            </div>
            <div className="subtitle">Description *</div>
            {/* <CustomEditor data={descriptionData} handleChange={handleChangeDescription} /> */}
            <textarea
                className="textarea"
                value={descriptionData}
                onChange={handleChangeDescription}
                name="description"
                placeholder="Type your decription about the question here."
            ></textarea>
            <div className="char-counter">{descriptionData.length}/5000</div>
            <form method="POST" action="/contribute/store" />
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

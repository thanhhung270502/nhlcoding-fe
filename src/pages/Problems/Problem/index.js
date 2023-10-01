import $ from 'jquery';
import { useEffect, useState } from 'react';
import Split from 'react-split-grid';
import Code from './code';
import Description from './description';
import Editorial from './editorial';
import './problem.scss';
import Solution from './solutions';
import Submission from './submission';
import { useNavigate, useSearchParams } from 'react-router-dom';

function Problem() {
    const navigate = useNavigate();
    const [tabParams, setTabParams] = useSearchParams();
    const tab = typeof tabParams.get('tab') === 'string' ? tabParams.get('tab') : undefined;

    useEffect(() => {
        if (!tab) {
            navigate('/problem?tab=description');
        }
    }, [tab]);

    useEffect(() => {
        // Disable scrolling when the component is mounted
        document.body.style.overflowY = 'hidden';

        return () => {
            // Re-enable scrolling when the component is unmounted
            document.body.style.overflowY = 'auto';
        };
    }, []);

    const [code, setCode] = useState('print(a)');
    const [language, setLanguage] = useState('C++');
    // const [result, setResult] = useState(3);
    // const [sidebar, setSidebar] = useState('Description');

    useEffect(() => {
        let split = $('.split');
        console.log(split[0].offsetHeight);
        console.log(split[1].offsetHeight);
        if (split[0].offsetHeight > 867) {
            split[0].style.height = 'calc(100vh - 59px)';
            split[0].style.overflow = 'hidden scroll';
        } else {
            split[0].style.height = 'calc(100vh - 59px)';
            split[0].style.overflow = 'unset';
        }
    }, []);

    // const handleSidebar = (e) => {
    //     var items = $('.problem-item');
    //     for (var i = 0; i < items.length; i++) {
    //         items[i].classList.remove('problem-item-active');
    //     }
    //     e.target.classList.add('problem-item-active');
    //     setSidebar(e.target.innerText);
    // };

    const openConsole = () => {};

    const handleConsole = () => {
        var gridRow = $('.grid-row');
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     console.log(code);
    //     const res = await submitCode(code);
    //     console.log(res);
    // };

    return (
        <div className="problem-body">
            <div className="problems">
                <Split
                    render={({ getGridProps, getGutterProps }) => (
                        <div className="grid" {...getGridProps()}>
                            <div className="split bg-white">
                                <div className="w-100 h-100">
                                    <div className="problem-sidebar">
                                        <div className="problem-sidebar-items">
                                            <div
                                                className={`problem-item ${
                                                    tab === 'description' ? 'problem-item-active' : ''
                                                }`}
                                                onClick={() => {
                                                    navigate('/problem?tab=description');
                                                }}
                                            >
                                                Description
                                            </div>
                                            <div
                                                className={`problem-item ${
                                                    tab === 'solutions' ? 'problem-item-active' : ''
                                                }`}
                                                onClick={() => {
                                                    navigate('/problem?tab=solutions');
                                                }}
                                            >
                                                Solutions
                                            </div>
                                            <div
                                                className={`problem-item ${
                                                    tab === 'submissions' ? 'problem-item-active' : ''
                                                }`}
                                                onClick={() => {
                                                    navigate('/problem?tab=submissions');
                                                }}
                                            >
                                                Submissions
                                            </div>
                                            {/* <div className="problem-item" onClick={handleSidebar}>
                                                Discussion
                                            </div> */}
                                            <div
                                                className={`problem-item ${
                                                    tab === 'editorial' ? 'problem-item-active' : ''
                                                }`}
                                                onClick={() => {
                                                    navigate('/problem?tab=editorial');
                                                }}
                                            >
                                                Editorial
                                            </div>
                                        </div>
                                    </div>
                                    <div className="problem-content">
                                        {tab === 'description' && <Description />}
                                        {tab === 'solutions' && <Solution />}
                                        {tab === 'submissions' && <Submission />}
                                        {tab === 'editorial' && <Editorial />}
                                    </div>
                                </div>
                            </div>
                            <div className="gutter-col gutter-col-1" {...getGutterProps('column', 1)} />
                            <div className="split">
                                <Split
                                    render={({ getGridProps, getGutterProps }) => (
                                        <div className="grid-row h-100" {...getGridProps()}>
                                            <Code />
                                            <div className="gutter-row gutter-row-1" {...getGutterProps('row', 1)} />
                                            <div className="bg-white">
                                                <div className="">
                                                    <div className="problem-console">
                                                        <div className="d-flex justify-content-between align-items-center">
                                                            <div className="d-flex justify-content-between align-items-center">
                                                                <span>Console</span>
                                                                <div onClick={openConsole}>
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        width="32"
                                                                        height="32"
                                                                        fill="currentColor"
                                                                        class="bi bi-arrow-up-short"
                                                                        viewBox="0 0 20 20"
                                                                    >
                                                                        <path
                                                                            fillRule="evenodd"
                                                                            d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5z"
                                                                        />
                                                                    </svg>
                                                                </div>
                                                            </div>
                                                            <div className="d-flex align-items-center">
                                                                <div className="problem-btn btn-run">Run</div>
                                                                <div className="problem-btn btn-submit">Submit</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                />
                            </div>
                        </div>
                    )}
                />
            </div>
        </div>
    );
}

export default Problem;

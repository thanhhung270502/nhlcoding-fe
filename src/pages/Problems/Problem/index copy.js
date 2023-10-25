import { createContext, useCallback, useEffect, useState } from 'react';
import './problem.scss';
import Split from 'react-split-grid';
import Solution from './solutions';
import $ from 'jquery';
import Submission from './submission';
import Code from './code';
import Description from './description';
import Console from './console';

function Problem() {
    const [sidebar, setSidebar] = useState('Description');

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

    const handleSidebar = (e) => {
        var items = $('.problem-item');
        for (var i = 0; i < items.length; i++) {
            items[i].classList.remove('problem-item-active');
        }
        e.target.classList.add('problem-item-active');
        setSidebar(e.target.innerText);
    };

    const handleToggleConsole = () => {
        var gridRow = $('.grid-row');
        if (gridRow[0].classList.contains('openConsole')) {
            gridRow[0].style.gridTemplateRows = null;
            gridRow[0].classList.remove('openConsole');
            gridRow[0].classList.add('closeConsole');
        } else {
            gridRow[0].style.gridTemplateRows = null;
            gridRow[0].classList.remove('closeConsole');
            gridRow[0].classList.add('openConsole');
        }
        console.log(gridRow[0]);
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
                                <div className="d-flex h-100">
                                    <div className="problem-sidebar">
                                        <div className="problem-sidebar-items">
                                            <div className="problem-item problem-item-active" onClick={handleSidebar}>
                                                Description
                                            </div>
                                            <div className="problem-item" onClick={handleSidebar}>
                                                Solutions
                                            </div>
                                            <div className="problem-item" onClick={handleSidebar}>
                                                Submissions
                                            </div>
                                            <div className="problem-item" onClick={handleSidebar}>
                                                Discussion
                                            </div>
                                            <div className="problem-item" onClick={handleSidebar}>
                                                Editorial
                                            </div>
                                        </div>
                                    </div>
                                    <div className="problem-content">
                                        {sidebar === 'Description' && <Description />}
                                        {sidebar === 'Solutions' && <Solution />}
                                        {sidebar === 'Submissions' && <Submission />}
                                    </div>
                                </div>
                            </div>
                            <div className="gutter-col gutter-col-1" {...getGutterProps('column', 1)} />
                            <div className="split">
                                <Split
                                    render={({ getGridProps, getGutterProps }) => (
                                        <div className="grid-row h-100 closeConsole" {...getGridProps()}>
                                            <Code />
                                            <div className="gutter-row gutter-row-1" {...getGutterProps('row', 1)} />
                                            <Console />
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

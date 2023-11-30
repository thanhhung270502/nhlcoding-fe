import { useNavigate, useSearchParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';
import '~/pages/Problems/problems.scss';
import './index.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCheck } from '@fortawesome/free-solid-svg-icons';

const limits = [5, 10, 15, 20];

function ProblemsTable({ problems }) {
    const navigate = useNavigate();

    const [limit, setLimit] = useState(10);
    const handleLinkToProblem = (problem_id) => {
        if (problem_id) navigate(`/problems/${problem_id}`);
    };
    const [itemOffset, setItemOffset] = useState(0);

    const endOffset = itemOffset + limit;
    const currentItems = problems.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(problems.length / limit);
    const [paginateInfo, setPaginateInfo] = useState({
        currentItems,
        pageCount,
    });

    useEffect(() => {
        // Simulate fetching items from another resources.
        // (This could be items from props; or items loaded in a local state
        // from an API endpoint with useEffect and useState)
        const endOffset = itemOffset + limit;
        const currentItems = problems.slice(itemOffset, endOffset);
        const pageCount = Math.ceil(problems.length / limit);
        setPaginateInfo({
            currentItems,
            pageCount,
        });
    }, [itemOffset, limit, problems]);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = (event.selected * limit) % problems.length;
        setItemOffset(newOffset);
    };

    const handleChangeLimit = (lim) => {
        setLimit(lim);
    };

    return (
        <div>
            {paginateInfo.currentItems.map((problem, index) => {
                if (index % 2 === 0) {
                    return (
                        <div className="py-2 d-flex align-items-center">
                            <div className="text-center col-2">
                                {problem.status === 'Solved' && <div className="problems-status-accept">Solved</div>}
                                {problem.status === 'Attempted' && (
                                    <div className="problems-status-progress">Attempted</div>
                                )}
                                {(problem.status === 'Todo' || !problem.status) && (
                                    <div className="problems-status">-</div>
                                )}
                            </div>
                            <div
                                className="text-center col-2"
                                onClick={() => {
                                    handleLinkToProblem(problem.id);
                                }}
                            >
                                {problem.id}
                            </div>
                            <div className="px-3 col-6">{problem.title}</div>
                            <div className="text-center col-2">
                                {problem.name === 'Easy' && <div className="problems-status-accept">Easy</div>}
                                {problem.name === 'Medium' && <div className="problems-status-progress">Medium</div>}
                                {problem.name === 'Hard' && <div className="problems-status-high">Hard</div>}
                            </div>
                        </div>
                    );
                } else {
                    return (
                        <div className="py-2 d-flex align-items-center problems-row">
                            <div className="text-center col-2">
                                {problem.status === 'Solved' && <div className="problems-status-accept">Solved</div>}
                                {problem.status === 'Attempted' && (
                                    <div className="problems-status-progress">Attempted</div>
                                )}
                                {(problem.status === 'Todo' || !problem.status) && (
                                    <div className="problems-status">-</div>
                                )}
                            </div>
                            <div
                                className="text-center col-2"
                                onClick={() => {
                                    handleLinkToProblem(problem.id);
                                }}
                            >
                                {problem.id}
                            </div>
                            <div className="px-3 col-6">{problem.title}</div>
                            <div className="text-center col-2">
                                {problem.name === 'Easy' && <div className="problems-status-accept">Easy</div>}
                                {problem.name === 'Medium' && <div className="problems-status-progress">Medium</div>}
                                {problem.name === 'Hard' && <div className="problems-status-high">Hard</div>}
                            </div>
                        </div>
                    );
                }
            })}
            <div className="d-flex justify-content-between align-items-center mt-5">
                <div className="dropdown">
                    <div
                        className="problem-languages problems-dropdown-toggle me-3"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        {limit} / page
                        <span className="ps-3">
                            <FontAwesomeIcon icon={faCaretDown} />
                        </span>
                    </div>
                    <ul className="dropdown-menu problem-dropdown-menu">
                        {limits.map((lim) => {
                            if (lim === limit) {
                                return (
                                    <li
                                        className="d-flex align-items-center justify-content-between dropdown-item"
                                        onClick={() => {
                                            handleChangeLimit(lim);
                                        }}
                                    >
                                        {lim}
                                        <span>
                                            <FontAwesomeIcon icon={faCheck} />
                                        </span>
                                    </li>
                                );
                            } else
                                return (
                                    <li
                                        className="dropdown-item"
                                        onClick={() => {
                                            handleChangeLimit(lim);
                                        }}
                                    >
                                        {lim}
                                    </li>
                                );
                        })}
                    </ul>
                </div>
                <ReactPaginate
                    containerClassName={'pagination'}
                    pageClassName={'page-item'}
                    activeClassName={'active'}
                    breakLabel="..."
                    nextLabel="Next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={1}
                    pageCount={paginateInfo.pageCount}
                    previousLabel="< Previous"
                    renderOnZeroPageCount={null}
                />
            </div>
        </div>
    );
}

export default ProblemsTable;

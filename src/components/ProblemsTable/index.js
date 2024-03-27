import { useNavigate, useSearchParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';
import '~/pages/Problems/problems.scss';
import './index.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCheck } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';
import styles from './problemsTable.module.scss';

const limits = [5, 10, 15, 20];

function ProblemsTable({ problems, page, level, status, search }) {
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
        var newItemOffset = (page - 1) * limit;
        setItemOffset(newItemOffset);

        const endOffset = newItemOffset + limit;
        const currentItems = problems.slice(newItemOffset, endOffset);
        const pageCount = Math.ceil(problems.length / limit);
        setPaginateInfo({
            currentItems,
            pageCount,
        });
    }, [itemOffset, limit, problems, page]);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = (event.selected * limit) % problems.length;
        setItemOffset(newOffset);
        if (!search) {
            if (level && status) {
                navigate(`/problems/?page=${event.selected + 1}&level=${level}&status=${status}`);
            } else if (!level && status) {
                navigate(`/problems/?page=${event.selected + 1}&status=${status}`);
            } else if (level && !status) {
                navigate(`/problems/?page=${event.selected + 1}&level=${level}`);
            } else {
                navigate(`/problems/?page=${event.selected + 1}`);
            }
        } else {
            if (level && status) {
                navigate(`/problems/?page=${event.selected + 1}&level=${level}&status=${status}&search=${search}`);
            } else if (!level && status) {
                navigate(`/problems/?page=${event.selected + 1}&status=${status}&search=${search}`);
            } else if (level && !status) {
                navigate(`/problems/?page=${event.selected + 1}&level=${level}&search=${search}`);
            } else {
                navigate(`/problems/?page=${event.selected + 1}&search=${search}`);
            }
        }
        // navigate(`/problems/?page=${event.selected + 1}`);
    };

    const handleChangeLimit = (lim) => {
        setLimit(lim);
    };

    const handleNavigateProblem = (problem_id) => {
        navigate(`/problems/${problem_id}`);
    };

    return (
        <div>
            {paginateInfo.currentItems.map((problem, index) => {
                return (
                    <div className={clsx(styles.problemsBody)}>
                        <div
                            className={clsx(styles.problemsCol1, styles.textCenter)}
                            onClick={() => handleNavigateProblem(problem.id)}
                        >
                            {problem.id}
                        </div>
                        <div className={clsx(styles.problemsCol5)} onClick={() => handleNavigateProblem(problem.id)}>
                            {problem.title}
                        </div>
                        {problem.categories.length > 2 ? (
                            <div className={clsx(styles.problemsCol3, styles.problemsCategories)}>
                                <div className={clsx(styles.problemsCategory)}>{problem.categories[0]}</div>
                                <div className={clsx(styles.problemsCategory)}>{problem.categories[1]}</div>
                                <div class="dropend">
                                    <button
                                        className={clsx('dropdown-toggle', styles.problemsShowAll)}
                                        type="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        ...
                                    </button>
                                    <ul className={clsx('dropdown-menu', styles.problemsDropdownMenu)}>
                                        <div className={clsx(styles.problemsDropdownMenuContainer)}>
                                            {problem.categories.map((category, index) => {
                                                return (
                                                    <li className={clsx('dropdown-item', styles.problemsDropdownItem)}>
                                                        {category}
                                                    </li>
                                                );
                                            })}
                                        </div>
                                    </ul>
                                </div>
                            </div>
                        ) : (
                            <div className={clsx(styles.problemsCol3, styles.problemsCategories)}>
                                {problem.categories.map((category, index) => {
                                    return <div className={clsx(styles.problemsCategory)}>{category}</div>;
                                })}
                            </div>
                        )}

                        <div className={clsx(styles.problemsCol1D5)}>
                            {problem.name === 'Easy' && (
                                <div className={clsx(styles.problemsLevel, styles.problemsLevelEasy)}>
                                    {problem.name}
                                </div>
                            )}
                            {problem.name === 'Medium' && (
                                <div className={clsx(styles.problemsLevel, styles.problemsLevelMedium)}>
                                    {problem.name}
                                </div>
                            )}
                            {problem.name === 'Hard' && (
                                <div className={clsx(styles.problemsLevel, styles.problemsLevelHard)}>
                                    {problem.name}
                                </div>
                            )}
                        </div>
                        <div className={clsx(styles.problemsCol1D5)}>
                            {(problem.status === 'Todo' || !problem.status) && (
                                <div className={clsx(styles.problemsStatus, styles.problemsStatusTodo)}>-</div>
                            )}
                            {problem.status === 'Solved' && (
                                <div className={clsx(styles.problemsStatus, styles.problemsStatusSolved)}>
                                    {problem.status}
                                </div>
                            )}
                            {problem.status === 'Attempted' && (
                                <div className={clsx(styles.problemsStatus, styles.problemsStatusAttempted)}>
                                    {problem.status}
                                </div>
                            )}
                        </div>
                    </div>
                );
            })}
            <div className="d-flex justify-content-between align-items-center mt-4">
                <div className="dropdown">
                    <div
                        className={clsx('problem-languages', 'problems-dropdown-toggle', 'me-3', styles.page)}
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
                    // previousClassName="page-previous"
                    activeClassName={'active'}
                    breakLabel="..."
                    nextLabel=">"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={1}
                    pageCount={paginateInfo.pageCount}
                    previousLabel="<"
                    forcePage={page - 1}
                    renderOnZeroPageCount={null}
                />
            </div>
        </div>
    );
}

export default ProblemsTable;

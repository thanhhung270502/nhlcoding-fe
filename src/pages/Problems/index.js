import { useEffect, useState } from 'react';
import './problems.scss';
import $ from 'jquery';
import { getProblemForPagination } from '~/api/problems';
import { getCookie } from '~/api/cookie';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getAllLevels } from '~/api/levels';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';

// const limit = 10;
const statusData = [
    {
        id: 1,
        name: 'Todo',
    },
    {
        id: 2,
        name: 'Solved',
    },
    {
        id: 3,
        name: 'Attempted',
    },
];

const limits = [5, 10, 15, 20];

function Problems() {
    const [problems, setProblems] = useState([]);
    const [levels, setLevels] = useState([]);
    const [statuses, setStatuses] = useState(statusData);
    const [text, setText] = useState(undefined);
    const [limit, setLimit] = useState(10);

    const navigate = useNavigate();
    const [params, setParams] = useSearchParams();
    const page = typeof params.get('page') === 'string' ? params.get('page') : '1';
    const level = typeof params.get('level') === 'string' ? params.get('level') : undefined;
    const status = typeof params.get('status') === 'string' ? params.get('status') : undefined;
    const search = typeof params.get('search') === 'string' ? params.get('search') : undefined;

    const handleNextPage = () => {
        if (level && status) {
            navigate(`/problems/?page=${parseInt(page) + 1}&level=${level}&status=${status}`);
        } else if (!level && status) {
            navigate(`/problems/?page=${parseInt(page) + 1}&status=${status}`);
        } else if (level && !status) {
            navigate(`/problems/?page=${parseInt(page) + 1}&level=${level}`);
        } else {
            navigate(`/problems/?page=${parseInt(page) + 1}`);
        }
    };

    const handlePreviousPage = () => {
        if (level && status) {
            navigate(`/problems/?page=${parseInt(page) - 1}&level=${level}&status=${status}`);
        } else if (!level && status) {
            navigate(`/problems/?page=${parseInt(page) - 1}&status=${status}`);
        } else if (level && !status) {
            navigate(`/problems/?page=${parseInt(page) - 1}&level=${level}`);
        } else {
            navigate(`/problems/?page=${parseInt(page) - 1}`);
        }
    };

    const handleChangePage = (e) => {
        if (level && status) {
            navigate(`/problems/?page=${e.target.innerHTML}&level=${level}&status=${status}`);
        } else if (!level && status) {
            navigate(`/problems/?page=${e.target.innerHTML}&status=${status}`);
        } else if (level && !status) {
            navigate(`/problems/?page=${e.target.innerHTML}&level=${level}`);
        } else {
            navigate(`/problems/?page=${e.target.innerHTML}`);
        }
    };

    const handleLinkToProblem = (problem_id) => {
        if (problem_id) navigate(`/problems/${problem_id}`);
    };

    const filterLevel = (lel) => {
        if (level === lel.name) {
            if (status) {
                navigate(`/problems/?page=1&status=${status}`);
            } else {
                navigate(`/problems/?page=1`);
            }
        } else {
            if (status) {
                navigate(`/problems/?page=1&level=${lel.name}&status=${status}`);
            } else {
                navigate(`/problems/?page=1&level=${lel.name}`);
            }
        }
    };

    const filterStatus = (sta) => {
        if (status === sta.name) {
            if (level) {
                navigate(`/problems/?page=1&level=${level}`);
            } else {
                navigate(`/problems/?page=1`);
            }
        } else {
            if (level) {
                navigate(`/problems/?page=1&level=${level}&status=${sta.name}`);
            } else {
                navigate(`/problems/?page=1&status=${sta.name}`);
            }
        }
        // setCurrentLevel(level);
    };

    const deleteStatus = () => {
        if (search && level) {
            navigate(`/problems/?page=1&level=${level}&search=${search}`);
        } else if (search && !level) {
            navigate(`/problems/?page=1&search=${search}`);
        } else if (!search && level) {
            navigate(`/problems/?page=1&level=${level}`);
        } else {
            navigate(`/problems/?page=1`);
        }
    };

    const deleteLevel = () => {
        if (search && status) {
            navigate(`/problems/?page=1&status=${status}&search=${search}`);
        } else if (search && !status) {
            navigate(`/problems/?page=1&search=${search}`);
        } else if (!search && status) {
            navigate(`/problems/?page=1&status=${status}`);
        } else {
            navigate(`/problems/?page=1`);
        }
    };

    const deleteText = () => {
        if (status && level) {
            navigate(`/problems/?page=1&status=${status}&level=${level}`);
        } else if (status && !level) {
            navigate(`/problems/?page=1&status=${status}`);
        } else if (!status && level) {
            navigate(`/problems/?page=1&level=${level}`);
        } else {
            navigate(`/problems/?page=1`);
        }
    };

    const handleChangeSearchInput = (event) => {
        setText(event.target.value);
    };

    const handleSubmitSearch = () => {
        console.log(text);
        if (!text) {
            if (level && status) {
                navigate(`/problems/?page=${page}&level=${level}&status=${status}`);
            } else if (!level && status) {
                navigate(`/problems/?page=${page}&status=${status}`);
            } else if (level && !status) {
                navigate(`/problems/?page=${page}&level=${level}`);
            } else {
                navigate(`/problems/?page=${page}`);
            }
        } else {
            if (level && status) {
                navigate(`/problems/?page=${page}&level=${level}&status=${status}&search=${text}`);
            } else if (!level && status) {
                navigate(`/problems/?page=${page}&status=${status}&search=${text}`);
            } else if (level && !status) {
                navigate(`/problems/?page=${page}&level=${level}&search=${text}`);
            } else {
                navigate(`/problems/?page=${page}&search=${text}`);
            }
        }
    };

    const handleChangeLimit = (lim) => {
        setLimit(lim);
    };

    useEffect(() => {
        (async () => {
            let offset = limit * (page - 1);
            var user_id = getCookie('user_id');
            if (!user_id) user_id = 'empty';
            var curLevel = level ? level : 'empty';
            var curStatus = status ? status : 'empty';
            var curText = search ? search : 'empty';
            console.log(curText);
            var response = await getProblemForPagination(user_id, limit, offset, curLevel, curStatus, curText);
            setProblems(response.body);
        })();
    }, [search, level, page, status, limit]);

    useEffect(() => {
        (async () => {
            const getLevels = await getAllLevels();
            setLevels(getLevels);
        })();
    }, []);

    return (
        <div className="problems">
            <div className="container">
                <div className="py-4">
                    <div className="d-flex">
                        <div className="col-9">
                            <div className="mt-4">
                                <div className="d-flex align-items-center justify-content-between problems-nav">
                                    <div className="problems-left">
                                        <div className="d-flex align-items-center justify-content-between">
                                            <div className="dropdown">
                                                <div
                                                    className="problem-languages problems-dropdown-toggle me-3"
                                                    type="button"
                                                    data-bs-toggle="dropdown"
                                                    aria-expanded="false"
                                                >
                                                    Difficulty
                                                    <span className="ps-3">
                                                        <FontAwesomeIcon icon={faCaretDown} />
                                                    </span>
                                                </div>
                                                <ul className="dropdown-menu problem-dropdown-menu">
                                                    {levels.map((lel) => {
                                                        if (lel.name === level) {
                                                            return (
                                                                <li
                                                                    className="d-flex align-items-center justify-content-between dropdown-item"
                                                                    onClick={() => {
                                                                        filterLevel(lel);
                                                                    }}
                                                                >
                                                                    {lel.name}
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
                                                                        filterLevel(lel);
                                                                    }}
                                                                >
                                                                    {lel.name}
                                                                </li>
                                                            );
                                                    })}
                                                </ul>
                                            </div>
                                            {getCookie('user_id') && (
                                                <div className="dropdown">
                                                    <div
                                                        className="problem-languages problems-dropdown-toggle me-3"
                                                        type="button"
                                                        data-bs-toggle="dropdown"
                                                        aria-expanded="false"
                                                    >
                                                        Status
                                                        <span className="ps-3">
                                                            <FontAwesomeIcon icon={faCaretDown} />
                                                        </span>
                                                    </div>
                                                    <ul className="dropdown-menu problem-dropdown-menu">
                                                        {statuses.map((sta) => {
                                                            if (sta.name === status) {
                                                                return (
                                                                    <li
                                                                        className="d-flex align-items-center justify-content-between dropdown-item"
                                                                        onClick={() => {
                                                                            filterStatus(sta);
                                                                        }}
                                                                    >
                                                                        {sta.name}
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
                                                                            filterStatus(sta);
                                                                        }}
                                                                    >
                                                                        {sta.name}
                                                                    </li>
                                                                );
                                                        })}
                                                    </ul>
                                                </div>
                                            )}
                                            {!getCookie('user_id') && (
                                                <div className="dropdown">
                                                    <button
                                                        className="problem-languages problems-dropdown-toggle me-3"
                                                        type="button"
                                                        data-bs-toggle="dropdown"
                                                        aria-expanded="false"
                                                        disabled
                                                    >
                                                        Status
                                                        <span className="ps-3">
                                                            <FontAwesomeIcon icon={faCaretDown} />
                                                        </span>
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="problems-right">
                                        <div className="d-flex align-items-center problem-solution-search">
                                            <div className="problem-solution-search-icon">
                                                <i className="uil uil-search"></i>
                                            </div>
                                            <div className="problem-solution-search-input">
                                                <input
                                                    type="text"
                                                    placeholder="Search by title..."
                                                    className="form-control"
                                                    onChange={handleChangeSearchInput}
                                                    onKeyUp={handleSubmitSearch}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4">
                                <div className="d-flex align-items-center">
                                    {level && (
                                        <div className="d-flex align-items-center filter-item">
                                            <div className="pe-1">{level}</div>
                                            <div className="filter-item-delete" onClick={deleteLevel}>
                                                <FontAwesomeIcon icon={faXmark} />
                                            </div>
                                        </div>
                                    )}
                                    {status && (
                                        <div className="d-flex align-items-center filter-item">
                                            <div className="pe-1">{status}</div>
                                            <div className="filter-item-delete" onClick={deleteStatus}>
                                                <FontAwesomeIcon icon={faXmark} />
                                            </div>
                                        </div>
                                    )}
                                    {search && (
                                        <div className="d-flex align-items-center filter-item">
                                            <div className="pe-1">{search}</div>
                                            <div className="filter-item-delete" onClick={deleteText}>
                                                <FontAwesomeIcon icon={faXmark} />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="mt-4">
                                <div className="problems-head pb-2 border-bottom">
                                    <div className="d-flex align-items-center">
                                        <div className="text-center col-2">Status</div>
                                        <div className="text-center col-2">ID</div>
                                        <div className="px-3 col-6">Title</div>
                                        <div className="text-center col-2">Level</div>
                                    </div>
                                </div>
                                <div className="pt-2 problems-body">
                                    {problems.map((problem, index) => (
                                        <div className="py-2 d-flex align-items-center">
                                            <div className="text-center col-2">
                                                {problem.status === 'Solved' && (
                                                    <div className="problems-status-accept">Solved</div>
                                                )}
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
                                                {problem.name === 'Easy' && (
                                                    <div className="problems-status-accept">Easy</div>
                                                )}
                                                {problem.name === 'Medium' && (
                                                    <div className="problems-status-progress">Medium</div>
                                                )}
                                                {problem.name === 'Hard' && (
                                                    <div className="problems-status-high">Hard</div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="mt-5">
                                <div className="d-flex justify-content-between align-items-center">
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
                                    <div className="d-flex align-items-center justify-content-center pagination">
                                        {parseInt(page) === 1 && (
                                            <div className="d-flex align-items-center justify-content-center pagination">
                                                <button className="page-item" onClick={handlePreviousPage} disabled>
                                                    Previous
                                                </button>
                                                <div className="page-item page-item-active" onClick={handleChangePage}>
                                                    1
                                                </div>
                                                <div className="page-item" onClick={handleChangePage}>
                                                    2
                                                </div>
                                                <div className="page-item" onClick={handleChangePage}>
                                                    3
                                                </div>
                                                <div className="page-item" onClick={handleNextPage}>
                                                    Next
                                                </div>
                                            </div>
                                        )}
                                        {parseInt(page) > 1 && (
                                            <div className="d-flex align-items-center justify-content-center pagination">
                                                <button className="page-item" onClick={handlePreviousPage}>
                                                    Previous
                                                </button>
                                                <div className="page-item" onClick={handleChangePage}>
                                                    {parseInt(page) - 1}
                                                </div>
                                                <div className="page-item page-item-active">{page}</div>
                                                <div className="page-item" onClick={handleChangePage}>
                                                    {parseInt(page) + 1}
                                                </div>
                                                <div className="page-item" onClick={handleNextPage}>
                                                    Next
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-3"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Problems;

import { useEffect, useState } from 'react';
import './problems.scss';
import $ from 'jquery';
import { getProblemForPagination } from '~/api/problems';
import { getCookie } from '~/api/cookie';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getAllLevels } from '~/api/levels';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';

const limit = 10;
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

function Problems() {
    const [problems, setProblems] = useState([]);
    const [levels, setLevels] = useState([]);
    const [statuses, setStatuses] = useState(statusData);

    const navigate = useNavigate();
    const [params, setParams] = useSearchParams();
    const page = typeof params.get('page') === 'string' ? params.get('page') : '1';
    const level = typeof params.get('level') === 'string' ? params.get('level') : undefined;
    const status = typeof params.get('status') === 'string' ? params.get('status') : undefined;

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
        if (level) {
            navigate(`/problems/?page=1&level=${level}`);
        } else {
            navigate(`/problems/?page=1`);
        }
    };

    const deleteLevel = () => {
        if (status) {
            navigate(`/problems/?page=1&status=${status}`);
        } else {
            navigate(`/problems/?page=1`);
        }
    };

    useEffect(() => {
        (async () => {
            let offset = limit * (page - 1);
            var user_id = getCookie('user_id');
            if (!user_id) user_id = 'empty';
            var curLevel = level ? level : 'empty';
            var curStatus = status ? status : 'empty';
            var response = await getProblemForPagination(user_id, limit, offset, curLevel, curStatus);
            setProblems(response.body);
        })();
    }, [level, page, status]);

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
                                                    className="problem-languages dropdown-toggle problems-dropdown-toggle me-3"
                                                    type="button"
                                                    data-bs-toggle="dropdown"
                                                    aria-expanded="false"
                                                >
                                                    Difficulty
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
                                                        className="problem-languages dropdown-toggle problems-dropdown-toggle me-3"
                                                        type="button"
                                                        data-bs-toggle="dropdown"
                                                        aria-expanded="false"
                                                    >
                                                        Status
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
                                                        className="problem-languages dropdown-toggle problems-dropdown-toggle me-3"
                                                        type="button"
                                                        data-bs-toggle="dropdown"
                                                        aria-expanded="false"
                                                        disabled
                                                    >
                                                        Status
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
                                                    placeholder="Search for solution"
                                                    className="form-control"
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
                                <div className="d-flex justify-content-center align-items-center">
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

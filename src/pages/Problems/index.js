import { useEffect, useState } from 'react';
import './problems.scss';
import $ from 'jquery';
import { getProblemForPagination } from '~/api/problems';
import { getCookie } from '~/api/cookie';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getAllLevels } from '~/api/levels';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import ProblemsTable from '~/components/ProblemsTable';

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
    const [currentProblems, setCurrentProblems] = useState([]);
    const [levels, setLevels] = useState([]);
    const [statuses, setStatuses] = useState(statusData);
    const [text, setText] = useState(undefined);
    const [limit, setLimit] = useState(10);
    const [lengthOfProblems, setLengthOfProblems] = useState();

    const navigate = useNavigate();
    const [params, setParams] = useSearchParams();
    const page = typeof params.get('page') === 'string' ? params.get('page') : '1';
    const level = typeof params.get('level') === 'string' ? params.get('level') : undefined;
    const status = typeof params.get('status') === 'string' ? params.get('status') : undefined;
    const search = typeof params.get('search') === 'string' ? params.get('search') : undefined;

    const handleNextPage = () => {
        if (search) {
            if (level && status) {
                navigate(`/problems/?page=${parseInt(page) + 1}&level=${level}&status=${status}&search=${search}`);
            } else if (!level && status) {
                navigate(`/problems/?page=${parseInt(page) + 1}&status=${status}&search=${search}`);
            } else if (level && !status) {
                navigate(`/problems/?page=${parseInt(page) + 1}&level=${level}&search=${search}`);
            } else {
                navigate(`/problems/?page=${parseInt(page) + 1}&search=${search}`);
            }
        } else {
            if (level && status) {
                navigate(`/problems/?page=${parseInt(page) + 1}&level=${level}&status=${status}`);
            } else if (!level && status) {
                navigate(`/problems/?page=${parseInt(page) + 1}&status=${status}`);
            } else if (level && !status) {
                navigate(`/problems/?page=${parseInt(page) + 1}&level=${level}`);
            } else {
                navigate(`/problems/?page=${parseInt(page) + 1}`);
            }
        }
    };

    const handlePreviousPage = () => {
        if (search) {
            if (level && status) {
                navigate(`/problems/?page=${parseInt(page) - 1}&level=${level}&status=${status}&search=${search}`);
            } else if (!level && status) {
                navigate(`/problems/?page=${parseInt(page) - 1}&status=${status}&search=${search}`);
            } else if (level && !status) {
                navigate(`/problems/?page=${parseInt(page) - 1}&level=${level}&search=${search}`);
            } else {
                navigate(`/problems/?page=${parseInt(page) - 1}&search=${search}`);
            }
        } else {
            if (level && status) {
                navigate(`/problems/?page=${parseInt(page) - 1}&level=${level}&status=${status}`);
            } else if (!level && status) {
                navigate(`/problems/?page=${parseInt(page) - 1}&status=${status}`);
            } else if (level && !status) {
                navigate(`/problems/?page=${parseInt(page) - 1}&level=${level}`);
            } else {
                navigate(`/problems/?page=${parseInt(page) - 1}`);
            }
        }
    };

    const handleChangePage = (e) => {
        if (search) {
            if (level && status) {
                navigate(`/problems/?page=${e.target.innerHTML}&level=${level}&status=${status}&search=${search}`);
            } else if (!level && status) {
                navigate(`/problems/?page=${e.target.innerHTML}&status=${status}&search=${search}`);
            } else if (level && !status) {
                navigate(`/problems/?page=${e.target.innerHTML}&level=${level}&search=${search}`);
            } else {
                navigate(`/problems/?page=${e.target.innerHTML}&search=${search}`);
            }
        } else {
            if (level && status) {
                navigate(`/problems/?page=${e.target.innerHTML}&level=${level}&status=${status}`);
            } else if (!level && status) {
                navigate(`/problems/?page=${e.target.innerHTML}&status=${status}`);
            } else if (level && !status) {
                navigate(`/problems/?page=${e.target.innerHTML}&level=${level}`);
            } else {
                navigate(`/problems/?page=${e.target.innerHTML}`);
            }
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
            // let start = limit * (page - 1);
            // let end = limit * page;
            // console.log(start);
            var user_id = getCookie('user_id');
            if (!user_id) user_id = 'empty';
            var curLevel = level ? level : 'empty';
            var curStatus = status ? status : 'empty';
            var curText = search ? search : 'empty';
            var response = await getProblemForPagination(user_id, curLevel, curStatus, curText);
            setProblems(response.body);
            // setCurrentProblems(response.body.slice(start, end));
            // setLengthOfProblems(response.body.length);
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
                        <div className="col-2"></div>
                        <div className="col-8">
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
                                            <div className="pe-2">{level}</div>
                                            <div className="filter-item-delete" onClick={deleteLevel}>
                                                <FontAwesomeIcon icon={faXmark} />
                                            </div>
                                        </div>
                                    )}
                                    {status && (
                                        <div className="d-flex align-items-center filter-item">
                                            <div className="pe-2">{status}</div>
                                            <div className="filter-item-delete" onClick={deleteStatus}>
                                                <FontAwesomeIcon icon={faXmark} />
                                            </div>
                                        </div>
                                    )}
                                    {search && (
                                        <div className="d-flex align-items-center filter-item">
                                            <div className="pe-2">{search}</div>
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
                                <ProblemsTable problems={problems} itemsPerPage={limit} />
                            </div>
                        </div>
                        <div className="col-2"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Problems;

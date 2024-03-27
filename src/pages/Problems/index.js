import { faCaretDown, faCheck, faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getAllLevels } from '~/api/levels';
import { getProblemForPagination } from '~/api/problems';
import ProblemsTable from '~/components/ProblemsTable';
import './problems.scss';
import clsx from 'clsx';
import styles from './problems.module.scss';

import problemsData from './data.json';
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
    const navigate = useNavigate();
    const [params, setParams] = useSearchParams();
    const page = typeof params.get('page') === 'string' ? params.get('page') : '1';
    const level = typeof params.get('level') === 'string' ? params.get('level') : undefined;
    const status = typeof params.get('status') === 'string' ? params.get('status') : undefined;
    const search = typeof params.get('search') === 'string' ? params.get('search') : undefined;

    const [textOfSearch, setTextOfSearch] = useState('');
    const [levels, setLevels] = useState([]);
    const [problems, setProblems] = useState(problemsData);

    const handleChangeSearchInput = (event) => {
        setTextOfSearch(event.target.value);
    };

    const handleSubmitSearch = () => {
        // console.log(text);
        // if (!text) {
        //     if (level && status) {
        //         navigate(`/problems/?page=${page}&level=${level}&status=${status}`);
        //     } else if (!level && status) {
        //         navigate(`/problems/?page=${page}&status=${status}`);
        //     } else if (level && !status) {
        //         navigate(`/problems/?page=${page}&level=${level}`);
        //     } else {
        //         navigate(`/problems/?page=${page}`);
        //     }
        // } else {
        //     if (level && status) {
        //         navigate(`/problems/?page=${page}&level=${level}&status=${status}&search=${text}`);
        //     } else if (!level && status) {
        //         navigate(`/problems/?page=${page}&status=${status}&search=${text}`);
        //     } else if (level && !status) {
        //         navigate(`/problems/?page=${page}&level=${level}&search=${text}`);
        //     } else {
        //         navigate(`/problems/?page=${page}&search=${text}`);
        //     }
        // }
    };

    const filterLevel = (lel) => {
        if (level === lel.name) {
            if (search && status) {
                navigate(`/problems/?page=1&status=${status}&search=${search}`);
            } else if (!search && status) {
                navigate(`/problems/?page=1&status=${status}`);
            } else if (search && !status) {
                navigate(`/problems/?page=1&search=${search}`);
            } else {
                navigate(`/problems/?page=1`);
            }
        } else {
            if (search && status) {
                navigate(`/problems/?page=1&level=${lel.name}&status=${status}&search=${search}`);
            } else if (!search && status) {
                navigate(`/problems/?page=1&level=${lel.name}&status=${status}`);
            } else if (search && !status) {
                navigate(`/problems/?page=1&level=${lel.name}&search=${search}`);
            } else {
                navigate(`/problems/?page=1&level=${lel.name}`);
            }
        }
    };

    useEffect(() => {
        (async () => {
            var session = localStorage.getItem('session');
            var user_id;
            if (session) {
                session = JSON.parse(session);
                user_id = session.user.id;
                // setCurrentUser(session.user);
            } else {
                user_id = 'empty';
            }

            var curLevel = level ? level : 'empty';
            var curStatus = status ? status : 'empty';
            var curText = search ? search : 'empty';
            var response = await getProblemForPagination(user_id, curLevel, curStatus, curText);
            var newProblems = response.body;
            if (status && status !== 'Todo') {
                newProblems = response.body.filter((problem) => problem.status === status);
            } else if (status && status === 'Todo') {
                newProblems = response.body.filter(
                    (problem) => problem.status !== 'Attempted' && problem.status !== 'Solved',
                );
            }
            console.log(newProblems);
            setProblems(newProblems);
        })();
    }, [level, search, status]);

    useEffect(() => {
        (async () => {
            const getLevels = await getAllLevels();
            setLevels(getLevels);
        })();
    }, []);

    return (
        <div className={clsx(styles.problems)}>
            <div className="container">
                <div className={clsx(styles.title)}>List Of Problems</div>
                <div className={clsx(styles.sortBar)}>
                    <div className={clsx(styles.sortBarSearch)}>
                        <div className={clsx(styles.sortBarSearchIcon)}>
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </div>
                        <div className={clsx(styles.sortBarSearchInput)}>
                            <input
                                type="text"
                                value={textOfSearch}
                                placeholder="Search by problem title..."
                                className={clsx('form-control', styles.sortBarFormControl)}
                                onChange={handleChangeSearchInput}
                                onKeyUp={handleSubmitSearch}
                            />
                        </div>
                    </div>
                    <div className={clsx(styles.sortBarOptions)}>
                        <div className={clsx('dropdown', styles.sortBarDropDown)}>
                            <button
                                className={clsx(
                                    'dropdown-toggle',
                                    styles.sortBarDropDownToggle,
                                    styles.sortBarDropDownBorderLeft,
                                )}
                                type="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                Difficulty
                                <span className={clsx(styles.sortBarDropDownIcon)}>
                                    <FontAwesomeIcon icon={faCaretDown} />
                                </span>
                            </button>
                            <ul className="dropdown-menu">
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
                        <div className={clsx('dropdown', styles.sortBarDropDown)}>
                            <button
                                className={clsx('dropdown-toggle', styles.sortBarDropDownToggle)}
                                type="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                Status
                                <span className={clsx(styles.sortBarDropDownIcon)}>
                                    <FontAwesomeIcon icon={faCaretDown} />
                                </span>
                            </button>
                            <ul className="dropdown-menu">
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
                        <div className={clsx('dropdown', styles.sortBarDropDown)}>
                            <button
                                className={clsx(
                                    'dropdown-toggle',
                                    styles.sortBarDropDownToggle,
                                    styles.sortBarDropDownBorderRight,
                                )}
                                type="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                Categories
                                <span className={clsx(styles.sortBarDropDownIcon)}>
                                    <FontAwesomeIcon icon={faCaretDown} />
                                </span>
                            </button>
                            <ul className="dropdown-menu">
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
                    </div>
                </div>
                <div className={clsx(styles.problemsTable)}>
                    <div className={clsx(styles.problemsHead)}>
                        <div className={clsx(styles.problemsCol1, styles.textCenter)}>ID</div>
                        <div className={clsx(styles.problemsCol5)}>Problem Title</div>
                        <div className={clsx(styles.problemsCol3)}>Categories</div>
                        <div className={clsx(styles.problemsCol1D5)}>Level</div>
                        <div className={clsx(styles.problemsCol1D5)}>Status</div>
                    </div>
                    <ProblemsTable
                        problems={problems}
                        page={JSON.parse(page)}
                        level={level}
                        status={status}
                        search={search}
                    />
                </div>
            </div>
        </div>
    );
}

export default Problems;

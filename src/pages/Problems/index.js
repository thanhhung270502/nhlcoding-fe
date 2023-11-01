import { useEffect, useState } from 'react';
import './problems.scss';
import $ from 'jquery';
import data from './problems.json';

function Problems() {
    const [problems, setProblems] = useState([]);
    const [status, setStatus] = useState('Status');
    const [difficulty, setDifficulty] = useState('Difficulty');
    const [paginations, setPaginations] = useState(1);

    const [pics, setPics] = useState([]);
    const [page, setPage] = useState(1);
    const [prevPage, setPrevPage] = useState(0);
    const [nextPage, setNextPage] = useState(2);
    useEffect(() => {
        fetch(`https://picsum.photos/v2/list?page=${page}`)
            .then((response) => response.json())
            .then((pics) => {
                setPics(pics);
            });
    }, [page]);

    const handleNextPage = () => {
        setPage(page + 1);
    };

    const handlePreviousPage = () => {
        setPage(page - 1);
    };

    const handleChangePage = (e) => {
        // console.log(e.target.innerHTML);
        setPage(parseInt(e.target.innerHTML));
    };

    const dropdownToggle = (e) => {
        // let dropdown = $()
        console.log(e.target.className);
    };

    useEffect(() => {
        setProblems(data);
        console.log(problems);
    }, []);

    return (
        <div className="problems">
            <div className="container">
                <div className="py-4">
                    <div className="d-flex">
                        <div className="col-9">
                            <div className="d-flex align-items-center problems-categories">
                                <div className="problems-category">All topics</div>
                                <div className="problems-category">All topics</div>
                                <div className="problems-category">All topics</div>
                                <div className="problems-category">All topics</div>
                                <div className="problems-category">All topics</div>
                                <div className="problems-category">All topics</div>
                                <div className="problems-category">All topics</div>
                                <div className="problems-category">All topics</div>
                                <div className="problems-category">All topics</div>
                                <div className="problems-category">All topics</div>
                                <div className="problems-category">All topics</div>
                            </div>
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
                                                    {difficulty}
                                                </div>
                                                <ul className="dropdown-menu">
                                                    <li className="dropdown-item" onClick={dropdownToggle}>
                                                        Easy
                                                    </li>
                                                    <li className="dropdown-item" onClick={dropdownToggle}>
                                                        Medium
                                                    </li>
                                                    <li className="dropdown-item" onClick={dropdownToggle}>
                                                        Hard
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="dropdown">
                                                <div
                                                    className="problem-languages dropdown-toggle problems-dropdown-toggle"
                                                    type="button"
                                                    data-bs-toggle="dropdown"
                                                    aria-expanded="false"
                                                >
                                                    {status}
                                                </div>
                                                <ul className="dropdown-menu">
                                                    <li className="dropdown-item" onClick={dropdownToggle}>
                                                        Todo
                                                    </li>
                                                    <li className="dropdown-item" onClick={dropdownToggle}>
                                                        Solved
                                                    </li>
                                                    <li className="dropdown-item" onClick={dropdownToggle}>
                                                        Attempted
                                                    </li>
                                                </ul>
                                            </div>
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
                            <div className="mt-5">
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
                                                {problem.status === '1' && (
                                                    <div className="problems-status-accept">Complete</div>
                                                )}
                                                {problem.status === '2' && (
                                                    <div className="problems-status-progress">In progress</div>
                                                )}
                                                {problem.status === '0' && (
                                                    <div className="problems-status">Not starting</div>
                                                )}
                                            </div>
                                            <div className="text-center col-2">{problem.problem_id}</div>
                                            <div className="px-3 col-6">{problem.problem_title}</div>
                                            <div className="text-center col-2">
                                                {problem.problem_level_id === '1' && (
                                                    <div className="problems-status-accept">Easy</div>
                                                )}
                                                {problem.problem_level_id === '2' && (
                                                    <div className="problems-status-progress">Medium</div>
                                                )}
                                                {problem.problem_level_id === '3' && (
                                                    <div className="problems-status-high">Hard</div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="mt-5">
                                <div className="problems-head d-flex align-items-center justify-content-between">
                                    <div className="text-center col-2">ID</div>
                                    <div className="px-3 col-10">API</div>
                                </div>
                                <div className="pt-2 problems-body">
                                    {pics.map((pic) => (
                                        <div className="py-2 d-flex align-items-center">
                                            <div className="text-center col-2">{pic.id}</div>
                                            <div className="px-3 col-10">{pic.url}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="mt-5">
                                <div className="d-flex justify-content-center align-items-center">
                                    <div className="d-flex align-items-center justify-content-center pagination">
                                        {page === 1 && (
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
                                        {page > 1 && (
                                            <div className="d-flex align-items-center justify-content-center pagination">
                                                <button className="page-item" onClick={handlePreviousPage}>
                                                    Previous
                                                </button>
                                                <div className="page-item" onClick={handleChangePage}>
                                                    {page - 1}
                                                </div>
                                                <div className="page-item page-item-active">{page}</div>
                                                <div className="page-item" onClick={handleChangePage}>
                                                    {page + 1}
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

import { useEffect, useState } from 'react';
import './problems.scss';
import $ from 'jquery';
import data from './problems.json';
import { getProblemForPagination } from '~/api/problems';
import { getCookie } from '~/api/cookie';
import { useNavigate } from 'react-router-dom';

function Problems() {
    const [problems, setProblems] = useState([]);
    const [status, setStatus] = useState('Status');
    const [difficulty, setDifficulty] = useState('Difficulty');
    const [paginations, setPaginations] = useState(1);

    const [pics, setPics] = useState([]);
    const [page, setPage] = useState(1);
    const limit = 2;
    const [prevPage, setPrevPage] = useState(0);
    const [nextPage, setNextPage] = useState(2);
    const navigate = useNavigate();
    // useEffect(() => {
    //     fetch(`https://picsum.photos/v2/list?page=${page}`)
    //         .then((response) => response.json())
    //         .then((pics) => {
    //             setPics(pics);
    //         });
    // }, [page]);

    useEffect(() => {
        (async () => {
            let offset = limit * (page - 1);
            const user_id = getCookie('user_id');
            console.log(user_id);
            const res = await getProblemForPagination(user_id, limit, offset);
            console.log(res);
            setProblems(res.body);
        })();
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

    function handleLinkToProblem(problem_id) {
        if (problem_id) navigate(`/problems/${problem_id}`);
    }

    // const handleLinkToProblem = (problem_id) => {
    //     if (problem_id) {
    //         // navigate(`/problems/${problem_id}`);
    //         console.log(problem_id);
    //     }
    // };

    // useEffect(() => {
    //     setProblems(data);
    //     console.log(problems);
    // }, []);

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
                                    {problems && problems.map((problem, index) => (
                                        <div className="py-2 d-flex align-items-center">
                                            <div className="text-center col-2">
                                                {problem.status === 'Solved' && (
                                                    <div className="problems-status-accept">Solved</div>
                                                )}
                                                {problem.status === '2' && (
                                                    <div className="problems-status-progress">In progress</div>
                                                )}
                                                {problem.status === 'Todo' && (
                                                    <div className="problems-status">Not starting</div>
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
                                                {problem.level === 'Easy' && (
                                                    <div className="problems-status-accept">Easy</div>
                                                )}
                                                {problem.level === 'Medium' && (
                                                    <div className="problems-status-progress">Medium</div>
                                                )}
                                                {problem.level === 'Hard' && (
                                                    <div className="problems-status-high">Hard</div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {/*
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
                            */}
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

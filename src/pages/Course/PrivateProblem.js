import clsx from 'clsx';
import styles from './course.module.scss';

import '../Problems/Problem/console.scss';
import '../Problems/Problem/problem.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSlack } from '@fortawesome/free-brands-svg-icons';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { getProblemById, getProblemLanguagesByProblemID, problemRunCode } from '~/api/problems';
import BreadCrumb from '~/components/Breadcrumb';
import {
    getSubjectNameByClassID,
    getSubmissionTracking,
    privateProblemRunCode,
    privateProblemSubmitCode,
} from '~/api/courses';
import $ from 'jquery';
import { insertUserProblem } from '~/api/user_problems';
import { getCurrentTimeFormatted } from '~/utils';
import { createSubmission } from '~/api/submissions';
import { getTestcaseByProblemID } from '~/api/testcases';
import Split from 'react-split-grid';
import Description from '../Problems/Problem/description';
import Loading from '~/components/Loading';
import { faChevronDown, faGear, faRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { langs } from '@uiw/codemirror-extensions-langs';
import { xcodeLight } from '@uiw/codemirror-theme-xcode';
import CodeMirror from '@uiw/react-codemirror';
import MarkDown from '~/components/MarkDown';

const { default: CourseComponent } = require('~/components/Course');

const PrivateProblem = () => {
    const { id, submission_trackings_id } = useParams();

    const [params, setParams] = useSearchParams();
    const problem_id = typeof params.get('problem_id') === 'string' ? params.get('problem_id') : undefined;
    const topic_problems_id =
        typeof params.get('topic_problems_id') === 'string' ? params.get('topic_problems_id') : undefined;

    const navigate = useNavigate();
    // const params = new URLSearchParams(window.location.search);

    const [problem, setProblem] = useState({
        id: 0,
        title: 'x',
        level_id: 0,
        level_name: '',
        description: '',
    });
    const [subjectName, setSubjectName] = useState('');
    const [submissionTrackings, setSubmissionTrackings] = useState([]);

    const [code, setCode] = useState('');
    const [languages, setLanguages] = useState([]);
    const [activeLanguage, setActiveLanguage] = useState({
        id: 0,
        name: '',
        initialcode: '',
    });

    // Handle change language
    const handleLanguageChange = (e) => {
        const lang_name = e.target.innerText;
        const { language_id, name, initial_code } = languages.find(
            (item) => item.name === lang_name && item.problem_id === parseInt(problem_id),
        );
        const lang_obj = { id: language_id, name: name, initialcode: convertCode(initial_code) };

        setActiveLanguage(lang_obj);
        localStorage.setItem('active_language', JSON.stringify(lang_obj));

        if (!localStorage.getItem(`${problem_id}_${name}`)) {
            setCode(convertCode(initial_code));
            localStorage.setItem(`${problem_id}_${name}`, initial_code);
        } else {
            setCode(convertCode(localStorage.getItem(`${problem_id}_${name}`)));
        }
    };

    // Handle change code
    const convertCode = (code) => {
        if (!code) return '';
        code = code.replaceAll('\\n', '\n');
        code = code.replaceAll('\\t', '\t');
        return code;
    };

    const onChange = useCallback(
        (value, viewUpdate) => {
            setCode(convertCode(value));
            const active_language = JSON.parse(localStorage.getItem('active_language'));
            if (active_language !== null && active_language !== undefined) {
                localStorage.setItem(`${problem_id}_${active_language.name}`, value);
            } else {
                return;
            }
        },
        [problem_id],
    );

    const handleResetCode = () => {
        const { initialcode, name } = JSON.parse(localStorage.getItem('active_language'));
        setCode(convertCode(initialcode));
        localStorage.setItem(`${problem_id}_${name}`, initialcode);
    };

    useEffect(() => {
        async function fetchRelevantName(id, problem_id, topic_problems_id) {
            const res = await getProblemById(problem_id);
            setProblem(res.body);

            const fetchSubjectName = await getSubjectNameByClassID(id);
            setSubjectName(fetchSubjectName.body.subject_name);

            if (topic_problems_id) {
                const fetchSubmissonTrackings = await getSubmissionTracking(topic_problems_id);
                setSubmissionTrackings(fetchSubmissonTrackings.body);
                console.log(fetchSubmissonTrackings.body);
            }
        }

        fetchRelevantName(id, problem_id, topic_problems_id);
    }, [id, problem_id, topic_problems_id]);

    useEffect(() => {
        document.body.style.overflowY = 'hidden';

        return () => {
            document.body.style.overflowY = 'auto';
        };
    }, []);

    useEffect(() => {
        let split = $('.split');
        if (split.length > 0) {
            split[0].style.height = 'calc(100vh - 59px)';
            split[0].style.overflow = 'hidden auto';
        }
    }, []);

    // Handle problem_languages
    useEffect(() => {
        async function fetchProblemLanguagesByProblemID(problem_id) {
            const res = await getProblemLanguagesByProblemID(problem_id);
            setLanguages(res.body || []);
        }
        fetchProblemLanguagesByProblemID(problem_id);
    }, [problem_id]);

    useEffect(() => {
        // IMPORTANT: set active_language and code if only when languages is done fetching
        if (languages.length === 0) return;
        const { language_id, name, initial_code } =
            languages.length > 0 && languages.filter((item) => item.problem_id === parseInt(problem_id))[0];
        const lang_obj = { id: language_id, name: name, initialcode: convertCode(initial_code) };

        localStorage.setItem('active_language', JSON.stringify(lang_obj));
        setActiveLanguage(JSON.parse(localStorage.getItem('active_language')));

        if (!localStorage.getItem(`${problem_id}_${name}`)) {
            setCode(convertCode(initial_code));
            localStorage.setItem(`${problem_id}_${name}`, initial_code);
        } else {
            setCode(convertCode(localStorage.getItem(`${problem_id}_${name}`)));
        }
    }, [problem_id, languages]);

    // ---------------------------------------------------------------- //
    // File: console.js
    const [currentCaseTest, setCurrentCaseTest] = useState(0);
    const [currentCaseResult, setCurrentCaseResult] = useState(0);
    const [currentConsoleNav, setCurrentConsoleNav] = useState(0);
    const [run, setRun] = useState(false);
    const [currentResult, setCurrentResult] = useState([
        {
            success: true,
        },
    ]);
    const [testcases, setTestcases] = useState([
        {
            input: '',
            output: '',
        },
    ]);

    useEffect(() => {
        async function fetchTestcaseByProblemID(problem_id) {
            const res = await getTestcaseByProblemID(problem_id);
            if (res) {
                setTestcases(res.body.testcases);
            }
        }
        fetchTestcaseByProblemID(problem_id);
    }, [problem_id]);

    const handleToggleConsole = () => {
        var gridRow = $('.grid-row');
        var problemConsoleNav = $('.problemConsoleNav');
        var problemConsoleBody = $('.problemConsoleBody');

        if (gridRow[0].classList.contains('openConsole')) {
            gridRow[0].style.gridTemplateRows = null;
            gridRow[0].classList.remove('openConsole');
            gridRow[0].classList.add('closeConsole');
            problemConsoleNav[0].classList.add('hide');
            problemConsoleBody[0].classList.add('hide');
        } else if (gridRow[0].classList.contains('closeConsole')) {
            gridRow[0].style.gridTemplateRows = null;
            gridRow[0].classList.remove('closeConsole');
            gridRow[0].classList.add('openConsole');
            problemConsoleNav[0].classList.remove('hide');
            problemConsoleBody[0].classList.remove('hide');
        }
    };

    const handleOpenConsole = () => {
        var gridRow = $('.grid-row');
        var problemConsoleNav = $('.problemConsoleNav');
        var problemConsoleBody = $('.problemConsoleBody');

        if (gridRow[0].classList.contains('closeConsole')) {
            gridRow[0].style.gridTemplateRows = null;
            gridRow[0].classList.remove('closeConsole');
            gridRow[0].classList.add('openConsole');
            problemConsoleNav[0].classList.remove('hide');
            problemConsoleBody[0].classList.remove('hide');
        }
    };

    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState('');
    const [compileInfo, setCompileInfo] = useState('');
    const [runTime, setRunTime] = useState(0);
    const [wrongCase, setWrongCase] = useState(null);

    const handleRunCode = async () => {
        handleOpenConsole();
        setRun(true);
        setCurrentConsoleNav(1);
        setCurrentCaseResult(0);
        setIsLoading(true);

        const res = await privateProblemRunCode(
            id,
            code,
            activeLanguage.name,
            submission_trackings_id,
            getCurrentTimeFormatted(),
        );

        console.log(res);

        if (res.code === 200) {
            setIsLoading(false);
            setStatus(res.body.status);
            setCompileInfo(res.body.compile_info);
            setCurrentResult(res.body.result);
            if (res.body.status === 'Accepted' || res.body.status === 'Wrong answer') {
                setRunTime(res.body.avg_runtime);
            }
            setWrongCase(res.body.wrong_testcase);
            return 200;
        } else {
            alert('Try running the code again!');
            return 400;
        }
    };

    const [renderSubmissions, setRenderSubmissions] = useState(true);

    const handleSubmitCode = async (e) => {
        handleOpenConsole();
        setRun(true);
        setCurrentConsoleNav(1);
        setCurrentCaseResult(0);
        setIsLoading(true);

        const response = await privateProblemRunCode(
            id,
            code,
            activeLanguage.name,
            submission_trackings_id,
            getCurrentTimeFormatted(),
        );

        if (response.code === 200) {
            setIsLoading(false);
            setStatus(response.body.status);
            setCompileInfo(response.body.compile_info);
            setCurrentResult(response.body.result);
            if (response.body.status === 'Accepted' || response.body.status === 'Wrong answer') {
                setRunTime(response.body.avg_runtime);
            }
            setWrongCase(response.body.wrong_testcase);

            const res = await privateProblemSubmitCode(submission_trackings_id);
            console.log(res);
            if (res.code === 200) {
                // console.log('Success');
                // navigate(`/courses/${id}/topic_problems/${topic_problems_id}/problems/${problem_id}/view`);
                checkSubmissonTrackings();
            }
        } else {
            alert('Try running the code again!');
        }
    };

    //
    const [countdown, setCountdown] = useState(0);

    useEffect(() => {
        var now = getCurrentTimeFormatted();
        if (submissionTrackings.length > 0) {
            // Tính thời gian đã trôi qua từ startTime đến hiện tại (tính bằng milliseconds)
            var timePassed = new Date(now) - new Date(submissionTrackings[0]['submission_trackings_start_time']);

            // Tính thời gian còn lại dựa trên thời gian giới hạn
            var remainingMilliseconds = submissionTrackings[0]['time_limit'] * 60 * 1000 - timePassed;
            setCountdown(remainingMilliseconds);
        }
    }, [submissionTrackings]);

    useEffect(() => {
        const timerId = setInterval(() => {
            setCountdown((prev) => prev - 1000);
        }, 1000);

        return () => clearInterval(timerId);
    }, []);

    const checkSubmissonTrackings = async () => {
        const response = await getSubmissionTracking(topic_problems_id);
        if (response.code === 200 && response.body.length === 0) {
            navigate(`/courses/${id}/topic_problems/${topic_problems_id}/problems/${problem_id}/view`);
            // courses/2/topic_problems/2/problems/2/view
            // courses/2/submissionTrackings/9?problem_id=2&topic_problems_id=2
        }
    };
    useEffect(() => {
        if (countdown < 0) {
            console.log('A');
            checkSubmissonTrackings();
        }
    }, [countdown]);

    // const remainingTime = (startTime, limitTime) => {
    //     // Lấy thời gian hiện tại
    //     console.log(startTime);
    //     var now = getCurrentTimeFormatted();

    //     // Tính thời gian đã trôi qua từ startTime đến hiện tại (tính bằng milliseconds)
    //     var timePassed = new Date(now) - new Date(startTime);

    //     // Tính thời gian còn lại dựa trên thời gian giới hạn
    //     console.log(timePassed);
    //     console.log(limitTime * 60 * 1000);
    //     var remainingMilliseconds = limitTime * 60 * 1000 - timePassed;
    //     console.log(remainingMilliseconds);

    //     if (remainingMilliseconds < 0) {
    //         return '00:00:00'; // Nếu thời gian còn lại là số âm, trả về 00:00:00
    //     }

    //     // Chuyển đổi thời gian còn lại thành đơn vị giờ, phút, giây
    //     var hours = Math.floor(remainingMilliseconds / (1000 * 60 * 60));
    //     var minutes = Math.floor((remainingMilliseconds % (1000 * 60 * 60)) / (1000 * 60));
    //     var seconds = Math.floor((remainingMilliseconds % (1000 * 60)) / 1000);

    //     // Định dạng thời gian còn lại
    //     var formattedTime =
    //         (hours < 10 ? '0' : '') +
    //         hours +
    //         ':' +
    //         (minutes < 10 ? '0' : '') +
    //         minutes +
    //         ':' +
    //         (seconds < 10 ? '0' : '') +
    //         seconds;

    //     return formattedTime;
    // };

    const remainingTime = (remainingMilliseconds) => {
        // Lấy thời gian hiện tại
        if (remainingMilliseconds < 0) {
            return '00:00:00'; // Nếu thời gian còn lại là số âm, trả về 00:00:00
        }

        // Chuyển đổi thời gian còn lại thành đơn vị giờ, phút, giây
        var hours = Math.floor(remainingMilliseconds / (1000 * 60 * 60));
        var minutes = Math.floor((remainingMilliseconds % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((remainingMilliseconds % (1000 * 60)) / 1000);

        // Định dạng thời gian còn lại
        var formattedTime =
            (hours < 10 ? '0' : '') +
            hours +
            ':' +
            (minutes < 10 ? '0' : '') +
            minutes +
            ':' +
            (seconds < 10 ? '0' : '') +
            seconds;

        return formattedTime;
    };

    return (
        <div className={clsx(styles.privateProblem)}>
            <Split
                render={({ getGridProps, getGutterProps }) => (
                    <div className="grid" {...getGridProps()}>
                        <div className="split bg-white">
                            <div className="w-100 h-100">
                                <div className={clsx(styles.problemContent)}>
                                    <div className={clsx('container')}>
                                        <div className={clsx(styles.innerContainer)}>
                                            <BreadCrumb
                                                items={['Home', 'My courses', subjectName, problem.title]}
                                                links={[
                                                    '/',
                                                    '/courses',
                                                    `/courses/${id}/topic_problems/${topic_problems_id}/problems/${problem_id}/view`,
                                                ]}
                                            />
                                            <div className={clsx(styles.header)}>
                                                <div className={clsx(styles.headerIcon)}>
                                                    <FontAwesomeIcon icon={faSlack} />
                                                </div>
                                                <div className={clsx(styles.headerContent)}>
                                                    <div className={clsx(styles.headerSubTitle)}>Exercise</div>
                                                    <div className={clsx(styles.headerTitle)}>{problem.title}</div>
                                                </div>
                                            </div>

                                            <div className="description">
                                                <MarkDown text={problem.description} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="gutter-col gutter-col-1" {...getGutterProps('column', 1)} />
                        {!languages.length && <Loading />}
                        {languages.length && (
                            <div className="split">
                                <Split
                                    render={({ getGridProps, getGutterProps }) => (
                                        <div className="grid-row h-100 closeConsole" {...getGridProps()}>
                                            {/* ------------ Code ------------ */}
                                            <div className="bg-white">
                                                <div
                                                    className={clsx(
                                                        'd-flex',
                                                        'justify-content-between',
                                                        'align-items-center',
                                                        'problem-code-header',
                                                        'border-bottom',
                                                        styles.problemCodeHeader,
                                                    )}
                                                >
                                                    <div className="d-flex align-items-center">
                                                        <div className={clsx('dropdown', styles.dropdownCustom1)}>
                                                            <div
                                                                className="problem-languages dropdown-toggle"
                                                                type="button"
                                                                data-bs-toggle="dropdown"
                                                                aria-expanded="false"
                                                            >
                                                                {activeLanguage && activeLanguage.name}
                                                            </div>
                                                            <ul
                                                                className={clsx(
                                                                    'dropdown-menu',
                                                                    styles.dropdownMenuCustom1,
                                                                )}
                                                            >
                                                                {languages.map((value, index) => {
                                                                    return (
                                                                        <li
                                                                            className="dropdown-item"
                                                                            onClick={handleLanguageChange}
                                                                            key={index}
                                                                        >
                                                                            {value.name}
                                                                        </li>
                                                                    );
                                                                })}
                                                            </ul>
                                                        </div>
                                                        <div className={clsx(styles.remainingTimeContainer)}>
                                                            Remaining Time:{' '}
                                                            <span
                                                                className={
                                                                    countdown < 300000
                                                                        ? clsx(styles.remainingRunOutOfTime)
                                                                        : ''
                                                                }
                                                            >
                                                                {submissionTrackings &&
                                                                    submissionTrackings.length > 0 &&
                                                                    remainingTime(countdown)}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex align-items-center pe-4">
                                                        <div className="icon reset-code" onClick={handleResetCode}>
                                                            <FontAwesomeIcon icon={faRotateLeft} fontSize={20} />
                                                        </div>
                                                        <div className="icon setting">
                                                            <FontAwesomeIcon icon={faGear} fontSize={20} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="mt-1">
                                                    {activeLanguage && (
                                                        <div>
                                                            {activeLanguage.id === 1 && (
                                                                <CodeMirror
                                                                    value={code}
                                                                    extensions={[langs.python()]}
                                                                    onChange={onChange}
                                                                    theme={xcodeLight}
                                                                />
                                                            )}
                                                            {activeLanguage.id === 2 && (
                                                                <CodeMirror
                                                                    value={code}
                                                                    extensions={[langs.cpp()]}
                                                                    onChange={onChange}
                                                                    theme={xcodeLight}
                                                                />
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="gutter-row gutter-row-1" {...getGutterProps('row', 1)} />
                                            {/* ------------ Console ------------ */}
                                            <div className={clsx('d-flex', 'flex-column', styles.problemConsole)}>
                                                <div className="d-flex align-items-center problemConsoleNav hide">
                                                    <div
                                                        className={`problemConsoleNavItem ${
                                                            currentConsoleNav === 0 ? 'problemConsoleNavItemActive' : ''
                                                        }`}
                                                        onClick={() => {
                                                            setCurrentConsoleNav(0);
                                                        }}
                                                    >
                                                        Testcase
                                                    </div>
                                                    <div
                                                        className={`problemConsoleNavItem ${
                                                            currentConsoleNav === 1 ? 'problemConsoleNavItemActive' : ''
                                                        } ms-4`}
                                                        onClick={() => {
                                                            setCurrentConsoleNav(1);
                                                        }}
                                                    >
                                                        Result
                                                    </div>
                                                </div>
                                                <div className={clsx('problemConsoleBody', 'hide')}>
                                                    {currentConsoleNav === 0 && (
                                                        <div>
                                                            <div
                                                                className={clsx(
                                                                    'd-flex',
                                                                    'align-items-center',
                                                                    styles.problemConsoleCaseHeader,
                                                                )}
                                                            >
                                                                {testcases.map((testcase, index) => (
                                                                    <div
                                                                        className={`problemConsoleCaseNum me-2
                                                                            ${
                                                                                currentCaseTest === index
                                                                                    ? 'problemConsoleCaseNumActive'
                                                                                    : ''
                                                                            }`}
                                                                        onClick={() => {
                                                                            setCurrentCaseTest(index);
                                                                        }}
                                                                    >
                                                                        Case {index + 1}
                                                                    </div>
                                                                ))}
                                                            </div>
                                                            <div
                                                                className={clsx(styles.problemConsoleCaseBody, 'pt-3')}
                                                            >
                                                                <div className={clsx(styles.smallText)}>Input:</div>
                                                                <div
                                                                    className={clsx(
                                                                        styles.problemConsoleCaseBodyContent,
                                                                    )}
                                                                >
                                                                    {testcases[currentCaseTest].input
                                                                        .split('\n')
                                                                        .map((input, index) => (
                                                                            <div key={index}>{input}</div>
                                                                        ))}
                                                                </div>
                                                            </div>
                                                            <div
                                                                className={clsx(styles.problemConsoleCaseBody, 'pt-3')}
                                                            >
                                                                <div className={clsx(styles.smallText)}>Output:</div>
                                                                <div
                                                                    className={clsx(
                                                                        styles.problemConsoleCaseBodyContent,
                                                                    )}
                                                                >
                                                                    {testcases[currentCaseTest].output}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}

                                                    {!!isLoading && currentConsoleNav === 1 && <Loading />}

                                                    {!isLoading && currentConsoleNav === 1 && run === false && (
                                                        <div className="secondary-text">You must run your code</div>
                                                    )}

                                                    {!isLoading && currentConsoleNav === 1 && run === true && (
                                                        <div>
                                                            {status !== 'Accepted' && status !== 'Wrong answer' && (
                                                                <div>
                                                                    <div
                                                                        className={` problemConsoleResult mb-4 problemConsoleResultFailure`}
                                                                    >
                                                                        {status}
                                                                    </div>

                                                                    {!!compileInfo && (
                                                                        <pre
                                                                            className={
                                                                                styles.problemConsoleCaseBodyContent
                                                                            }
                                                                        >
                                                                            {compileInfo}
                                                                        </pre>
                                                                    )}
                                                                </div>
                                                            )}

                                                            {(status === 'Accepted' || status === 'Wrong answer') && (
                                                                <div>
                                                                    <div className="d-flex gap-4 align-items-center mb-4">
                                                                        <div
                                                                            className={` problemConsoleResult
                                                                        ${
                                                                            status === 'Accepted'
                                                                                ? 'problemConsoleResultSuccess'
                                                                                : 'problemConsoleResultFailure'
                                                                        }
                                                                    `}
                                                                        >
                                                                            {status}
                                                                        </div>

                                                                        <div className="footer-secondary">
                                                                            Runtime: {runTime} ms
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        className={clsx(
                                                                            'd-flex',
                                                                            'align-items-center',
                                                                            styles.problemConsoleCaseHeader,
                                                                        )}
                                                                    >
                                                                        {testcases.map((testcase, index) => (
                                                                            <div
                                                                                className={` problemConsoleCaseNum me-2
                                                                                    ${
                                                                                        currentCaseResult === index
                                                                                            ? 'problemConsoleCaseNumActive'
                                                                                            : ''
                                                                                    }`}
                                                                                onClick={() => {
                                                                                    setCurrentCaseResult(index);
                                                                                }}
                                                                            >
                                                                                {currentResult &&
                                                                                    currentResult[index] && (
                                                                                        <span
                                                                                            className={`round-result ${
                                                                                                currentResult[index]
                                                                                                    .success
                                                                                                    ? 'result-success'
                                                                                                    : 'result-failure'
                                                                                            }`}
                                                                                        ></span>
                                                                                    )}
                                                                                <span>Case {index + 1}</span>
                                                                            </div>
                                                                        ))}
                                                                        {wrongCase !== null && (
                                                                            <div
                                                                                className={` problemConsoleCaseNum me-2
                                                                                    ${
                                                                                        currentCaseResult ===
                                                                                        testcases.length
                                                                                            ? 'problemConsoleCaseNumActive'
                                                                                            : ''
                                                                                    }`}
                                                                                onClick={() => {
                                                                                    setCurrentCaseResult(
                                                                                        testcases.length,
                                                                                    );
                                                                                }}
                                                                            >
                                                                                {currentResult &&
                                                                                    currentResult[testcases.length] && (
                                                                                        <span
                                                                                            className={`round-result result-failure`}
                                                                                        ></span>
                                                                                    )}
                                                                                <span>Case {testcases.length + 1}</span>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                    <div
                                                                        className={clsx(
                                                                            styles.problemConsoleCaseBody,
                                                                            'pt-3',
                                                                        )}
                                                                    >
                                                                        <div className={clsx(styles.smallText)}>
                                                                            Input:
                                                                        </div>
                                                                        <div
                                                                            className={clsx(
                                                                                styles.problemConsoleCaseBodyContent,
                                                                            )}
                                                                        >
                                                                            {currentCaseResult < 3 &&
                                                                                testcases[currentCaseResult].input
                                                                                    .split('\n')
                                                                                    .map((input, index) => (
                                                                                        <div key={index}>{input}</div>
                                                                                    ))}
                                                                            {currentCaseResult >= 3 &&
                                                                                wrongCase &&
                                                                                wrongCase.input
                                                                                    .split('\n')
                                                                                    .map((input, index) => (
                                                                                        <div key={index}>{input}</div>
                                                                                    ))}
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        className={clsx(
                                                                            styles.problemConsoleCaseBody,
                                                                            'pt-3',
                                                                        )}
                                                                    >
                                                                        <div className={clsx(styles.smallText)}>
                                                                            Output:
                                                                        </div>
                                                                        <div
                                                                            className={clsx(
                                                                                styles.problemConsoleCaseBodyContent,
                                                                            )}
                                                                        >
                                                                            {currentCaseResult < 3 && (
                                                                                <span>
                                                                                    {
                                                                                        currentResult[currentCaseResult]
                                                                                            .output
                                                                                    }
                                                                                </span>
                                                                            )}
                                                                            {currentCaseResult >= 3 && wrongCase && (
                                                                                <span>{wrongCase.actual_output}</span>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        className={clsx(
                                                                            styles.problemConsoleCaseBody,
                                                                            'pt-3',
                                                                        )}
                                                                    >
                                                                        <div className={clsx(styles.smallText)}>
                                                                            Expected:
                                                                        </div>
                                                                        <div
                                                                            className={clsx(
                                                                                styles.problemConsoleCaseBodyContent,
                                                                            )}
                                                                        >
                                                                            {currentCaseResult < 3 && (
                                                                                <span>
                                                                                    {
                                                                                        testcases[currentCaseResult]
                                                                                            .output
                                                                                    }
                                                                                </span>
                                                                            )}
                                                                            {currentCaseResult >= 3 && wrongCase && (
                                                                                <span>{wrongCase.output}</span>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                                <div
                                                    className={clsx(
                                                        'd-flex',
                                                        'justify-content-between',
                                                        'align-items-center',
                                                        styles.problemConsoleFooter,
                                                    )}
                                                >
                                                    <div
                                                        className={clsx(
                                                            'd-flex',
                                                            'align-items-center',
                                                            'cursor-pointer',
                                                        )}
                                                        onClick={handleToggleConsole}
                                                    >
                                                        <div className={clsx(styles.problemConsoleToggle)}>Console</div>
                                                        <FontAwesomeIcon
                                                            icon={faChevronDown}
                                                            className={clsx(styles.iconConsole)}
                                                        />
                                                    </div>
                                                    <div className={clsx('d-flex', 'align-items-center')}>
                                                        <button
                                                            type="submit"
                                                            className={clsx(styles.btnCustom, styles.btnRun)}
                                                            onClick={handleRunCode}
                                                        >
                                                            Run
                                                        </button>
                                                        <button
                                                            className={clsx(styles.btnCustom, styles.btnSubmit)}
                                                            onClick={handleSubmitCode}
                                                            type="submit"
                                                        >
                                                            Submit
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                />
                            </div>
                        )}
                    </div>
                )}
            />
        </div>
    );
};

export default PrivateProblem;

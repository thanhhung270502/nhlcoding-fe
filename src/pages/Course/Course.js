import clsx from 'clsx';
import styles from './course.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faAngleDown,
    faAngleUp,
    faGripLines,
    faLayerGroup,
    faPenToSquare,
    faSquarePlus,
} from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { faSlack } from '@fortawesome/free-brands-svg-icons';
import { createTopicForClass, getAllTopicProblemsByClass } from '~/api/courses';
import { getRole } from '~/api/auth';

const { default: CourseComponent } = require('~/components/Course');

const MainChild = () => {
    const [role, setRole] = useState('normal');
    const [opens, setOpens] = useState([]);
    const { id } = useParams();
    const [classActive, setClassActive] = useState('');

    const [classes, setClasses] = useState({});
    const [keysOfClasses, setKeysOfClasses] = useState([]);

    const [openTopics, setOpenTopics] = useState([]);
    const [topicNames, setTopicNames] = useState([]);
    const [topicName, setTopicName] = useState([]);

    const [openEditTopicName, setOpenEditTopicName] = useState([]);
    const [editTopicNames, setEditTopicNames] = useState([]);

    const [reset, setReset] = useState(true);

    const [lengthOfTopics, setLengthOfTopics] = useState(0);

    const [topicProblems, setTopicProblems] = useState([]);
    const [keysOfTopicProblems, setKeysOfTopicProblems] = useState([]);

    const handleOpenCourse = (index) => {
        const updateOpens = [...opens];
        updateOpens[index] = !updateOpens[index];
        setOpens(updateOpens);
    };

    const handleUpdateClass = (name) => {
        setClassActive(name);
    };

    const handleOpenAddTopic = (idx) => {
        const updateOpens = [...openTopics];
        updateOpens[idx] = !updateOpens[idx];
        setOpenTopics(updateOpens);
    };

    const handleChangeTopicNames = (index, name) => {
        const updateTopicNames = [...topicNames];
        updateTopicNames[index] = name;
        setTopicNames(updateTopicNames);
    };

    const handleChangeEditTopicNames = (index, name) => {
        const updateTopicNames = [...editTopicNames];
        updateTopicNames[index] = name;
        setEditTopicNames(updateTopicNames);
    };

    const handleChangeTopicName = (name) => {
        setTopicName(name);
    };

    const handleAddTopic = async (idx, topic_name) => {
        const createTopic = await createTopicForClass({ topic_name: topic_name, idx }, id);
        if (createTopic.code === 201) {
            setReset(!reset);
        }
    };

    const handleOpenEditTopicName = async (idx) => {
        const updateOpens = [...openEditTopicName];
        updateOpens[idx] = !updateOpens[idx];
        setOpenEditTopicName(updateOpens);
    };

    const handleNavigateCreateNewExercise = (class_topics_id) => {
        console.log(class_topics_id);
    };

    useEffect(() => {
        (async () => {
            const fetchRole = await getRole();
            setRole(fetchRole.body.role);
        })();
    }, []);

    useEffect(() => {
        (async () => {
            const getAllTopics = await getAllTopicProblemsByClass(id);
            console.log(getAllTopics.body);
            setClasses(getAllTopics.body.topic_problems);
            let lengthOfClasses = Object.keys(getAllTopics.body.topic_problems);
            setKeysOfClasses(lengthOfClasses);

            for (let i = 0; i < lengthOfClasses.length; i++) {
                if (getAllTopics.body.topic_problems[lengthOfClasses[i]]['class_id'] === parseInt(id)) {
                    setClassActive(getAllTopics.body.topic_problems[lengthOfClasses[i]]['class_name']);
                }
            }

            setOpens(new Array(100).fill(true));
            setOpenTopics(new Array(100).fill(false));
            setOpenEditTopicName(new Array(100).fill(false));
            setTopicNames(new Array(100).fill(''));

            setEditTopicNames(new Array(100).fill(''));

            let length = Object.keys(getAllTopics.body.topic_problems[lengthOfClasses[0]]['topics']).length;
            setLengthOfTopics(parseInt(length));
            setTopicProblems(getAllTopics.body.topic_problems[lengthOfClasses[0]]['topics']);
            setKeysOfTopicProblems(Object.keys(getAllTopics.body.topic_problems[lengthOfClasses[0]]['topics']));
        })();
    }, [id, reset]);

    useEffect(() => {
        if (classActive !== '') {
            let length = Object.keys(classes[classActive]['topics']).length;
            setLengthOfTopics(parseInt(length));
            setTopicProblems(classes[classActive]['topics']);
            setKeysOfTopicProblems(Object.keys(classes[classActive]['topics']));
        }
    }, [classActive, classes]);

    return (
        <div className={clsx(styles.course)}>
            {role === 'teacher' && (
                <div className={clsx(styles.sortBar)}>
                    <div className={clsx(styles.sortBarOptions)}>
                        {keysOfClasses.map((keyOfClasses, index) => {
                            return (
                                <Link
                                    className={clsx(
                                        styles.sortBarOptionsItem,
                                        keyOfClasses === classActive ? styles.sortBarOptionsItemActive : '',
                                    )}
                                    to={`/courses/${classes[keyOfClasses].class_id}`}
                                    onClick={() => handleUpdateClass(keyOfClasses)}
                                >
                                    <div className={clsx(styles.sortBarOptionsItemIcon)}>
                                        <FontAwesomeIcon icon={faLayerGroup} />
                                    </div>
                                    <div className={clsx(styles.sortBarOptionsItemName)}>{keyOfClasses}</div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            )}
            {keysOfTopicProblems.map((key, idx) => {
                return (
                    <div className={clsx(styles.courseContainer)}>
                        {role === 'teacher' && (
                            <div className={styles.courseAddTopic}>
                                <div className={clsx(styles.courseAddTopicIcon)}>
                                    <FontAwesomeIcon icon={faSquarePlus} />
                                </div>
                                {openTopics[idx] && (
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            value={topicNames[idx]}
                                            className="form-control"
                                            placeholder="Type topic_name..."
                                            aria-label="Type topic_name..."
                                            aria-describedby="button-addon2"
                                            onChange={(event) => handleChangeTopicNames(idx, event.target.value)}
                                        />
                                        <button
                                            className="btn btn-outline-secondary"
                                            type="button"
                                            id="button-addon2"
                                            onClick={() => {
                                                handleAddTopic(topicProblems[key]['idx'], topicNames[idx]);
                                            }}
                                        >
                                            Create
                                        </button>
                                    </div>
                                )}
                                {!openTopics[idx] && (
                                    <div
                                        className={clsx(styles.courseAddTopicTitle)}
                                        onClick={() => handleOpenAddTopic(idx)}
                                    >
                                        Add an new topic at here ...
                                    </div>
                                )}
                            </div>
                        )}
                        <div className={clsx(styles.courseElement)}>
                            {openEditTopicName[idx] && (
                                <div className={clsx(styles.courseHeader)}>
                                    <div className={clsx(styles.courseTitle)}>
                                        <FontAwesomeIcon icon={faGripLines} />
                                        <div className={clsx('input-group', styles.inputEditTopicNameGroup)}>
                                            <input
                                                type="text"
                                                className={clsx('form-control', styles.formControl)}
                                                placeholder="Recipient's username"
                                                aria-label="Recipient's username with two button addons"
                                                onChange={(event) =>
                                                    handleChangeEditTopicNames(idx, event.target.value)
                                                }
                                            />
                                            <button
                                                className={clsx('btn', 'btn-outline-secondary', styles.buttonSecondary)}
                                                type="button"
                                            >
                                                Button
                                            </button>
                                            <button
                                                className={clsx('btn', 'btn-outline-secondary', styles.buttonSecondary)}
                                                type="button"
                                            >
                                                Button
                                            </button>
                                        </div>
                                    </div>
                                    <div className={clsx(styles.courseDropdown)} onClick={() => handleOpenCourse(idx)}>
                                        {opens[idx] && <FontAwesomeIcon icon={faAngleUp} />}
                                        {!opens[idx] && <FontAwesomeIcon icon={faAngleDown} />}
                                    </div>
                                </div>
                            )}
                            {!openEditTopicName[idx] && (
                                <div className={clsx(styles.courseHeader)}>
                                    <div className={clsx(styles.courseTitle)}>
                                        <FontAwesomeIcon icon={faGripLines} />
                                        <span onClick={() => handleOpenCourse(idx)}>{key}</span>
                                        {role === 'teacher' && (
                                            <span
                                                className={clsx(styles.courseClass)}
                                                onClick={() => handleOpenCourse(idx)}
                                            >
                                                -<span>{classActive}</span>
                                            </span>
                                        )}
                                        {role === 'teacher' && (
                                            <div
                                                className={clsx(styles.courseIconEdit)}
                                                onClick={() => handleOpenEditTopicName(idx)}
                                            >
                                                <FontAwesomeIcon icon={faPenToSquare} />
                                            </div>
                                        )}
                                    </div>
                                    <div className={clsx(styles.courseDropdown)} onClick={() => handleOpenCourse(idx)}>
                                        {opens[idx] && <FontAwesomeIcon icon={faAngleUp} />}
                                        {!opens[idx] && <FontAwesomeIcon icon={faAngleDown} />}
                                    </div>
                                </div>
                            )}
                            {opens[idx] && (
                                <div className={clsx(styles.courseBody)}>
                                    {topicProblems[key]['problems'].map((problem, idx) => {
                                        return (
                                            <div className={clsx(styles.courseExercise)}>
                                                <div className={clsx(styles.courseExerciseIcon)}>
                                                    <FontAwesomeIcon icon={faSlack} />
                                                </div>
                                                <div className={clsx(styles.courseExerciseContent)}>
                                                    <div className={clsx(styles.courseExerciseSubTitle)}>Exercise</div>
                                                    <Link
                                                        className={clsx(styles.courseExerciseTitle)}
                                                        to={`/courses/${id}/topic_problems/${problem.topic_problems_id}/problems/${problem.problem_id}/view`}
                                                    >
                                                        {problem['title']}
                                                    </Link>
                                                </div>
                                            </div>
                                        );
                                    })}
                                    {role === 'teacher' && (
                                        <div className={clsx(styles.courseAddExercise)}>
                                            <div className={clsx(styles.courseAddExerciseIcon)}>
                                                <FontAwesomeIcon icon={faSquarePlus} />
                                            </div>
                                            <Link
                                                className={clsx(styles.courseAddExerciseTitle)}
                                                to={`/courses/${classes[classActive].class_id}/course/${topicProblems[key].class_topics_id}/add-new-exercise`}
                                            >
                                                Add an new exercise...
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                );
            })}
            {role === 'teacher' && (
                <div className={styles.courseAddTopic}>
                    <div className={clsx(styles.courseAddTopicIcon)}>
                        <FontAwesomeIcon icon={faSquarePlus} />
                    </div>
                    {openTopics[lengthOfTopics] && (
                        <div className="input-group">
                            <input
                                type="text"
                                value={topicName}
                                className="form-control"
                                placeholder="Type topic_name..."
                                aria-label="Type topic_name..."
                                aria-describedby="button-addon2"
                                onChange={(event) => handleChangeTopicName(event.target.value)}
                            />
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                id="button-addon2"
                                onClick={() => {
                                    let topics = classes[classActive]['topics'];
                                    let keysOfTopics = Object.keys(topics);
                                    let lengthOfKeys = keysOfTopics.length;

                                    let lastTopic = topics[keysOfTopics[lengthOfKeys - 1]];
                                    handleAddTopic(lastTopic['idx'] + 1000, topicName);
                                }}
                            >
                                Create
                            </button>
                        </div>
                    )}
                    {!openTopics[lengthOfTopics] && (
                        <div
                            className={clsx(styles.courseAddTopicTitle)}
                            onClick={() => handleOpenAddTopic(lengthOfTopics)}
                        >
                            Add an new topic at here ...
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

const Course = () => {
    return <CourseComponent state="course" mainChild={<MainChild />} />;
};

export default Course;

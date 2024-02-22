import clsx from 'clsx';
import styles from './course.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp, faGripLines, faPenToSquare, faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { faSlack } from '@fortawesome/free-brands-svg-icons';
import { getAllTopicProblemsByClass } from '~/api/courses';
import { isTeacher } from '~/utils';

const { default: CourseComponent } = require('~/components/Course');

const MainChild = () => {
    const [opens, setOpens] = useState([]);
    const { id } = useParams();
    const [topics, setTopics] = useState({});
    const [keysOfTopics, setKeysOfTopics] = useState([]);

    const handleOpenCourse = (index) => {
        const updateOpens = [...opens];
        updateOpens[index] = !updateOpens[index];
        setOpens(updateOpens);
    };

    useEffect(() => {
        (async () => {
            const getAllTopics = await getAllTopicProblemsByClass(id);
            console.log(getAllTopics);
            setTopics(getAllTopics.body.topic_problems);
            setKeysOfTopics(Object.keys(getAllTopics.body.topic_problems));
            let length = Object.keys(getAllTopics.body.topic_problems).length;
            setOpens(new Array(length).fill(true));
        })();
    }, [id]);

    return (
        <div>
            {keysOfTopics.map((key, index) => {
                return (
                    <div className={clsx(styles.course)}>
                        <div className={clsx(styles.courseHeader)} onClick={() => handleOpenCourse(index)}>
                            <div className={clsx(styles.courseTitle)}>
                                <FontAwesomeIcon icon={faGripLines} />
                                <span>{key}</span>
                                {isTeacher() && (
                                    <span className={clsx(styles.courseClass)}>
                                        -<span>{topics[key][0].class_name}</span>
                                    </span>
                                )}
                                {isTeacher() && (
                                    <Link to="/">
                                        <FontAwesomeIcon icon={faPenToSquare} />
                                    </Link>
                                )}
                            </div>
                            <div className={clsx(styles.courseDropdown)}>
                                {opens[index] && <FontAwesomeIcon icon={faAngleUp} />}
                                {!opens[index] && <FontAwesomeIcon icon={faAngleDown} />}
                            </div>
                        </div>
                        {opens[index] && (
                            <div className={clsx(styles.courseBody)}>
                                {topics[key].map((problem, idx) => {
                                    return (
                                        <div className={clsx(styles.courseExercise)}>
                                            <div className={clsx(styles.courseExerciseIcon)}>
                                                <FontAwesomeIcon icon={faSlack} />
                                            </div>
                                            <div className={clsx(styles.courseExerciseContent)}>
                                                <div className={clsx(styles.courseExerciseSubTitle)}>Exercise</div>
                                                <Link className={clsx(styles.courseExerciseTitle)}>
                                                    {problem.title}
                                                </Link>
                                            </div>
                                        </div>
                                    );
                                })}
                                {isTeacher() && (
                                    <div className={clsx(styles.courseAddExercise)}>
                                        <div className={clsx(styles.courseAddExerciseIcon)}>
                                            <FontAwesomeIcon icon={faSquarePlus} />
                                        </div>
                                        <Link className={clsx(styles.courseAddExerciseTitle)}>
                                            Add an new exercise...
                                        </Link>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

const Course = () => {
    return <CourseComponent state="course" mainChild={<MainChild />} />;
};

export default Course;

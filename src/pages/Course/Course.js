import clsx from 'clsx';
import styles from './course.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp, faGripLines, faPenToSquare, faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { faSlack } from '@fortawesome/free-brands-svg-icons';

const { default: CourseComponent } = require('~/components/Course');

const MainChild = () => {
    const [opens, setOpens] = useState([false, false, false]);

    const handleOpenCourse = (index) => {
        const updateOpens = [...opens];
        updateOpens[index] = !updateOpens[index];
        setOpens(updateOpens);
    };
    return (
        <div>
            <div className={clsx(styles.course)}>
                <div className={clsx(styles.courseHeader)} onClick={() => handleOpenCourse(0)}>
                    <div className={clsx(styles.courseTitle)}>
                        <FontAwesomeIcon icon={faGripLines} />
                        <span>Topic 1</span>
                        <Link to="/">
                            <FontAwesomeIcon icon={faPenToSquare} />
                        </Link>
                    </div>
                    <div className={clsx(styles.courseDropdown)}>
                        {opens[0] && <FontAwesomeIcon icon={faAngleUp} />}
                        {!opens[0] && <FontAwesomeIcon icon={faAngleDown} />}
                    </div>
                </div>
                {opens[0] && (
                    <div className={clsx(styles.courseBody)}>
                        <div className={clsx(styles.courseExercise)}>
                            <div className={clsx(styles.courseExerciseIcon)}>
                                <FontAwesomeIcon icon={faSlack} />
                            </div>
                            <div className={clsx(styles.courseExerciseContent)}>
                                <div className={clsx(styles.courseExerciseSubTitle)}>Exercise</div>
                                <Link className={clsx(styles.courseExerciseTitle)}>Two Sum</Link>
                            </div>
                        </div>
                        <div className={clsx(styles.courseExercise)}>
                            <div className={clsx(styles.courseExerciseIcon)}>
                                <FontAwesomeIcon icon={faSlack} />
                            </div>
                            <div className={clsx(styles.courseExerciseContent)}>
                                <div className={clsx(styles.courseExerciseSubTitle)}>Exercise</div>
                                <Link className={clsx(styles.courseExerciseTitle)}>Two Sum</Link>
                            </div>
                        </div>
                        <div className={clsx(styles.courseAddExercise)}>
                            <div className={clsx(styles.courseAddExerciseIcon)}>
                                <FontAwesomeIcon icon={faSquarePlus} />
                            </div>
                            <Link className={clsx(styles.courseAddExerciseTitle)}>Add an new exercise...</Link>
                        </div>
                    </div>
                )}
            </div>
            <div className={clsx(styles.course)}>
                <div className={clsx(styles.courseHeader)} onClick={() => handleOpenCourse(1)}>
                    <div className={clsx(styles.courseTitle)}>
                        <FontAwesomeIcon icon={faGripLines} />
                        <span>Topic 1</span>
                        <Link to="/">
                            <FontAwesomeIcon icon={faPenToSquare} />
                        </Link>
                    </div>
                    <div className={clsx(styles.courseDropdown)}>
                        {opens[1] && <FontAwesomeIcon icon={faAngleUp} />}
                        {!opens[1] && <FontAwesomeIcon icon={faAngleDown} />}
                    </div>
                </div>
                {opens[1] && (
                    <div className={clsx(styles.courseBody)}>
                        <div className={clsx(styles.courseExercise)}>
                            <div className={clsx(styles.courseExerciseIcon)}>
                                <FontAwesomeIcon icon={faSlack} />
                            </div>
                            <div className={clsx(styles.courseExerciseContent)}>
                                <div className={clsx(styles.courseExerciseSubTitle)}>Exercise</div>
                                <Link className={clsx(styles.courseExerciseTitle)}>Two Sum</Link>
                            </div>
                        </div>
                        <div className={clsx(styles.courseExercise)}>
                            <div className={clsx(styles.courseExerciseIcon)}>
                                <FontAwesomeIcon icon={faSlack} />
                            </div>
                            <div className={clsx(styles.courseExerciseContent)}>
                                <div className={clsx(styles.courseExerciseSubTitle)}>Exercise</div>
                                <Link className={clsx(styles.courseExerciseTitle)}>Two Sum</Link>
                            </div>
                        </div>
                        <div className={clsx(styles.courseAddExercise)}>
                            <div className={clsx(styles.courseAddExerciseIcon)}>
                                <FontAwesomeIcon icon={faSquarePlus} />
                            </div>
                            <Link className={clsx(styles.courseAddExerciseTitle)}>Add an new exercise...</Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

const Course = () => {
    return <CourseComponent state="course" mainChild={<MainChild />} />;
};

export default Course;

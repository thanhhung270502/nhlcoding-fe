import { getUsers, loginGoogle } from '~/api/api';
import './courses.scss';
import axios from 'axios';
import clsx from 'clsx';
import styles from './courses.module.scss';
import BreadCrumb from '~/components/Breadcrumb';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllCoursesByMe } from '~/api/courses';
import { getRole } from '~/api/auth';

function Courses() {
    const [role, setRole] = useState('student');
    const [textOfSearch, setTextOfSearch] = useState('');
    const [semesters, setSemesters] = useState([]);
    const [openSemesters, setOpenSemesters] = useState([]);

    const [openClasses, setOpenClasses] = useState([]);

    const handleChangeSearchInput = (event) => {
        setTextOfSearch(event.target.value);
    };

    const handleSubmitSearch = () => {};

    const handleOpenSemester = (index) => {
        const updateOpens = [...openSemesters];
        updateOpens[index] = !updateOpens[index];
        setOpenSemesters(updateOpens);
    };

    const handleOpenClasses = (index) => {
        const updateOpens = [...openClasses];
        updateOpens[index] = !updateOpens[index];
        setOpenClasses(updateOpens);
    };

    useEffect(() => {
        (async () => {
            const fetchRole = await getRole();
            setRole(fetchRole.body.role);
        })();
    }, []);

    useEffect(() => {
        (async () => {
            const getAllcourses = await getAllCoursesByMe();
            setSemesters(getAllcourses.body.courses);

            setOpenSemesters(new Array(100).fill(true));
            setOpenClasses(new Array(100).fill(true));
        })();
    }, []);

    return (
        <div className={clsx(styles.coursesPage)}>
            <div className={clsx(styles.coursesBackground)}></div>
            <div className={clsx('container')}>
                <div className={clsx(styles.coursesBreadcrumb)}>
                    <BreadCrumb items={['Home', 'My courses']} links={['/']} />
                </div>
                <div className={clsx(styles.title)}>MY COURSES</div>
                <div className={clsx(styles.subTitle)}>Courses overview</div>
                <div className={clsx('d-flex', 'align-items-end', 'justify-content-between')}>
                    <div>
                        <div className={clsx(styles.sortBar)}>
                            <div className={clsx(styles.sortBarSearch)}>
                                <div className={clsx(styles.sortBarSearchIcon)}>
                                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                                </div>
                                <div className={clsx(styles.sortBarSearchInput)}>
                                    <input
                                        type="text"
                                        value={textOfSearch}
                                        placeholder="Search by course name..."
                                        className={clsx('form-control', styles.sortBarFormControl)}
                                        onChange={handleChangeSearchInput}
                                        onKeyUp={handleSubmitSearch}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div></div>
                </div>
                {semesters.map((semester, indexSemester) => {
                    return (
                        <div className={clsx(styles.semester)}>
                            <div
                                className={clsx(styles.semesterHeader)}
                                onClick={() => handleOpenSemester(indexSemester)}
                            >
                                <div className={clsx(styles.semesterTitle)}>
                                    SEMESTER {semester['semester_name']} YEAR 2023 - 2024
                                </div>
                                <div className={clsx(styles.semesterDropdown)}>
                                    {openSemesters[indexSemester] && <FontAwesomeIcon icon={faAngleUp} />}
                                    {!openSemesters[indexSemester] && <FontAwesomeIcon icon={faAngleDown} />}
                                </div>
                            </div>
                            {role === 'student' && openSemesters[indexSemester] && (
                                <div className={clsx(styles.semesterBody)}>
                                    {semester['subjects'].map((subject, indexSubject) => {
                                        return (
                                            <div className={clsx(styles.semesterCourse)}>
                                                <Link
                                                    className={clsx(styles.semesterCourseName)}
                                                    to={`./${subject.classes[0].class_id}`}
                                                >
                                                    {subject.subject_name} _ {subject.classes[0].class_name} _{' '}
                                                    {subject.teacher_name}
                                                </Link>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                            {role === 'teacher' && openSemesters[indexSemester] && (
                                <div className={clsx(styles.semesterBody)}>
                                    {semester['subjects'].map((subject, indexSubject) => {
                                        return (
                                            <div className={clsx(styles.semesterCourse)}>
                                                <div
                                                    className={clsx(styles.semesterCourseContainer)}
                                                    onClick={() => handleOpenClasses(indexSubject)}
                                                >
                                                    <Link
                                                        className={clsx(styles.semesterCourseName)}
                                                        to={`./${subject.classes[0].class_id}`}
                                                    >
                                                        {subject.subject_name} _ {subject.teacher_name}
                                                    </Link>

                                                    <div className={clsx(styles.semesterDropdown)}>
                                                        {openClasses[indexSubject] && (
                                                            <FontAwesomeIcon icon={faAngleUp} />
                                                        )}
                                                        {!openClasses[indexSubject] && (
                                                            <FontAwesomeIcon icon={faAngleDown} />
                                                        )}
                                                    </div>
                                                </div>
                                                {openClasses[indexSubject] && (
                                                    <div className={clsx(styles.semesterClasses)}>
                                                        {subject.classes.map((class_, indexClass) => {
                                                            return (
                                                                <Link
                                                                    className={clsx(styles.semesterClass)}
                                                                    to={`./${class_.class_id}`}
                                                                >
                                                                    [{class_.class_name}]
                                                                </Link>
                                                            );
                                                        })}
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Courses;

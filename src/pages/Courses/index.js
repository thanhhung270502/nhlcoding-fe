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

function Courses() {
    const [textOfSearch, setTextOfSearch] = useState('');
    const [opens, setOpens] = useState([]);
    const [courses, setCourses] = useState([]);
    const [keysOfCourses, setKeysOfCourses] = useState([]);

    const handleChangeSearchInput = (event) => {
        setTextOfSearch(event.target.value);
    };

    const handleSubmitSearch = () => {};

    const handleOpenSemester = (index) => {
        const updateOpens = [...opens];
        updateOpens[index] = !updateOpens[index];
        setOpens(updateOpens);
    };

    useEffect(() => {
        (async () => {
            const getAllcourses = await getAllCoursesByMe();
            setCourses(getAllcourses.body.courses);
            setKeysOfCourses(Object.keys(getAllcourses.body.courses));
            let length = Object.keys(getAllcourses.body.courses).length;
            console.log(length);
            setOpens(new Array(length).fill(false));
        })();
    }, []);

    return (
        <div className={clsx(styles.coursesPage)}>
            <div className={clsx(styles.coursesBackground)}></div>
            <div className={clsx('container')}>
                <div className={clsx(styles.coursesBreadcrumb)}>
                    <BreadCrumb items={['Home', 'My courses']} />
                </div>
                <div className={clsx(styles.title)}>MY COURSES</div>
                <div className={clsx(styles.subTitle)}>Courses overview</div>
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
                {keysOfCourses.map((key, index) => {
                    return (
                        <div className={clsx(styles.semester)}>
                            <div className={clsx(styles.semesterHeader)} onClick={() => handleOpenSemester(index)}>
                                <div className={clsx(styles.semesterTitle)}>SEMESTER {key} YEAR 2023 - 2024</div>
                                <div className={clsx(styles.semesterDropdown)}>
                                    {opens[index] && <FontAwesomeIcon icon={faAngleUp} />}
                                    {!opens[index] && <FontAwesomeIcon icon={faAngleDown} />}
                                </div>
                            </div>
                            {opens[index] && (
                                <div className={clsx(styles.semesterBody)}>
                                    {courses[key].map((course, idx) => {
                                        return (
                                            <div className={clsx(styles.semesterCourse)}>
                                                <Link className={clsx(styles.semesterCourseName)} to="../">
                                                    {course.subject_name} _ {course.teacher_name}
                                                </Link>
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

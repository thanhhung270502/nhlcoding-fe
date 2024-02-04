import { getUsers, loginGoogle } from '~/api/api';
import './courses.scss';
import axios from 'axios';
import clsx from 'clsx';
import styles from './courses.module.scss';
import BreadCrumb from '~/components/Breadcrumb';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Courses() {
    const [textOfSearch, setTextOfSearch] = useState('');
    const [opens, setOpens] = useState([false, false, false]);

    const handleChangeSearchInput = (event) => {
        setTextOfSearch(event.target.value);
    };

    const handleSubmitSearch = () => {};

    const handleOpenSemester = (index) => {
        const updateOpens = [...opens];
        updateOpens[index] = !updateOpens[index];
        setOpens(updateOpens);
    };

    return (
        <div className={clsx(styles.coursesPage)}>
            <div className={clsx(styles.coursesBackground)}></div>
            <div className={clsx('container')}>
                <div className={clsx(styles.coursesBreadcrumb)}>
                    <BreadCrumb items={[]} />
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

                <div className={clsx(styles.semester)}>
                    <div className={clsx(styles.semesterHeader)} onClick={() => handleOpenSemester(0)}>
                        <div className={clsx(styles.semesterTitle)}>SEMESTER 1 YEAR 2023 - 2024</div>
                        <div className={clsx(styles.semesterDropdown)}>
                            {opens[0] && <FontAwesomeIcon icon={faAngleUp} />}
                            {!opens[0] && <FontAwesomeIcon icon={faAngleDown} />}
                        </div>
                    </div>
                    {opens[0] && (
                        <div className={clsx(styles.semesterBody)}>
                            <div className={clsx(styles.semesterCourse)}>
                                <Link className={clsx(styles.semesterCourseName)} to="../">
                                    CAPSTONE PROJECT _ TRAN NGOC BAO DUY
                                </Link>
                            </div>
                            <div className={clsx(styles.semesterCourse)}>
                                <Link className={clsx(styles.semesterCourseName)} to="../">
                                    CAPSTONE PROJECT _ TRAN NGOC BAO DUY
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
                <div className={clsx(styles.semester)}>
                    <div className={clsx(styles.semesterHeader)} onClick={() => handleOpenSemester(1)}>
                        <div className={clsx(styles.semesterTitle)}>SEMESTER 1 YEAR 2023 - 2024</div>
                        <div className={clsx(styles.semesterDropdown)}>
                            {opens[1] && <FontAwesomeIcon icon={faAngleUp} />}
                            {!opens[1] && <FontAwesomeIcon icon={faAngleDown} />}
                        </div>
                    </div>
                    {opens[1] && (
                        <div className={clsx(styles.semesterBody)}>
                            <div className={clsx(styles.semesterCourse)}>
                                <Link className={clsx(styles.semesterCourseName)} to="../">
                                    CAPSTONE PROJECT _ TRAN NGOC BAO DUY
                                </Link>
                            </div>
                            <div className={clsx(styles.semesterCourse)}>
                                <Link className={clsx(styles.semesterCourseName)} to="../">
                                    CAPSTONE PROJECT _ TRAN NGOC BAO DUY
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Courses;

import clsx from 'clsx';
import styles from './course.module.scss';
import BreadCrumb from '~/components/Breadcrumb';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp, faGripLines, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';

function CourseComponent({ state, mainChild }) {
    const navigate = useNavigate();
    const [params, setParams] = useSearchParams();

    // const id = typeof params.get()
    const { id } = useParams();

    const [page, setPage] = useState('Course');
    const [pages, setPages] = useState(['Course', 'Participants', 'Grades', 'Setting']);

    const [opens, setOpens] = useState([false, false, false]);
    const handleOpenSemester = (index) => {
        const updateOpens = [...opens];
        updateOpens[index] = !updateOpens[index];
        setOpens(updateOpens);
    };

    return (
        <div className={clsx(styles.coursePage)}>
            <div className={clsx(styles.courseBackground)}></div>
            <div className={clsx('container')}>
                <div className={clsx(styles.courseBreadcrumb)}>
                    <BreadCrumb items={['Home', 'My courses', 'Data Structures and Algorithms']} />
                </div>
                <div className={clsx(styles.title)}>Data Structures and Algorithms</div>
                <div className={clsx(styles.courseNavigation)}>
                    {pages.map((p, index) => {
                        if (p.toLowerCase() === state) {
                            return <Link className={clsx(styles.courseNavItem, styles.courseNavItemActive)}>{p}</Link>;
                        } else {
                            let route = `/courses/` + id + '/' + p.toLowerCase();
                            return (
                                <Link className={clsx(styles.courseNavItem)} to={route}>
                                    {p}
                                </Link>
                            );
                        }
                    })}
                </div>
                <div>{mainChild}</div>
            </div>
        </div>
    );
}

export default CourseComponent;
import clsx from 'clsx';
import styles from './index.module.scss';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';

const BreadCrumb = ({ item }) => {
    return (
        <div className={clsx(styles.breadcrumb)}>
            <Link className={clsx(styles.breadcrumbItem)} to="../">
                Home
            </Link>
            <div className={clsx(styles.breadcrumbDivider)}>
                <FontAwesomeIcon icon={faAngleDoubleRight} />
            </div>
            <div className={clsx(styles.breadcrumbItemActive)}>My courses</div>
        </div>
    );
};
export default BreadCrumb;

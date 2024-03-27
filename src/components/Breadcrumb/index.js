import clsx from 'clsx';
import styles from './index.module.scss';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';

const BreadCrumb = ({ items, links }) => {
    return (
        <div className={clsx(styles.breadcrumb)}>
            {items.map((item, index) => {
                if (index === items.length - 1) return <div className={clsx(styles.breadcrumbItemActive)}>{item}</div>;
                else {
                    return (
                        <div className={clsx(styles.breadcrumb)}>
                            <Link className={clsx(styles.breadcrumbItem)} to={links[index]}>
                                {item}
                            </Link>
                            <div className={clsx(styles.breadcrumbDivider)}>
                                <FontAwesomeIcon icon={faAngleDoubleRight} />
                            </div>
                        </div>
                    );
                }
            })}
        </div>
    );
};
export default BreadCrumb;

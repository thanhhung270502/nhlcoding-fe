import clsx from 'clsx';
import styles from './course.module.scss';
import data from './grades.json';
import { useEffect, useState } from 'react';

const { default: CourseComponent } = require('~/components/Course');

const MainChild = () => {
    const [grades, setGrades] = useState([]);

    const lastAccess = (thoiGianCuoiCung) => {
        var thoiGianHienTai = new Date().getTime();
        var thoiGianCuoiCungDate = new Date(thoiGianCuoiCung);
        var thoiGianCuoiCungMiliGiay = thoiGianCuoiCungDate.getTime();
        var thoiGianDaTruyCap = thoiGianHienTai - thoiGianCuoiCungMiliGiay;

        var thoiGianDaTruyCapGiay = thoiGianDaTruyCap / 1000;

        if (thoiGianDaTruyCapGiay < 60) {
            return Math.floor(thoiGianDaTruyCapGiay) + ' giây trước';
        } else if (thoiGianDaTruyCapGiay < 3600) {
            return Math.floor(thoiGianDaTruyCapGiay / 60) + ' phút trước';
        } else if (thoiGianDaTruyCapGiay < 86400) {
            return Math.floor(thoiGianDaTruyCapGiay / 3600) + ' giờ trước';
        } else {
            return Math.floor(thoiGianDaTruyCapGiay / 86400) + ' ngày trước';
        }
    };

    const calcPercent = (point, scope) => {
        return (point / scope).toFixed(4) * 100;
    };

    useEffect(() => {
        setGrades(data);
    }, []);

    return (
        <div className={clsx(styles.grades)}>
            <div className={clsx(styles.sortBar)}>
                <button className={clsx(styles.sortBarButton)}>Add</button>
            </div>
            <div className={clsx(styles.gradesTable)}>
                <div className={clsx(styles.gradesHead)}>
                    <div className={clsx(styles.gradesCol4)}>Title</div>
                    <div className={clsx(styles.gradesCol1, 'textCenter')}>Point</div>
                    <div className={clsx(styles.gradesCol1, 'textCenter')}>Scopes</div>
                    <div className={clsx(styles.gradesCol1, 'textCenter')}>Percents</div>
                    <div className={clsx(styles.gradesCol2, 'textCenter')}>Last edit to point</div>
                    <div className={clsx(styles.gradesCol3)}>Setting</div>
                </div>
                <div className={clsx(styles.gradesBody)}>
                    {grades.map((grade, index) => {
                        if (index % 2 === 0) {
                            return (
                                <div className={clsx(styles.gradesBodyContainer)}>
                                    <div className={clsx(styles.gradesCol4, styles.textPrimary)}>{grade.title}</div>
                                    <div className={clsx(styles.gradesCol1, 'textCenter')}>{grade.point}</div>
                                    <div className={clsx(styles.gradesCol1, 'textCenter')}>0 - {grade.scope}</div>
                                    <div className={clsx(styles.gradesCol1, 'textCenter')}>
                                        {calcPercent(grade.point, grade.scope)} %
                                    </div>
                                    <div className={clsx(styles.gradesCol2, 'textCenter')}>
                                        {lastAccess(grade.timeToEdit)}
                                    </div>
                                    <div className={clsx(styles.gradesCol3)}>-</div>
                                </div>
                            );
                        } else {
                            return (
                                <div className={clsx(styles.gradesBodyContainer, styles.gradesOdd)}>
                                    <div className={clsx(styles.gradesCol4, styles.textPrimary)}>{grade.title}</div>
                                    <div className={clsx(styles.gradesCol1, 'textCenter')}>{grade.point}</div>
                                    <div className={clsx(styles.gradesCol1, 'textCenter')}>0 - {grade.scope}</div>
                                    <div className={clsx(styles.gradesCol1, 'textCenter')}>
                                        {calcPercent(grade.point, grade.scope)} %
                                    </div>
                                    <div className={clsx(styles.gradesCol2, 'textCenter')}>
                                        {lastAccess(grade.timeToEdit)}
                                    </div>
                                    <div className={clsx(styles.gradesCol3)}>-</div>
                                </div>
                            );
                        }
                    })}
                </div>
            </div>
        </div>
    );
};

const Grades = () => {
    return <CourseComponent state="grades" mainChild={<MainChild />} />;
};

export default Grades;

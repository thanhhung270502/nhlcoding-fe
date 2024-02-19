import clsx from 'clsx';
import styles from './course.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import ParticipantsTable from '~/components/ParticipantsTable';
import data from './participants.json';

const { default: CourseComponent } = require('~/components/Course');

const MainChild = () => {
    const [textOfSearch, setTextOfSearch] = useState('');
    const [participants, setParticipants] = useState([]);

    const handleChangeSearchInput = (event) => {
        setTextOfSearch(event.target.value);
    };

    const handleSubmitSearch = () => {};

    useEffect(() => {
        setParticipants(data);
    }, []);

    return (
        <div className={clsx(styles.participants)}>
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
                <div className={styles.sortBarAddition}></div>
            </div>
            <div className={clsx(styles.participantsTable)}>
                <div className={clsx(styles.participantsHead)}>
                    <div className={clsx(styles.participantsCol1, 'textCenter')}>ID</div>
                    <div className={clsx(styles.participantsCol5)}>Full Name</div>
                    <div className={clsx(styles.participantsCol1)}>Roles</div>
                    <div className={clsx(styles.participantsCol1)}>Group</div>
                    <div className={clsx(styles.participantsCol3)}>Last access to course</div>
                    <div className={clsx(styles.participantsCol1)}>Setting</div>
                </div>
                <ParticipantsTable participants={participants} page="1" />
            </div>
        </div>
    );
};

const Participants = () => {
    return <CourseComponent state="participants" mainChild={<MainChild />} />;
};

export default Participants;

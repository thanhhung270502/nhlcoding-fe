import clsx from 'clsx';
import styles from './course.module.scss';
import BreadCrumb from '~/components/Breadcrumb';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getProblemById } from '~/api/problems';
import { createSubmissionTracking, getSubjectNameByClassID, getSubmissionTracking } from '~/api/courses';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSlack } from '@fortawesome/free-brands-svg-icons';
import { getSubmissionsByProblemId } from '~/api/submissions';
import { getCurrentTimeFormatted } from '~/utils';

const WaitingField = () => {
    const { id, problem_id, topic_problems_id } = useParams();
    const navigate = useNavigate();

    const [problem, setProblem] = useState({
        id: 0,
        title: '',
        level_id: 0,
        level_name: '',
        description: '',
    });
    const [subjectName, setSubjectName] = useState('');
    const [submissions, setSubmissions] = useState([]);
    const [submissionTrackings, setSubmissionTrackings] = useState([]);

    const handleCreateSubmissionTracking = async () => {
        const response = await createSubmissionTracking({
            topic_problems_id,
            start_time: getCurrentTimeFormatted(),
            date_time: getCurrentTimeFormatted(),
        });
    };

    const handleNavigateToSubmissionTrackings = async () => {
        if (submissionTrackings.length > 0) {
            navigate(
                `/courses/${id}/submissionTrackings/${submissionTrackings[0].id}?problem_id=${problem_id}&topic_problems_id=${topic_problems_id}`,
            );
        } else {
            // Create a new submission trackings
            const response = await createSubmissionTracking({
                topic_problems_id,
                start_time: getCurrentTimeFormatted(),
                date_time: getCurrentTimeFormatted(),
            });
            console.log(response);
            navigate(
                `/courses/${id}/submissionTrackings/${response.body[0].id}?problem_id=${problem_id}&topic_problems_id=${topic_problems_id}`,
            );
        }
    };

    const convertPoint = (point) => {
        // return po
    };

    useEffect(() => {
        async function fetchRelevantName(id, problem_id) {
            const res = await getProblemById(problem_id);
            setProblem(res.body);

            const fetchSubjectName = await getSubjectNameByClassID(id);
            setSubjectName(fetchSubjectName.body.subject_name);

            const fetchSubmissons = await getSubmissionsByProblemId(res.body.id);
            setSubmissions(fetchSubmissons.body);
            console.log(fetchSubmissons.body);

            const fetchSubmissonTrackings = await getSubmissionTracking(topic_problems_id);
            setSubmissionTrackings(fetchSubmissonTrackings.body);
            console.log(fetchSubmissonTrackings.body);
        }

        fetchRelevantName(id, problem_id);
    }, [id, problem_id, topic_problems_id]);

    return (
        <div className={clsx(styles.waitingField)}>
            <div className={clsx('container')}>
                <div className={clsx(styles.innerContainer)}>
                    <BreadCrumb
                        items={['Home', 'My courses', subjectName, problem.title]}
                        links={['/', '/courses', `/courses/${id}/course`]}
                    />
                    <div className={clsx(styles.header)}>
                        <div className={clsx(styles.headerIcon)}>
                            <FontAwesomeIcon icon={faSlack} />
                        </div>
                        <div className={clsx(styles.headerContent)}>
                            <div className={clsx(styles.headerSubTitle)}>Exercise</div>
                            <div className={clsx(styles.headerTitle)}>{problem.title}</div>
                        </div>
                    </div>
                    <div className="pb-4">
                        {submissionTrackings.length > 0 ? (
                            <div
                                className={clsx(styles.buttonCustom, styles.buttonSubmit)}
                                onClick={handleNavigateToSubmissionTrackings}
                            >
                                CONTINUE TO DO
                            </div>
                        ) : (
                            <div
                                className={clsx(styles.buttonCustom, styles.buttonSubmit)}
                                onClick={handleNavigateToSubmissionTrackings}
                            >
                                START DOING IT
                            </div>
                        )}
                    </div>
                    <div className={clsx(styles.informationTimer)}>
                        Time limit: <span>2 hours</span>
                    </div>
                    <div className={clsx(styles.informationTimer)}>
                        Scoring method: <span>Last submission</span>
                    </div>
                    <div className={clsx(styles.submissionsField)}>
                        <div className={clsx(styles.submissionsHeader)}>
                            <div className={clsx('col-1')}>Order</div>
                            <div className={clsx('col-5')}>Status</div>
                            <div className={clsx('col-2')}>Language</div>
                            <div className={clsx('col-2', 'textCenter')}>Point / 10.00</div>
                            <div className={clsx('col-2', 'textCenter')}>Setting</div>
                        </div>
                        <div className={clsx(styles.submissionsBody)}>
                            {submissions.map((submission, indexOfSubmission) => {
                                return (
                                    <div className={clsx(styles.submissionsRow)}>
                                        <div className={clsx('col-1')}>{indexOfSubmission}</div>
                                        <div className={clsx('col-5')}>
                                            <div>{submission['status'] === 'Solved' ? 'Completed' : 'Attempted'}</div>
                                        </div>
                                        <div className={clsx('col-2')}>
                                            <div className={clsx(styles.language)}>{submission['name']}</div>
                                        </div>
                                        <div className={clsx('col-2', 'textCenter')}>
                                            {submission['score'].toFixed(2)}
                                        </div>
                                        <div className={clsx('col-2', 'textCenter')}>-</div>
                                    </div>
                                );
                            })}
                            {submissionTrackings.length > 0 && (
                                <div className={clsx(styles.submissionsRow)}>
                                    <div className={clsx('col-1')}>0</div>
                                    <div className={clsx('col-5')}>In progressing...</div>
                                    <div className={clsx('col-2')}>-</div>
                                    <div className={clsx('col-1')}>-</div>
                                    <div className={clsx('col-1')}>-</div>
                                    <div className={clsx('col-2')}>-</div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WaitingField;

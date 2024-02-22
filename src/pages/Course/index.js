import { Navigate, useParams } from 'react-router-dom';

const CourseRedirect = () => {
    const { id } = useParams();
    return <Navigate to={`/courses/${id}/course`} replace />;
};

export default CourseRedirect;

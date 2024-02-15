import { Navigate } from 'react-router-dom';

const CourseRedirect = () => {
    return <Navigate to="/courses/2/course" replace />;
};

export default CourseRedirect;

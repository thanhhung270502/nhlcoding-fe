const { default: CourseComponent } = require('~/components/Course');

const Grades = () => {
    return <CourseComponent state="grades" mainChild={<div>Grades</div>} />;
};

export default Grades;

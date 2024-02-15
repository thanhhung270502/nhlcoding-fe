const { default: CourseComponent } = require('~/components/Course');

const Setting = () => {
    return <CourseComponent state="setting" mainChild={<div>Setting</div>} />;
};

export default Setting;

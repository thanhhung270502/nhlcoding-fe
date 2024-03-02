// Layouts
import {
    ContributeCodes,
    ContributeInstruction,
    ContributeQuestion,
    ContributeReason,
    ContributeSuccess,
    ContributeTestcases,
} from '~/components/Contribute';
import { OnlyHeader } from '~/components/Layout';

// Pages
import { Home, NotFound, Problem, Problems, Test } from '~/pages';
import ContributeRedirect from '~/pages/Contribute';
import CourseRedirect from '~/pages/Course';
import AddExercise from '~/pages/Course/AddExercise';
import Course from '~/pages/Course/Course';
import Grades from '~/pages/Course/Grades';
import Participants from '~/pages/Course/Participants';
import Setting from '~/pages/Course/Setting';
import Courses from '~/pages/Courses';

// Không cần đăng nhập vẫn vào được
const publicRoutes = [
    // http://localhost:4000
    {
        path: '/',
        component: Home,
    },
    // http://localhost:4000/problems
    {
        path: '/problems',
        component: Problems,
    },
    // http://localhost:4000/problems/:id
    {
        path: '/problems/:id',
        component: Problem,
        layout: OnlyHeader,
    },
    // http://localhost:4000/test
    {
        path: '/test',
        component: Test,
        layout: OnlyHeader,
    },
    // http://localhost:4000/courses
    {
        path: '/courses',
        component: Courses,
    },
    // http://localhost:4000/courses/:id
    {
        path: '/courses/:id',
        component: CourseRedirect,
    },
    // http://localhost:4000/courses/:id/course
    {
        path: '/courses/:id/course/add-new-exercise',
        component: AddExercise,
    },
    // http://localhost:4000/courses/:id/course
    {
        path: '/courses/:id/course',
        component: Course,
    },
    // http://localhost:4000/courses/:id/participants
    {
        path: '/courses/:id/participants',
        component: Participants,
    },
    // http://localhost:4000/courses/:id/grades
    {
        path: '/courses/:id/grades',
        component: Grades,
    },
    // http://localhost:4000/courses/:id/setting
    {
        path: '/courses/:id/setting',
        component: Setting,
    },
    {
        path: '/contribute/reason',
        component: ContributeReason,
        layout: OnlyHeader,
    },
    {
        path: '/contribute/question',
        component: ContributeQuestion,
        layout: OnlyHeader,
    },
    {
        path: '/contribute/instruction',
        component: ContributeInstruction,
        layout: OnlyHeader,
    },
    {
        path: '/contribute/codes',
        component: ContributeCodes,
        layout: OnlyHeader,
    },
    {
        path: '/contribute/testcases',
        component: ContributeTestcases,
        layout: OnlyHeader,
    },
    {
        path: '/contribute/success',
        component: ContributeSuccess,
    },
    {
        path: '/contribute',
        component: ContributeRedirect,
    },
    {
        path: '*',
        component: NotFound,
    },
];

// Sau khi đăng nhập với vào được
const privateRoutes = [];

export { privateRoutes, publicRoutes };

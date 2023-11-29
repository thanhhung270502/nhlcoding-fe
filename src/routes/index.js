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

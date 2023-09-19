// Layouts
import {
    ContributeQuestion,
    ContributeReason,
    ContributeSolutions,
    ContributeTestcases,
} from '~/components/Contribute';
import { OnlyHeader } from '~/components/Layout';

// Pages
import { Home, NotFound, Problem, Test } from '~/pages';

// Không cần đăng nhập vẫn vào được
const publicRoutes = [
    // http://localhost:3000
    {
        path: '/',
        component: Home,
    },
    // http://localhost:3000/problem
    {
        path: '/problem',
        component: Problem,
        layout: OnlyHeader,
    },
    // http://localhost:3000/test
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
        path: '/contribute/solutions',
        component: ContributeSolutions,
        layout: OnlyHeader,
    },
    {
        path: '/contribute/testcases',
        component: ContributeTestcases,
        layout: OnlyHeader,
    },
    {
        path: '*',
        component: NotFound,
        layout: OnlyHeader,
    },
];

// Sau khi đăng nhập với vào được
const privateRoutes = [];

export { privateRoutes, publicRoutes };

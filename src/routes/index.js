// Layouts
import { Contribute } from '~/components/Contribute';
import { OnlyHeader } from '~/components/Layout';

// Pages
import { Home, Problem, Problems, Test } from '~/pages';

// Không cần đăng nhập vẫn vào được
const publicRoutes = [
    // http://localhost:3000
    {
        path: '/',
        component: Home,
    },
    // http://localhost:3000/problems
    {
        path: '/problems',
        component: Problems,
        layout: OnlyHeader,
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
        path: '/contribute',
        component: Contribute,
    },
];

// Sau khi đăng nhập với vào được
const privateRoutes = [];

export { publicRoutes, privateRoutes };

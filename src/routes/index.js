// Layouts
import { OnlyHeader } from '~/components/Layout';

// Pages
import Home from '~/pages/Home';
import Problems from '~/pages/Problems';
import Problem from '~/pages/Problems/Problem';
import Solution from '~/pages/Problems/Problem/solutions';
import TestSplit from '~/pages/Problems/TestSplit';
// import Product_Index from '~/pages/Product_Index';
import Test from '~/pages/Test';
import Upload from '~/pages/Upload';

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
    // http://localhost:3000/test
    {
        path: '/testSplit',
        component: TestSplit,
        layout: OnlyHeader,
    },
    // http://localhost:3000/upload
    {
        path: '/upload',
        component: Upload,
        layout: null,
    },
];

// Sau khi đăng nhập với vào được
const privateRoutes = [];

export { publicRoutes, privateRoutes };

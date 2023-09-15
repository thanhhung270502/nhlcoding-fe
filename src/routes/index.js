// Layouts
import { OnlyHeader } from '~/components/Layout';

// Pages
import { Home, Login, Problem, Signup, Test, Upload } from '~/pages';

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
        path: '/upload',
        component: Upload,
    },
    {
        path: '/account/login',
        component: Login,
    },
    {
        path: '/account/signup',
        component: Signup,
    },
];

// Sau khi đăng nhập với vào được
const privateRoutes = [];

export { publicRoutes, privateRoutes };

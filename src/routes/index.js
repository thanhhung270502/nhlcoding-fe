// Layouts
import { OnlyHeader } from '~/components/Layout';
import { Home, Login, Test, Upload } from '~/pages';

// Không cần đăng nhập vẫn vào được
const publicRoutes = [
    // http://localhost:3000
    {
        path: '/',
        component: Home,
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
        layout: null,
    },
    {
        path: '/login',
        component: Login,
    },
];

// Sau khi đăng nhập với vào được
const privateRoutes = [];

export { publicRoutes, privateRoutes };

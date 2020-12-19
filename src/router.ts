import createRouter, { Route } from 'router5';
import browserPlugin from 'router5-plugin-browser';

const routes: Route[] = [
    {
        name: 'home',
        path: '/'
    },
    {
        name: 'projects',
        path: '/projects'
    },
];

export const router = (() => {
    const router = createRouter(routes);

    router.usePlugin(browserPlugin());

    router.setOption('defaultRoute', 'home');

    return router;
})();
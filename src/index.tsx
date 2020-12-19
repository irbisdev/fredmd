import React from 'react';
import 'reflect-metadata';
import { render } from 'react-dom';
import { RouterProvider } from 'react-router5';

import { App } from './App';
import { router } from './router';

router.start(() =>
    render(
        // @ts-ignore
        <RouterProvider router={router}>
            <App />
        </RouterProvider>,
        document.getElementById('app')
    )
);
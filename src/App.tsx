import React from 'react';
import { useRouteNode } from 'react-router5';

export const App = React.memo(() => {
    const { route } = useRouteNode('');

    return (
        <div>App: {route.name}</div>
    );
});

App.displayName = 'App';

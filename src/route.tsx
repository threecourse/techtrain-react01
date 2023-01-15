import React, {createContext, ReactNode} from 'react';
import {Navigate, Route, Routes, useParams} from 'react-router-dom';
import {PageCreateThread} from "./pages/PageCreateThread";
import {PageThread} from "./pages/PageThread";
import {PageTop} from "./pages/PageTop";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useAppRouteParams = () => {
    const x = useParams<'thread_id'>();

    return {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        threadId: x.thread_id!,
    };
};

const routesObject: {
    [key: string]: { path: string; element: ReactNode };
} = {
    top: {
        path: '/',
        element: <PageTop/>,
    },
    createThread: {
        path: '/create-thread',
        element: <PageCreateThread/>,
    },
    thread: {
        path: '/thread/:thread_id',
        element: <PageThread/>,
    },
};

const route = Object.entries(routesObject).map(
    ([routeId, {path, element}]) => ({
        routeIdCtxValue: {routeId},
        path,
        element,
    })
);

const routeIdCtx = createContext({routeId: ''});

export const AppLayout: React.FC<{ children: ReactNode }> = ({children}) => {
    return <div style={{height: "100%"}}>{children}</div>;
};

export const AppRoutes: React.FC = () => {
    return (
            <Routes>
                <Route path="*" element={<Navigate to="/" replace={true}/>}/>
                {route.map(({routeIdCtxValue, path, element}) => {
                    return (
                        <Route
                            key={path}
                            path={path}
                            element={
                                <routeIdCtx.Provider value={routeIdCtxValue}>
                                    <AppLayout>{element}</AppLayout>
                                </routeIdCtx.Provider>
                            }
                        />
                    );
                })}
            </Routes>
    );
};

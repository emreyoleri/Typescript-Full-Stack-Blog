import React from 'react';
import { Route, Routes } from 'react-router-dom';
import routes from './config/routes';

export interface IApplicationProps {}

const Application: React.FC<IApplicationProps> = (props) => {
    return (
        <Routes>
            {routes.map((route, index) => {
                return <Route key={index} path={route.path} element={<route.component />} />;
            })}
        </Routes>
    );
};

export default Application;

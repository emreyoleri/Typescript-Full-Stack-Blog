import React from 'react';

export default interface IRoute {
    path: string;
    name: string;
    exact: boolean;
    auth: boolean;
    component: React.FC;
    props?: any;
}

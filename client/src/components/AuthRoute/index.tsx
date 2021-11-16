import React, { useContext } from 'react';
import { Navigate } from 'react-router';
import logging from '../../config/logging';
import UserContext from '../../contexts/user';

export interface IAuthRouteProps {}

const AuthRoute: React.FC<IAuthRouteProps> = (props) => {
    const { children } = props;

    const { user } = useContext(UserContext).userState;

    if (user._id === '') {
        logging.info('Unathorized, redirecting ...');
        return <Navigate to="login" />;
    } else {
        return <>{children}</>;
    }
};

export default AuthRoute;

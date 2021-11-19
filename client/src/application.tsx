import React, { useEffect, useReducer, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import AuthRoute from './components/AuthRoute';
import LoadingComponent from './components/LoadingComponent';
import logging from './config/logging';
import routes from './config/routes';
import { initialUserState, UserContextProvider, userReducer } from './contexts/user';
import { Validate } from './modules/auth';

export interface IApplicationProps {}

const Application: React.FC<IApplicationProps> = (props) => {
    const [userState, userDispatch] = useReducer(userReducer, initialUserState);
    const [loading, setLoading] = useState<boolean>(true);

    /* Used for Debugging */
    const [authStage, setAuthStage] = useState<string>('Chechking localstorage ....');

    useEffect(() => {
        CheckLocalStorageForCredentials();

        setInterval(() => {
            CheckLocalStorageForCredentials();
        }, 20000);
    }, []);

    /*
     **Check to see if we have a token
     *If we do, verify it with the backend
     *If not, we are logged out initialy
     */
    const CheckLocalStorageForCredentials = () => {
        setAuthStage('Checking credentials ...');

        const token = localStorage.getItem('fire_token');
        const fire_token = token ? JSON.parse(token) : null;

        if (fire_token === null) {
            userDispatch({ type: 'logout', payload: initialUserState });
            setAuthStage('No credentials found.');
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        } else {
            return Validate(fire_token, (error, user) => {
                if (error) {
                    logging.error(error);
                    setAuthStage('User not valid, logging out ...');
                    userDispatch({ type: 'logout', payload: initialUserState });
                    setTimeout(() => {
                        setLoading(false);
                    }, 1000);
                } else if (user) {
                    setAuthStage('User authenticated.');
                    userDispatch({ type: 'login', payload: { user, fire_token } });
                    setTimeout(() => {
                        setLoading(false);
                    }, 1000);
                }
            });
        }
    };

    const userContextValues = {
        userState,
        userDispatch
    };

    if (loading) {
        return <LoadingComponent>{authStage}</LoadingComponent>;
    }

    return (
        <UserContextProvider value={userContextValues}>
            <Routes>
                {routes.map((route, index) => {
                    if (route.auth) {
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <AuthRoute>
                                        <route.component />
                                    </AuthRoute>
                                }
                            />
                        );
                    }

                    return <Route key={index} path={route.path} element={<route.component />} />;
                })}
            </Routes>
        </UserContextProvider>
    );
};

export default Application;

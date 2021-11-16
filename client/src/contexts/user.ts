import React, { createContext } from 'react';
import IUser, { DEFAULT_FIRE_TOKEN, DEFAULT_USER } from '../interfaces/user';

export interface IUserState {
    user: IUser;
    fire_token: string;
}

export interface IUserActions {
    type: 'login' | 'logout';
    payload: IUserState;
}

export const initialUserState: IUserState = {
    user: DEFAULT_USER,
    fire_token: DEFAULT_FIRE_TOKEN
};

export const userReducer = (state: IUserState, action: IUserActions) => {
    let user = action.payload.user;
    let fire_token = action.payload.fire_token;

    switch (action.type) {
        case 'login':
            localStorage.setItem('fireToken', JSON.stringify(fire_token));
            return { user, fire_token };
        case 'logout':
            localStorage.removeItem('fireToken');
            return initialUserState;

        default:
            return state;
    }
};

export interface IUserContextProps {
    userState: IUserState;
    userDispatch: React.Dispatch<IUserActions>;
}

const UserContext = createContext<IUserContextProps>({
    userState: initialUserState,
    userDispatch: () => {}
});

export const UserContextConsumer = UserContext.Consumer;
export const UserContextProvider = UserContext.Provider;

export default UserContext;

import React, { createContext, useReducer } from 'react'

export const UserContext = createContext();

const initialState = {
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
    isLoggedIn: localStorage.getItem('access_token') ? true : false,
    access_token: localStorage.getItem('access_token') ? JSON.parse(localStorage.getItem('access_token')) : null
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            localStorage.setItem('user', JSON.stringify(action.payload.user));
            localStorage.setItem('access_token', JSON.stringify(action.payload.access_token));
            return {
                ...state,
                user: action.payload.user,
                isLoggedIn: true,
                access_token: action.payload.access_token
            }
        case 'LOGOUT':
            localStorage.removeItem('user');
            localStorage.removeItem('access_token');
            return {
                ...state,
                user: null,
                isLoggedIn: false,
                access_token: null
            }
        default:
            return state
    }
}

function UserProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <UserContext.Provider value={{ state, dispatch }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider
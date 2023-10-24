import React from 'react'
import { RouterProvider } from 'react-router-dom'
import router from './router'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserProvider from './contexts/UserProvider'
import { Provider } from 'react-redux'
import store from './store'

function App() {
    return (
        <>
            <Provider store={store}>
                <UserProvider>
                    <RouterProvider router={router} />
                    <ToastContainer />
                </UserProvider>
            </Provider>
        </>
    )
}

// context => store

// redux => store => slice

export default App
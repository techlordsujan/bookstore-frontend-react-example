import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from './Button'
import useAuth from '../hooks/useAuth';

import { useSelector } from 'react-redux';

function Navbar() {
    const navigate = useNavigate();

    const [search, setSearch] = useState("");
    const {auth, dispatch} = useAuth();

    const cartItems = useSelector(state => state.cart.cart);

    function logout() {
        dispatch({ type: 'LOGOUT' })
        navigate('/login');
    }

    function handleSearch(e) {
        e.preventDefault();
        navigate(`/?q=${search}`)
    }
    return (
        <nav class="navbar bg-body-tertiary">
            <div class="container-fluid">
                <Link class="navbar-brand" to="/">BookStore - {auth?.user?.name ?? "Guest"} {auth?.user?.role}</Link>

                {
                    auth?.isLoggedIn ?
                        (<ul class="nav">
                            <li class="nav-item">
                                <Link class="nav-link" href="/">Home</Link>
                            </li>

                            {auth?.user?.role == 'admin' && (
                                <>
                                    <li class="nav-item">
                                        <Link class="nav-link" to="/admin/category/create">Add Category</Link>
                                    </li>
                                    <li class="nav-item">
                                        <Link class="nav-link" to="/admin/category">View Category</Link>
                                    </li>
                                    <li class="nav-item">
                                        <Link class="nav-link" to="/admin/book/create">Add Book</Link>
                                    </li>
                                    <li class="nav-item">
                                        <Link class="nav-link" to="/admin/book">View Book</Link>
                                    </li>
                                </>
                            )}

                            {auth?.user?.role == 'guest' && (
                                <>
                                    <li class="nav-item">
                                        <Link class="nav-link" to="/cart">My Cart ({cartItems?.length ?? 0})</Link>
                                    </li>
                                </>
                            )}


                        </ul>)
                        :
                        (<form class="d-flex" role="search" onSubmit={handleSearch}>
                            <input value={search} onChange={(e) => { setSearch(e.target.value) }} class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button class="btn btn-outline-success" type="submit">Search</button>
                        </form>)
                }

                <div>
                    {
                        auth?.isLoggedIn ?
                            (<Button type="button" handleClick={logout} label="Logout" variant="danger" />)
                            :
                            (<Link class="btn btn-outline-success" type="submit" to="/login">Login</Link>)
                    }
                </div>
            </div>
        </nav>
    )
}

export default Navbar
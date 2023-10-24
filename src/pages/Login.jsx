import React, { useContext, useState } from 'react'
import Input from '../components/Input'
import Button from '../components/Button'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { UserContext } from '../contexts/UserProvider';

function Login() {
    const navigate = useNavigate();
    const { dispatch } = useContext(UserContext);

    const [data, setData] = useState({
        email: '',
        password: ''
    });

    function handleChange(e) {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:5000/api/v1/auth/login', data);
            console.log(response.data.data);

            dispatch({
                type: 'LOGIN',
                payload: {
                    user: response.data.data.user,
                    access_token: response.data.data.access_token
                }
            });

            toast.success('User logged in successfully');

            if(response.data.data.user.role == 'guest')
                navigate('/cart')
            else
                navigate('/admin/book');
        } catch (err) {
            toast.error(err.message);
        }
    }

    return (
        <div class="container">
            <div class="d-flex justify-content-center align-items-center" style={{ "height": "90vh" }}>
                <div class="row w-100 justify-content-center">
                    <div class="col-6 p-5 shadow">
                        <form onSubmit={handleSubmit}>
                            <h1 className="text-center">Login</h1>
                            <Input
                                type="email"
                                label="Email Address"
                                id="email"
                                placeholder="Enter email address"
                                name="email"
                                onChange={handleChange}
                                value={data.email}
                            />

                            <Input
                                type="password"
                                label="Password"
                                id="password"
                                placeholder="Enter password"
                                name="password"
                                onChange={handleChange}
                                value={data.password}
                            />

                            <Button
                                type="submit"
                                label="Login"
                                variant="success"
                            />

                            <Button
                                type="button"
                                label="Register"
                                variant="secondary"
                                handleClick={() => navigate('/register')}
                            />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
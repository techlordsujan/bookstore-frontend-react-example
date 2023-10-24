import React, { useState } from 'react'
import Input from '../components/Input'
import Button from '../components/Button'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

function Register() {
    const navigate = useNavigate();
    const [data, setData] = useState({
        name: '',
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
        try{
            await axios.post('http://127.0.0.1:5000/api/v1/auth/register', data);
            toast.success('User registered successfully');
            navigate('/login');
        }catch(err)
        {
            toast.error(err.message);
        }
    }

    return (
        <div class="container">
            <div class="d-flex justify-content-center align-items-center" style={{ "height": "90vh" }}>
                <div class="row w-100 justify-content-center">
                    <div class="col-6 p-5 shadow">
                        <form onSubmit={handleSubmit}>
                            <h1 className="text-center">Register</h1>
                            <Input
                                type="text"
                                label="Fullname"
                                id="name"
                                placeholder="Enter your fullname"
                                name="name"
                                onChange={handleChange}
                                value={data.name}
                            />

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
                                label="Register"
                                variant="success"
                            />

                            <Button
                                type="button"
                                label="Login"
                                variant="primary"
                                handleClick={() => navigate('/login')}
                            />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register
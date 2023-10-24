import React, { useState } from 'react'
import Input from '../../components/Input'
import Button from '../../components/Button'
import Select from '../../components/Select'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useAuth from '../../hooks/useAuth';

function Create() {
    const navigate = useNavigate();
    const {auth} = useAuth();
    async function handleSubmit(e) {
        e.preventDefault();

        try{
            await axios.post('http://127.0.0.1:5000/api/v1/categories', data, {
                headers: {
                    Authorization: `Bearer ${auth.access_token}`
                }
            });
            toast.success('Category added successfully');
            navigate('/admin/category');
        }catch(e){
            toast.error('Error adding category');
        }
    }

    const [data, setData] = useState({
        name: "",
        status: "active"
    });

    function handleChange(e){
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value
        })
    }

    return (
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-12 mt-3">
                    <h3 class="text-center">Add Category</h3>
                    <form onSubmit={handleSubmit}>
                        <Input
                            type="text"
                            label="Name"
                            id="name"
                            placeholder="Enter category name"
                            name="name"
                            onChange={handleChange}
                            value={data.name}
                        />

                        <Select
                            name="status"
                            label="Status"
                            options={[
                                { label: 'Active', value: 'active' },
                                { label: 'Inactive', value: 'inactive' },
                            ]}
                            onChange={handleChange}
                            value={data.status}
                        />

                        <Button type="submit" label="Add" variant="success" />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Create
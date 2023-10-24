import React, { useEffect, useState } from 'react'
import Input from '../../components/Input'
import Button from '../../components/Button'
import Select from '../../components/Select'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

function Edit() {
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        getCategoryById();
    }, []);

    async function getCategoryById(){
        try{
            const response = await axios.get(`http://127.0.0.1:5000/api/v1/categories/${id}`);
            const { name, status } = response.data.data;
            setName(name);
            setStatus(status);
        }catch(err){
            alert('Error fetching category');
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try{
            await axios.put(`http://127.0.0.1:5000/api/v1/categories/${id}`, {
                name, status
            });
            toast.success('Category updated successfully');
            navigate('/admin/category');
        }catch(e){
            toast.error('Error adding category');
        }
    }

    const [name, setName] = useState("");
    const [status, setStatus] = useState("active");

    return (
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-12 mt-3">
                    <h3 class="text-center">Edit Category</h3>
                    <form onSubmit={handleSubmit}>
                        <Input
                            type="text"
                            label="Name"
                            id="name"
                            placeholder="Enter category name"
                            name="name"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                        />

                        <Select
                            label="Status"
                            options={[
                                { label: 'Active', value: 'active' },
                                { label: 'Inactive', value: 'inactive' },
                            ]}
                            onChange={(e) => setStatus(e.target.value)}
                            value={status}
                        />

                        <Button type="submit" label="Update" variant="primary" />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Edit;
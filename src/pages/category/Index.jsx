import React, { useContext, useEffect, useState } from 'react'
import Button from '../../components/Button'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';

import { UserContext } from '../../contexts/UserProvider';
import { getCategories } from '../../api/request.api';

// mount useEffect(() => {}, [])
// update useEffect(() => {})
// update specific useEffect(() => {}, [state])

// unmout  // useEffect(() => { return () => {} })

function Index() {
    const navigate = useNavigate();
    const { state: auth } = useContext(UserContext);
    async function getAllCategories() {
        try {
            const response = await getCategories();
            setCategories(response.data.data);
        } catch (err) {
            console.log(err.message);
        }
    }

    async function deleteCategory(id){
        try{
            await axios.delete(`http://127.0.0.1:5000/api/v1/categories/${id}`);
            getAllCategories();
            toast.success('Category deleted successfully');
        }catch(err)
        {
            alert('Error deleting category');
        }
    }

    useEffect(() => {
        getAllCategories();
    }, []);

    const [categories, setCategories] = useState([]);

    return (
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-12 mt-3">
                    <h3 class="text-center">All Categories</h3>
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">S.N</th>
                                <th scope="col">Name</th>
                                <th scope="col">Status</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                categories.map((category, index) => (
                                    <tr>
                                        <th scope="row">{index + 1}</th>
                                        <td>{category.name}</td>
                                        <td>{category.status}</td>
                                        <td>
                                            <Button type="button" label="Edit" variant="info"
                                                handleClick={() => navigate(`/admin/category/${category._id}/edit`)}
                                            />
                                            <Button
                                                type="button"
                                                label="Delete"
                                                variant="danger"
                                                handleClick={() => deleteCategory(category._id)}
                                            />
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Index
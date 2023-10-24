import React, { useContext, useEffect, useState } from 'react'
import Input from '../../components/Input'
import Button from '../../components/Button'
import Select from '../../components/Select'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UserContext } from '../../contexts/UserProvider';
import { getCategories } from '../../api/request.api';

function Create() {
    const navigate = useNavigate();
    const {state:auth} = useContext(UserContext);
    async function handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData();
        
        for(let key in data){
            formData.append(key, data[key]);
        }

        try{
            await axios.post('http://127.0.0.1:5000/api/v1/books', formData);
            toast.success('Book added successfully');
            navigate('/admin/book');
        }catch(e){
            toast.error('Error adding book');
        }
    }

    const [data, setData] = useState({
        title: "",
        category: "",
        isbn: "",
        quantity: 1,
        image: "",
        price: 0,
    });

    function handleChange(e){
        let { name, value, type } = e.target;

        if(type === 'file')
            value = e.target.files[0];

        setData({
            ...data,
            [name]: value
        })
    }

    const [categories, setCategories] = useState([]);

    async function getAllCategories() {
        try {
            const response = await getCategories();
            setCategories(response.data.data.map(c => ({ label: c.name, value: c._id })));
            setData({...data, category: response.data.data[0]._id});
        } catch (err) {
            console.log(err.message);
        }
    }

    useEffect(() => {
        getAllCategories();
    }, [])

    return (
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-12 mt-3">
                    <h3 class="text-center">Add Book</h3>
                    <form onSubmit={handleSubmit}>
                        <Input
                            type="text"
                            label="Book Title"
                            id="title"
                            placeholder="Enter book title"
                            name="title"
                            onChange={handleChange}
                            value={data.title}
                        />

                        <Input
                            type="text"
                            label="Book ISBN"
                            id="isbn"
                            placeholder="Enter book isbn"
                            name="isbn"
                            onChange={handleChange}
                            value={data.isbn}
                        />

                        <Input
                            type="text"
                            label="Book quantity"
                            id="quantity"
                            placeholder="Enter book quantity"
                            name="quantity"
                            onChange={handleChange}
                            value={data.quantity}
                        />

                        <Input
                            type="text"
                            label="Book price"
                            id="price"
                            placeholder="Enter book price"
                            name="price"
                            onChange={handleChange}
                            value={data.price}
                        />

                        <Select
                            name="category"
                            label="Category"
                            options={categories}
                            onChange={handleChange}
                            value={data.category}
                        />

                        <Input
                            type="file"
                            label="Book image"
                            id="image"
                            name="image"
                            onChange={handleChange}
                        />

                        <Button type="submit" label="Add" variant="success" />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Create
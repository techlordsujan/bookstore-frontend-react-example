import React, { useEffect, useState } from 'react'
import Button from '../../components/Button'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';

import { UserContext } from '../../contexts/UserProvider';
import { deleteBook, getBooks } from '../../api/request.api';

function Index() {
    const navigate = useNavigate();
    async function getAllBooks() {
        try {
            const response = await getBooks();
            setBooks(response.data.data);
        } catch (err) {
            toast.error(err.message);
        }
    }

    async function handleDeleteBook(id){
        try{
            await deleteBook(id);
            getAllBooks();
            toast.success('Book deleted successfully');
        }catch(err)
        {
            alert('Error deleting Book');
        }
    }

    useEffect(() => {
        getAllBooks();
    }, []);

    const [books, setBooks] = useState([]);

    return (
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-12 mt-3">
                    <h3 class="text-center">All Books</h3>
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">S.N</th>
                                <th scope="col">Name</th>
                                <th scope="col">Price</th>
                                <th scope="col">Image</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                books.map((book, index) => (
                                    <tr>
                                        <th scope="row">{index + 1}</th>
                                        <td>{book.title}</td>
                                        <td>Rs. {book.price}</td>
                                        <td><img src={`http://127.0.0.1:5000/${book.image}`} width={"50"} /></td>
                                        <td>
                                            <Button type="button" label="Edit" variant="info"
                                                handleClick={() => navigate(`/admin/book/${book._id}/edit`)}
                                            />
                                            <Button
                                                type="button"
                                                label="Delete"
                                                variant="danger"
                                                handleClick={() => handleDeleteBook(book._id)}
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
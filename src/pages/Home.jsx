import React, {useState, useEffect} from 'react'
import Card from '../components/Card'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSearchParams } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

function Home() {
    const [search, setSearch] = useSearchParams();
    
    async function getAllBooks() {
        try {
            let url = `http://127.0.0.1:5000/api/v1/auth/book`;
            if(search.get('q'))
                url += `?q=${search.get('q')}`;

            const response = await axios.get(url);
            setBooks(response.data.data);
        } catch (err) {
            toast.error(err.message);
        }
    }

    useEffect(() => {
        getAllBooks();
    }, [search]);

    const [books, setBooks] = useState([]);

    return (
        <div className="container">
            <h1 className="text-center mt-3">Our Books</h1>
            <div className="row my-3" data-masonry='{"percentPosition": true }'>
                
                {
                    books.map((book, index) => (
                        <div className="col-3 my-3">
                        <Card
                            src={`http://127.0.0.1:5000/${book.image}`}
                            alt="Book 1"
                            name={book.title}
                            price={`Rs. ${book.price}`}
                            isbn={book.isbn}
                            id={book._id}
                        />
                    </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Home
import React from 'react'
import Button from './Button'
import useAuth from '../hooks/useAuth'
import axios from 'axios'
import { toast } from 'react-toastify';

function Card(props) {
    const {auth} = useAuth();
    
    async function addToCart(id) {
        try {
            await axios.post(`http://127.0.0.1:5000/api/v1/cart/add`, { book: id }, {
                headers: {
                    Authorization: `Bearer ${auth.access_token}`
                }
            });
            toast.success('Book added to cart successfully');
        } catch (e) {
            console.log(e.message)
        }
    }

    return (
        <div className="card">
            <img src={props.src} className="card-img-top" alt={props.alt} />
            <div className="card-body">
                <p className="card-text"><h3>{props.name}</h3></p>
                <p className="card-text">Price: {props.price} | ISBN: {props.isbn}</p>
                {auth?.user?.role == 'guest' &&
                    (<div className='text-center'>
                        <Button type="button" variant="success" label="Add To Cart" handleClick={() => addToCart(props.id)} />
                    </div>)
                }
            </div>
        </div>
    )
}

export default Card
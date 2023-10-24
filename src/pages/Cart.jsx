import React, { useEffect, useState } from 'react'
import Button from '../components/Button'
import useAuth from '../hooks/useAuth';
import axios from 'axios';
import { addItemToCart, getCartItem, removeItemFromCart } from '../api/request.api';
import { useDispatch, useSelector } from 'react-redux';
import { UPDATE_CART } from '../store/slices/slice.cart';

function Cart() {
    const { auth } = useAuth();
    const dispatch = useDispatch();

    const cartItems = useSelector(state => state.cart.cart);

    // const [cartItems, setCartItems] = useState([]);

    async function getCartItems() {
        try {
            const response = await getCartItem();
            dispatch(UPDATE_CART(response.data.data?.items));
            // setCartItems(response.data.data?.items);
        } catch (e) {
            console.log(e.message);
        }
    }

    async function addToCart(id) {
        try {
            await addItemToCart(id);
            getCartItems();
        } catch (e) {
            console.log(e.message)
        }
    }

    async function removeFromCart(id) {
        try {
            await removeItemFromCart(id);
            getCartItems();
        } catch (e) {
            console.log(e.message)
        }
    }

    useEffect(() => {
        getCartItems();
    }, [])

    return (
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-12 mt-3">
                    <h3 class="text-center">Cart Items</h3>
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">S.N</th>
                                <th scope="col">Name</th>
                                <th scope="col">Price</th>
                                <th scope="col">Image</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Total</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                cartItems.map((items, index) => (
                                    <tr>
                                        <th scope="row">{index+1}</th>
                                        <td>{items?.book?.title}</td>
                                        <td>Rs. {items?.book?.price}</td>
                                        <td><img src={`http://127.0.0.1:5000/${items?.book?.image}`} alt="" width={50} /></td>
                                        <td>{ items?.quantity}</td>
                                        <td>Rs. {items?.quantity * items?.book?.price}</td>
                                        <td>
                                            <Button 
                                                type="button"
                                                label=" - "
                                                variant="danger"
                                                handleClick={() => removeFromCart(items?.book?._id)}
                                            />
                                            <Button
                                                type="button"
                                                label=" + "
                                                variant="success"
                                                handleClick={() => addToCart(items?.book?._id)}
                                            />
                                        </td>
                                    </tr>
                                )

                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Cart
import http from "./http.api";

export function getCategories(){
    return http.get('/categories');
}

export function getBooks(){
    return http.get('/books');
}

export function deleteBook(id){
    return http.delete(`/books/${id}`);
}

export function getCartItem(){
    return http.get('/cart');
}

export function addItemToCart(book){
    return http.post('/cart/add', {book});
}

export function removeItemFromCart(book){
    return http.post('/cart/remove', {book});
}
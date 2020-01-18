import React from 'react';
import BookListContainer from '../Book-list/Book-list';
import ShoppingCartTable from '../Shopping-cart-table/Shopping-cart-table';

const HomePage = () => {
    return (
        <div>
            <BookListContainer />
            <ShoppingCartTable />
        </div>
    );
};

export default HomePage;
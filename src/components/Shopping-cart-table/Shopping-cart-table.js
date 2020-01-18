import React from 'react';
import { connect } from 'react-redux';
import {//147 работа кнопок в корзине
    bookAddedToCart,
    bookRemovedFromCart,
    allBooksRemovedFromCart } from '../../actions';
import './Shopping-cart-table.css';

const ShoppingCartTable = ({ items, total, onIncrease, onDecrease, onDelete }) => {
    const renderRow = (item, idx) => {
        const { id, title, count, total } = item;
        return (
            <tr key={id}>
                <td>{idx + 1}</td>
                <td>{title}</td>
                <td>{count}</td>
                <td>${total}</td>
                <td>
                    <button
                        onClick={() => onDelete(id)}
                        className="btn btn-outline-danger btn-sm float-right">
                        <i className="fa fa-trash-o" />
                    </button>
                    <button
                        onClick={() => onIncrease(id)}
                        className="btn btn-outline-success btn-sm float-right">
                        <i className="fa fa-plus-circle" />
                    </button>
                    <button
                        onClick={() => onDecrease(id)}
                        className="btn btn-outline-warning btn-sm float-right">
                        <i className="fa fa-minus-circle" />
                    </button>
                </td>
            </tr>
        );
    };

    return (
        <div className="shopping-cart-table">
            <h2>Your Order</h2>
            <table className="table">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Item</th>
                    <th>Count</th>
                    <th>Price</th>
                    <th>Action</th>
                </tr>
                </thead>

                <tbody>
                { items.map(renderRow) }
                </tbody>
            </table>

            <div className="total">
                Total: ${total}
            </div>
        </div>
    );
};

// const mapStateToProps = ({ cartItems, orderTotal }) => {//до148(разбитие редьюсера на 2, а стейта на 2 обьекта)
    const mapStateToProps = ({ shoppingCart: { cartItems, orderTotal }}) => {//148 (разбитие редьюсера на 2, а стейта на 2 обьекта)
    return {
        items: cartItems,
        total: orderTotal
    };
};

const mapDispatchToProps = {//147 код с bind когда передается обьект
    onIncrease: bookAddedToCart,
        onDecrease: bookRemovedFromCart,
        onDelete: allBooksRemovedFromCart
};

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCartTable);
import React, { Component } from 'react';
import BookListItem from '../Book-list-item/Book-list-item';
import { connect } from 'react-redux'; //чтоб подключить компонент к редакс-стору

import withBookstoreService from '../hocs/with-bookstore-service';//с помощью контекста получает данные с сервиса
// import { booksLoaded, booksRequested, booksError } from '../../actions';// 136to142 actionCreator
import {fetchBooks, bookAddedToCart} from "../../actions";//goodsSchemaChosenForEditing,
import compose from '../../utils';

import './Book-list.css';
import Spinner from "../Spinner/Spinner";
import ErrorIndicator from "../Error-indicator/Error-indicator";

class BookListContainer extends Component {//143 занимается поведением.Можно вынести в папку containers
    componentDidMount() {
        this.props.fetchBooks();//141
        // ! 1. receive data с сервиса как компонент отрисовался
        // const { bookstoreService, booksLoaded, booksRequested, booksError } = this.props;//до141(вынесения логики из компонента в mapDispatchToProps) получили данные сервиса с HOC-а withBookstoreService
        // const data = bookstoreService.getBooks();//до 138 без асинхронных запросов
        // bookstoreService.getBooks()//138 до141с асинхронными запросами в сервисе
        //     .then((data) => booksLoaded(data))
        //     .catch((err) => booksError(err));
            // ! 2. dispacth(передать данные с помощью) action to store с помощью actionCreator booksLoaded
        // this.props.booksLoaded(data);//до 138 без асинхронных запросов
    }
    // ! 3. рендерится после запроса с сервиса а потом вызванного action полученные со стора данные
    render() {
        const {books, loading, error, onAddedToCart} = this.props;
        if (loading) {
            return <Spinner/>;
        }
        if (error) {
            return <ErrorIndicator/>;
        }
        return <BookList books={books} onAddedToCart={onAddedToCart}/>;
    }}
const BookList = ({ books, onAddedToCart}) => {//143 занимается отображением
    return (
        <ul className="book-list">
            {
                books.map((book) => {
                    return (
                        <li key={book.id}>
                            <BookListItem
                                book={book}
                                onAddedToCart={() => onAddedToCart(book.id)}
                            />
                        </li>
                    );
                })
            }
        </ul>
    );
};

// const mapStateToProps = ({ books, loading, error }) => { //до148(разбитие редьюсера на 2, а стейта на 2 обьекта). какие свойства стейта из стора нужны для этого компонента
const mapStateToProps = ({ bookList: { books, loading, error }}) => {//148 (разбитие редьюсера на 2, а стейта на 2 обьекта)
        return { books, loading, error };
};

// const mapDispatchToProps = { //136до141так єто обьект,пишем в стор с помощью екшена.Полный вариант с actionCreator и с bindActionCreators
    const mapDispatchToProps = (dispatch, ownProps) => {//141 так єто ф-я
    // booksLoaded,// до141= dispatch в который передается обьект который создал action
    // booksRequested,
    // booksError
        const {bookstoreService} = ownProps;//141то что пришло с withBookstoreService(верхних компонентов-HOCs) в connect
    return {
        fetchBooks: fetchBooks(bookstoreService, dispatch),//142 вынесениe fetchBooks в actons. так запускается ф-я не action без thunk(151)
        onAddedToCart: (id) => dispatch(bookAddedToCart(id))//145 связывание eventListener в list-item со стором без bind(тут так меньше кода).так запускается ф-я action
        // fetchBooks: () =>{//141до142(до вынесения fetchBooks в actions)
        //     dispatch(booksRequested());
        //     bookstoreService.getBooks()
        //         .then((data) => dispatch(booksLoaded(data)))
        //         .catch((err) => dispatch(booksError(err)));
        // }
    };
};
// mapDispatchToProps может быть ф-ей или обьектом.Если это обьект то он пеедается в bindActionCreators
// const mapDispatchToProps = (dispatch) => { //136 вариант написания с actionCreator booksLoaded но без bindActionCreators
//     return {
//         booksLoaded: (newBooks) => {//ключ-это то что присваивается в props компоненту : значение-это ф-я которая вызывается
//             dispatch(booksLoaded(newBooks));
//         }
//     }
// };
// const mapDispatchToProps = (dispatch) => { //136 вариант написания без actionCreator and bindActionCreators
//     return {
//         booksLoaded: (newBooks) => {//ключ-это то что присваивается в props компоненту : значение-это ф-я которая вызывается
//             dispatch({
//                 type: 'BOOKS_LOADED',
//                 payload: newBooks
//             })
//         }
//     }
// };

export default compose(
    withBookstoreService(),
    connect(mapStateToProps, mapDispatchToProps)
)(BookListContainer);
// export default withBookstoreService()(
// connect(mapStateToProps, mapDispatchToProps)(BookList)); 136 без compose.BookList обернут в
// HOC withBookstoreService котрый подключается к стору с помощью connect.mapStateToProps - это какие
//данные хотим получить в компонент с стора.mapDispatchToProps -это какие действия захочет выполнить
//компонент и передать в стор
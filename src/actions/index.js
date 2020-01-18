const booksRequested = () => {
    return {
        type: 'FETCH_BOOKS_REQUEST'//получаем данные.Если б надо было обновить данные тогда UPDATE_BOOKS_REQUEST
        //ТИПЗАПРОСА_ОБЬЕКТ_ДЕЙСТВИЕ всегда будет 3 при запросе (REQUEST, SUCCESS,FAILURE)
    }
};

const booksLoaded = (newBooks) => {
    return {
        type: 'FETCH_BOOKS_SUCCESS',
        payload: newBooks // данные которые передаются в стор
    };
};

const booksError = (error) => {
    return {
        type: 'FETCH_BOOKS_FAILURE',
        payload: error
    };
};

// export {//till 142
//     booksLoaded,
//     booksRequested,
//     booksError
// };
export const bookAddedToCart = (bookId) => {
    return {
        type: 'BOOK_ADDED_TO_CART',
        payload: bookId
    };
};
export const bookRemovedFromCart = (bookId) => {
    return {
        type: 'BOOK_REMOVED_FROM_CART',
        payload: bookId
    };
};

export const allBooksRemovedFromCart = (bookId) => {
    return {
        type: 'ALL_BOOKS_REMOVED_FROM_CART',
        payload: bookId
    };
};
const fetchBooks = (bookstoreService, dispatch) => () => {//142внешняя ф-я (bookstoreService, dispatch) предназначена для компонента, вн-я () для mapDispatchToProps
    dispatch(booksRequested());
    bookstoreService.getBooks()
        .then((data) => dispatch(booksLoaded(data)))
        .catch((err) => dispatch(booksError(err)));
};
// const fetchBook = (id, bookstoreService, dispatch) => () => {//пример запроса 1 книги
//     dispatch({type: 'FETCH_BOOK_REQUEST'});
//     bookstoreService.getBook(id)
//         .then((data) => dispatch({type: 'FETCH_BOOK_SUCCESS', data}))
//         .catch((err) => dispatch({type: 'FETCH_BOOK_FAILURE', err}));
// };
export {//142
    fetchBooks
};
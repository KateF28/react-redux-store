import updateBookList from './book-list';//148 разбиваем reducer на книги и корзину
import updateShoppingCart from './shopping-cart';

const reducer = (state, action) => {
    return {//148разбиваем редьюсер на 2 обьекта
        bookList: updateBookList(state, action),//148свой обьект bookList в стейте теперь появился в списках книг
        shoppingCart: updateShoppingCart(state, action)//148свой обьект shoppingCart в стейте теперь появился у корзины
    };
};

export default reducer;

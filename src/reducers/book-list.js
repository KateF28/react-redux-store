// const initialState = {//до148 где разбиваем reducer на книги и корзину
//     books: [],
//     loading: true,
//     error: null,
//     cartItems: [],
//     orderTotal: 0
// };
const updateBookList = (state, action) => {//148 разбиваем reducer на книги и корзину
    if (state === undefined) {
        return {//148свой обьект bookList в стейте теперь появился в списка книг
            books: [],
            loading: true,
            error: null
        };
    }

// const updateCartItems = (cartItems, item, idx) => {//146обновление массива корзины//до148 где разбиваем reducer на книги и корзину на файлы
//     if (item.count === 0) {//147если в корзине удалили книгу включительно последнюю
//         return [
//             ...cartItems.slice(0, idx),
//             ...cartItems.slice(idx + 1)
//         ];
//     }
//     if (idx === -1) {//книги с таким id не было в корзине
//         return [
//             ...cartItems,
//             item//добавляем элемент в конец масива
//         ];
//     }
//     return [//146 книга с таким id была в корзине, обновляем массив корзины
//         ...cartItems.slice(0, idx),//берем элементы(книги до индекса выбранной книги (с конкретным id)
//         item,//добавляем новый элемент(книгу)
//         ...cartItems.slice(idx + 1)//берем элементы(книги) после индекса выбранной книги (с конкретным id)до конца массива
//     ];
// };
//
// const updateCartItem = (book, item = {}, quantity) => {//146 если книга undefined то она будет просто пустым обьектом,//147quantity появился//до148 где разбиваем reducer на книги и корзину на файлы
//     // ={} нужно обязательно если дальше значения по умолчанию свойствам будут присваиватся
//     const {//146 делаем вид что 1 книга в корзине существует всегда
//         id = book.id,//146 если id нет то ему дается значение по умолчанию
//         count = 0,
//         title = book.title,
//         total = 0 } = item;//146 делаем вид что 1 книга в корзине существует всегда
//     return {
//         id,
//         title,
//         // count: count + 1,//до147до отнимания и удаления книг с корзины
//         count: count + quantity,//147 с отниманием и удалением книг с корзины
//         // total: total + book.price//до147до отнимания и удаления книг с корзины
//         total: total + quantity*book.price//147 с отниманием и удалением книг с корзины
//     };
// };
// const updateOrder = (state, bookId, quantity) => {//до148 где разбиваем reducer на книги и корзину на файлы
//     const { books, cartItems } = state;
//     const book = books.find(({id}) => id === bookId);
//     const itemIndex = cartItems.findIndex(({id}) => id === bookId);
//     const item = cartItems[itemIndex];
//
//     const newItem = updateCartItem(book, item, quantity);
//     return {
//         ...state,
//         cartItems: updateCartItems(cartItems, newItem, itemIndex)
//     };
// };

// const reducer = (state = initialState, action) => {//до148 где разбиваем reducer на книги и корзину
    switch (action.type) {
        case 'FETCH_BOOKS_REQUEST': //для свойства loading
            return {
                // ...state,//до148 где разбиваем reducer на книги и корзину
                books: [],//всегда нужно передавать ВСЕ свойства стейта, reducer должен возвращать whole state
                loading: true,
                error: null
                    // ...state//или так если свойства все не меняется. После можно изменяемое свойство добавить тоесть ,updatedProp: newValue
            };
        case 'FETCH_BOOKS_SUCCESS': //для получения коллекции книг, reducer получает действие например BOOKS_LOADED
            return {
                // ...state,//до148 где разбиваем reducer на книги и корзину
                books: action.payload, //обновляем список книг в стор
                loading: false,
                error: null
            };
        case 'FETCH_BOOKS_FAILURE':
            return {
                // ...state,//до148 где разбиваем reducer на книги и корзину
                books: [],
                loading: false,
                error: action.payload
            };
        // case 'BOOK_ADDED_TO_CART'://до148 где разбиваем reducer на книги и корзину на файлы
            // const bookId = action.payload;//до147вынесения логики кейса отдельно в updateOrder
            // const book = state.books.find((bok) => bok.id === bookId);//ищем в массиве книг книгу с нужным id. до147вынесения логики кейса отдельно в updateOrder
            // const itemIndex = state.cartItems.findIndex(({id}) => id === bookId);//146 ищем индекс книги в массиве.Если не существует то вернет -1. до147вынесения логики кейса отдельно в updateOrder
            // const item = state.cartItems[itemIndex];//ищим саму книгу.Если itemIndex -1 то item будет undefined. до147вынесения логики кейса отдельно в updateOrder
            // const newItem = {//до 146 (обновления списка книг cart)
            //     id: book.id,
            //     title: book.title,
            //     count: 1,
            //     total: book.price
            // };
            // const newItem = updateCartItem(book, item);//до147вынесения логики кейса отдельно в updateOrder
//state.cartItems.push(newItem);так нельзя в реакт/редакс, нельзя переписывать существующий стейт
//             return {//до 146 (обновления списка книг cart)
//                 ...state,
//                 cartItems: [
//                     ...state.cartItems,// 145все элементы стейта.cartItems+newItem
//                     newItem
//                 ]
//             };
//             return {//до147вынесения логики кейса отдельно в updateOrder
//                 ...state,
//                 cartItems: updateCartItems(state.cartItems, newItem, itemIndex)
//             };
//             return updateOrder(state, action.payload, 1);//147вынесение логики кейса отдельно в updateOrder//до148 где разбиваем reducer на книги и корзину на файлы
//         case 'BOOK_REMOVED_FROM_CART'://до148 где разбиваем reducer на книги и корзину на файлы
//             return updateOrder(state, action.payload, -1);//147добавляем -1 кнтгу то есть отнимаем 1
//
//         case 'ALL_BOOKS_REMOVED_FROM_CART'://до148 где разбиваем reducer на книги и корзину на файлы
//             const item = state.cartItems.find(({id}) => id === action.payload);
//             return updateOrder(state, action.payload, -item.count);//147 -item.count обнуляет count, удаляет строку с книгами с конкретным id с корзины
        default:
            // return state;//до148 где разбиваем reducer на книги и корзину на файлы
            return state.bookList;//148
    }
};

// export default reducer;//до148 где разбиваем reducer на книги и корзину на файлы
export default updateBookList;
import { createStore, compose, applyMiddleware } from 'redux';
import reducer from './reducers';

//149В реальных проектах store enchancers заменяют Middleware,logEnchancer и stringEnchancer просто учебный код
//Store enchancer управляет процессом создания store, возвращает новую реализацию createStore
const logEnchancer = (createStore) => (...args) => {//149 enchancer который в пишет action в console.log.В реальных проектах enchancers заменяют Middleware,это просто учебный код
    const store = createStore(...args);
    const originalDispatch = store.dispatch;
    store.dispatch = (action) => {//подменяет оригинальный dispatch
        console.log(action.type);
        return originalDispatch(action);//вызывает оригинальный dispatch
    };
    return store;
};
const stringEnchancer = (createStore) => (...args) => {//149 enchancer который добавляет возможность отправлять в стор не только обьекты а и строки.В реальных проектах enchancers заменяют Middleware,это просто учебный код
    const store = createStore(...args);
    const originalDispatch = store.dispatch;
    store.dispatch = (action) => {//подменяет оригинальный dispatch

        if (typeof action === 'string') {
            return originalDispatch({
                type: action
            });
        }

        return originalDispatch(action);//вызывает оригинальный dispatch
    };
    return store;
};

//150Middleware модифицирует работу dispatch а не работу всего стор как enchancer, вызываются перед reducer.Чтоб он мог принять store как enchancer а не только
//dispatch пишется (store.getState, store.dispatch)=>(next)=>(action). next это dispatch.next потому что на самом деле это указание на dispatch следующего Middleware
//Middleware используется намного чаще в реальных проектах чем enhancers поскольку чаще нужно изменить только dispatch а не весь store
const logMiddleware = ({ getState }) => (next) => (action) => {//=logEnchancer
    console.log(action.type, getState());
    return next(action);
};

const stringMiddleware = () => (next) => (action) => { //=stringEnchancer
    if (typeof action === 'string') {
        return next({
            type: action
        });
    }
    return next(action);
};

// const store = createStore(reducer, compose(//до 150 c enhancers
//     stringEnchancer,
//     logEnchancer));
const store = createStore(reducer, applyMiddleware(//150 c Middleware
    stringMiddleware, logMiddleware));//имеет значение порядок,так как stringMiddleware может принять строку а logMiddleware нет
// const store = createStore(reducer);//до149 до enchancers

export default store;
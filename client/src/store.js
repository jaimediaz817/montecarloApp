import { createStore, applyMiddleware, compose } from 'redux';
// importando Middleware
import thunk from 'redux-thunk';
// importando la raíz de reducers
import rootReducers from './reducers';

const initialState = {};

const middleware = [thunk];





// el primer parámetro es un Reducer
const store = createStore(
    rootReducers,
    initialState,
    compose(
        applyMiddleware(... middleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )    
);

export default store;
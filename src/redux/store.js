import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import movieReducer from './movie/movieReducer';
// import categoryReducer from './category/categoryReducer';

const rootReducer = combineReducers({
    movie: movieReducer,
})

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store ;
import {createStore,applyMiddleware} from 'redux'
import {reducers} from '../reducers'
import {middleware} from '../middlewares'

const middlewares = applyMiddleware(...middleware);
const store = createStore(reducers,middlewares);
export default store;
// import {logger} from './custom.middlewares'
import logger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'

export const middleware = [
    thunkMiddleware,
    logger
];
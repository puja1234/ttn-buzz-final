export var logger = ( store ) => ( next ) => ( action ) => {

    next(action);
}
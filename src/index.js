import React from 'react';
import { render } from 'react-dom'
import App from './FrontEnd/components/App'
import { Provider } from 'react-redux'
import store from './FrontEnd/store'

render(
        <Provider store={store}>
            <App/>
        </Provider>,
        document.getElementById("app")
    );

import React from 'react';
import ReactDOM from 'react-dom';
import {Spin} from 'antd';

import App from './App';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import {store, persistor} from './store';
import {HashRouter} from 'react-router-dom';

ReactDOM.render((
    <Provider store={store}>
        <PersistGate persistor={persistor} loading={<Spin />}>
            <HashRouter>
                <App />
            </HashRouter>
        </PersistGate>
    </Provider>
), document.getElementById('app'));
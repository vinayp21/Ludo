import React from 'react';
import ReactDom from 'react-dom';
import Routes from './routes'
import { Provider } from 'react-redux'
import { store } from './store'


ReactDom.render(<Provider store={store}><Routes /></Provider>, document.getElementById('root'));
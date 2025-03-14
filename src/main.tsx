import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import store from 'store/store'

import App from './App'

import 'normalize.css'


ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'),
)

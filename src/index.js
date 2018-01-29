import React from 'react'
import ReactDom from 'react-dom'
import { Provider } from 'react-redux'
import Store from './store/Store.js'
import App from './components/App'

import 'animate.css'
import './css/main.scss'

ReactDom.render(
	<Provider store={Store}>
   		 <App />
   	 </Provider>,
    document.querySelector("#app")
)
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import FrontPage from './containers/FrontPage'
import registerServiceWorker from './registerServiceWorker'
import './styles/App.css'

ReactDOM.render(<FrontPage />, document.getElementById('root'))
registerServiceWorker()

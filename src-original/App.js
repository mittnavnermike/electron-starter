import React, { Component } from 'react'
import { Switch } from 'react-router'
import { Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import store, { history } from './store'

import FrontPage from './containers/FrontPage'
import AboutPage from './containers/AboutPage'
import UserPage from './containers/UserPage'
import NoMatchPage from './containers/NoMatchPage'

export const routes = [
    {
        name: 'Home',
        path: '/',
        component: FrontPage,
        exact: true,
        show: true
    },
    {
        name: 'About',
        path: '/about',
        component: AboutPage,
        exact: false,
        show: true
    },
    {
        name: 'User',
        path: '/users/:userId',
        component: UserPage,
        exact: false,
        show: false
    },
    {
        name: '',
        path: '/*',
        component: NoMatchPage,
        exact: false,
        show: false
    }
]

class App extends Component {
    render() {
        return (
            <main className="main">
                <Provider store={store}>
                    <Router history={history}>
                        <div>
                            <Switch>
                                {routes.map(r => (
                                    <Route
                                        key={r.path}
                                        exact
                                        path={r.path}
                                        component={r.component}
                                    />
                                ))}
                            </Switch>
                        </div>
                    </Router>
                </Provider>
            </main>
        )
    }
}

export default App

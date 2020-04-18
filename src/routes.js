import React from 'react'
import Home from './components/home'
import User from './components/User/user'
import { createBrowserHistory } from 'history';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    hashHistory
} from "react-router-dom";

export const history = createBrowserHistory();
const App = () => {
    return <div>Welcome</div>
}

const routes = () => (
    <Router history={history}>
        <Switch>
            {/* <Route exact component={Home} path="/" /> */}
            <Route exact path="/" component={User} />
            <Route exact path="/play" component={Home} />
        </Switch>
    </Router>
)
export default routes;


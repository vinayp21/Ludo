import React from 'react'
import Home from './components/home'
import { createBrowserHistory } from 'history';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    hashHistory
} from "react-router-dom";

const history = createBrowserHistory();
const App = () => {
    return <div>Welcome</div>
}

const routes = () => (
    <Router history={history}>
        <Switch>
            {/* <Route exact component={Home} path="/" /> */}
            <Route exact path="/" component={Home} />
        </Switch>
    </Router>
)
export default routes;


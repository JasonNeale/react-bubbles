import React from "react";
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import PrivateRoute from './privateRoute/PrivateRoute'
import BubblesPage from './components/BubblePage'
import { Container } from 'reactstrap'


import Login from "./components/Login";
import "./styles.scss";

function App() {
    return (
        <Router>
            <Container>
                <div className="App">
                    <Switch>
                        <PrivateRoute path="/bubbles" component={BubblesPage} />
                        <Route exact path="/" component={Login} />

                        <Route path="/logout">
                            {localStorage.removeItem('token')}
                        </Route>
                    </Switch>
                </div>
            </Container>
        </Router>
    );
}

export default App;

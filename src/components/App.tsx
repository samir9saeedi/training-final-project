import Todos from "./Todos";
import Todo from "./Todo";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";

function App() {
    return (
        <Router>
            <div className="p-8">
                <Switch>
                    <Route exact path="/">
                        <Link to="/todos/to-do/month" className="text-blue-700">Todos</Link>
                    </Route>
                    <Route exact path="/todos/:done/:range" component={Todos}/>
                    <Route exact path="/todo/:id?" component={Todo}/>
                </Switch>
            </div>
        </Router>
    );
}

export default App;

import Todos from "./Todos";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
    return (
        <Router>
            <div className="p-8">
                <Switch>
                    <Route exact path="/todos/:done/:range" component={Todos}/>
                </Switch>
            </div>
        </Router>
    );
}

export default App;

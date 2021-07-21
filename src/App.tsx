import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { routes } from "./router/index";
import { Suspense } from "react";
import { Spin } from "antd";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            {routes.map((item) => (
              <li key={item.path}>
                <Link to={item.path}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <Suspense fallback={<Spin></Spin>}>
        <Switch>
          {routes.map((item) => (
            <Route
              key={item.path}
              path={item.path}
              component={item.component}
            />
          ))}
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;

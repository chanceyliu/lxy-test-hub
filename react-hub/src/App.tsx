import { Button } from "antd";
import "./App.css";
import TodoList from "./components/todo-list";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">主页</Link>
            </li>
            <li>
              <Link to="/todo-list">TodoList</Link>
            </li>
            <li>
              <Link to="/test">test</Link>
            </li>
          </ul>
        </nav>
      </div>
    </Router>
    // <ThemeContext.Provider value={{ theme }}>
    //   <TodoList></TodoList>
    //   <Button type="primary" ghost onClick={() => setTheme("改变context值")}>
    //     测试
    //   </Button>
    // </ThemeContext.Provider>
  );
}

export default App;

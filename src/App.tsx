import TodoList from "./components/todolist/TodoList"
import { TodoStore } from "./components/todolist/TodoStore"

const App = () => {
  return (
    <div className="App">
      <TodoList todoStore={TodoStore}/>
    </div>
  )
}

export default App

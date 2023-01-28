import { action, makeObservable, observable } from 'mobx'

interface TodoItem {
  id: number
  title: string
  completed: boolean
}

export class TodoStoreImp {
  todos: TodoItem[] = []

  constructor () {
    makeObservable(this, {
      todos: observable,
      addTodo: action,
      removeTodo: action,
      completedTodo: action
    })
  }

  #getRandomInt (): number {
    const rand = Math.floor(Math.random() * Math.pow(10, 10))
    return rand
  }

  addTodo (title: string): void {
    const item: TodoItem = {
      id: this.#getRandomInt(),
      title,
      completed: false
    }
    this.todos.push(item)
  }

  removeTodo(id: number): void {
    this.todos = this.todos.filter(el => el.id !== id)
  }

  completedTodo(id: number): void {
    const todoIndex = this.todos.findIndex(el => el.id === id)
    if (todoIndex > -1) {
      this.todos[todoIndex].completed =  !this.todos[todoIndex].completed
    }
  }

}

export const TodoStore = new TodoStoreImp()

import { action, makeObservable, observable } from "mobx"

interface TodoItem {
  id: number
  title: string
  completed: boolean 
}

export class TodoStoreImp {
  todos: TodoItem[] = []

  constructor() {
    makeObservable(this,{
      todos: observable,
      addTodo: action
    })
  }
  
  #getRandomInt() {
    const rand = Math.floor( Math.random() * Math.pow(10, 10) )
    return rand
  }

  addTodo(title: string) {
    const item: TodoItem = {
      id: this.#getRandomInt(),
      title, 
      completed: false
    } 
    this.todos.push(item)
  }
}

export const TodoStore = new TodoStoreImp()

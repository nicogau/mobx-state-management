import { Button, List, ListItem, ListItemText, TextField, TextFieldProps } from "@mui/material"
import { observer } from "mobx-react"
import { useCallback, useRef } from "react"
import { TodoStoreImp } from "./TodoStore"

interface TodoListProps {
  todoStore: TodoStoreImp
}

const isString = (content: unknown): content is string => typeof content === 'string'

const TodoList = observer(({todoStore}: TodoListProps) => {

  // type <HTMLInputElement> could also work
  const inputTextRef = useRef<TextFieldProps & {focus: () => void}>(null)
  
  const saveTodo = useCallback(() => {
    const inputValue =  inputTextRef?.current?.value

    if (isString(inputValue)){
      inputValue.trim() != "" &&  todoStore.addTodo(inputValue)
      inputTextRef.current!.value = ""
      inputTextRef.current?.focus()
    }
  },[todoStore])

  const handleClick = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    e.stopPropagation()

    saveTodo() 
  }

  const handleReturnKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    e.preventDefault()
    if(e.key === "Enter"){
      saveTodo()
    }
  }

  return(
    <div>
      <TextField 
        inputRef={inputTextRef}
        variant="outlined" 
        size="small"
        sx= {{paddingX:1 }}
        onKeyUp= { handleReturnKeyPress}
      />
      <Button 
        variant="contained" 
        size="medium"
        onClick={handleClick}
      >
        ajouter
      </Button>
      <List>
        { [...todoStore.todos].reverse().map(el => 
          <ListItem key={el.id}>
            <ListItemText  primary={el.title} />
          </ListItem>
          ) 
        }
      </List>
    </div> 
  )
})

export default TodoList

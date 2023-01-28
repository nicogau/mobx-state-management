import { useCallback, useRef } from 'react'
import { observer } from 'mobx-react'

import { Box, Button, IconButton, List, ListItem, ListItemText, TextField, Typography } from '@mui/material'
import { Delete, DoneOutline } from '@mui/icons-material'

import type { TodoStoreImp } from './TodoStore'
import type { TextFieldProps } from '@mui/material'

interface TodoListProps {
  todoStore: TodoStoreImp
}

const isString = (content: unknown): content is string => typeof content === 'string'

const TodoList = observer(({ todoStore }: TodoListProps) => {
  // type <HTMLInputElement> could also work
  const inputTextRef = useRef<TextFieldProps & { focus: () => void }>(null)

  const saveTodo = useCallback(() => {
    const inputValue = inputTextRef?.current?.value

    if (inputTextRef.current !== null && isString(inputValue)) {
      inputValue.trim() !== '' && todoStore.addTodo(inputValue)

      inputTextRef.current.value = ''
      inputTextRef.current?.focus()
    }
  }, [todoStore])

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    e.preventDefault()
    e.stopPropagation()
    saveTodo()
  }

  const handleReturnKeyPress = (e: React.KeyboardEvent<HTMLDivElement>): void => {
    e.preventDefault()

    if (e.key === 'Enter') {
      saveTodo()
    }
  }

  const handleRemoveTodo = (id: number) => (_e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    todoStore.removeTodo(id)
  }

  const handleClickCompleted = (id: number) => (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    todoStore.completedTodo(id)
  }


  return (
    <div>
      <Box sx={{marginTop:2, marginBottom:8}}>
        <Typography component={"h1"} variant={"h3"} align="center" >Todo list</Typography>
      </Box>
      <TextField
        inputRef={inputTextRef}
        variant="outlined"
        size="small"
        sx= {{ paddingX: 1 }}
        autoFocus
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
        <ListItem 
          key={el.id}
          secondaryAction= {
            <IconButton 
              edge="end"
              onClick={handleRemoveTodo(el.id)}
            >
              <Delete color="warning"/> 
            </IconButton>
          }
        >
          <IconButton
            onClick={handleClickCompleted(el.id)}
          >
            <DoneOutline color={el.completed ? "success" : "disabled"} />
          </IconButton>
          <ListItemText primary={el.title} sx={{paddingX: 2}}/>
        </ListItem>
        )
        }
      </List>
    </div>
  )
})

export default TodoList

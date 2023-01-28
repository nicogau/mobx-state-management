import { Box, Container, styled } from '@mui/material'
import TodoList from './components/todolist/TodoList'
import { TodoStore } from './components/todolist/TodoStore'

const FlexBox = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: center;
`

const App = (): JSX.Element => {
  return (
    <Container className="App">
          <FlexBox sx={{marginY: 5, marginX: 2}}>
            <TodoList todoStore={TodoStore}/>
          </FlexBox>
    </Container>
  )
}
export default App

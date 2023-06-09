import TodoList from './components/TodoList';
import { Container, Typography } from '@mui/material';

function App() {
  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', paddingTop: '32px' }}>
      <Typography fontSize={'48px'} align="center" paddingBottom={'32px'}>
        Todo List
      </Typography>
      <TodoList />
    </Container>
  );
}

export default App;

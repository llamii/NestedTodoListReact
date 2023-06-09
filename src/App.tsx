import { ThemeProvider } from '@mui/material/styles';

import { Container } from '@mui/material';
import TodoList from './components/TodoList';
import theme from './styles/theme';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Container sx={{ paddingTop: '100px' }}>
        <TodoList />
      </Container>
    </ThemeProvider>
  );
};

export default App;

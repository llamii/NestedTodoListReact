import React from 'react';
import { observer } from 'mobx-react-lite';
import { Box, Checkbox, Grid, Fab, Typography, Container } from '@mui/material';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem, { TreeItemProps } from '@mui/lab/TreeItem';
import Todo from '../types/Todo';
import TodoStore from '../store/TodoStore';
import { CustomTree } from './CustomTree';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateTodoModal from './CreateTodoModal';
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';
import { styled } from '@mui/system';

const todoStore = new TodoStore();

const TodoList = observer(function TodoList() {
  const { todos, openModal, currentTodo } = todoStore;

  const handleAddTodo = () => {
    todoStore.currentTodo = null;
    todoStore.openModal = true;
  };

  const handleAddSubTodo = () => {
    todoStore.openModal = true;
  };

  const handleModalClose = () => {
    todoStore.openModal = false;
  };

  const handleSaveTodo = (newTodoName: string, newTodoText: string, parentId: string | null) => {
    todoStore.addTodo(newTodoName, newTodoText, parentId);
  };

  const handleDeleteCompletedTodos = () => {
    todoStore.deleteCompletedTodos();
  };

  const handleCheckboxClick = (e: React.MouseEvent<HTMLButtonElement>, todoId: string) => {
    e.stopPropagation();
    todoStore.toggleTodoCompleted(todoId);
  };

  const CustomTreeItem = (props: TreeItemProps) => (
    <TreeItem ContentComponent={CustomTree} {...props} />
  );

  const renderTree = (todos: Todo[]) =>
    todos.map((todo) => (
      <CustomTreeItem
        key={todo.id}
        nodeId={todo.id}
        label={
          <StyledTodo onClick={() => (todoStore.currentTodo = todo)}>
            <StyledTodoSpan isCompleted={todo.completed}>{todo.name}</StyledTodoSpan>
            <Checkbox onClick={(e) => handleCheckboxClick(e, todo.id)} checked={todo.completed} />
          </StyledTodo>
        }>
        {Array.isArray(todo.children) ? renderTree(todo.children) : null}
      </CustomTreeItem>
    ));

  return (
    <Container maxWidth="lg">
      <StyledBox>
        <StyledGrid container>
          <StyledLeftContainer item xs={12} sm={4}>
            <Box p={2}>
              <StyledTreeView
                aria-label="rich object"
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpanded={['root']}
                defaultExpandIcon={<ChevronRightIcon />}>
                {renderTree(todos)}
              </StyledTreeView>
            </Box>
            <StyledControlButtons>
              <StyledFab color="primary" size="small" aria-label="add" onClick={handleAddTodo}>
                <AddIcon fontSize="small" />
              </StyledFab>
              <StyledFab
                color="error"
                size="small"
                aria-label="add"
                onClick={handleDeleteCompletedTodos}>
                <DeleteIcon fontSize="small" />
              </StyledFab>
              <StyledFab color="secondary" size="small" aria-label="add" onClick={handleAddSubTodo}>
                <SubdirectoryArrowRightIcon fontSize="small" />
              </StyledFab>
            </StyledControlButtons>
            <CreateTodoModal
              open={openModal}
              onClose={handleModalClose}
              onSave={handleSaveTodo}
              parentId={currentTodo?.id || null}
            />
          </StyledLeftContainer>
          <Grid item xs={12} sm={8}>
            <StyledRightContainerBox p={2}>
              <Typography variant="h5" component="h2" gutterBottom fontSize={'32px'}>
                {currentTodo?.name}
              </Typography>

              <Box height="100%">
                <p>{currentTodo?.text}</p>
              </Box>
            </StyledRightContainerBox>
          </Grid>
        </StyledGrid>
      </StyledBox>
    </Container>
  );
});

const StyledBox = styled(Box)`
  display: flex;
  justify-content: center;
  height: auto;
`;

const StyledGrid = styled(Grid)`
  display: flex;
  align-items: stretch;
`;

const StyledLeftContainer = styled(Grid)`
  overflow-y: hidden;
  background-color: #ffffff;
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const StyledTreeView = styled(TreeView)`
  height: auto;
  flex-grow: 1;
  max-width: 400;
  overflow: hidden;
  margin-right: '10px';
`;

const StyledControlButtons = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;

const StyledFab = styled(Fab)`
  box-shadow: none;
`;

const StyledRightContainerBox = styled(Box)`
  background-color: #dce0e1;
  height: 70vh;
  overflow-wrap: break-word;
`;

const StyledTodo = styled('div')`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 10px;
`;

const StyledTodoSpan = styled('span')<{
  isCompleted: boolean;
}>(({ isCompleted }) => ({
  textDecoration: `${isCompleted ? 'line-through ' : ''}`,
}));

export default TodoList;

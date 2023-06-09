import React from 'react';
import { observer } from 'mobx-react-lite';
import { Box, Checkbox, Grid, Fab, Button, Typography } from '@mui/material';
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
          <div
            onClick={() => (todoStore.currentTodo = todo)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingRight: '10px',
            }}>
            <span style={{ textDecoration: todo.completed ? 'line-through ' : '' }}>
              {todo.name}
            </span>
            <Checkbox onClick={(e) => handleCheckboxClick(e, todo.id)} checked={todo.completed} />
          </div>
        }>
        {Array.isArray(todo.children) ? renderTree(todo.children) : null}
      </CustomTreeItem>
    ));

  return (
    <Box display="flex" justifyContent="center" height="auto">
      <Grid container sx={{ display: 'flex', alignItems: 'stretch' }}>
        <Grid
          item
          xs={4}
          sx={{
            overflowY: 'hidden',
            backgroundColor: '#FFFFFF',
            paddingBottom: '20px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}>
          <Box p={2}>
            <TreeView
              aria-label="rich object"
              defaultCollapseIcon={<ExpandMoreIcon />}
              defaultExpanded={['root']}
              defaultExpandIcon={<ChevronRightIcon />}
              sx={{
                height: 'auto',
                flexGrow: 1,
                maxWidth: 400,
                overflow: 'hidden',
                marginRight: '10px',
              }}>
              {renderTree(todos)}
            </TreeView>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
            <Fab color="primary" size="small" aria-label="add" onClick={handleAddTodo}>
              <AddIcon fontSize="small" />
            </Fab>
            <Fab color="error" size="small" aria-label="add" onClick={handleDeleteCompletedTodos}>
              <DeleteIcon fontSize="small" />
            </Fab>
            <Button
              variant="outlined"
              disabled={!currentTodo}
              sx={{ textTransform: 'none' }}
              onClick={handleAddSubTodo}>
              Добавить подзадачу
            </Button>
          </Box>
          <CreateTodoModal
            open={openModal}
            onClose={handleModalClose}
            onSave={handleSaveTodo}
            parentId={currentTodo?.id || null}
          />
        </Grid>
        <Grid item xs={8}>
          <Box
            p={2}
            sx={{
              backgroundColor: '#DCE0E1',
              height: '70vh',
              overflowWrap: 'break-word',
            }}>
            <Typography variant="h5" component="h2" gutterBottom fontSize={'32px'}>
              {currentTodo?.name}
            </Typography>

            <Box height="100%">
              <p>{currentTodo?.text}</p>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
});

export default TodoList;

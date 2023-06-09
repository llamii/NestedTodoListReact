// AddTodoModal.tsx
import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from '@mui/material';

type CreateTodoModalProps = {
  open: boolean;
  onClose: () => void;
  onSave: (name: string, text: string, parentId: string | null) => void;
  parentId: string | null;
};

const CreateTodoModal: React.FC<CreateTodoModalProps> = ({ open, onClose, onSave, parentId }) => {
  const [newTodoName, setNewTodoName] = useState('');
  const [newTodoText, setNewTodoText] = useState('');

  const handleSaveTodo = () => {
    if (newTodoName && newTodoText) {
      onSave(newTodoName, newTodoText, parentId);
      setNewTodoName('');
      setNewTodoText('');
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Добавить задачу</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Название"
          fullWidth
          value={newTodoName}
          onChange={(e) => setNewTodoName(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Текст"
          fullWidth
          multiline
          rows={4}
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Отмена</Button>
        <Button onClick={handleSaveTodo} color="primary">
          Сохранить
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateTodoModal;

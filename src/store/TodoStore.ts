import { action, computed, makeObservable, observable } from 'mobx';

import Todo from '../types/Todo';
import { defaultData } from '../mock/defaultData';

export default class TodoStore {
  todos: Todo[] = defaultData;
  openModal = false;
  currentTodo: Todo | null = null;

  constructor() {
    makeObservable(this, {
      todos: observable,
      openModal: observable,
      currentTodo: observable,
      completedTodos: computed,
      addTodo: action,
      deleteCompletedTodos: action,
      toggleTodoCompleted: action,
      updateLocalStorage: action,
      generateUniqueId: action,
      deleteCompleted: action,
      toggleChildrenCompletion: action,
      updateParentCompletion: action,
      setCurrentTodo: action,
    });

    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      this.todos = JSON.parse(storedTodos);
    }
  }

  get completedTodos(): Todo[] {
    return this.getCompletedTodos(this.todos);
  }

  updateLocalStorage() {
    const todosJson = JSON.stringify(this.todos);
    localStorage.setItem('todos', todosJson);
  }

  getCompletedTodos(todos: Todo[]): Todo[] {
    return todos.reduce((completed: Todo[], todo: Todo) => {
      if (todo.completed) {
        completed.push(todo);
      }
      if (Array.isArray(todo.children)) {
        completed.push(...this.getCompletedTodos(todo.children));
      }
      return completed;
    }, []);
  }

  addTodo(newTodoName: string, newTodoText: string, parentId: string | null) {
    const newTodo: Todo = {
      id: this.generateUniqueId(),
      name: newTodoName,
      text: newTodoText,
      completed: false,
      children: [],
    };

    if (parentId) {
      const parentTodo = this.findTodoById(this.todos, parentId);
      if (parentTodo) {
        parentTodo.children?.push(newTodo);
        this.updateParentCompletion(parentTodo);
      }
    } else {
      this.todos.push(newTodo);
    }

    this.openModal = false;

    this.updateLocalStorage();
  }

  generateUniqueId() {
    const timestamp = new Date().getTime();
    const random = Math.random().toString(36).substring(2, 10);
    return `${timestamp}-${random}`;
  }

  deleteCompletedTodos() {
    this.todos = this.deleteCompleted(this.todos);
    this.updateLocalStorage();
  }

  toggleTodoCompleted(todoId: string) {
    const todo = this.findTodoById(this.todos, todoId);
    if (todo) {
      todo.completed = !todo.completed;
      this.toggleChildrenCompletion(todo);
      const parentTodo = this.findParentTodoById(this.todos, todoId);
      if (parentTodo) {
        this.updateParentCompletion(parentTodo);
      }
    }
    this.updateLocalStorage();
  }

  findTodoById(todos: Todo[], todoId: string): Todo | undefined {
    for (const todo of todos) {
      if (todo.id === todoId) {
        return todo;
      }
      if (Array.isArray(todo.children)) {
        const foundTodo = this.findTodoById(todo.children, todoId);
        if (foundTodo) {
          return foundTodo;
        }
      }
    }
    return undefined;
  }

  findParentTodoById(todos: Todo[], todoId: string): Todo | undefined {
    for (const todo of todos) {
      if (Array.isArray(todo.children)) {
        if (todo.children.some((child) => child.id === todoId)) {
          return todo;
        }
        const foundTodo = this.findParentTodoById(todo.children, todoId);
        if (foundTodo) {
          return foundTodo;
        }
      }
    }
    return undefined;
  }

  deleteCompleted(todos: Todo[]): Todo[] {
    return todos.filter((todo: Todo) => {
      if (todo.completed) {
        return false;
      }
      if (Array.isArray(todo.children)) {
        todo.children = this.deleteCompleted(todo.children);
      }
      return true;
    });
  }

  toggleChildrenCompletion(todo: Todo) {
    if (Array.isArray(todo.children)) {
      todo.children.forEach((child) => {
        child.completed = todo.completed;
        this.toggleChildrenCompletion(child);
      });
    }
  }

  updateParentCompletion(parentTodo: Todo) {
    if (Array.isArray(parentTodo.children)) {
      parentTodo.completed = parentTodo.children.every((child) => child.completed);
      const grandParentTodo = this.findParentTodoById(this.todos, parentTodo.id);
      if (grandParentTodo) {
        this.updateParentCompletion(grandParentTodo);
      }
    }
  }

  setCurrentTodo = action((todo: Todo | null) => {
    this.currentTodo = todo;
  });
}

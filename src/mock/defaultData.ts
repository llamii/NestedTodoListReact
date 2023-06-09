import Todo from '../types/Todo';

export const defaultData: Todo[] = [
  {
    id: '1',
    name: '🏪Buy products ',
    text: 'Buy some products',
    completed: false,
    children: [
      {
        id: '2',
        name: '🍞 Buy bread 🍞',
        completed: false,
        text: 'Buy toast bread & black bread',
      },
      {
        id: '3',
        name: '🥛 Buy dairy products',
        completed: false,
        text: 'Milk, cheese, yogurt and butter',
      },
    ],
  },
  {
    id: '4',
    name: '🧽 Cleaning',
    completed: false,
    text: '🧹 Clean the house',
    children: [
      {
        id: '5',
        name: '🧹 Sweeping',
        completed: false,
        text: 'To sweep the floors',
      },
      {
        id: '6',
        name: '💨 Wipe the dust',
        completed: false,
        text: 'Wipe dust on all shelves and on the computer',
      },
    ],
  },
];

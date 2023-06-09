import Todo from '../types/Todo';

export const defaultData: Todo[] = [
  {
    id: '1',
    name: 'Купить продукты',
    text: 'Купить продукты',
    completed: false,
    children: [
      {
        id: '2',
        name: 'Купить хлеб',
        completed: false,
        text: 'Купить батон и ржаной хлеб.',
      },
      {
        id: '3',
        name: 'Купить молочные продукты',
        completed: false,
        text: 'молоко, сметана, сливки ',
      },
    ],
  },
  {
    id: '4',
    name: 'Уборка',
    completed: false,
    text: 'Уборка в доме',
    children: [
      {
        id: '5',
        name: 'Пропылесосить',
        completed: false,
        text: 'Пропылесосить',
      },
      {
        id: '6',
        name: 'Протереть пыль',
        completed: false,
        text: 'Протереть пыль на всех полках и протереть пыль на компьютере.',
      },
    ],
  },
];

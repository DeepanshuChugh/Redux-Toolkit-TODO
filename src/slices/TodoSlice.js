import { createSlice } from '@reduxjs/toolkit';

const getInitialTodo = () => {
  const localTodoList = window.localStorage.getItem('todoList');
  if (localTodoList) {
    return JSON.parse(localTodoList);
  }

  window.localStorage.setItem('todoList', JSON.stringify([]));
  return [];
};

const initalValue = {
  filterStatus: 'all',
  todoList: getInitialTodo(),
};

export const TodoSlice = createSlice({
  name: 'Todo',
  initialState: initalValue,
  reducers: {
    addTodo: (state, action) => {
      state.todoList.push(action.payload);
      const todoList = window.localStorage.getItem('todoList');
      if (todoList) {
        const todoListArr = JSON.parse(todoList);
        todoListArr.push({ ...action.payload });
        window.localStorage.setItem('todoList', JSON.stringify(todoListArr));
      } else {
        window.localStorage.setItem(
          'todoList',
          JSON.stringify([{ ...action.payload }])
        );
      }
    },
    deleteTodo: (state, action) => {
      const todoList = window.localStorage.getItem('todoList');
      if (todoList) {
        const todoListArr = JSON.parse(todoList).filter(
          (ele) => action.payload !== ele.id
        );
        window.localStorage.setItem('todoList', JSON.stringify(todoListArr));
        console.log(todoListArr);
        state.todoList = todoListArr;
      }
    },
    updateTodo: (state, action) => {
      console.log(action.payload);
      const todoList = window.localStorage.getItem('todoList');
      if (todoList) {
        const todoListArr = JSON.parse(todoList);
        todoListArr.forEach((ele) => {
          if (action.payload.id === ele.id) {
            ele.title = action.payload.title;
            ele.time = action.payload.time;
            ele.status = action.payload.status;
          }
        });
        window.localStorage.setItem('todoList', JSON.stringify(todoListArr));
        state.todoList = todoListArr;
      }
    },
    updateFilterStatus: (state, action) => {
      state.filterStatus = action.payload;
    },
  },
});

export const { addTodo, deleteTodo, updateTodo, updateFilterStatus } =
  TodoSlice.actions;
export default TodoSlice.reducer;

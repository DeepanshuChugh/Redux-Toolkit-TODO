import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';
import { deleteTodo, updateTodo } from '../slices/TodoSlice';
import styles from '../styles/modules/todoItem.module.scss';
import { getClasses } from '../utils/getClasses';
import TodoModal from './TodoModal';
import CheckButton from './CheckButton';

// import { deleteTodo } from '../slices/TodoSlice';

function TodoList({ todo }) {
  const dispatch = useDispatch();
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
    toast.success('Task Deleted Successfully');
    // console.log('deleting', id, todo);
  };
  useEffect(() => {
    if (todo.status === 'complete') {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, [todo.status]);

  const handleCheck = () => {
    setChecked(!checked);
    dispatch(
      updateTodo({ ...todo, status: checked ? 'incomplete' : 'complete' })
    );
  };
  const handleEdit = () => {
    setUpdateModalOpen(true);
  };
  return (
    <>
      <div className={styles.item}>
        <div className={styles.todoDetails}>
          <CheckButton checked={checked} handleCheck={handleCheck} />
          <div className={styles.texts}>
            <p
              className={getClasses([
                styles.todoText,
                todo.status === 'complete' && styles.todoTextCompleted,
              ])}
            >
              {todo.title}
            </p>
            <p className={styles.time}>
              {format(new Date(todo.time), 'p,MM/dd/yyyy')}
            </p>
          </div>
        </div>
        <div className={styles.todoActions}>
          <div
            className={styles.icon}
            onClick={() => handleDelete(todo.id)}
            onKeyDown={() => handleDelete()}
            role="button"
            tabIndex="0"
          >
            <MdDelete />
          </div>
          <div
            className={styles.icon}
            onClick={() => handleEdit(todo.id)}
            onKeyDown={() => handleEdit()}
            role="button"
            tabIndex="0"
          >
            <MdEdit />
          </div>
        </div>
      </div>
      <TodoModal
        type="update"
        todo={todo}
        modalOpen={updateModalOpen}
        setModalOpen={setUpdateModalOpen}
      />
    </>
  );
}

export default TodoList;

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, SelectButton } from './Button';
import styles from '../styles/modules/app.module.scss';
import TodoModal from './TodoModal';
import { updateFilterStatus } from '../slices/TodoSlice';

function AppHeader() {
  const [modalOpen, setModalOpen] = useState(false);
  const initialFilterStatus = useSelector((state) => state.todo.filterStatus);
  const [filterStatus, setFilterStatus] = useState(initialFilterStatus);
  const dispatch = useDispatch();

  const updateFilter = (e) => {
    console.log('hello');
    setFilterStatus(e.target.value);
    dispatch(updateFilterStatus(e.target.value));
  };

  return (
    <div className={styles.app__wrapper}>
      <div className={styles.appHeader}>
        <Button
          variant="primary"
          role="button"
          tabIndex="0"
          onClick={() => setModalOpen(true)}
          onKeyDown={() => setModalOpen(true)}
        >
          ADD TODO
        </Button>
        <SelectButton value={filterStatus} onChange={(e) => updateFilter(e)}>
          <option value="all">All</option>
          <option value="complete">Complete</option>
          <option value="incomplete">Incomplete</option>
        </SelectButton>
      </div>
      <TodoModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
    </div>
  );
}

export default AppHeader;

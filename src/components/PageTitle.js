import React from 'react';
import styles from '../styles/modules/title.module.scss';

const PageTitle = ({ children }) => (
  <div className={styles.title}>{children}</div>
);

export default PageTitle;

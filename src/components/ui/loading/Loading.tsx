import styles from './loading.module.scss';
const Loading = (): JSX.Element => {
  return (
    <div className={styles.container}>
      <div className={styles.spinner}></div>
    </div>
  );
};

export default Loading;

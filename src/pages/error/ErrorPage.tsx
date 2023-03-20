import styles from './errorPage.module.scss';

const ErrorPage = (): JSX.Element => {
  return (
    <div className={styles.container}>
      <h1>404</h1>
      <p>THE PAGE YOU WERE LOOKING FOR DOES NOT EXIST!</p>
    </div>
  );
};
export default ErrorPage;

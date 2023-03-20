import styles from './error.module.scss';
interface EProps {
  message: string;
}
const Error = ({ message }: EProps) => {
  return (
    <div className={styles.container}>
      <h1>{message}</h1>
    </div>
  );
};

export default Error;

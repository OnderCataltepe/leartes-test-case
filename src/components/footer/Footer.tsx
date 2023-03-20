import styles from './footer.module.scss';
const Footer = (): JSX.Element => {
  return (
    <footer className={styles.container}>
      <p>© Copyright 2023 - All rights reserved.</p>
    </footer>
  );
};

export default Footer;

import { homeBg } from '~/assets';
import { OutlinedBtn } from '~/components';
import styles from './home.module.scss';
const Home = () => {
  return (
    <div className={styles.container}>
      <img alt="Home Page Background" src={homeBg} />
      <div>
        <h1>Welcome</h1>
        <div className={styles.linkContainer}>
          <OutlinedBtn path="/products" text="Explore" />
        </div>
      </div>
    </div>
  );
};

export default Home;

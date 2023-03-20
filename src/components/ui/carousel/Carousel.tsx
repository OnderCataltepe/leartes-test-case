import styles from './carousel.module.scss';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

interface CProps {
  items: Array<string>;
}
const Carousel = ({ items }: CProps) => {
  return (
    <Swiper
      pagination={true}
      className={styles.swiper}
      autoplay={{
        delay: 3000
      }}
      loop={true}
      slidesPerView={1}
      modules={[Autoplay, Pagination]}>
      {items.map((item, index) => (
        <SwiperSlide key={index}>
          <div className={styles.sliderCard}>
            <img alt="carousel" src={item} />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Carousel;

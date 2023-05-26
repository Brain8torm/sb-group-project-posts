import Slider from 'react-slick';


import styles from './carousel.module.css';
import { ReviewCard } from '../review-card';
import classNames from 'classnames';

export function B8ReviewsCarousel({ data, carouselSettings, title }) {
    let defaultSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    Object.assign(defaultSettings, carouselSettings);

    return (
        <div className={classNames('reviews-carousel', styles.wrapper)}>
            <div className={styles.title_box}>
                {title?.length && <h3 className={styles.title}>{title}</h3>}
            </div>
            <Slider {...defaultSettings}>
                {data?.map((item, index) => <ReviewCard key={index} {...item} />)}
            </Slider>
        </div>
    );
}

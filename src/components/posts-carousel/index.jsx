import Slider from 'react-slick';
import { PostCard } from '../post-card';

import styles from './carousel.module.css';

export function B8PostsCarousel({ data, carouselSettings, title }) {
    let defaultSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 4,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
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
        <div className={styles.wrapper}>
            <div className={styles.title_box}>
                {title?.length && <h3 className={styles.title}>{title}</h3>}
            </div>
            <Slider {...defaultSettings}>
                {data?.map((item, index) => <PostCard key={index} {...item} />)}
            </Slider>
        </div>
    );
}

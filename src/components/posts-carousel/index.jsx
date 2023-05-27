import Slider from 'react-slick';
import { PostCard } from '../post-card';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import styles from './carousel.module.css';
import classNames from 'classnames';
import { Box, IconButton } from '@mui/material';

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
        nextArrow: <B8NextArrow />,
        prevArrow: <B8PrevArrow />,
    };

    Object.assign(defaultSettings, carouselSettings);

    function B8NextArrow(props) {
        const { onClick } = props;
        return (
            <IconButton
                aria-label="next slide"
                className={styles.button_next}
                onClick={onClick}
                color="primary"
            >
                <ChevronRightIcon />
            </IconButton>
        );
    }

    function B8PrevArrow(props) {
        const { onClick } = props;
        return (
            <IconButton
                aria-label="prev slide"
                className={styles.button_prev}
                onClick={onClick}
                color="primary"
            >
                <ChevronLeftIcon color="action" />
                </IconButton>
        );
    }

    return (
        <div className={classNames('posts-carousel', styles.wrapper)}>
            <div className={styles.title_box}>
                {title?.length && <h3 className={styles.title}>{title}</h3>}
            </div>
            <Slider {...defaultSettings}>
                {data?.map((item, index) => (
                    <PostCard key={index} {...item} />
                ))}
            </Slider>
            <Box className={classNames(styles.navigation)}>
                <Box className={classNames(styles.dots, 'carousel__dots')}></Box>
                <Box className={classNames(styles.arrows, 'carousel__arrows')}></Box>
            </Box>
        </div>
    );
}

import {
    Avatar,
    Badge,
    Container,
    Grid,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography,
} from '@mui/material';
import { useContext, useEffect } from 'react';
import { ActionsContext } from '../../contexts/actions-context';
import { Link, useLocation } from 'react-router-dom';
import { Hero } from '../../components/hero';
import { B8PostsCarousel } from '../../components/posts-carousel';
import { PostsContext } from '../../contexts/posts-context';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import styles from './home.module.css';
import { movieTop } from '../../utils/movie';
import { reviewersTop, reviewsTop } from '../../utils/reviews';
import { ReviewCard } from '../../components/review-card';
import { ReviewsList } from '../../components/reviews-list';
import { B8ReviewsCarousel } from '../../components/reviews-carousel';
import { UserContext } from '../../contexts/current-user-context';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';

export function HomePage() {
    const { setQuickActions } = useContext(ActionsContext);
    const location = useLocation();

    const { posts, reviews } = useContext(PostsContext);
    const { allUsers: users } = useContext(UserContext);

    const topRatedPosts = movieTop(posts, 10);
    const reviewsBest = reviewsTop(reviews);
    const reviewersBest = reviewersTop(reviews, users);

    const reviewsCarouselSettings = {
        vertical: true,
    };

    useEffect(() => {
        setQuickActions([
            {
                icon: (
                    <Link
                        className="speed-dial__action"
                        replace
                        to="/add-post"
                        state={{
                            backgroundLocation: location,
                            initialPath: location.pathname,
                        }}
                    >
                        <AddOutlinedIcon />
                    </Link>
                ),
                name: 'Добавить',
            },
        ]);
    }, []);

    return (
        <>
            <Container maxWidth="lg">
                <Hero />
                <div className={styles.section}>
                    <B8PostsCarousel data={posts} title="Новые фильмы" />
                </div>
                <div className={styles.section}>
                    <B8PostsCarousel data={topRatedPosts} title="Рейтинговые фильмы" />
                </div>
                <div className={styles.section}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={7}>
                            <h2>Топ отзывов</h2>
                            <B8ReviewsCarousel
                                carouselSettings={reviewsCarouselSettings}
                                data={reviewsBest}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={5}>
                            <h2>Топ комментаторов</h2>
                            <List
                                sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                            >
                                {reviewersBest.map((reviewer, index) => (
                                    <ListItem alignItems="flex-start" key={index}>
                                        <ListItemAvatar>
                                            <Badge
                                                overlap="circular"
                                                anchorOrigin={{
                                                    vertical: 'bottom',
                                                    horizontal: 'right',
                                                }}
                                                badgeContent={<EmojiEventsOutlinedIcon />}
                                            >
                                                <Avatar
                                                    alt={reviewer?.name}
                                                    src={reviewer?.avatar}
                                                />
                                            </Badge>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={reviewer?.name}
                                            secondary={reviewer?.about}
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        </Grid>
                    </Grid>
                </div>
            </Container>
        </>
    );
}

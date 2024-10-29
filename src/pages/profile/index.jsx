import {
    Avatar,
    Button,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Tab,
    Tabs,
    Typography,
} from '@mui/material';
import { Container } from '@mui/system';
import { useCallback, useContext, useState } from 'react';
import { UserContext } from '../../contexts/current-user-context';
import { PostsContext } from '../../contexts/posts-context';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import styles from './profile-page.module.css';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import api from '../../utils/api';
import { useApi } from '../../hooks/useApi';
import { NotifyContext } from '../../contexts/notify-context';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { reviewRating, reviewsByUser } from '../../utils/reviews';
import { postByID } from '../../utils/posts';
import { setLocalData } from '../../utils/localStorage';

export function ProfilePage() {
    const { posts, setPosts, reviews, onPostPublic, onPostDelete, onReviewDelete } = useContext(PostsContext);
    const { currentUser } = useContext(UserContext);
    const { notifyStatus, setNotifyStatus } = useContext(NotifyContext);

    const navigate = useNavigate();
    let location = useLocation();

    const backgroundLocation = location.state?.backgroundLocation;
    const initialPath = location.state?.initialPath;

    location =
        (backgroundLocation && {
            ...backgroundLocation,
            pathname: initialPath,
        }) ||
        location;

    const userReviews = reviewsByUser(reviews, currentUser);

    // TODO: Выводятся все посты - нужно ли? Лишний запрос
    /*const handleGetPosts = useCallback(() => api.getPostsList(), []);
    const {
        data: posts,
        loading: isLoading,
        error: errorState,
        setData: setPosts,
    } = useApi(handleGetPosts);*/

    function handlePublishClick(e) {
        e.preventDefault();
        const el = e.target.closest('.post');
        onPostPublic(el.dataset.id, el.dataset.published)
            .then((updatePost) => {
                const newPosts = posts.map((postState) => {
                    return postState._id === updatePost._id ? updatePost : postState;
                });

                setPosts(newPosts);
                setNotifyStatus({
                    status: 'info',
                    msg: `Пост ${updatePost.title} ${
                        updatePost.isPublished ? 'опубликован' : 'снят с публикации'
                    }`,
                });
            })
            .finally();
    }

    function handleEditClick(e) {
        e.preventDefault();
        const el = e.target.closest('.post');
        location =
            (backgroundLocation && {
                ...backgroundLocation,
                pathname: initialPath,
            }) ||
            location;
        navigate('/edit-post/' + el.dataset.id, {
            replace: true,
            state: {
                backgroundLocation: location,
                initialPath: location.pathname,
            },
        });
    }

    function handleDeleteClick(e) {
        e.preventDefault();
        const el = e.target.closest('.post');
        onPostDelete(el.dataset.id);
    }
    /*
    TODO: нет API редавктирования отзыва
    function handleReviewEditClick(e) {
        e.preventDefault();
        const el = e.target.closest('.review');

        location =
            (backgroundLocation && {
                ...backgroundLocation,
                pathname: initialPath,
            }) ||
            location;
        navigate('/edit-review/' + el.dataset.id, {
            replace: true,
            state: {
                backgroundLocation: location,
                initialPath: location.pathname,
            },
        });
    }*/

    function handleReviewDeleteClick(e) {
        e.preventDefault();
        const el = e.target.closest('.review');
        onReviewDelete(el.dataset.post, el.dataset.id);
    }

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    function TabPanel(props) {
        const { children, value, index, ...other } = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box sx={{ p: 3 }}>
                        <Typography>{children}</Typography>
                    </Box>
                )}
            </div>
        );
    }

    TabPanel.propTypes = {
        children: PropTypes.node,
        index: PropTypes.number.isRequired,
        value: PropTypes.number.isRequired,
    };

    function a11yProps(index) {
        return {
            id: `profile-tab-${index}`,
            'aria-controls': `profile-tabpanel-${index}`,
        };
    }

    return (
        <Container maxWidth="lg">
            <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                    <div className={styles.info}>
                        <Avatar
                            alt={currentUser?.name}
                            src={
                                currentUser?.avatar
                                    ? currentUser.avatar
                                    : '/static/images/avatar/1.jpg'
                            }
                            sx={{ width: 150, height: 150 }}
                            className={styles.avatar}
                        />
                        <p>{currentUser?.name}</p>
                        <p>{currentUser?.about}</p>
                    </div>

                    <div className={styles.actions}>
                        <Button
                            variant="outlined"
                            component={Link}
                            to="/edit-profile"
                            replace
                            state={{
                                backgroundLocation: location,
                                initialPath: location.pathname,
                            }}
                        >
                            Редактировать профиль
                        </Button>
                        <Button
                            variant="outlined"
                            component={Link}
                            to="/change-avatar"
                            replace
                            state={{
                                backgroundLocation: location,
                                initialPath: location.pathname,
                            }}
                            color="secondary"
                        >
                            Изменить аватар
                        </Button>
                    </div>
                </Grid>
                <Grid item xs={12} md={8}>
                    <Box sx={{ width: '100%' }}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs value={value} onChange={handleChange} aria-label="profile tabs">
                                <Tab
                                    icon={<ArticleOutlinedIcon />}
                                    iconPosition="start"
                                    label="Мои фильмы"
                                    {...a11yProps(0)}
                                />
                                <Tab
                                    icon={<CommentOutlinedIcon />}
                                    iconPosition="start"
                                    label="Мои отзывы"
                                    {...a11yProps(1)}
                                />
                            </Tabs>
                        </Box>
                        <TabPanel value={value} index={0}>
                            <>
                                <List sx={{ width: '100%' }} className={styles.post_list}>
                                    {posts?.map(
                                        (item, index) =>
                                            item.author._id === currentUser?._id && (
                                                <ListItem
                                                    key={index}
                                                    data-id={item?._id}
                                                    data-published={item?.isPublished}
                                                    className={classNames(
                                                        'post',
                                                        styles.post_list__post
                                                    )}
                                                    secondaryAction={
                                                        <>
                                                            <span
                                                                className={styles.post_list__action}
                                                                onClick={handlePublishClick}
                                                            >
                                                                <IconButton
                                                                    edge="end"
                                                                    aria-label="publish"
                                                                    sx={{ mr: 0.5 }}
                                                                >
                                                                    {item.isPublished ? (
                                                                        <VisibilityOutlinedIcon />
                                                                    ) : (
                                                                        <VisibilityOffOutlinedIcon />
                                                                    )}
                                                                </IconButton>
                                                            </span>

                                                            <span
                                                                className={styles.post_list__action}
                                                                onClick={handleEditClick}
                                                            >
                                                                <IconButton
                                                                    edge="end"
                                                                    aria-label="edit"
                                                                    sx={{ mr: 0.5 }}
                                                                >
                                                                    <EditOutlinedIcon />
                                                                </IconButton>
                                                            </span>

                                                            <span
                                                                className={styles.post_list__action}
                                                                onClick={handleDeleteClick}
                                                            >
                                                                <IconButton
                                                                    edge="end"
                                                                    aria-label="delete"
                                                                >
                                                                    <DeleteOutlinedIcon />
                                                                </IconButton>
                                                            </span>
                                                        </>
                                                    }
                                                >
                                                    <ListItemIcon>
                                                        <ArticleOutlinedIcon />
                                                    </ListItemIcon>
                                                    <ListItemText
                                                        primary={item.title}
                                                        secondary={
                                                            <span
                                                                className={styles.post_list__meta}
                                                            >
                                                                <span>
                                                                    Добавлено:{' '}
                                                                    {dayjs(item.created_at)
                                                                        .locale('ru')
                                                                        .format(
                                                                            'D MMMM YYYY HH:mm'
                                                                        )}
                                                                </span>
                                                                <span>
                                                                    Обновлено:{' '}
                                                                    {dayjs(item.updated_at)
                                                                        .locale('ru')
                                                                        .format(
                                                                            'D MMMM YYYY HH:mm'
                                                                        )}
                                                                </span>
                                                            </span>
                                                        }
                                                    />
                                                </ListItem>
                                            )
                                    )}
                                </List>
                            </>
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <>
                                <List sx={{ width: '100%' }} className={styles.reviews_list}>
                                    {userReviews?.map((item, index) => {
                                        const postTitle = postByID(posts, item?.post)?.title;
                                        return (
                                            <ListItem
                                                key={index}
                                                data-id={item?._id}
                                                data-post={item?.post}
                                                data-published={item?.isPublished}
                                                className={classNames(
                                                    'review',
                                                    styles.reviews_list__review
                                                )}
                                                secondaryAction={
                                                    <>

                                                        <span
                                                            className={styles.reviews_list__action}
                                                            onClick={handleReviewDeleteClick}
                                                        >
                                                            <IconButton
                                                                edge="end"
                                                                aria-label="delete"
                                                            >
                                                                <DeleteOutlinedIcon />
                                                            </IconButton>
                                                        </span>
                                                    </>
                                                }
                                            >
                                                <ListItemIcon>
                                                    <CommentOutlinedIcon />
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary={postTitle}
                                                    secondary={
                                                        <span className={styles.reviews_list__meta}>
                                                            {/* TODO: добавить адаптивность*/}
                                                            <span>
                                                                Добавлено:{' '}
                                                                {dayjs(item.created_at)
                                                                    .locale('ru')
                                                                    .format('D MMMM YYYY HH:mm')}
                                                            </span>
                                                            <span  className={styles.reviews_list__rating}>
                                                                {reviewRating(item?.text) && (
                                                                    <>
                                                                        <StarBorderOutlinedIcon />{' '}
                                                                        {Number(reviewRating(item?.text)).toFixed(2)}
                                                                    </>
                                                                )}
                                                            </span>
                                                        </span>
                                                    }
                                                />
                                            </ListItem>
                                        );
                                    })}
                                </List>
                            </>
                        </TabPanel>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
}

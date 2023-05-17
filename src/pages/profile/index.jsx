import { Avatar, Button, Grid, IconButton, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { useCallback, useContext } from 'react';
import { UserContext } from '../../contexts/current-user-context';
import { PostsContext } from '../../contexts/posts-context';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import styles from './profile-page.module.css';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import api from '../../utils/api';
import { useApi } from '../../hooks/useApi';
import { NotifyContext } from '../../contexts/notify-context';


export function ProfilePage() {
    const { onPostPublic, onPostDelete } = useContext(PostsContext);
    const { currentUser } = useContext(UserContext);
    const { notifyStatus, setNotifyStatus } = useContext(NotifyContext);

    const navigate = useNavigate();
    let location = useLocation();

    const backgroundLocation = location.state?.backgroundLocation;
    const initialPath = location.state?.initialPath;

    location = (backgroundLocation && {
        ...backgroundLocation,
        pathname: initialPath,
    }) ||
        location;

    const handleGetPosts = useCallback(() => api.getPostsList(), []);
    const { data: posts, loading: isLoading, error: errorState, setData: setPosts } = useApi(handleGetPosts);

    function handlePublishClick(e) {
        e.preventDefault();
        const el = e.target.closest('.post')
        onPostPublic(el.dataset.id, el.dataset.published).then(updatePost => {

            const newPosts = posts.map((postState) => {
                return postState._id === updatePost._id ? updatePost : postState;
            });

            setPosts(newPosts);
            setNotifyStatus({ status: 'info', msg: `Пост ${updatePost.title} ${updatePost.isPublished ? 'опубликован' : 'снят с публикации'}` });
        }).finally(
            
        );
    }

    function handleEditClick(e) {
        e.preventDefault();
        const el = e.target.closest('.post');
        location = (backgroundLocation && {
            ...backgroundLocation,
            pathname: initialPath,
        }) ||
            location;
        navigate('/edit-post/' + el.dataset.id, {
            replace: true,
            state: {
                backgroundLocation: location,
                initialPath: location.pathname,
            }
        });
    };

    function handleDeleteClick(e) {
        e.preventDefault();
        const el = e.target.closest('.post');
        onPostDelete(el.dataset.id);
    }


    return (
        <Container maxWidth="lg">
            <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                    <div className={styles.info}>
                        <Avatar
                            alt={currentUser?.name}
                            src={currentUser?.avatar ? currentUser.avatar : "/static/images/avatar/1.jpg"}
                            sx={{ width: 150, height: 150 }}
                            className={styles.avatar}
                        />
                        <p>{currentUser?.name}</p>
                        <p>{currentUser?.about}</p>
                    </div>

                    <div className={styles.actions}>
                        <Button variant='outlined' component={Link} to='/edit-profile' replace state={{
                            backgroundLocation: location,
                            initialPath: location.pathname,
                        }}
                        >
                            Редактировать профиль
                        </Button>
                        <Button variant='outlined' component={Link} to='/change-avatar' replace state={{
                            backgroundLocation: location,
                            initialPath: location.pathname,
                        }}
                            color='secondary'
                        >
                            Изменить аватар
                        </Button>
                    </div>
                </Grid>
                <Grid item xs={12} md={8}>
                    <>
                        <Typography variant='h4' component='h2'>
                            Мои посты
                        </Typography>
                        <List sx={{ width: '100%' }} className={styles.post_list}>
                            {posts?.map((item, index) => (
                                (item.author._id === currentUser?._id)
                                && <ListItem
                                    key={index}
                                    data-id={item?._id}
                                    data-published={item?.isPublished}
                                    className={classNames('post', styles.post_list__post)}
                                    secondaryAction={
                                        <>
                                            <span className={styles.post_list__action} onClick={handlePublishClick}>
                                                <IconButton edge="end" aria-label="publish" sx={{ mr: .5 }}>
                                                    {item.isPublished
                                                        ? <VisibilityOutlinedIcon />
                                                        : <VisibilityOffOutlinedIcon />
                                                    }
                                                </IconButton>
                                            </span>

                                            <span className={styles.post_list__action} onClick={handleEditClick}>
                                                <IconButton edge="end" aria-label="edit" sx={{ mr: .5 }}>
                                                    <EditOutlinedIcon />
                                                </IconButton>
                                            </span>

                                            <span className={styles.post_list__action} onClick={handleDeleteClick}>
                                                <IconButton edge="end" aria-label="delete">
                                                    <DeleteOutlinedIcon />
                                                </IconButton>
                                            </span>
                                        </>

                                    }
                                >
                                    <ListItemIcon>
                                        <ArticleOutlinedIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={item.title} secondary={
                                        <span className={styles.post_list__meta}>
                                            <span>Добавлено: {dayjs(item.created_at).locale('ru').format('D MMMM YYYY HH:mm')}</span>
                                            <span>Обновлено: {dayjs(item.updated_at).locale('ru').format('D MMMM YYYY HH:mm')}</span>
                                        </span>
                                    } />
                                </ListItem>
                            ))}
                        </List>



                    </>
                </Grid>
            </Grid>

        </Container>
    );
}
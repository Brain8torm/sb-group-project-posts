import { Avatar, Button, Grid, IconButton, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { useContext } from 'react';
import { UserContext } from '../../contexts/current-user-context';
import { PostsContext } from '../../contexts/posts-context';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import styles from './profile-page.module.css';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { Link, useLocation } from 'react-router-dom';


export function ProfilePage() {
    const { posts } = useContext(PostsContext);
    const { currentUser } = useContext(UserContext);

    const location = useLocation();

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
                        <List sx={{ width: '100%' }}>
                            {posts.map((item, index) => (
                                (item.author._id === currentUser?._id)
                                && <ListItem key={index} secondaryAction={
                                    <>
                                        <IconButton edge="end" aria-label="publish" sx={{ mr: .5 }}>
                                            <VisibilityOutlinedIcon />
                                        </IconButton>

                                        <IconButton edge="end" aria-label="edit" sx={{ mr: .5 }}>
                                            <EditOutlinedIcon />
                                        </IconButton>

                                        <IconButton edge="end" aria-label="delete">
                                            <DeleteOutlinedIcon />
                                        </IconButton>
                                    </>

                                }>
                                    <ListItemIcon>
                                        <ArticleOutlinedIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={item.title} secondary={
                                        <>
                                            <span>Добавлено: {dayjs(item.created_at).locale('ru').format('D MMMM YYYY HH:mm')}</span>
                                            <span>Обновлено: {dayjs(item.updated_at).locale('ru').format('D MMMM YYYY HH:mm')}</span>
                                        </>
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
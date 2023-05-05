import { Avatar, Grid, IconButton, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { useContext } from 'react';
import { UserContext } from '../../contexts/current-user-context';
import { PostsContext } from '../../contexts/post-context';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

import dayjs from 'dayjs';
import 'dayjs/locale/ru';


export function ProfilePage() {
    const { posts } = useContext(PostsContext);
    const { currentUser } = useContext(UserContext);


    const cols = [
        { field: 'id', headerName: 'ID', width: 40 },
        { field: 'isPublished', type: 'boolean', editable: true, headerName: 'Public', width: 100 },
        { field: 'title', headerName: 'Title', width: 250 },
        { field: 'created_at', headerName: 'Created', width: 130 },
        { field: 'updated_at', headerName: 'Updated', width: 130 }
    ]
    let rows = [];
    posts.map((item, index) => {
        let rowItem = { id: index + 1, isPublished: item.isPublished, title: item.title, created_at: item.created_at, updated_at: item.updated_at }
        rows.push(rowItem);
    });

    return (
        <Container maxWidth="lg">
            <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                    <Avatar
                        alt={currentUser?.name}
                        src={currentUser.avatar ? currentUser.avatar : "/static/images/avatar/1.jpg"}
                        sx={{ width: 100, height: 100 }}
                    />
                    <p>{currentUser.name}</p>
                    <p>{currentUser.about}</p>
                </Grid>
                <Grid item xs={12} md={8}>
                    <>
                        <Typography variant="h4" component="h2">
                            Мои посты
                        </Typography>
                        <List sx={{ width: '100%' }}>
                            {posts.map((item, index) => (
                                (item.author._id === currentUser._id)
                                && <ListItem secondaryAction={
                                    <>
                                            <IconButton edge="end" aria-label="delete" sx={{ mr: .5 }}>
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
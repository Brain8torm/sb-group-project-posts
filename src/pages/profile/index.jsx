import { Avatar, Grid, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { useContext } from 'react';
import { UserContext } from '../../contexts/current-user-context';
import { PostsContext } from '../../contexts/post-context';

export function ProfilePage() {
    const { posts } = useContext(PostsContext);
    const { currentUser } = useContext(UserContext);

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
                        {posts.map((item, index) => (
                            (item.author._id === currentUser._id)
                                && <li key={index}>{item.title}</li>
                        ))}
                    </>
                </Grid>
            </Grid>

        </Container>
    );
}
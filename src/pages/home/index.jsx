import { Container, Stack, Switch, Typography } from '@mui/material';
import { PostsList } from '../../components/posts-list';
import { useState } from 'react';


export function HomePage({ posts, onPostLike, currentUser }) {

    const [isMasonry, setIsMasonry] = useState(true);

    function handleSwitchChange(event) {
        setIsMasonry(event.target.checked ? true : false);
    }



    return (
        <>
            <Container maxWidth="lg">
            <Stack direction="row" spacing={1} alignItems="center">
                    <Typography>Grid</Typography>
                    <Switch checked={isMasonry} value='masonry' onChange={handleSwitchChange} name="masonry" />
                    <Typography>Masonry</Typography>
                </Stack>
                <PostsList type={isMasonry ? 'masonry' : 'grid'} posts={posts} onPostLike={onPostLike} currentUser={currentUser} />
            </Container>
        </>
    );
}

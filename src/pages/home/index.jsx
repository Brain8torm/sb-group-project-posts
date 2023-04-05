import { Container, Stack, Switch, Typography } from '@mui/material';
import { PostsList } from '../../components/posts-list';
import { useState } from 'react';


export function HomePage({ posts }) {

    const [isMasonry, setIsMasonry] = useState(true);

    function handleSwitchChange(event) {
        setIsMasonry(event.target.checked ? true : false);
    }

console.log('isMasonry', isMasonry);

    return (
        <>
            <Container maxWidth="lg">
                <Stack direction="row" spacing={1} alignItems="center">
                    <Typography>Grid</Typography>
                    <Switch defaultChecked checked={isMasonry} value='masonry' onChange={handleSwitchChange} name="masonry" />
                    <Typography>Masonry</Typography>
                </Stack>
                <PostsList type={isMasonry ? 'masonry' : 'grid'} posts={posts} />
            </Container>
        </>
    );
}

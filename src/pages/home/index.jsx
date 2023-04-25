import { Container, Stack, Switch, Typography } from '@mui/material';
import { PostsList } from '../../components/posts-list';
import { useState } from 'react';

export function HomePage({handleSwitchChange}) {

    const [isMyPosts, setIsMyPosts] = useState(true);

    function onSwitchChange(event) {
        let checked = event.target.checked ? true : false;
        setIsMyPosts(checked);
        handleSwitchChange(checked ? 'my' : 'other');
        return checked;
    }

    return (
        <>
            <Container maxWidth="lg">
                <Stack direction="row" spacing={1} alignItems="center">
                    <Typography>Все</Typography>
                    <Switch checked={isMyPosts} value={isMyPosts ? 'my' : 'other'} onChange={onSwitchChange} name="my-posts" />
                    <Typography>Мои посты</Typography>
                </Stack>
                <PostsList type={isMyPosts ? 'my' : 'other'} />
            </Container>
        </>
    );
}

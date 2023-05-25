import { Container, Stack, Switch, Typography } from '@mui/material';
import { PostsList } from '../../components/posts-list';
import { useContext, useEffect, useState } from 'react';
import { Spinner } from '../../components/spinner';
import { ActionsContext } from '../../contexts/actions-context';
import { Link, useLocation } from 'react-router-dom';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

export function MoviesPage({ isLoading, handleSwitchChange }) {

    const [isMyPosts, setIsMyPosts] = useState(true);
    const { setQuickActions } = useContext(ActionsContext);
    const location = useLocation();

    function onSwitchChange(event) {
        let checked = event.target.checked ? true : false;
        setIsMyPosts(checked);
        handleSwitchChange(checked ? 'my' : 'other');
        return checked;
    }

    useEffect(() => {
        setQuickActions(
            [
                {
                    icon: <Link className='speed-dial__action' replace to='/add-post' state={{
                        backgroundLocation: location,
                        initialPath: location.pathname,
                    }}><AddOutlinedIcon /></Link>, name: 'Добавить'
                },
            ]
        )
    }, [])

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

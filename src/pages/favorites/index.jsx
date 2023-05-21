import { Container } from '@mui/material';
import { useContext } from 'react';
import { PostsContext } from '../../contexts/posts-context';
import { PageH1 } from '../../components/page-h1';
import { FavoritesList } from '../../components/favorites-list';

export function FavoritesPage() {

    const { favorites: posts } = useContext(PostsContext);

    return (
        <>
            <Container maxWidth="lg">
                <PageH1 content="Мои избранные фильмы" />
                <FavoritesList type="my" />
            </Container>
        </>
    );
}

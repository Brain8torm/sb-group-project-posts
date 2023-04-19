import { Post } from '../../components/post';

export function SinglePostPage({product, currentUser}) {
    return (
        <>
        <Post currentUser={currentUser}/>
        </>
    );
}

import { useEffect, useState } from 'react';
import { Post } from '../../components/post';
import api from '../../utils/api';
import { useParams } from 'react-router';
import { Container } from '@mui/system';
import { PostAlt } from '../../components/post-alt';
import { isLiked } from '../../utils/posts';


export function SinglePostPage() {
    const { postID } = useParams();
    const [post, setPost] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [errorState, setErrorState] = useState(null);
    const [postComments, setPostComments] = useState(null);

    function handlePostLike(post) {
        const like = isLiked(post.likes, currentUser._id)
        api.changeLikePostStatus(post._id, like)
            .then((updatePost) => {
                setPost(updatePost);
            });
    }

    useEffect(() => {
        api.getInfoPost(postID)
            .then(([postData, userData, commentsData]) => {
                setCurrentUser(userData);
                setPost(postData);
                setPostComments(commentsData);
            })
            .catch((err) => {
                setErrorState(err)
            })
    }, [postID]);

    return (
        <>
            {!errorState &&
                <Container maxWidth='lg'>
                    {(post?.author._id === currentUser?._id)
                        ?
                        <Post
                            {...post}
                            postComments={postComments}
                            currentUser={currentUser}
                            onPostLike={handlePostLike}
                        />
                        :
                        <PostAlt
                            {...post}
                            postComments={postComments}
                            currentUser={currentUser}
                            onPostLike={handlePostLike}
                        />
                    }
                </Container>

            }
        </>
    );
}
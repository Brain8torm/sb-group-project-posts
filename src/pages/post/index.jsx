import { useContext, useEffect, useState } from 'react';
import { Post } from '../../components/post';
import api from '../../utils/api';
import { useParams } from 'react-router';
import { Container } from '@mui/system';
import { PostAlt } from '../../components/post-alt';
import { isLiked } from '../../utils/posts';
import { NotifyContext } from '../../contexts/notify-context';
import { setLocalData } from '../../utils/localStorage';
import { UserContext } from '../../contexts/current-user-context';


export function SinglePostPage({ updatedPost, handlePostDelete }) {
    const { postID } = useParams();
    const [post, setPost] = useState(null);
    const [errorState, setErrorState] = useState(null);
    const { setNotifyStatus } = useContext(NotifyContext);
    const [postComments, setPostComments] = useState(null);
    const { currentUser } = useContext(UserContext);

    useEffect(() => {
        setPost(updatedPost);
        setLocalData('currentPost', updatedPost);
    }, [updatedPost]);


    const handlePostRemove = (postId) => {
        console.log(postId)
        if (postId === currentUser._id) {
            handlePostDelete(postId);
        }
    }

    useEffect(() => {
        api.getInfoPost(postID)
            .then(([postData, commentsData]) => {
                setPost(postData);
                setPostComments(commentsData);
                setLocalData('currentPost', postData);
            })
            .catch((err) => {
                setErrorState(err)
            });
    }, [postID]);

    function handlePostLike(post) {
        const like = isLiked(post.likes, currentUser._id);

        api.changeLikePostStatus(post._id, like)
            .then((likedPost) => {
                setPost(likedPost);
            }).finally(() => {
                if (like) {
                    setNotifyStatus({ status: 'error', msg: 'Лайк снят' });
                } else {
                    setNotifyStatus({ status: 'success', msg: 'Лайк поставлен' });
                }
            });
    }


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
                            onPostRemove={handlePostRemove}
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
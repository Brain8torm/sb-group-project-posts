import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Post } from '../../components/post';
import api from '../../utils/api';
import { useParams } from 'react-router';
import { Container } from '@mui/system';
import { PostAlt } from '../../components/post-alt';
import { isLiked } from '../../utils/posts';
import { NotifyContext } from '../../contexts/notify-context';
import { ActionsContext } from '../../contexts/actions-context';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import InsertCommentOutlinedIcon from '@mui/icons-material/InsertCommentOutlined';
import { SvgIcon } from '@mui/material';
import { Link } from 'react-router-dom';
import { setLocalData } from '../../utils/localStorage';


export function SinglePostPage() {
    const { postID } = useParams();
    const [post, setPost] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [errorState, setErrorState] = useState(null);
    const { setNotifyStatus } = useContext(NotifyContext);
    const [postComments, setPostComments] = useState(null);
    const location = useLocation();
    const { setQuickActions } = useContext(ActionsContext);

    console.log('post', post);

    function FireIcon(props) {
        return (
            <SvgIcon {...props}>
                <path d="M12 23C16.1421 23 19.5 19.6421 19.5 15.5C19.5 14.6345 19.2697 13.8032 19 13.0296C17.3333 14.6765 16.0667 15.5 15.2 15.5C19.1954 8.5 17 5.5 11 1.5C11.5 6.49951 8.20403 8.77375 6.86179 10.0366C5.40786 11.4045 4.5 13.3462 4.5 15.5C4.5 19.6421 7.85786 23 12 23ZM12.7094 5.23498C15.9511 7.98528 15.9666 10.1223 13.463 14.5086C12.702 15.8419 13.6648 17.5 15.2 17.5C15.8884 17.5 16.5841 17.2992 17.3189 16.9051C16.6979 19.262 14.5519 21 12 21C8.96243 21 6.5 18.5376 6.5 15.5C6.5 13.9608 7.13279 12.5276 8.23225 11.4932C8.35826 11.3747 8.99749 10.8081 9.02477 10.7836C9.44862 10.4021 9.7978 10.0663 10.1429 9.69677C11.3733 8.37932 12.2571 6.91631 12.7094 5.23498Z" fill="#000"></path>
            </SvgIcon>
        );
    }

    function handlePostLike(post) {
        const like = isLiked(post.likes, currentUser._id)
        api.changeLikePostStatus(post._id, like)
            .then((updatePost) => {
                setPost(updatePost);
                if (like) {
                    setNotifyStatus({ status: 'error', msg: 'Лайк снят' });
                } else {
                    setNotifyStatus({ status: 'success', msg: 'Лайк поставлен' });
                }
            });
    }

    useEffect(() => {
        api.getInfoPost(postID)
            .then(([postData, userData, commentsData]) => {
                setCurrentUser(userData);
                setPost(postData);
                setPostComments(commentsData);
                setLocalData('currentPost', postData);
            })
            .catch((err) => {
                setErrorState(err)
            });

        setQuickActions(
            [
                {
                    icon: <Link className='speed-dial__action' replace to='/add-post' state={{
                        backgroundLocation: location,
                        initialPath: location.pathname,
                    }}><AddOutlinedIcon /></Link>, name: 'Добавить'
                },
                {
                    icon: <Link className='speed-dial__action' replace to={'/edit-post/' + postID} state={{
                        backgroundLocation: location,
                        initialPath: location.pathname,
                    }}><EditOutlinedIcon /></Link>, name: 'Редактировать'
                },
                { icon: <ClearOutlinedIcon />, name: 'Удалить' },
                {
                    icon: <Link className='speed-dial__action' replace to='' state={{
                        backgroundLocation: location,
                        initialPath: location.pathname,
                    }}><InsertCommentOutlinedIcon /></Link>, name: 'Добавить отзыв'
                },
                { icon: <FireIcon />, name: 'Поставить лайк' },
            ]
        )
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
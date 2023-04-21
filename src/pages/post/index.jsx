import { useEffect, useState } from 'react';
import { Post } from '../../components/post';
import api from '../../utils/api';
import { useParams } from 'react-router';
import { Container } from '@mui/system';
import { PostAlt } from '../../components/post-alt';


export function SinglePostPage() {
    const { postID } = useParams();
    const [post, setPost] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [errorState, setErrorState] = useState(null);
    const [postComments, setPostComments] = useState(null);


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
    }, []);

    return (
        <>
            {!errorState &&
                <Container maxWidth='lg'>
                    {(post?.author._id === currentUser?._id)
                        ?
                        <Post {...post} postComments={postComments} currentUser={currentUser} />
                        :
                        <PostAlt {...post} postComments={postComments} currentUser={currentUser} />
                    }
                </Container>

            }
        </>
    );
}
import { Alert, AlertTitle, Avatar, Card, CardContent, CardHeader, Grid, Rating, SvgIcon, Typography } from '@mui/material';
import styles from './post.module.css';
import classNames from 'classnames';
import { isLiked } from '../../utils/posts';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import TagOutlinedIcon from '@mui/icons-material/TagOutlined';
import { useContext, useEffect } from 'react';
import { ActionsContext } from '../../contexts/actions-context';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import InsertCommentOutlinedIcon from '@mui/icons-material/InsertCommentOutlined';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { B8TotalAvatars } from '../total-avatars';


export function Post({ _id, title, text, image, likes, tags, postComments, currentUser, onPostLike, onPostRemove }) {
    let text_data = text?.split('|');
    let roles = (text_data && text_data[7]?.split(': ')[1].split(', '));

    dayjs.extend(relativeTime);

    const { setQuickActions } = useContext(ActionsContext);

    const location = useLocation();

    function FireIcon(props) {
        return (
            <SvgIcon {...props}>
                <path d="M12 23C16.1421 23 19.5 19.6421 19.5 15.5C19.5 14.6345 19.2697 13.8032 19 13.0296C17.3333 14.6765 16.0667 15.5 15.2 15.5C19.1954 8.5 17 5.5 11 1.5C11.5 6.49951 8.20403 8.77375 6.86179 10.0366C5.40786 11.4045 4.5 13.3462 4.5 15.5C4.5 19.6421 7.85786 23 12 23ZM12.7094 5.23498C15.9511 7.98528 15.9666 10.1223 13.463 14.5086C12.702 15.8419 13.6648 17.5 15.2 17.5C15.8884 17.5 16.5841 17.2992 17.3189 16.9051C16.6979 19.262 14.5519 21 12 21C8.96243 21 6.5 18.5376 6.5 15.5C6.5 13.9608 7.13279 12.5276 8.23225 11.4932C8.35826 11.3747 8.99749 10.8081 9.02477 10.7836C9.44862 10.4021 9.7978 10.0663 10.1429 9.69677C11.3733 8.37932 12.2571 6.91631 12.7094 5.23498Z" fill="#000"></path>
            </SvgIcon>
        );
    }

    function stringToColor(string) {
        let hash = 0;
        let i;

        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }

        let color = '#';

        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
        }

        return color;
    }

    function stringAvatar(name) {
        return {
            sx: {
                bgcolor: stringToColor(name),
            },
            children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
        };
    }

    const like = isLiked(likes, currentUser?._id);

    function handleClickLike() {
        onPostLike({ likes, _id });
    }

    function handleClickRemove() {
        onPostRemove(_id);
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
                {
                    icon: <Link className='speed-dial__action' replace to={'/edit-post/' + _id} state={{
                        backgroundLocation: location,
                        initialPath: location.pathname,
                    }}><EditOutlinedIcon /></Link>, name: 'Редактировать'
                },
                {
                    icon: <Link className='speed-dial__action' replace to='/add-review' state={{
                        backgroundLocation: location,
                        initialPath: location.pathname,
                    }}><InsertCommentOutlinedIcon /></Link>, name: 'Добавить отзыв'
                },
            ]
        );
    }, [])


    return (
        <>
            <div className={classNames('post', styles.wrapper)}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={4}>
                        {image
                            ?
                            <img className={styles.poster} src={image} alt={title} />
                            : <></>
                        }
                    </Grid>
                    <Grid item xs={12} sm={6} md={8}>
                        <div className={styles.inner}>
                            <Typography className={styles.h1} component='h1' variant='h4'>{title}</Typography>

                            <div className={styles.like_block}>
                                <div className={styles.like_status}>
                                    Поставь лайк!
                                </div>
                                <div
                                    data-like={like}
                                    className={classNames(styles.like, { [styles.like__active]: like })}
                                    style={{ display: 'flex', alignItems: 'center' }}
                                    onClick={handleClickLike}
                                ><FireIcon /> {likes?.length}</div>
                            </div>

                            {(text_data) &&
                                <div className={styles.info_wrapper}>
                                    <div className={styles.meta_wraper}>
                                        <div className={styles.meta}>
                                            <div>{text_data[1]}</div>
                                            <div>{text_data[2]}</div>
                                            <div>{text_data[3]}</div>
                                            <div>{text_data[4]}</div>

                                        </div>
                                        <div className={styles.rating}>
                                            <div className={styles.rating_wrapper}>
                                                <div className={styles.rating_title}>
                                                    <strong>Рейтинги</strong>
                                                </div>
                                                <div className={styles.rating_data}>
                                                    <div className={styles.rating_kp}>
                                                        <Rating
                                                            name="kp"
                                                            value={+text_data[5]?.split(': ')[1]}
                                                            readOnly
                                                            defaultValue={5}
                                                            max={10}
                                                            precision={0.1}
                                                        /><span>{text_data[5]}</span>
                                                    </div>
                                                    <div className={styles.rating_imdb}>
                                                        <Rating
                                                            name="imdb"
                                                            value={+text_data[6]?.split(': ')[1]}
                                                            readOnly
                                                            defaultValue={5}
                                                            max={10}
                                                            precision={0.1}
                                                        /><span>{text_data[6]}</span>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                        <div className={styles.roles}>
                                            <div className={styles.roles_title}><strong>В ролях:</strong></div>
                                            <div className={styles.roles_list}>
                                                {
                                                    roles?.map((r, i) => (
                                                        <div className={styles.roles_item} key={i}>{r}</div>
                                                    ))
                                                }
                                                <div className={styles.roles_item}>и другие</div>
                                            </div>
                                        </div>

                                    </div>

                                    <div className={styles.description}>
                                        {text_data[0]}
                                    </div>


                                    <div className={styles.tags_list}>
                                        {tags.map((tag, index) => (
                                            <div className={styles.tag_item} key={index}><TagOutlinedIcon /> {tag}</div>
                                        ))}
                                    </div>


                                </div>
                            }
                        </div>
                    </Grid>
                </Grid>

                <div className={classNames('comments', styles.comments__wrapper)}>
                    <Typography variant="h4" component="h4" className={styles.comments_title}>
                        Отзывы
                    </Typography>
                    {(postComments?.length)
                        ?
                        <div className={styles.comments_list}>
                            <B8TotalAvatars data={postComments}/>
                            {
                                postComments?.map((comment, index) => (
                                    <Card key={index} className={classNames('comment', styles.comment_item)}>
                                        <CardHeader
                                            avatar={comment.author?.avatar
                                                ?
                                                <Avatar alt={comment.author.name} src={comment.author.avatar} />
                                                :
                                                <Avatar {...stringAvatar(comment.author.name)} />
                                            }

                                            title={comment.author.name}
                                            subheader={dayjs(comment?.created_at).from()}
                                        />
                                        <CardContent>
                                            {comment?.text}
                                        </CardContent>
                                    </Card>
                                ))
                            }
                        </div>
                        :
                        <Alert severity="warning">
                            <AlertTitle>Warning</AlertTitle>
                            Пока комментарии отсутствуют...
                        </Alert>
                    }

                </div>
            </div >
        </>
    );
}
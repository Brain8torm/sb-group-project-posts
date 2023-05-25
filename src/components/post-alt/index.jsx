import { Alert, AlertTitle, Avatar, Button, Card, CardContent, CardHeader, Grid, SvgIcon, Typography } from '@mui/material';
import s from './post-alt.module.css';
import cn from 'classnames';
import { isLiked } from '../../utils/posts';

export function PostAlt({ _id, title, text, image, likes, postComments, currentUser, onPostLike }) {

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

    function FireIcon(props) {
        return (
            <SvgIcon {...props}>
                <path d="M12 23C16.1421 23 19.5 19.6421 19.5 15.5C19.5 14.6345 19.2697 13.8032 19 13.0296C17.3333 14.6765 16.0667 15.5 15.2 15.5C19.1954 8.5 17 5.5 11 1.5C11.5 6.49951 8.20403 8.77375 6.86179 10.0366C5.40786 11.4045 4.5 13.3462 4.5 15.5C4.5 19.6421 7.85786 23 12 23ZM12.7094 5.23498C15.9511 7.98528 15.9666 10.1223 13.463 14.5086C12.702 15.8419 13.6648 17.5 15.2 17.5C15.8884 17.5 16.5841 17.2992 17.3189 16.9051C16.6979 19.262 14.5519 21 12 21C8.96243 21 6.5 18.5376 6.5 15.5C6.5 13.9608 7.13279 12.5276 8.23225 11.4932C8.35826 11.3747 8.99749 10.8081 9.02477 10.7836C9.44862 10.4021 9.7978 10.0663 10.1429 9.69677C11.3733 8.37932 12.2571 6.91631 12.7094 5.23498Z" fill="#000"></path>
            </SvgIcon>
        );
    }

    return (
        <>
            <div className={cn('post-alt', s.wrapper)}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={4}>
                        {image
                            ?
                            <img className={cn(s.poster)} src={image} alt={title} />
                            : <></>
                        }
                    </Grid>
                    <Grid item xs={12} sm={6} md={8}>
                        <div className={cn(s.inner)}>
                            <Typography component='h1' variant='h4'>{title}</Typography>

                            <div className={cn(s.like_block)}>
                                <div className={cn(s.like_status)}>
                                    Поставь лайк!
                                </div>
                                <div
                                    data-like={like}
                                    className={cn(s.like, { [s.like__active]: like })}
                                    style={{ display: 'flex', alignItems: 'center' }}
                                    onClick={handleClickLike}
                                ><FireIcon /> {likes?.length}</div>
                            </div>

                            <div className={cn(s.description)}>
                                {text}
                            </div>
                        </div>
                    </Grid>
                </Grid>

                <div className={cn('comments', s.comments__wrapper)}>
                    <Typography variant="h4" component="h4" className={cn(s.comments_title)}>
                        Комментарии
                    </Typography>

                    <div className={cn(s.comments_list)}>
                        {
                            postComments?.map((comment, index) => (
                                <Card key={index} className={cn('comment', s.comment_item)}>
                                    <CardHeader
                                        avatar={comment.author?.avatar
                                            ?
                                            <Avatar alt={comment.author.name} src={comment.author.avatar} />
                                            :
                                            <Avatar {...stringAvatar(comment.author.name)} />
                                        }

                                        title="Shrimp and Chorizo Paella"
                                        subheader="September 14, 2016"
                                    />
                                    <CardContent>
                                        {comment?.text}
                                    </CardContent>
                                </Card>
                            ))
                        }
                    </div>
                    {!postComments?.length &&
                        <Alert severity="warning">
                            <AlertTitle>Warning</AlertTitle>
                            Пока комментарии отсутствуют...
                        </Alert>
                    }

                    <div className={cn(s.comments__add_block)}>
                        <Button variant='contained'>Добавить комментарий</Button>
                    </div>
                </div>
            </div>
        </>
    );
}
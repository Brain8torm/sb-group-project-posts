import classNames from 'classnames';
import styles from './review-card.module.css';
import { Avatar, Card, CardContent, CardHeader, Rating } from '@mui/material';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useContext } from 'react';
import { PostsContext } from '../../contexts/posts-context';
import { movieYear } from '../../utils/movie';

export function ReviewCard({ text, author, post, created_at }) {
    dayjs.extend(relativeTime);

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

    const { posts } = useContext(PostsContext);

    let commentedPost = posts?.filter((item) => item._id === post)[0];

    console.log(commentedPost);

    return (
        <Card className={classNames('review', styles.item)}>
            <CardHeader
                avatar={
                    author?.avatar ? (
                        <Avatar alt={author.name} src={author.avatar} />
                    ) : (
                        <Avatar {...stringAvatar(author.name)} />
                    )
                }
                title={author.name}
                subheader={dayjs(created_at).from()}
            />
            <CardContent>
                <div className={styles.comment_text}>{text?.split('|')[0]}</div>
                <div className={styles.comment_rating}>
                    <Rating
                        max={10}
                        value={+text?.split('|')[1]?.split(':')[1]}
                        name="rating"
                        size="small"
                        readOnly
                    />
                </div>
                {commentedPost &&
                    <div className={styles.commented}>
                        <div className={styles.commented_movie}>{commentedPost?.title} ({movieYear(commentedPost?.text)})</div>
                        <div className={styles.commented_rating}><StarBorderOutlinedIcon/> {(text?.split('|')[1]?.split(':')[1])}/10</div>
                    </div>
                }
            </CardContent>
        </Card>
    );
}

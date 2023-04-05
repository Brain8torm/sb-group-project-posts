import Masonry from '@mui/lab/Masonry';
import { PostCard } from '../post-card';
import { Grid } from '@mui/material';

export function PostsList({ posts, type }) {



    return (
        <>
            {type === 'masonry'
                ?
                (
                    <Masonry columns={4} spacing={2}>
                        {
                            posts.map((item, index) => (
                                 <PostCard key={index} cardImg='image' {...item} />
                            ))
                        }
                    </Masonry>
                )
                :
                (

                    <Grid container spacing={2}>
                        {
                            posts.map((item, index) => (
                                <Grid item xs={2} md={3}>
                                    <PostCard key={index} {...item} />
                                </Grid>
                            ))

                        }
                    </Grid>
                )
            }
        </>
    );
}

export const isLiked = (likes, userId) => likes?.some(id => id === userId);

export const postByID = (posts, id) => posts.find((el) => el?._id === id);

export const isMoviePosts = (posts) => {
    return posts.filter((post) => isMoviePost(post));
};

export const isMoviePost = (post) => {
    let text_data = post?.text?.split('|');
    if (text_data.length > 1) {
        return true;
    } else {
        return false;
    }
};
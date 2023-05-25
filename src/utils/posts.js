export const isLiked = (likes, userId) => likes?.some(id => id === userId);
export const postByID = (posts, id) => posts.find((el) => el?._id === id);
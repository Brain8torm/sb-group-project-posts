export const reviewRating = (text) => text?.split('|')[1]?.split(':')[1];
export const reviewText = (text) => text?.split('|')[0];
export const reviewByID = (reviews, id) => reviews.find((el) => el?._id === id);

export const reviewsTop = (reviews, number) => {
    let filtered = reviews.filter((item) => {
        return reviewRating(item?.text) > 0;
    });

    return filtered;
};

export const reviewersTop = (reviews, users, number) => {
    let filteredReviews = reviews.filter((item) => {
        return reviewRating(item?.text) > 0;
    });

    let authorIDs = filteredReviews.map((item, index) => item?.author?._id);

    let authorIDsCount = authorIDs.reduce((acc, val) => {
        acc[val] = acc[val] === undefined ? 1 : (acc[val] += 1);
        return acc;
    }, {});

    let topReviewersIDs = Object.keys(authorIDsCount)
        .sort(function (a, b) {
            return authorIDsCount[b] - authorIDsCount[a];
        })
        .slice(0, 5);

    let topReviewers = users.filter((user, index) => topReviewersIDs.includes(user?._id));

    return topReviewers;
};

export const reviewsByUser = (reviews, user) => {
    return reviews.filter((review) => review?.author._id === user?._id);
};

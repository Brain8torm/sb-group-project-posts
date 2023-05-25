export const movieYear = (text) => {
    let text_data = text?.split('|');

    return text_data[1]?.split(': ')[1];
};

export const movieCountry = (text, single = true) => {
    let text_data = text?.split('|');
    let country = text_data[3]?.split(': ')[1];

    return single ? country?.split(', ')[0] : country;
};

export const movieDirector = (text) => {
    let text_data = text?.split('|');

    return text_data[2]?.split(': ')[1];
};

export const movieRatingKP = (text) => {
    let text_data = text?.split('|');

    return Number(text_data[5]?.split(': ')[1]).toFixed(2);
};

export const movieGenres = (text) => {
    let text_data = text?.split('|');

    return text_data[4]?.split(': ')[1].split(', ');
};

export const movieYears = (movies) => {
    let years = [];
    movies.forEach((movie, index) => {
        years.push(movieYear(movie.text));
    });

    return [...new Set(years)].sort((a, b) => b - a);
};

export const movieAllGenres = (movies) => {
    let genres = [];
    movies.forEach((movie, index) => {
        genres.push(movieGenres(movie.text)[0]);
    });

    return [...new Set(genres)].sort((a, b) => a.localeCompare(b));
};


export const movieTop = (movies, number = 10) => {
    return [...movies]?.sort((a, b) => {
        const ratingA = movieRatingKP(a?.text);
        const ratingB = movieRatingKP(b?.text);
        return ratingA < ratingB ? 1 : ratingB < ratingA ? -1 : 0;
    }).slice(0, 10);
}


export const movieYear = (text) => {
    let text_data = text?.split('|');

    return text_data[1]?.split(': ')[1];
}

export const movieCountry = (text, single = true) => {
    let text_data = text?.split('|');
    let country = text_data[3]?.split(': ')[1];

    return single ? country.split(', ')[0] : country;
}

export const movieDirector = (text) => {
    let text_data = text?.split('|');

    return text_data[2]?.split(': ')[1];
}

export const movieRatingKP = (text) => {
    let text_data = text?.split('|');

    return Number(text_data[5]?.split(': ')[1]).toFixed(2);
}
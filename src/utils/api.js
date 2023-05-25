import { config } from './config';

class Api {
    #baseUrl;
    #headers;

    constructor({ baseUrl, headers }) {
        this.#baseUrl = baseUrl;
        this.#headers = headers;
    }

    #onResponse(res) {
        return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
    }

    #getApiUrl(path) {
        return `${this.#baseUrl}${path}`;
    }

    getUserInfo() {
        return fetch(this.#getApiUrl('/users/me'), {
            headers: this.#headers,
        }).then(this.#onResponse);
    }

    getPostsList() {
        return fetch(this.#getApiUrl('/posts'), {
            headers: this.#headers,
        }).then(this.#onResponse);
    }

    getReviews() {
        return fetch(this.#getApiUrl(`/posts/comments/`), {
            headers: this.#headers,
        }).then(this.#onResponse);
    }

    getAllInfo() {
        return Promise.all([this.getPostsList(), this.getUserInfo(), this.getReviews()]);
    }

    search(searchQuery) {
        return fetch(this.#getApiUrl(`/posts/search?query=${searchQuery}`), {
            headers: this.#headers,
        }).then(this.#onResponse);
    }

    setUserInfo(postData) {
        return fetch(this.#getApiUrl('/users/me'), {
            method: 'PATCH',
            headers: this.#headers,
            body: JSON.stringify(postData),
        }).then(this.#onResponse);
    }

    changeLikePostStatus(postID, like) {
        return fetch(this.#getApiUrl(`/posts/likes/${postID}`), {
            method: like ? 'DELETE' : 'PUT',
            headers: this.#headers,
        }).then(this.#onResponse);
    }

    getPostById(postID) {
        return fetch(this.#getApiUrl(`/posts/${postID}`), {
            headers: this.#headers,
        }).then(this.#onResponse);
    }

    getPostComments(postID) {
        return fetch(this.#getApiUrl(`/posts/comments/${postID}`), {
            headers: this.#headers,
        }).then(this.#onResponse);
    }

    getInfoPost(postID) {
        return Promise.all([
            this.getPostById(postID),
            this.getPostComments(postID),
        ]);
    }

    deletePostById(postID) {
        return fetch(this.#getApiUrl(`/posts/${postID}`), {
            headers: this.#headers,
            method: 'DELETE',
        }).then(this.#onResponse);
    }

    addPost(postData) {
        return fetch(this.#getApiUrl('/posts'), {
            headers: this.#headers,
            method: 'POST',
            body: JSON.stringify(postData),
        }).then(this.#onResponse);
    }

    editPost(posID, postData) {
        return fetch(this.#getApiUrl(`/posts/${posID}`), {
            headers: this.#headers,
            method: 'PATCH',
            body: JSON.stringify(postData),
        }).then(this.#onResponse);
    }




    addReview(postID, reviewData) {
        return fetch(this.#getApiUrl(`/posts/comments/${postID}`), {
            headers: this.#headers,
            method: 'POST',
            body: JSON.stringify(reviewData),
        }).then(this.#onResponse);
    }

    deleteReviewById(postID, reviewID) {
        return fetch(this.#getApiUrl(`/posts/comments/${postID}/${reviewID}`), {
            headers: this.#headers,
            method: 'DELETE',
        }).then(this.#onResponse);
    }

    register(data) {
        return fetch(this.#getApiUrl(`/signup`), {
            method: 'POST',
            headers: this.#headers,
            body: JSON.stringify(data),
        }).then(this.#onResponse);
    }

    authorize(data) {
        return fetch(this.#getApiUrl(`/signin`), {
            method: 'POST',
            headers: this.#headers,
            body: JSON.stringify(data),
        }).then(this.#onResponse);
    }

    checkToken(token) {
        return fetch(this.#getApiUrl(`/users/me`), {
            headers: { ...this.#headers, authorization: `Bearer ${token}` },
        }).then(this.#onResponse);
    }

    getUsers() {
        return fetch(this.#getApiUrl(`/users`), {
            headers: this.#headers,
        }).then(this.#onResponse);
    }

    changeUserAvatar(data) {
        return fetch(this.#getApiUrl(`/users/me/avatar`), {
            method: 'PATCH',
            headers: this.#headers,
            body: JSON.stringify(data),
        }).then(this.#onResponse);
    }
}

const api = new Api({
    baseUrl: config.apiUrl,
    headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${config.apiToken}`,
    },
});

export default api;

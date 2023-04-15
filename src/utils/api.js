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
  
    getAllInfo() {
      return Promise.all([this.getPostsList(), this.getUserInfo()]);
    }
  
    search(searchQuery) {
      return fetch(this.#getApiUrl(`/posts/search?query=${searchQuery}`), {
        headers: this.#headers,
      }).then(this.#onResponse);
    }
  
    setUserInfo({ name, about }) {
      return fetch(this.#getApiUrl('/users/me'), {
        method: 'PATCH',
        headers: this.#headers,
        body: JSON.stringify({ name, about }),
      }).then(this.#onResponse);
    }
  
    changeLikePostStatus(postID, like) {
      return fetch(this.#getApiUrl(`/posts/likes/${postID}`), {
        method: like ? 'DELETE' : 'PUT',
        headers: this.#headers,
      }).then(this.#onResponse);
    }
  
    getPostById(postID) {
      return fetch(this.#getApiUrl(`/post/${postID}`), {
        headers: this.#headers
      }).then(this.#onResponse);
    }
  
    getInfoProduct(postID) {
      return Promise.all([this.getPostById(postID), this.getUserInfo()]);
    }
  }
  
  const api = new Api({
    baseUrl: config.apiUrl,
    headers: {
      'content-type': 'application/json',
      authorization: config.apiToken,
    },
  });
  
  export default api;
  
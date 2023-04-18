import { useEffect, useState } from 'react';
import classNames from 'classnames';
import styles from "./app.module.css";
import api from '../../utils/api';
import { Header } from '../header';
import { Footer } from '../footer';
import { HomePage } from '../../pages/home';
import { isLiked } from '../../utils/posts';

export function App() {
  const [posts, setPosts] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  function handlePostLike(post) {
    const like = isLiked(post.likes, currentUser._id);

    api.changeLikePostStatus(post._id, like)
      .then((updatePost) => {
        const newPosts = posts.map(postState => {
          return postState._id === updatePost._id ? updatePost : postState;
        });

        setPosts(newPosts);
      })
  }

  function handlePostDelete(post) {
    api.deletePostById(post._id).then((deletedPost) => {
      const newPosts = posts.filter(postState => {
        return postState._id !== deletedPost._id;
      });

      setPosts(newPosts);
    });
  }

  useEffect(() => {
    api.getAllInfo()
      .then(([postsData, userInfoData]) => {
        setCurrentUser(userInfoData);
        setPosts(postsData);
      })
      .catch(err => console.log(err))
  }, []);

  return (
    <>
      <Header currentUser={currentUser} />

      <main className={classNames(styles.section_large)}>
        <HomePage posts={posts} onPostLike={handlePostLike} currentUser={currentUser} onPostDelete={handlePostDelete} />
      </main>

      <Footer />
    </>
  );
}
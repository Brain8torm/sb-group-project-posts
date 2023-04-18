import { useEffect, useState } from 'react';
import classNames from 'classnames';
import styles from "./app.module.css";
import api from '../../utils/api';
import { Header } from '../header';
import { Footer } from '../footer';
import { HomePage } from '../../pages/home';

export function App() {
  const [posts, setPosts] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

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
        <HomePage posts={posts} />
      </main>

      <Footer />
    </>
  );
}
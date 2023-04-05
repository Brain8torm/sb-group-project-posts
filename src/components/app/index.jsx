import { Header } from '../header';
import { Footer } from '../footer';
import styles from "./app.module.css";
import classNames from 'classnames';
import { HomePage } from '../../pages/home';

import { useState } from 'react';
import { postData } from '../../posts';
 
export function App() {
  const [posts, setPosts] = useState(postData);

  return (
    <>
      <Header />

      <main className={classNames(styles.section_large)}>
        <HomePage posts={postData} />
      </main>

      <Footer />
    </>
  );
}
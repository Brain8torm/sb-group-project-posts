import { useEffect, useState } from 'react';
import classNames from 'classnames';
import styles from "./app.module.css";
import api from '../../utils/api';
import { Header } from '../header';
import { Footer } from '../footer';
import { HomePage } from '../../pages/home';
import { isLiked } from '../../utils/posts';
import { SinglePostPage } from '../../pages/post';
import { Route, Routes } from 'react-router-dom';
import { NotFoundPage } from '../../pages/not-found';
import { ProfilePage } from '../../pages/profile';
import { UserContext } from '../../contexts/current-user-context';
import { PostsContext } from '../../contexts/post-context';
import { NotifyContext } from '../../contexts/notify-context';
import B8Notify from '../notify';
import { FormAddPost } from '../forms';

export function App() {
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [notifyStatus, setNotifyStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false)

  function handlePostLike(post) {
    const like = isLiked(post.likes, currentUser._id);

    api.changeLikePostStatus(post._id, like)
      .then((updatePost) => {
        const newPosts = posts.map(postState => {
          return postState._id === updatePost._id ? updatePost : postState;
        });

        if (like) {
          setNotifyStatus({ status: 'error', msg: 'Лайк снят' });
        } else {
          setNotifyStatus({ status: 'success', msg: 'Лайк поставлен' });
        }

        setPosts(newPosts);
      })
  }

  function handleSwitchChange(type) {

    let newPosts = null;
    const oldPosts = allPosts;

    if (type === 'my') {
      newPosts = posts.filter((post) => {
        if (post?.author._id === currentUser?._id) {
          return true;
        } else return false;
      });
      setPosts(newPosts);
    } else {
      setPosts(oldPosts);
    }

  }

  function handlePostDelete(post) {
    api.deletePostById(post._id).then((deletedPost) => {
      const newPosts = posts.filter(postState => {
        return postState._id !== deletedPost._id;
      });
      setNotifyStatus({ status: 'error', msg: 'Пост удален' });

      setPosts(newPosts);
    });
  }

  function handlePostsSwitch() {

  }

  useEffect(() => {
    setIsLoading(true)
    api.getAllInfo()
      .then(([postsData, userInfoData]) => {
        setCurrentUser(userInfoData);
        setAllPosts(postsData);
      })
      .catch(err => console.log(err))
      .finally(() => { setIsLoading(false) });
  }, []);


  useEffect(() => {
    const myPosts = allPosts.filter((post) => {
      return post.author._id === currentUser._id;
    });
    setPosts(myPosts);
  }, [allPosts]);

  const cbSubmitFormAddPost = (dataForm) => {
    let movieData = [];
    let postData = {
      title: '',
      text: '',
      image: ''
    };

    Object.keys(dataForm).find((a) => {
      
      if (a.includes("movie")) {
        if (a === 'movie-year') {
          movieData.push(`Год: ${dataForm[a]}`);
        } else if (a === 'movie-director') {
          movieData.push(`Режиссер: ${dataForm[a]}`);
        } else if (a === 'movie-country') {
          movieData.push(`Страна: ${dataForm[a]}`);
        } else if (a === 'movie-genre') {
          movieData.push(`Жанр: ${dataForm[a]}`);
        } else if (a === 'movie-kp') {
          movieData.push(`КП: ${dataForm[a]}`);
        } else if (a === 'movie-imdb') {
          movieData.push(`IMDb: ${dataForm[a]}`);
        } else if (a === 'movie-actors') {
          movieData.push(`В ролях: ${dataForm[a]}`);
        }
      };
    });

    postData.title = dataForm.title;
    postData.text = dataForm.text + '|' + movieData.join('|');
    postData.image = dataForm.image;
    
    api.addPost(postData).then(() => {
      setNotifyStatus({ status: 'success', msg: 'Пост добавлен' });
    }).catch(err => console.log(err));
    console.log(dataForm);
  };


  return (
    <NotifyContext.Provider value={{ setNotifyStatus }}>
      <PostsContext.Provider value={
        {
          posts,
          isLoading,
          onPostLike: handlePostLike,
          onPostDelete: handlePostDelete,
          onPostsSwitch: handlePostsSwitch
        }
      }>
        <UserContext.Provider value={{ currentUser }}>
          <Header currentUser={currentUser} isLoading={isLoading} />

          <main className={classNames(styles.section_large)}>
            <Routes>
              <Route path='/' element={<HomePage isLoading={isLoading} handleSwitchChange={handleSwitchChange} />} />
              <Route path='/post/:postID' element={<SinglePostPage />} />
              <Route path='/profile' element={<ProfilePage />} />
              <Route path='/add-post' element={<FormAddPost onSubmit={cbSubmitFormAddPost} />}></Route>
              <Route path='*' element={<NotFoundPage />} />
            </Routes>
          </main>

          <Footer />
          <B8Notify status={notifyStatus?.status} msg={notifyStatus?.msg} />

        </UserContext.Provider >
      </PostsContext.Provider>
    </NotifyContext.Provider>
  );
}
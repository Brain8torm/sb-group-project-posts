import { useEffect, useState } from 'react';
import classNames from 'classnames';
import styles from './app.module.css';
import api from '../../utils/api';
import { Header } from '../header';
import { Footer } from '../footer';
import { HomePage } from '../../pages/home';
import { isLiked, isMoviePosts } from '../../utils/posts';
import { SinglePostPage } from '../../pages/post';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { NotFoundPage } from '../../pages/not-found';
import { ProfilePage } from '../../pages/profile';
import { UserContext } from '../../contexts/current-user-context';
import { PostsContext } from '../../contexts/posts-context';
import { NotifyContext } from '../../contexts/notify-context';
import B8Notify from '../notify';
import { FormAddPost, FormChangeAvatar, FormEditReview } from '../forms';
import { B8Modal } from '../modal';
import { Login } from '../login';
import { Register } from '../register';
import { AddPostPage } from '../../pages/add-post';
import { EditPostPage } from '../../pages/edit-post';
import { FormEditPost } from '../forms/edit-post';
import { ActionsContext } from '../../contexts/actions-context';
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';
import { getLocalData } from '../../utils/localStorage';
import { FormAddReview } from '../forms/add-review';
import { AddReviewPage } from '../../pages/add-review';
import { FormEditProfile } from '../forms/edit-profile';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { FavoritesPage } from '../../pages/favorites';
import { ReviewsPage } from '../../pages/reviews';
import { MoviesPage } from '../../pages/movies';
import { EditReviewPage } from '../../pages/edit-review';
import { useDebounce } from '../../hooks/useDebounce';

export function App() {
    const [posts, setPosts] = useState([]);
    const [allPosts, setAllPosts] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [allUsers, setAllUsers] = useState([]);
    const [favoritePosts, setFavoritePosts] = useState([]);
    const [notifyStatus, setNotifyStatus] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [quickActions, setQuickActions] = useState([]);
    const [updatedPost, setUpdatedPost] = useState(null);
    const [currentSort, setCurrentSort] = useState('');
    const [currentFilter, setCurrentFilter] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const debounceSearchQuery = useDebounce(searchQuery, 300);

    const navigate = useNavigate();
    const location = useLocation();

    const backgroundLocation = location.state?.backgroundLocation;
    const initialPath = location.state?.initialPath;

    dayjs.locale('ru');

    function handlePostLike(post) {
        const like = isLiked(post.likes, currentUser._id);

        api.changeLikePostStatus(post._id, like).then((updatePost) => {
            const newPosts = posts.map((postState) => {
                return postState._id === updatePost._id ? updatePost : postState;
            });

            setPosts(newPosts);

            if (like) {
                setFavoritePosts((prevState) =>
                    prevState.filter((post) => post._id !== updatePost._id)
                );
                setNotifyStatus({ status: 'error', msg: 'Лайк снят' });
            } else {
                setFavoritePosts((prevState) => [...prevState, updatePost]);
                setNotifyStatus({ status: 'success', msg: 'Лайк поставлен' });
            }
        });
    }

    function handleSwitchChange(type) {
        let newPosts = null;
        const oldPosts = allPosts;

        /* TODO: Использовать isMoviePosts /src/utils/posts.js */
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
        api.deletePostById(typeof post === 'object' ? post._id : post).then((deletedPost) => {
            const newPosts = posts.filter((postState) => {
                return postState._id !== deletedPost._id;
            });
            setNotifyStatus({ status: 'error', msg: 'Пост удален' });
            setPosts(newPosts);
        });
    }

    function handleReviewDelete(review, post) {
        api.deleteReviewById(review, post).then((deletedReview) => {
            const newReviews = reviews?.filter((reviewState) => {
                return reviewState._id === deletedReview._id;
            });
            setNotifyStatus({ status: 'error', msg: 'Отзыв удален' });
            setReviews(newReviews);
        });
    }

    function handlePostsSwitch() {}

    const handlePostPublish = (postId, data) => {
        let isPublished = data !== 'true' ? true : false;

        return api.editPost(postId, { isPublished: isPublished }).then((updatePost) => {
            const newPosts = posts.map((postState) => {
                return postState._id === updatePost._id ? updatePost : postState;
            });

            setPosts(newPosts);
            setNotifyStatus({
                status: 'info',
                msg: `Пост ${updatePost.isPublished ? 'опубликован' : 'снят с публикации'}`,
            });
            return updatePost;
        });
    };

    const onCloseRoutingModal = () => {
        navigate(initialPath || '/', { replace: true });
    };

    useEffect(() => {
        setIsLoading(true);
        api.getAllInfo()
            .then(([postsData, userInfoData, reviewsData]) => {
                setCurrentUser(userInfoData);
                setAllPosts(postsData);
                const favoritePosts = postsData.filter((post) => {
                    return (
                        post.author._id === userInfoData._id &&
                        isLiked(post.likes, userInfoData._id)
                    );
                });
                setFavoritePosts(favoritePosts);
                let filteredReviews = reviewsData
                    .filter((item, index) => item?.author.group === 'group-11')
                    .sort((a, b) => a?.created_at < b?.created_at);
                setReviews(filteredReviews);
            })
            .catch((err) => console.log(err))
            .finally(() => {
                setIsLoading(false);
            });

        api.getUsers()
            .then((usersData) => {
                let filteredUsers = usersData.filter(
                    (user, index) => user?.group && user?.group === 'group-11'
                );
                setAllUsers(filteredUsers);
            })
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        const myPosts = allPosts?.filter((post) => {
            return post.author._id === currentUser._id;
        });
        setPosts(myPosts);
    }, [allPosts]);

    useEffect(() => {
        handleSearchRequest();
    }, [debounceSearchQuery]);

    function handleSearchRequest() {
        //const beforeSearchPosts = posts;
        //if (searchQuery) {
            api.search(debounceSearchQuery).then((dataSearch) => {
                setPosts(isMoviePosts(dataSearch));
            });
        //} else {
            //setPosts(beforeSearchPosts);
        //}
    }

    const cbSubmitFormAddPost = (dataForm) => {
        let movieData = [];
        let postData = {
            title: '',
            text: '',
            image: '',
            tags: [],
        };

        Object.keys(dataForm).find((a) => {
            if (a.includes('movie')) {
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
            }
        });

        postData.title = dataForm.title;
        postData.text = dataForm.text + '|' + movieData.join('|');
        postData.image = dataForm.image;
        postData.tags = dataForm.tags;

        api.addPost(postData)
            .then((newPost) => {
                setNotifyStatus({ status: 'success', msg: 'Пост добавлен' });

                const newPosts = [newPost, ...posts];

                setPosts(newPosts);
                setTimeout(() => {
                    navigate(initialPath || '/', { replace: true });
                }, 500);
            })
            .catch((err) => console.log(err));
    };

    const cbSubmitFormEditPost = (dataForm) => {
        let currentPost = getLocalData('currentPost');

        let movieData = [];
        let postData = {
            title: '',
            text: '',
            image: '',
            tags: [],
        };

        Object.keys(dataForm).find((a) => {
            if (a.includes('movie')) {
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
            }
        });

        postData.title = dataForm.title;
        postData.text = dataForm.text + '|' + movieData.join('|');
        postData.image = dataForm.image;
        postData.tags = dataForm.tags;

        const diff = Object.entries(postData).reduce((acc, [key, value]) => {
            if (
                !Object.values(postData).includes(value) ||
                !Object.values(currentPost).includes(value)
            )
                acc[key] = value;

            return acc;
        }, {});

        api.editPost(currentPost._id, diff).then((editedPost) => {
            setNotifyStatus({ status: 'success', msg: 'Пост изменен' });
            setUpdatedPost(editedPost);
            setTimeout(() => {
                navigate(initialPath || '/', { replace: true });
            }, 500);
        });
    };

    const cbSubmitFormAddReview = (dataForm) => {
        let currentPost = getLocalData('currentPost');
        let ratingData = dataForm?.rating ? `|Рейтинг:${dataForm.rating}` : '';
        dataForm.text = dataForm.text + ratingData;
        delete dataForm.rating;

        api.addReview(currentPost?._id, dataForm).then((ReviewedPost) => {
            setNotifyStatus({ status: 'success', msg: 'Отзыв добавлен' });
            setUpdatedPost(ReviewedPost);
            setTimeout(() => {
                navigate(initialPath || '/', { replace: true });
            }, 500);
        });
    };

    const cbSubmitFormEditReview = (dataForm) => {
        /*let ratingData = dataForm?.rating ? `|Рейтинг:${dataForm.rating}` : '';
        dataForm.text = dataForm.text + ratingData;
        delete dataForm.rating;*/
        // TODO: нет API редактирования отзыва
    };

    const cbSubmitFormChangeAvatar = (dataForm) => {
        api.changeUserAvatar(dataForm).then((userData) => {
            setCurrentUser(userData);
            setTimeout(() => {
                navigate(initialPath || '/', { replace: true });
            }, 500);
        });
    };

    const cbSubmitFormEditProfile = (dataForm) => {
        api.setUserInfo(dataForm).then((userData) => {
            setCurrentUser(userData);
            setTimeout(() => {
                navigate(initialPath || '/', { replace: true });
            }, 500);
        });
    };

    const cbSubmitFormLoginRegister = (dataForm) => {
        console.log('cbSubmitFormLoginRegister', dataForm);
    };
    const cbSubmitFormLogin = (dataForm) => {
        console.log('cbSubmitFormLogin', dataForm);
    };
    const cbSubmitFormResetPassword = (dataForm) => {
        console.log('cbSubmitFormResetPassword', dataForm);
    };

    const handleClickButtonLogin = (e) => {
        e.preventDefault();
        navigate('/login', {
            replace: true,
            state: { backgroundLocation: { ...location, state: null }, initialPath },
        });
    };
    const handleClickButtonReset = (e) => {
        e.preventDefault();
        navigate('/reset-password', {
            replace: true,
            state: { backgroundLocation: { ...location, state: null }, initialPath },
        });
    };
    const handleClickButtonRegister = (e) => {
        e.preventDefault();
        console.log('register click');
        navigate('/register', {
            replace: true,
            state: { backgroundLocation: { ...location, state: null }, initialPath },
        });
    };
    const handleClickButtonResetNotModal = (e) => {
        e.preventDefault();
        navigate('/reset-password');
    };
    const handleClickButtonRegisterNotModal = (e) => {
        e.preventDefault();
        navigate('/register');
    };
    const handleClickButtonLoginNotModal = (e) => {
        e.preventDefault();
        navigate('/login');
    };

    function sortedData(currentSort) {
        let sorted;

        if (currentSort === 'По названию') {
            setPosts(posts?.sort((a, b) => (a.title > b.title ? 1 : b.title > a.title ? -1 : 0)));
        }

        if (currentSort === 'По лайкам') {
            posts?.sort((a, b) =>
                a.likes.length < b.likes.length ? 1 : b.likes.length < a.likes.length ? -1 : 0
            );
        }

        if (currentSort === 'По отзывам') {
            posts?.sort((a, b) =>
                a.comments.length < b.comments.length
                    ? 1
                    : b.comments.length < a.comments.length
                    ? -1
                    : 0
            );
        }

        if (currentSort === 'По году выпуска') {
            posts?.sort((a, b) => {
                const yearA = +a?.text.split('|')[1].split(':')[1];
                const yearB = +b?.text.split('|')[1].split(':')[1];

                return yearA < yearB ? 1 : yearB < yearA ? -1 : 0;
            });
        }

        // TODO: переписать с учетом методов в ./src/utils/movies.js
        if (currentSort === 'По рейтингу') {
            posts?.sort((a, b) => {
                const yearA = a?.text.split('|')[5].split(':')[1];
                const yearB = b?.text.split('|')[5].split(':')[1];
                return yearA < yearB ? 1 : yearB < yearA ? -1 : 0;
            });
        }

        if (currentSort === '') {
            posts?.sort((a, b) =>
                b.created_at > a.created_at ? 1 : a.created_at > b.created_at ? -1 : 0
            );
        }
    }

    return (
        <NotifyContext.Provider value={{ notifyStatus, setNotifyStatus }}>
            <PostsContext.Provider
                value={{
                    posts,
                    isLoading,
                    currentSort,
                    currentFilter,
                    favoritePosts,
                    reviews,
                    searchQuery,
                    setPosts,
                    setAllPosts,
                    setCurrentSort,
                    setCurrentFilter,
                    setSearchQuery,
                    onSortedData: sortedData,
                    onPostLike: handlePostLike,
                    onPostDelete: handlePostDelete,
                    onPostsSwitch: handlePostsSwitch,
                    onPostPublic: handlePostPublish,
                    onReviewDelete: handleReviewDelete,
                }}
            >
                <ActionsContext.Provider value={{ setQuickActions }}>
                    <UserContext.Provider value={{ currentUser, allUsers }}>
                        <Header currentUser={currentUser} isLoading={isLoading} />

                        <main className={classNames(styles.section_large)}>
                            <Routes
                                location={
                                    (backgroundLocation && {
                                        ...backgroundLocation,
                                        pathname: initialPath,
                                    }) ||
                                    location
                                }
                            >
                                <Route path="/" element={<HomePage />} />
                                <Route
                                    path="/movies"
                                    element={
                                        <MoviesPage
                                            isLoading={isLoading}
                                            handleSwitchChange={handleSwitchChange}
                                        />
                                    }
                                />
                                <Route
                                    path="/favorites"
                                    element={<FavoritesPage isLoading={isLoading} />}
                                />
                                <Route
                                    path="/reviews"
                                    element={<ReviewsPage isLoading={isLoading} />}
                                />
                                <Route
                                    path="/post/:postID"
                                    element={
                                        <SinglePostPage
                                            updatedPost={updatedPost}
                                            handlePostDelete={handlePostDelete}
                                        />
                                    }
                                />
                                <Route
                                    path="/profile"
                                    element={<ProfilePage handleDeleteClick />}
                                />
                                <Route
                                    path="/add-post"
                                    element={<AddPostPage handleFormSubmit={cbSubmitFormAddPost} />}
                                />
                                <Route
                                    path="/edit-post/:postID"
                                    element={
                                        <EditPostPage handleFormSubmit={cbSubmitFormEditPost} />
                                    }
                                />
                                <Route
                                    path="/add-review"
                                    element={
                                        <AddReviewPage handleFormSubmit={cbSubmitFormAddReview} />
                                    }
                                />
                                <Route
                                    path="/edit-review/:reviewID"
                                    element={
                                        <EditReviewPage handleFormSubmit={cbSubmitFormEditReview} />
                                    }
                                />
                                <Route
                                    path="/login"
                                    element={
                                        <Login
                                            onSubmit={cbSubmitFormLogin}
                                            onNavigateRegister={handleClickButtonRegisterNotModal}
                                            onNavigateReset={handleClickButtonResetNotModal}
                                        />
                                    }
                                />
                                <Route
                                    path="/register"
                                    element={
                                        <Register
                                            onSubmit={cbSubmitFormLoginRegister}
                                            onNavigateLogin={handleClickButtonLoginNotModal}
                                        />
                                    }
                                />
                                <Route path="/reset-password" element={123} />
                                <Route path="/change-avatar" element={<FormChangeAvatar />} />
                                <Route
                                    path="/edit-profile"
                                    element={<FormEditProfile onSubmit={cbSubmitFormEditProfile} />}
                                />

                                <Route path="*" element={<NotFoundPage />} />
                            </Routes>
                        </main>

                        <Footer />

                        <B8Notify status={notifyStatus?.status} msg={notifyStatus?.msg} />

                        <SpeedDial
                            ariaLabel="SpeedDial"
                            sx={{ position: 'fixed', bottom: 16, right: 16 }}
                            icon={<SpeedDialIcon />}
                        >
                            {quickActions.map((action) => (
                                <SpeedDialAction
                                    key={action.name}
                                    icon={action.icon}
                                    tooltipTitle={action.name}
                                />
                            ))}
                        </SpeedDial>

                        {backgroundLocation && (
                            <Routes>
                                <Route
                                    path="/login"
                                    element={
                                        <B8Modal isOpen onClose={onCloseRoutingModal}>
                                            <Login
                                                onSubmit={cbSubmitFormLogin}
                                                onNavigateRegister={handleClickButtonRegister}
                                                onNavigateReset={handleClickButtonReset}
                                            />
                                        </B8Modal>
                                    }
                                />
                                <Route
                                    path="/register"
                                    element={
                                        <B8Modal isOpen onClose={onCloseRoutingModal}>
                                            <Register
                                                onSubmit={cbSubmitFormLoginRegister}
                                                onNavigateLogin={handleClickButtonLogin}
                                            />
                                        </B8Modal>
                                    }
                                />
                                <Route
                                    path="/add-post"
                                    element={
                                        <B8Modal isOpen onClose={onCloseRoutingModal}>
                                            <FormAddPost onSubmit={cbSubmitFormAddPost} />
                                        </B8Modal>
                                    }
                                />
                                <Route
                                    path="/edit-post/:postID"
                                    element={
                                        <B8Modal isOpen onClose={onCloseRoutingModal}>
                                            <FormEditPost onSubmit={cbSubmitFormEditPost} />
                                        </B8Modal>
                                    }
                                />
                                <Route
                                    path="/add-review"
                                    element={
                                        <B8Modal isOpen onClose={onCloseRoutingModal}>
                                            <FormAddReview onSubmit={cbSubmitFormAddReview} />
                                        </B8Modal>
                                    }
                                />
                                <Route
                                    path="/edit-review/:reviewID"
                                    element={
                                        <B8Modal isOpen onClose={onCloseRoutingModal}>
                                            <FormEditReview onSubmit={cbSubmitFormEditReview} />
                                        </B8Modal>
                                    }
                                />
                                <Route
                                    path="/reset-password"
                                    element={<B8Modal isOpen>reset</B8Modal>}
                                />
                                <Route
                                    path="/change-avatar"
                                    element={
                                        <B8Modal isOpen onClose={onCloseRoutingModal}>
                                            <FormChangeAvatar onSubmit={cbSubmitFormChangeAvatar} />
                                        </B8Modal>
                                    }
                                />
                                <Route
                                    path="/edit-profile"
                                    element={
                                        <B8Modal isOpen onClose={onCloseRoutingModal}>
                                            <FormEditProfile onSubmit={cbSubmitFormEditProfile} />
                                        </B8Modal>
                                    }
                                />
                            </Routes>
                        )}
                    </UserContext.Provider>
                </ActionsContext.Provider>
            </PostsContext.Provider>
        </NotifyContext.Provider>
    );
}

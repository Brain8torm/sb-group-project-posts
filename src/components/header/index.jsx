import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import styles from './header.module.css';
import { B8Logo } from '../logo';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { PostsContext } from '../../contexts/posts-context'
import { UserContext } from '../../contexts/current-user-context';
import { Skeleton } from '@mui/material';

export function Header() {

    const { isLoading } = useContext(PostsContext);
    
    const settings = ['Профиль', 'Выход'];

    const { currentUser } = useContext(UserContext);

    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

    const location = useLocation();
    const navigate = useNavigate();

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = (e) => {
        navigate(e.target.getAttribute('href'), { replace: true });
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <>
            <AppBar position="sticky">
                <Container maxWidth="lg">
                    <Toolbar disableGutters>
                        {isLoading ? (
                            <Skeleton sx={{ height: 36 }} animation="wave" variant="rectangular" />
                        ) : (
                            <B8Logo altText="movieDb" link="./" />
                        )}
                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}
                            >
                                <MenuItem
                                    className={styles.menu_item}
                                    onClick={handleCloseNavMenu}
                                    href="/movies"
                                >
                                    <Typography textAlign="center">Все фильмы</Typography>
                                </MenuItem>
                                <MenuItem
                                    className={styles.menu_item}
                                    onClick={handleCloseNavMenu}
                                    href="/favorites"
                                >
                                    <Typography textAlign="center">Избранное</Typography>
                                </MenuItem>
                                <MenuItem
                                    className={styles.menu_item}
                                    onClick={handleCloseNavMenu}
                                    href="/reviews"
                                >
                                    <Typography textAlign="center">Отзывы</Typography>
                                </MenuItem>
                            </Menu>
                        </Box>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, gap: 1.5 }}>
                            <Link to="/movies" className={styles.nav_link}>
                                Все фильмы
                            </Link>
                            <Link to="/favorites" className={styles.nav_link}>
                                Избранное
                            </Link>
                            <Link to="/reviews" className={styles.nav_link}>
                                Отзывы
                            </Link>
                        </Box>
                        <Box sx={{ flexGrow: 0, marginLeft: 'auto' }}>
                            <Box display="inline-flex" sx={{ marginRight: 2 }}>
                                <Link
                                    to="/login"
                                    replace
                                    state={{
                                        backgroundLocation: location,
                                        initialPath: location.pathname,
                                    }}
                                    className={styles.link_button}
                                >
                                    Войти
                                </Link>
                            </Box>
                            <Tooltip title="Открыть меню">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    {isLoading ? (
                                        <Skeleton
                                            animation="wave"
                                            variant="circular"
                                            width={40}
                                            height={40}
                                        />
                                    ) : (
                                        <>
                                            {currentUser?.avatar ? (
                                                <Avatar
                                                    alt={currentUser?.name}
                                                    src={currentUser?.avatar}
                                                />
                                            ) : (
                                                <Avatar>{currentUser?.name}</Avatar>
                                            )}
                                        </>
                                    )}
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                <Box sx={{ padding: '6px 16px' }}>{currentUser?.name}</Box>
                                <Box sx={{ padding: '6px 16px' }}>{currentUser?.about}</Box>
                                {settings.map((setting) =>
                                    setting === 'Профиль' ? (
                                        <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                            <Link
                                                to="/profile"
                                                key={setting}
                                                onClick={handleCloseUserMenu}
                                            >
                                                {setting}
                                            </Link>
                                        </MenuItem>
                                    ) : (
                                        <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                            <Typography textAlign="center">{setting}</Typography>
                                        </MenuItem>
                                    )
                                )}
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </>
    );
}

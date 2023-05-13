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
import { Link, useLocation } from 'react-router-dom';

import { Skeleton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../storage/user-slice';

export function Header({ isLoading }) {
    const settings = ['Профиль', 'Выход'];

    const currentUser = useSelector(state => state.user.data);



    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

    const dispatch = useDispatch();
    const location = useLocation();




    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <>
            <AppBar position="static">
                <Container maxWidth="lg">
                    <Toolbar>
                        {isLoading ? (
                            <Skeleton sx={{ height: 36 }} animation="wave" variant="rectangular" />
                        ) : (
                            <B8Logo altText="LOGO" link="/" />
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
                                <MenuItem onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">{'menu'}</Typography>
                                </MenuItem>
                            </Menu>

                        </Box>
                        <Box sx={{ flexGrow: 0, marginLeft: 'auto' }}>
                            {!currentUser &&
                                <Box display='inline-flex' sx={{ marginRight: 2 }}>
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
                            }
                            {currentUser &&
                                <>
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
                                                <MenuItem href='/' key={setting} onClick={() => dispatch(logout())}>
                                                    <Typography textAlign="center">{setting}</Typography>
                                                </MenuItem>
                                            )
                                        )}
                                    </Menu>
                                </>
                            }
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </>
    );
}

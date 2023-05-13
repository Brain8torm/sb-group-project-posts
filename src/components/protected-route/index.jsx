import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { Spinner } from '../spinner';

export function ProtectedRoute({ onlyUnAuth, children }) {

    const location = useLocation();

    const currentUser = useSelector(state => state.user.data);
    const isAuthChecked = useSelector(state => state.user.isAuthChecked);

    if (!isAuthChecked) return <Spinner />

    if (onlyUnAuth && currentUser) {
        const { from } = location.state || { from: { pathname: '/' } }
        const { backgroundLocation } = location?.state?.from?.state || { backgroundLocation: null }
        return <Navigate replace to={from} state={{ backgroundLocation }} />
    }

    if (!onlyUnAuth && !currentUser) {
        return (
            <Navigate replace to={{ pathname: '/login' }} state={{ from: location }} />
        )

    }

    return children;
}

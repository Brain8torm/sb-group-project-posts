import { Container } from '@mui/material';
import { Login } from '../../components/login';

export function LoginPage({ onSubmit, onNavigateRegister, onNavigateReset }) {
    return (
        <Container maxWidth="lg">
            <h3>Войти на сайт</h3>
            <Login
                onSubmit={onSubmit}
                onNavigateRegister={onNavigateRegister}
                onNavigateReset={onNavigateReset} />
        </Container>
    );
}

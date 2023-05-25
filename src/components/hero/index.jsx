import { Button } from '@mui/material';
import styles from './hero.module.css';

import heroImage from './images/hero.png';
import classNames from 'classnames';

export function Hero() {
    return (
        <div className={classNames(styles.wrapper, styles.dark)}>
            <img src={heroImage} alt="" className={styles.image} />
            <div className={styles.overlay}>
                <h1 className={styles.title}>Социальная сеть киноманов</h1>
                <div className={styles.lead}>
                    Добавляй в списки любимые или новые фильмы, оставляй отзывы, общайся!
                </div>
                <div className={styles.actions}>
                    <Button color='secondary' variant='contained'>Начать сейчас!</Button>
                </div>
            </div>
        </div>
    );
}

import classNames from 'classnames';
import styles from './scroll-top.module.css';
import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined';
import { useState } from 'react';


export function ScrollTop() {
    const [visible, setVisible] = useState(false)

    const handleScrollTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 300) {
            setVisible(true)
        }
        else if (scrolled <= 300) {
            setVisible(false)
        }
    };

    window.addEventListener('scroll', toggleVisible);

    return (
        <button
            className={
                classNames('scroll-top', styles.button, !visible && styles.hidden)
            }
            onClick={handleScrollTop}
        >
            <ArrowUpwardOutlinedIcon />
        </button>
    );
}

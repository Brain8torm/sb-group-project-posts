import styles from './page-h1.module.css';

export const PageH1 = ({ content }) => {
    return <h1 className={styles.page_title}>{content}</h1>;
};

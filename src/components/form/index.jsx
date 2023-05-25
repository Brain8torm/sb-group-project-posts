import styles from "./form.module.css";

export function Form({ handleFormSubmit, title, children }) {
    return (
        <>
            {title &&
                <h3 className={styles.title}>{title}</h3>
            }
            <form className={styles.item} onSubmit={handleFormSubmit}>
                {children}
            </form>
        </>
    );
}

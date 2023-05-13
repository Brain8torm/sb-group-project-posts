import { Modal } from '@mui/material';
import classNames from 'classnames';
import styles from './modal.module.css';

export function B8Modal({ children, title, isOpen, onClose }) {
    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className='modal'
        >
            <div className={classNames(styles.body, { [styles.active]: isOpen })}>
                {title &&
                    <div className={styles.title}>
                        <h3>{title}</h3>
                    </div>
                }
                {children}
            </div>
        </Modal>
    );
}

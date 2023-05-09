import { Modal } from '@mui/material';
import classNames from 'classnames';
import styles from './modal.module.css';

export function B8Modal({ children, isOpen, onClose }) {
    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className='modal'
        >
            <div className={classNames(styles.body, { [styles.active]: isOpen })}>
                {children}
            </div>
        </Modal>
    );
}

import { Box, Modal, SpeedDial, TextField, Typography } from '@mui/material';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import styles from "./footer.module.css";
import { useState } from 'react';

export function Footer() {
  const [modalOpen, setModalOpen] = useState(false);
  const handleModalOpen = () => {
    console.log('Есть контакт');
  }



  return (
    <>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
        onClick={handleModalOpen}
      >
      </SpeedDial>

    </>
  );
}
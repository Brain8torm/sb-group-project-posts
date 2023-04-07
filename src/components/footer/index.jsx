import { Box, Container, SpeedDial } from '@mui/material';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import styles from "./footer.module.css";
import classNames from 'classnames';
import dayjs from 'dayjs';


export function Footer() {
  /*const [modalOpen, setModalOpen] = useState(false);*/
  const handleModalOpen = () => {
    console.log('Есть контакт');
  }



  return (
    <>
      <Box className={classNames(styles.footer)} component='footer' sx={{
        padding: '25px 0',

      }}>
        <Container maxWidth='lg'>
          &copy; {dayjs().year()}
        </Container>
      </Box>
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
import { Box, Container, SpeedDial, SvgIcon } from '@mui/material';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import styles from "./footer.module.css";
import classNames from 'classnames';
import dayjs from 'dayjs';
import { ScrollTop } from '../scroll-top';

export function Footer() {

  return (
    <>
      <Box className={classNames(styles.footer)} component='footer' sx={{
        padding: '25px 0',

      }}>
        <Container maxWidth='lg'>
          &copy; {dayjs().year()}
        </Container>
      </Box>
      <ScrollTop />
    </>
  );
}
import { Header } from '../header';
import { Footer } from '../footer';
import styles from "./app.module.css";
import classNames from 'classnames';
import { HomePage } from '../../pages/home';

export function App() {
  return (
    <>
      <Header />

      <main className={classNames(styles.section_large)}>
        <HomePage />
      </main>

      <Footer />
    </>
  );
}
import { Header } from '../header';
import { Footer } from '../footer';
import styles from "./app.module.css";
import classNames from 'classnames';

export function App() {
  return (
    <>
      <Header/>
      <main className={classNames(styles.content, 'container')}>
        main
      </main>
      <Footer/>
    </>
  );
}
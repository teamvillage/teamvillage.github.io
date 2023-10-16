import { Link, useRouteError } from "react-router-dom";
import styles from './errorPage.module.scss';

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id={styles.errorPage}>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <Link to={'/login'}>
        <p>Click Here to Start</p>
      </Link>
    </div>
  );
}
import classNames from 'classnames';
import styles from './logo.module.css';
import logoSrc from './images/logo.png';
import { Link } from 'react-router-dom';

export function B8Logo({ altText = '', link = '', className = 'logo' }) {
    const linkValue = link ? link : null;

    let logo = null;
    if (linkValue) {
        logo = (
            <Link replace to={{ pathname: linkValue}}  className={classNames(className, styles.link)}>
                           {logoSrc ? (
                    <img
                        src={logoSrc}
                        alt={altText ? altText : ''}
                        className={classNames('logo', styles.image)}
                    />
                ) : (
                    <span className={classNames(className, styles.text)}>
                        {altText ? altText : 'LOGO'}
                    </span>
                )}
            </Link>
        );
    } else {
        logo = (
            <span className={classNames(className, styles.wrapper)}>
                {logoSrc ? (
                    <img
                        src={logoSrc}
                        alt={altText ? altText : ''}
                        className={classNames('logo', styles.image)}
                    />
                ) : (
                    <span className={classNames(className, styles.text)}>
                        {altText ? altText : 'LOGO'}
                    </span>
                )}
            </span>
        );
    }

    return <>{logo}</>;
}

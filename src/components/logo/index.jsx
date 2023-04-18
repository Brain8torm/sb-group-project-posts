import classNames from 'classnames';
import styles from './logo.module.css';

export function B8Logo({ imageSrc = '', altText = '', link = '', className = 'logo' }) {
    const linkValue = link ? link : null;

    let logo = null;
    if (linkValue) {
        logo = <a href={linkValue} className={classNames(className, styles.link)}>{imageSrc ? <img src={imageSrc} alt={altText ? altText : ''} className={classNames('logo', styles.image)} /> : <span className={classNames(className, styles.text)}>{altText ? altText: 'LOGO'}</span>}</a>
    } else {
        logo = <span className={classNames(className, styles.wrapper)}>{imageSrc ? <img src={imageSrc} alt={altText ? altText : ''} className={classNames('logo', styles.image)} /> : <span className={classNames(className, styles.text)}>{altText ? altText: 'LOGO'}</span>}</span>
    }

    return (
        <>
            {logo}
        </>
       
    );
}

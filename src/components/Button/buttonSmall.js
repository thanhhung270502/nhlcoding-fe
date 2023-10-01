import clsx from 'clsx';
import styles from './button.module.scss';

function ButtonSmall({ content, primary }) {
    const classes = clsx(styles.buttonSmall, {
        [styles.primary]: primary,
        'd-flex': true,
    });

    return <button className={classes}>{content}</button>;
}

export default ButtonSmall;

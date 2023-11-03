import styles from './loading.module.scss';

function Loading() {
    return (
        <div className='h-100 d-flex justify-content-center align-items-center flex-column gap-2'>
            <div className={styles.loader}></div>
            <div className={styles.loading_text}>Loading ...</div>
        </div>
    );
}

export default Loading;
import { faCaretDown, faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUserByID, getUserGoogle, login, logout, logoutGoogle, signup } from '~/api/api';
import { getCookie, setCookie } from '~/api/cookie';
import {
    LoginModal,
    LoginModalTrigger,
    ResetPasswordModal,
    SignupModal,
    SignupModalTrigger,
} from '~/components/Modals/Auth';
import './header.scss';
import clsx from 'clsx';
import styles from './header.module.scss';

import $ from 'jquery';

function Header() {
    const [currentUser, setCurrentUser] = useState();
    const [currentLocation, setCurrentLocation] = useState('');
    const [isChecked, setIsChecked] = useState(false);

    const handleLogout = () => {
        logout();
        window.location.href = './';
    };

    useEffect(() => {
        var navbarItem = $('.navbarItem');
        for (let i = 0; i < navbarItem.length; i++) {
            navbarItem[i].classList.remove('navbarActive');
        }
        const dropdownToggle = () => {
            var dropdownMenu = $('.dropdownMenu');
            if (dropdownMenu[0].classList.contains('dropdownHide')) {
                dropdownMenu[0].classList.remove('dropdownHide');
            } else {
                dropdownMenu[0].classList.add('dropdownHide');
            }
        };
        if (window.location.href === `${process.env.REACT_APP_LOCAL_WEB_URL}/`) {
            navbarItem[0].classList.add('navbarActive');
            // setCurrentLocation('home');
        } else if (window.location.href.indexOf(`/problems`) !== 0) {
            navbarItem[1].classList.add('navbarActive');
            // setCurrentLocation('problems');
        } else if (window.location.href.indexOf(`/contribute`) !== 0) {
            navbarItem[2].classList.add('navbarActive');
            // setCurrentLocation('contribute');
        }
        console.log(window.location.href);
        // setCurrentLocation();
    });

    const handleChangeDarkMode = () => {
        var currentTheme = localStorage.getItem('theme');
        if (currentTheme && currentTheme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            setIsChecked(false);
        } else if (!currentTheme || currentTheme === 'light') {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            setIsChecked(true);
        }
    };

    useEffect(() => {
        const savedCheckedState = localStorage.getItem('theme');
        if (savedCheckedState && savedCheckedState === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            setIsChecked(true);
        }
        // else if (savedCheckedState && savedCheckedState === '')
    }, []);

    useEffect(() => {
        (async () => {
            const user_id = getCookie('user_id');
            if (user_id) {
                await getUserByID(user_id).then((data) => {
                    console.log(data.data.body.user);
                    setCurrentUser(data.data.body.user);
                });
            } else {
                const res = await getUserGoogle();
                if (res.code === 200) {
                    await getUserByID(res.body.data.body.user.id).then(async (data) => {
                        await logoutGoogle();
                        console.log(data.data.body.user);
                        setCookie('user_id', data.data.body.user.id);
                        setCurrentUser(data.data.body.user);
                    });
                } else {
                    console.log('Not');
                    setCurrentUser(null);
                }
            }
        })();
    }, []);

    const dropdownToggle = () => {
        var dropdownMenu = $('.dropdownMenu');
        if (dropdownMenu[0].classList.contains('dropdownHide')) {
            dropdownMenu[0].classList.remove('dropdownHide');
        } else {
            dropdownMenu[0].classList.add('dropdownHide');
        }
    };

    return (
        <div>
            <div className={clsx(styles.navbar)}>
                <div className={clsx(styles.container)}>
                    <Link className={clsx(styles.navbarBrand, styles.navbarLink)} to="/">
                        <img className={clsx('img-fluid', styles.logoImage)} src="/images/logo.png" alt="logo" />
                        <span className={clsx(styles.logoName)}>HNLCoding</span>
                    </Link>
                    <div className={clsx(styles.navbarSeparator)}>|</div>
                    <div className={clsx(styles.navbarNav)}>
                        <div className="navbarItem">
                            <Link className={clsx(styles.navbarLink)} to="/">
                                Home
                            </Link>
                        </div>
                        <div className="navbarItem">
                            <Link className={clsx(styles.navbarLink)} to="/problems">
                                Problems
                            </Link>
                        </div>
                        <div className="navbarItem">
                            <Link className={clsx(styles.navbarLink)} to="/contribute">
                                Contribute
                            </Link>
                        </div>
                    </div>
                    {currentUser && (
                        <div class={clsx(styles.dropdown)}>
                            <div className="dropdownToggle" onClick={dropdownToggle}>
                                {currentUser.avatar && (
                                    <img src={currentUser.avatar} alt="avt" className={clsx(styles.logoImage)}></img>
                                )}
                                {!currentUser.avatar && (
                                    <img
                                        src="https://kenh14cdn.com/203336854389633024/2023/8/9/photo-6-1691581011481133485486.jpg"
                                        alt="avt"
                                        className={clsx(styles.logoImage)}
                                    ></img>
                                )}
                                <div className={clsx(styles.name)}>{currentUser.name}</div>
                                <FontAwesomeIcon icon={faCaretDown} />
                            </div>
                            <div className="dropdownMenu dropdownHide">
                                <div className={clsx(styles.dropdownItem)}>
                                    <Link className={clsx(styles.dropdownLink)} to="">
                                        Profile
                                    </Link>
                                </div>
                                <div
                                    className={clsx(
                                        styles.dropdownItem,
                                        'd-flex',
                                        'align-items-center',
                                        'justify-content-between',
                                    )}
                                >
                                    <div>Dark mode</div>
                                    <label class={clsx(styles.switch)}>
                                        <input type="checkbox" onChange={handleChangeDarkMode} checked={isChecked} />
                                        <span class={clsx(styles.slider, styles.round)}></span>
                                    </label>
                                </div>
                                <div className={clsx(styles.dropdownDivider)}></div>
                                <div className={clsx(styles.dropdownItem)} onClick={handleLogout}>
                                    Logout
                                </div>
                            </div>
                        </div>
                    )}
                    {!currentUser && (
                        <div className={clsx(styles.navbarUser)}>
                            <div className="btn btn-signin btn-text me-3" onClick={() => LoginModalTrigger.open()}>
                                Đăng nhập
                            </div>
                            <div className="btn btn-success btn-text" onClick={() => SignupModalTrigger.open()}>
                                Đăng ký
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <LoginModal />
            <SignupModal />
            <ResetPasswordModal />
        </div>
    );
}

export default Header;

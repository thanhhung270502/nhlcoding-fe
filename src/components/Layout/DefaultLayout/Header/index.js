import { faCaretDown, faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { checkAuth, getUserByID, getUserGoogle, login, logout, logoutGoogle, signup } from '~/api/api';
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
    const [open, setOpen] = useState(false);
    let userMenuRef = useRef();

    const handleLogout = () => {
        logout();
        window.location.href = '/';
    };

    useEffect(() => {
        if (currentUser) {
            let handler = (e) => {
                // if (e.target) {
                if (!userMenuRef.current.contains(e.target)) {
                    setOpen(false);
                }
            };

            document.addEventListener('mousedown', handler);

            return () => {
                document.removeEventListener('mousedown', handler);
            };
        }
    });

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
        if (window.location.href === '/') {
            navbarItem[0].classList.add('navbarActive');
            // setCurrentLocation('home');
        } else if (window.location.href.indexOf(`/problems`) !== 0) {
            navbarItem[1].classList.add('navbarActive');
            // setCurrentLocation('problems');
        } else if (window.location.href.indexOf(`/contribute`) !== 0) {
            navbarItem[2].classList.add('navbarActive');
            // setCurrentLocation('contribute');
        }
        // console.log(window.location.href);
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
    }, []);

    useEffect(() => {
        (async () => {
            var session = localStorage.getItem('session');
            if (session) {
                session = JSON.parse(session);
                const authen = await checkAuth(session.accessToken);
                // console.log(authen);
                if (authen.login === true) {
                    setCurrentUser(session.user);
                }
            } else {
                // console.log('Here');
                await getUserGoogle();
                session = localStorage.getItem('session');
                if (session) {
                    await logoutGoogle();
                    session = JSON.parse(session);
                    const authen = await checkAuth(session.accessToken);
                    if (authen.login === true) {
                        setCurrentUser(session.user);
                    }
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
                        <div class={clsx(styles.dropdown)} ref={userMenuRef}>
                            <div className="dropdownToggle" onClick={() => setOpen(!open)}>
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
                            <div className={`${open ? '' : 'dropdownHide'} dropdownMenu`}>
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
                        <div className="d-flex gap-3">
                            <div className="btn btn-signin btn-text" onClick={() => LoginModalTrigger.open()}>
                                Log in
                            </div>
                            <div className="btn btn-success btn-text" onClick={() => SignupModalTrigger.open()}>
                                Sign up
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

import './home.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { SignupModalTrigger } from '~/components/Modals/Auth';
import { getCookie, setCookie } from '~/api/cookie';
import { getUserByID, getUserGoogle, login, logout, logoutGoogle, signup } from '~/api/api';
import { useEffect, useState } from 'react';

function Home() {
    const [currentUser, setCurrentUser] = useState();
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
    const navigate = useNavigate();
    const handleClickStart = () => {
        if (currentUser) {
            navigate('/problems/1');
        } else {
            SignupModalTrigger.open();
        }
    };

    return (
        <div className="container-fluid p-0 m-0">
            <div className="intro-container">
                <div className="intro-content">
                    <div className="intro-subtitle">GOAL CODING</div>
                    <div className="intro-title">
                        <strong>Questions solving and contributing platform</strong>
                    </div>
                    <div className="intro-info">
                        Solve programming questions, unlock your potential, contribute to the coding community, and
                        achieve your programming goals.
                    </div>
                    <div className="intro-btn btn-custom" onClick={handleClickStart}>
                        Get started
                    </div>
                </div>
                <div className="intro-img-container">
                    <img src="/images/home-intro.png" className="intro-img skeleton" alt="home-pic" />
                </div>
            </div>
            <div className="wwd-container">
                <div className="wwd-title">What We Do</div>
                <div className="wwd-subcontainer">
                    <div className="wwd-content">
                        <div className="wwd-content-title">Practice coding challenges</div>
                        <div className="wwd-content-info">
                            Take your coding skills to the next level with our platform's curated collection of
                            real-world coding challenges. Our dev-friendly content focuses on the problems you would
                            encounter in professional settings, helping you develop practical problem-solving abilities.
                            From algorithms to data structures, our diverse range of challenges caters to all skill
                            levels. Sharpen your coding prowess, overcome obstacles, and be well-prepared for the coding
                            challenges you'll face in your career.
                        </div>
                        <Link className="wwd-content-btn btn-custom" to="/problems">
                            Try a question now
                        </Link>
                    </div>
                    <img src="/images/question-solve.png" alt="" className="wwd-img skeleton" />
                </div>
                <div className="wwd-subcontainer">
                    <img src="/images/question-contribute.png" alt="" className="wwd-img skeleton" />
                    <div className="wwd-content">
                        <div className="wwd-content-title">Contribute your own questions</div>
                        <div className="wwd-content-info">
                            Empower the coding community by contributing your own coding challenges to our platform.
                            With our 'Contribute Your Own Question' feature, you can share your unique problem-solving
                            ideas and engage fellow programmers in solving your challenges. Inspire others with your
                            creativity, test their skills, and foster a collaborative learning environment. Contribute
                            your coding questions today and be a part of shaping the coding landscape with your
                            expertise.
                        </div>
                        <Link to="/contribute" className="wwd-content-btn btn-custom">
                            Contribute a question now
                        </Link>
                    </div>
                </div>
            </div>
            <div className="team-container">
                <div className="team-title">Meet The Team</div>
                <div className="team-members-container">
                    <div className="team-member-container">
                        <div className="team-member-avt border-blue"></div>
                        <div className="team-member-name">Ly Thanh Hung</div>
                        <div className="team-member-desc">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut quam auctor, lacinia erat
                            vel, condimentum.
                        </div>
                        <div className="team-member-contacts btn-custom">
                            <a href="https://www.facebook.com" rel="noreferrer" target="_blank">
                                <FontAwesomeIcon icon={faFacebook} fontSize={32} />
                            </a>
                            <a href="https://www.linkedin.com" rel="noreferrer" target="_blank">
                                <FontAwesomeIcon icon={faLinkedin} fontSize={32} />
                            </a>
                            <a href="https://github.com" rel="noreferrer" target="_blank">
                                <FontAwesomeIcon icon={faGithub} fontSize={32} />
                            </a>
                        </div>
                    </div>
                    <div className="team-member-container">
                        <div className="team-member-avt border-yellow"></div>
                        <div className="team-member-name">Truong Nguyen Khoi Nguyen</div>
                        <div className="team-member-desc">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut quam auctor, lacinia erat
                            vel, condimentum.
                        </div>
                        <div className="team-member-contacts btn-custom bg-yellow">
                            <a href="https://www.facebook.com" rel="noreferrer" target="_blank">
                                <FontAwesomeIcon icon={faFacebook} fontSize={32} />
                            </a>
                            <a href="https://www.linkedin.com" rel="noreferrer" target="_blank">
                                <FontAwesomeIcon icon={faLinkedin} fontSize={32} />
                            </a>
                            <a href="https://github.com" rel="noreferrer" target="_blank">
                                <FontAwesomeIcon icon={faGithub} fontSize={32} />
                            </a>
                        </div>
                    </div>
                    <div className="team-member-container">
                        <div className="team-member-avt border-orange"></div>
                        <div className="team-member-name">Ta Le Dac Loc</div>
                        <div className="team-member-desc">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut quam auctor, lacinia erat
                            vel, condimentum.
                        </div>
                        <div className="team-member-contacts btn-custom bg-orange">
                            <a href="https://www.facebook.com/taledacloc" rel="noreferrer" target="_blank">
                                <FontAwesomeIcon icon={faFacebook} fontSize={32} />
                            </a>
                            <a href="https://www.linkedin.com/in/daklok/" rel="noreferrer" target="_blank">
                                <FontAwesomeIcon icon={faLinkedin} fontSize={32} />
                            </a>
                            <a href="https://github.com/locdacknownothing" rel="noreferrer" target="_blank">
                                <FontAwesomeIcon icon={faGithub} fontSize={32} />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;

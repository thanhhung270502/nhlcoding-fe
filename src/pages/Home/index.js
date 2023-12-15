import { faFacebook, faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUserByID } from '~/api/api';
import { SignupModalTrigger } from '~/components/Modals/Auth';
import useInView from '~/hooks/useInView';
import './home.scss';

function Home() {
    const [currentUser, setCurrentUser] = useState();
    useEffect(() => {
        (async () => {
            var session = localStorage.getItem('session');
            if (session) {
                session = JSON.parse(session);
                const user_id = session.user.id;
                await getUserByID(user_id).then((data) => {
                    console.log(data.data.body.user);
                    setCurrentUser(data.data.body.user);
                });
            }
        })();
    }, []);
    const navigate = useNavigate();
    const handleClickStart = () => {
        if (currentUser) {
            navigate('/problems');
        } else {
            SignupModalTrigger.open();
        }
    };

    const { ref: homeIntro, inView: isHomeIntroVisible } = useInView();
    const { ref: solve, inView: isSolveVisible } = useInView();
    const { ref: contribute, inView: isContributeVisible } = useInView();

    return (
        <div className="container-fluid p-0 m-0">
            <div className="intro-container">
                <div className={`intro-content ${isHomeIntroVisible ? 'slide-in' : 'slide-out-left'}`}>
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
                    <div ref={homeIntro} className={`intro-img ${isHomeIntroVisible ? 'slide-in' : 'slide-out-right'}`}>
                        {/* <img ref={homeIntro} src="" className={`intro-img skeleton `} alt="" loading='lazy' /> */}
                    </div>
                    <div>
                        {/* <div className='intro-img-text'>HNL</div> */}
                        <img src="/images/intro-logo.svg" alt="" className='intro-img-text' width={265} />
                    </div>
                </div>
            </div>
            <div className="wwd-container">
                <div className="wwd-title">What We Do</div>
                <div className="wwd-subcontainer">
                    <div className={`wwd-content ${isSolveVisible ? 'slide-in' : 'slide-out-left'}`}>
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
                    <img
                        ref={solve}
                        src="/images/question-solve.png"
                        alt="Question solving"
                        className={`wwd-img skeleton ${isSolveVisible ? 'slide-in' : 'slide-out-left'}`}
                        loading="lazy"
                    />
                </div>
                <div className="wwd-subcontainer">
                    <img
                        ref={contribute}
                        src="/images/question-contribute.png"
                        alt="Question"
                        className={`wwd-img skeleton ${isContributeVisible ? 'slide-in' : 'slide-out-right'}`}
                        loading="lazy"
                    />
                    <div className={`wwd-content ${isContributeVisible ? 'slide-in' : 'slide-out-right'}`}>
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
                <div className="team-title">Our Team</div>
                <div className="team-members-container">
                    <div className="team-member-container">
                        <img src="/images/avt1.jpg" alt="" className='team-member-avt' />
                        <div className="team-member-card">
                            <div className="team-member-name">Ly Thanh Hung</div>
                            <div className="team-member-desc">2010301</div>
                            <div className="team-member-contact">
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
                    <div className="team-member-container">
                        <img src="/images/avt2.jpg" alt="" className='team-member-avt' />
                        <div className="team-member-card">
                            <div className="team-member-name">Ta Le Dac Loc</div>
                            <div className="team-member-desc">2010396</div>
                            <div className="team-member-contact">
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
                    <div className="team-member-container">
                        <img src="/images/avt3.jpg" alt="" className='team-member-avt' />
                        <div className="team-member-card">
                            <div className="team-member-name">Truong Nguyen Khoi Nguyen</div>
                            <div className="team-member-desc">201468</div>
                            <div className="team-member-contact">
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
        </div >
    );
}

export default Home;

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './home.scss';
import { faFacebook, faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

function Home() {
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
                    <div className="intro-btn btn-custom">Start now</div>
                </div>
                <img src="/images/home-intro.png" alt="" className="home-intro-img" />
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
                        <div className="wwd-content-btn btn-custom">Try a question now</div>
                    </div>
                    <img src="/images/question-solve.png" alt="" className="wwd-img" />
                </div>
                <div className="wwd-subcontainer">
                    <img src="/images/question-contribute.png" alt="" className="wwd-img" />
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
                        <div className="wwd-content-btn btn-custom">Contribute a question now</div>
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

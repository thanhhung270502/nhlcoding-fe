import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Contribute from './Contribute';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const MainChild = () => {
    return (
        <div className="contribute-body-main-content contribute-main-success no-testcases-text">
            Congratulation! You have contributed a question successfully.
        </div>
    );
};

const RightChild = () => {
    return (
        <div className="d-flex btn btn-back-home" style={{ marginTop: '200px' }}>
            <div className="me-2">
                <FontAwesomeIcon fontSize={18} icon={faHome} />
            </div>
            <Link to="/">Back to home</Link>
        </div>
    );
};

const Success = () => {
    // disable header bar -> not allow to go back
    return <Contribute contributeStep={5} mainChild={<MainChild />} rightChild={<RightChild />} />;
};

export default Success;

import Contribute from './Contribute';

const MainChild = () => {
    return (
        <div className="contribute-body-main-content" style={{ height: '90vh' }}>
            Congratulation! You have contributed a question successfully.
        </div>
    );
};

const RightChild = () => {
    return <div>Go to Home</div>;
};

const Success = () => {
    // disable header bar -> not allow to go back
    return <Contribute contributeStep={5} mainChild={<MainChild />} rightChild={<RightChild />} />;
};

export default Success;

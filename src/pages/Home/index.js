import './home.scss';

function Home() {
    const logout = () => {
        window.open(`http://localhost:3000/auth/logout`, '_self');
    };
    return (
        <div className="container">
            <h2>Home Page</h2>;
            <button className="btn btn-secondary" onClick={logout}>
                Log Out
            </button>
        </div>
    );
}

export default Home;

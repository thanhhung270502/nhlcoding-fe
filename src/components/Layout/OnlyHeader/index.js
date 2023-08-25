import Header from "../DefaultLayout/Header";

function DefaultLayout({ children }) {
    return (
        <div>
            <Header />
            <div className="container">
                <h1>Content</h1>
                <div className="content">{children}</div>
            </div>
        </div>
    );
}

export default DefaultLayout;

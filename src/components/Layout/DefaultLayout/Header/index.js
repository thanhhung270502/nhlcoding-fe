import images from '~/assets/images';
import './header.scss';

function Header() {
    return (
        <nav class="navbar navbar-expand-lg">
            <div className="container">
                <div class="container-fluid d-flex">
                    <a class="navbar-brand" href="#">
                        <img src={images.logo} alt="" />
                    </a>
                    <button
                        class="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <a class="nav-link" href="/problem">
                                    Problems
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">
                                    Discussion
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">
                                    Helpers
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
    // return (
    //     <nav className="navbar navbar-expand-lg bg-light">
    //         <div className="container-fluid">
    //             <a className="navbar-brand" href="#">
    //                 Navbar
    //             </a>
    //             <button
    //                 className="navbar-toggler"
    //                 type="button"
    //                 data-bs-toggle="collapse"
    //                 data-bs-target="#navbarSupportedContent"
    //                 aria-controls="navbarSupportedContent"
    //                 aria-expanded="false"
    //                 aria-label="Toggle navigation"
    //             >
    //                 <span className="navbar-toggler-icon"></span>
    //             </button>
    //             <div className="collapse navbar-collapse" id="navbarSupportedContent">
    //                 <ul className="navbar-nav me-auto mb-2 mb-lg-0">
    //                     <li className="nav-item">
    //                         <a className="nav-link active" aria-current="page" href="#">
    //                             Home
    //                         </a>
    //                     </li>
    //                     <li className="nav-item">
    //                         <a className="nav-link" href="#">
    //                             Link
    //                         </a>
    //                     </li>
    //                     <li className="nav-item dropdown">
    //                         <a
    //                             className="nav-link dropdown-toggle"
    //                             href="#"
    //                             role="button"
    //                             data-bs-toggle="dropdown"
    //                             aria-expanded="false"
    //                         >
    //                             Dropdown
    //                         </a>
    //                         <ul className="dropdown-menu">
    //                             <li>
    //                                 <a className="dropdown-item" href="#">
    //                                     Action
    //                                 </a>
    //                             </li>
    //                             <li>
    //                                 <a className="dropdown-item" href="#">
    //                                     Another action
    //                                 </a>
    //                             </li>
    //                             <li>
    //                                 <hr className="dropdown-divider"></hr>
    //                             </li>
    //                             <li>
    //                                 <a className="dropdown-item" href="#">
    //                                     Something else here
    //                                 </a>
    //                             </li>
    //                         </ul>
    //                     </li>
    //                     <li className="nav-item">
    //                         <a className="nav-link disabled">Disabled</a>
    //                     </li>
    //                 </ul>
    //                 <form className="d-flex" role="search">
    //                     <input
    //                         className="form-control me-2"
    //                         type="search"
    //                         placeholder="Search"
    //                         aria-label="Search"
    //                     ></input>
    //                     <button className="btn btn-outline-success" type="submit">
    //                         Search
    //                     </button>
    //                 </form>
    //             </div>
    //         </div>
    //     </nav>
    // );
}

export default Header;

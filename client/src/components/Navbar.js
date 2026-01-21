import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-left">
                <Link to="/" className="logo">
                    SIER
                </Link>
            </div>

            <div className="navbar-right">
                <a
                    href="https://m.me/watcharakorn.bucha.5"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="nav-icon contact-btn"
                >
                    💬 Contact Us
                </a>
            </div>
        </nav>
    );
}

export default Navbar;
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-left">
                <Link to="/" className="logo">
                    SIER
                </Link>
            </div>

            <ul className="navbar-center">
                <li>Store</li>
                <li>Categories</li>
                <li>About</li>
            </ul>

            <div className="navbar-right">
                <span className="nav-icon">🔍</span>
                <span className="nav-icon">🛒</span>
                <span className="nav-icon">👤</span>
            </div>
        </nav>
    );
}

export default Navbar;
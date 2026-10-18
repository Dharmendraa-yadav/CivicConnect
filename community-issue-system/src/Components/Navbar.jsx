
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "null");

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
        window.location.reload();
    };

    return (
        <header className="navbar">
            <div className="navbar-container">
                <Link to="/" className="logo">
                    CivicConnect
                </Link>

                <nav className="nav-links">
                    <Link to="/">Home</Link>
                    <Link to="/issues">Community Issues</Link>
                    <Link to="/about">About</Link>

                    {token && (
                        <>
                            <Link to="/dashboard">Dashboard</Link>
                            <Link to="/my-reports">My Reports</Link>
                            <Link to="/report">Report an Issue</Link>
                        </>
                    )}

                    {token && user?.role === "ADMIN" && (
                        <Link to="/admin">Admin</Link>
                    )}

                    {!token ? (
                        <>
                            <Link to="/login">Login</Link>
                            <Link to="/register">Register</Link>
                        </>
                    ) : (
                        <button onClick={handleLogout} type="button">
                            Logout
                        </button>
                    )}
                </nav>
            </div>
        </header>
    );
}

export default Navbar;
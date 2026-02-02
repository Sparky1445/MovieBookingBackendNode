import profileLogo from "./assets/profile.png"
function Header() {
    return (
        <header className="header">
            <p className="header-text">CINEPLEX</p>
            <div className="header-right">
                <button className="header-SignIn">SIGN IN</button>
                <img src={profileLogo} alt="Profile" className="profile-logo" />
            </div>
        </header>
    );
}

export default Header
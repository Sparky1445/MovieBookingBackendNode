import profileLogo from "./assets/profile.png"
function Header() {
    return (
        <header className="header">
            <p className="header-text">CINEPLEX</p>
            <div className="header-right">
                <p className="header-SignIn">SignIn</p>
                <img src={profileLogo} alt="Profile" className="profile-logo" />
            </div>
        </header>
    );
}

export default Header
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import 'bootstrap/dist/css/bootstrap.min.css';
import './navbarNewComponent.css'; // Import the CSS file
import momenteamLogo from'../../assets/momenteam-logo.svg'
import profileImage from '../../assets/profile.svg'

interface DecodedToken {
 sub: string;
 username: string;
 roleId: string;
 roleName: string;
 memberId: string | null; // Include memberId in the interface
}

const NavBar: React.FC = () => {
    const navigate = useNavigate();

    const handleHome = () => navigate('/');
    const handleArticles = () => navigate('/articles');
    const handleEvents = () => navigate('/events');
    const handleCertificates = () => navigate('/certificates');
    const handleTeams = () => navigate('/teams');
    const handleResearchGroups = () => navigate('/research-groups');
    const handleSignUp = () => navigate('/register');
    const handleLogin = () => navigate('/login');
    const handleDonation = () => navigate('/donation');

    const logout = () => {
      sessionStorage.removeItem('token');
      navigate('/login');
    };

    const token: string | null = sessionStorage.getItem('token');
    let userId: string | null = null;
    let username: string | null = null;
    let roleId: string | null = null;
    let roleName: string | null = null;
    let memberId: string | null = null; // Initialize memberId

    if (token !== null) {
      const decodedToken: DecodedToken = jwtDecode(token);
      userId = decodedToken.sub;
      username = decodedToken.username;
      roleId = decodedToken.roleId;
      roleName = decodedToken.roleName;
      memberId = decodedToken.memberId; // Extract memberId from the decoded token
    }
    console.log(userId);
    console.log(username);
    console.log(roleId);
    console.log(roleName);
    console.log(memberId);

    return (
        <>
            <nav className='mainNavbar'>
                <div className='mainLogo'>
                    <img src={momenteamLogo} alt="Momnteam Logo"></img>
                    <h1>Momnteam</h1>
                </div>

                <div className='mainNavigationLinks'>
                    <button onClick={handleHome}>Home</button>
                    <button onClick={handleArticles}>Articles</button>
                    <button onClick={handleEvents}>Events</button>
                    <button onClick={handleCertificates}>Certificate</button>
                    <button onClick={handleTeams}>Team</button>
                    {roleId && <button onClick={handleResearchGroups}>Research Group</button>}
                </div>
                <div className='mainButtons'>
                    {!token ? (
                        <>
                            <button className='logInButton' onClick={handleLogin}>Login</button>
                            <button className='donateButton' onClick={handleDonation}>Donate</button>
                            <button className='signUpButton' onClick={handleSignUp}>SignUp</button>
                        </>
                    ) : (
                        <>
                            <div className='logoutAndDonation'>
                                <button className='donateButtonWithlogOut' onClick={handleDonation}>Donate</button>
                                <button className='logOutButton' onClick={logout}>Logout</button>
                            </div>
                            {userId && (
                                <div className='profileMainImage'>
                                    <div className='prfoleImage'>
                                        <img src={profileImage} alt="Profile"></img>
                                    </div>
                                    <div className='profileText'>
                                        <h6 className='removePaddingAndMargin'>Welcome_{username}!</h6>
                                        <h6 className='removePaddingAndMargin'>{roleName}</h6>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </nav>
        </>
    );
};

export default NavBar;

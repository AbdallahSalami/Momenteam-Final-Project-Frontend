import React from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import 'bootstrap/dist/css/bootstrap.min.css';

import './sidebarComponent.css'
interface DecodedToken {
    sub: string;
    username: string;
    roleId: string;
    roleName: string;
    memberId: string | null; // Include memberId in the interface
   }

   

const SideBar: React.FC = () => {
    const navigate = useNavigate();


    const handleHomeDashBoard = () => navigate('/');
    const handleArticlesDashBoard = () => navigate('/articles');
    const handleEventsDashBoard = () => navigate('/events');
    const handleCertificatesDashBoard = () => navigate('/certificates');
    const handleTeamsDashBoard = () => navigate('/teams');
    const handleResearchGroupsDashBoard = () => navigate('/research-groups');
  

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
    <div className='mainSidabar'> 
        <link onClick={handleHomeDashBoard}>Home</link>
        <link onClick={handleArticlesDashBoard}>Articles</link>
        <link onClick={handleEventsDashBoard}>Events</link>
        <link onClick={handleCertificatesDashBoard}>Certificate</link>
        <link onClick={handleTeamsDashBoard}>Team</link>
        <link onClick={handleResearchGroupsDashBoard}>Research Group</link>

    <div className='logoutSideBar'>
        <button className='logOutButtonSideBar' onClick={logout}>Logout</button>
    </div>
        
    </div>
    
  )
}

export default SideBar

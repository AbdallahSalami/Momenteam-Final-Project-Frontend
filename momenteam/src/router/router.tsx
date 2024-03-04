// src/Router.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from '../components/layout/layoutComponent.tsx';
import HomePage from '../Pages/Home/HomePage.tsx';
import ArticlesPage from '../Pages/Articles/ArticlesPage.tsx';
import SingleArticlePage from '../Pages/SingleArticle/SingleArticlePage.tsx'
import EventsPage from '../Pages/Events/EventsPage.tsx';
import CertificatesPage from '../Pages/Certificates/CertificatesPage.tsx';
import TeamPage from '../Pages/Teams/TeamPage.tsx';
import ResearchGroupPage from '../Pages/ResearchGroup/ResearchGroupPage.tsx';
import LoginPage from '../Pages/Login/LoginPage.tsx';
import RegisterPage from '../Pages/Register/RegisterPage.tsx';
// import VerifyEmail from '../Pages/VerifyEmail/VerifyEmail.tsx';
import WaitingPage from '../Pages/Waiting/WatingPage.tsx'
import DonationPage from '../Pages/Donation/DonationPage.tsx'

import HomeDashBoard from '../DashBoard/Home/HomeDashBoard.tsx'
import RolesDashBoard from '../DashBoard/Roles/RolesDashBoard.css'
import UsersDashBoard from '../DashBoard/Users/UsersDashBoard.tsx'
import AdminsDashBoard from '../DashBoard/Admins/AdminsDashBoard.tsx'
import EventsDashBoard from '../DashBoard/Events/EventsDashBoard.tsx'
import CertificatesDashBoard from '../DashBoard/Articles/ArticlesDashBoard.tsx';
import ArticlesDashBoard from '../DashBoard/Articles/ArticlesDashBoard.tsx'
import PostDashBoard from '../DashBoard/Posts/PostsDashBoard.tsx'



const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><HomePage /></Layout>} />
        <Route path="/articles" element={<Layout><ArticlesPage /></Layout>} />
        <Route path="/article/:id" element={<Layout><SingleArticlePage/></Layout>} /> {/* Update the component name */}

        <Route path="/events" element={<Layout><EventsPage /></Layout>} />
        <Route path="/certificates" element={<Layout><CertificatesPage /></Layout>} />
        <Route path="/teams" element={<Layout><TeamPage /></Layout>} />
        <Route path="/research-groups" element={<Layout><ResearchGroupPage /></Layout>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/waiting" element={<WaitingPage />} />
        <Route path="/donation" element={<DonationPage />} />
        <Route path="/admin-dashboard" element={<Layout><ResearchGroupPage /></Layout>} />

        {/* <Route path="/verify-email/:id/:hash" element={<VerifyEmail />} /> */}


      </Routes>
    </Router>
  );
};

export default AppRouter;

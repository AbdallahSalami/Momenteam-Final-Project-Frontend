import './footerComponent.css';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import  { useState } from 'react';

import facebookImage from '../../assets/facebook-svgrepo-com.svg';
import instagramImage from '../../assets/insta-svgrepo-com.svg';
import gmailImage from '../../assets/gmail-svgrepo-com.svg';
import linkedInImage from '../../assets/linkedin-svgrepo-com.svg';
import twitterXImage from '../../assets/twitter-logo-black-outline-20846.svg';
import whatsAppImage from '../../assets/social-whats-app-svgrepo-com.svg';
import telegramImage from '../../assets/telegram-alt-svgrepo-com.svg';

import ContactUsModal from '../contactUsModal/contactUsModal'


interface DecodedToken {
  roleId: string;
}

interface ContactUsData {
  email: string;
  subject: string;
  description: string;
 }
 
const Footer = () => {



  const token: string | null = sessionStorage.getItem('token');
  let roleId: string | null = null;

  if (token !== null) {
    const decodedToken: DecodedToken = jwtDecode(token);
    roleId = decodedToken.roleId;
  }

 const [isModalOpen, setIsModalOpen] = useState(false);

  const handleContactUsClick = () => {
    setIsModalOpen(true);
 };

 const handleModalClose = () => {
    setIsModalOpen(false);
 };

 const handleModalSubmit = (data: ContactUsData) => {
  console.log(data); // Handle the form submission here
  handleModalClose(); // Close the modal after submission
 };
  return (
    <div className='mainFooter'>
      <div className='mainFooterLinks'>
        <div className='textFooter'>
          <h3>“Nothing Happen Until Something Moves” </h3>
          <h5> ’Albert Einstein’</h5>
        </div>
        <div className='pageLinksFooter'>
          <Link to="/">Home</Link>
          <Link to="/articles">Articles</Link>
          <Link to="/events">Events</Link>
          <Link to="/certificates">Certificate</Link>
          <Link to="/teams">Team</Link>
          {roleId && <Link to="/research-groups">Research Group</Link>}
        </div>
        <div className='contactUsAndSocialLinks'>
        <div className='contactUsFooter'>
          <div className='contactUsButtons'>
            <input
              type="email"
              id="contactEmail"
              placeholder="Enter your email"
              className="contactEmailInput"
            />
      <button onClick={handleContactUsClick} className='buttonContactUs'>Contact Us</button>
      <ContactUsModal isOpen={isModalOpen} onClose={handleModalClose} onSubmit={handleModalSubmit} />      </div>
        </div>
        <div className='socialMediaLinksFooter'>
          <div className='svg-social'>
            <a href="https://www.facebook.com/momenteam.LU/" target="_blank" rel="noopener noreferrer">
              <img src={facebookImage} alt="Facebook" />
            </a>
          </div>
          <div className='svg-social'>
            <a href="https://www.instagram.com/momenteam.lu/?hl=en" target="_blank" rel="noopener noreferrer">
              <img src={instagramImage} alt="Instagram" />
            </a>
          </div>
          <div className='svg-social'>
            <a href="mailto:example@example.com" target="_blank" rel="noopener noreferrer">
              <img src={gmailImage} alt="Gmail" />
            </a>
          </div>
          <div className='svg-social'>
            <a href="https://www.L.com" target="_blank" rel="noopener noreferrer">
              <img src={linkedInImage} alt="LinkedIn" />
            </a>
          </div>
          <div className='svg-social'>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
              <img src={twitterXImage} alt="Twitter" />
            </a>
          </div>
          <div className='svg-social'>
            <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">
              <img src={whatsAppImage} alt="WhatsApp" />
            </a>
          </div>
          <div className='svg-social'>
            <a href="https://t.me/your_telegram_handle" target="_blank" rel="noopener noreferrer">
              <img src={telegramImage} alt="Telegram" />
            </a>
          </div>
        </div>
      </div>
      </div>
     
      <div className='mainFooterLine'>
        <div className='righSideFooterLine'>
          
        </div>
        <div className='copyRight'>
          <Link to="/copyright">Copyright@Momenteam</Link>
        </div>
        <div className="thePrivacyLinks">
          <Link to="/terms-and-conditions">Terms and Conditions</Link>
          <Link to="/privacy-policy">Privacy Policy</Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;

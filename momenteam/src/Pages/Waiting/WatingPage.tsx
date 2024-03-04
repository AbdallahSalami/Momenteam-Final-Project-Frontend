// src/pages/WaitingPage.js
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const WaitingPage = () => {
  const navigate = useNavigate();
  const { id, hash } = useParams();
  const [verificationStatus, setVerificationStatus] = useState<boolean | null>(null);

  useEffect(() => {
    axios.get(`/api/verify-email/${id}/${hash}`)
      .then(response => {
        console.log(response.data.message);
        setVerificationStatus(response.data.success);
      })
      .catch(error => {
        console.error('Error verifying email:', error);
        setVerificationStatus(false);
      });
  }, [id, hash, navigate]);

  useEffect(() => {
    if (verificationStatus !== null) {
      setTimeout(() => {
        if (verificationStatus) {
          console.log('Navigating to home page');
          navigate('/');
        } else {
          console.log('Navigating to registration page');
          navigate('/register');
        }
      },  30000);
    }
  }, [verificationStatus, navigate]);

  return (
    <div>
      <h1>We're waiting for you to verify your email.</h1>
      {verificationStatus === true && <p>Your email has been successfully verified! Waiting  5 seconds before redirecting to the home page...</p>}
      {verificationStatus === false && <p>Your email verification failed. Waiting  5 seconds before redirecting to the registration page...</p>}
      {/* You can add a loading spinner or other UI elements here */}
    </div>
  );
};

export default WaitingPage;

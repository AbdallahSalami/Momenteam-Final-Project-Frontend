// // src/pages/VerifyEmail.js
// import { useEffect, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import axios from 'axios';

// const VerifyEmail = () => {
//   const navigate = useNavigate();
//   const { id, hash } = useParams();
//   const [verificationStatus, setVerificationStatus] = useState<boolean | null>(null);

//   useEffect(() => {
//     axios.get(`/api/verify-email/${id}/${hash}`)
//       .then(response => {
//         console.log(response.data.message);
//         setVerificationStatus(response.data.success);
//       })
//       .catch(error => {
//         console.error('Error verifying email:', error);
//         setVerificationStatus(false);
//       });
//   }, [id, hash, navigate]);

//   useEffect(() => {
//     if (verificationStatus !== null) {
//       setTimeout(() => {
//         if (verificationStatus) {
//           // Navigate to the home page after  5 seconds
//           navigate('/home');
//         } else {
//           // Navigate back to the registration page after  5 seconds
//           navigate('/register');
//         }
//       },  5000);
//     }
//   }, [verificationStatus, navigate]);

//   return (
//     <div>
//       <h1>Verifying your email...</h1>
//       {verificationStatus === true && <p>Your email has been successfully verified!</p>}
//       {verificationStatus === false && <p>Your email verification failed. Please try again.</p>}
//       {/* You can add a loading spinner or other UI elements here */}
//     </div>
//   );
// };

// export default VerifyEmail;

import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import axios, { AxiosError } from 'axios'; // Import AxiosError
import './LoginPage.css';
import momnteamLogoLogin from './../../assets/login.png';

const LoginPage = () => {
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const [errorMessage, setErrorMessage] = useState('');
 const navigate = useNavigate();

 const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/login', { email, password }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const token = response.data.token;
      sessionStorage.setItem('token', token); // Store the token in sessionStorage
      navigate('/'); // Navigate to the home page or dashboard
    } catch (error) {
      const axiosError = error as AxiosError; // Type assertion
      if (axiosError.response) {
        if (typeof axiosError.response.data === 'object' && axiosError.response.data !== null && 'message' in axiosError.response.data) {
           const data = axiosError.response.data as { message: string };
           setErrorMessage(data.message || 'An error occurred. Please try again.');
        } else {
           // Handle other types of data
           setErrorMessage('An error occurred. Please try again.');
        }
      }
    } // This closing brace was missing
 };

 // Function to navigate back to the home page
 const goBackToHome = () => {
    navigate('/');
 };

 const goToSignUp = () => {
    navigate('/register');
 };

 return (
    <>
      <div className='mainLoginPage'>
        <div className='mainLoginLayout1'></div>
        <div className='mainLoginLayout2'>
          <h1>Login</h1>
        </div>
        <div className='mainLoginLayout3'>
          <img className='loginImage' src={momnteamLogoLogin} alt="Login" />
        </div>
        <div className='loginMain'>
          <div className='mainloginDetails'>
            <h3>To be part of Momenteam community</h3>
            <h4>Having a chance</h4>
            <h5>To be good</h5>
            <h2>Scientist in the World!!</h2>
          </div>
          <div className='mainLoginText'>
            <form className='loginMainForm' onSubmit={handleSubmit}>
              <label>
                Email:
                <input
                 type="email"
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}
                 required
                />
              </label>
              <label>
                Password:
                <input
                 type="password"
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
                 required
                />
              </label>
              <button type="submit">Login</button>
            </form>
            <div className='mainXclick'>
              <div className='goBackClick'>
                {errorMessage && <p>{errorMessage}</p>}
                {/* Go Back button */}
                <button onClick={goBackToHome}>Go Back</button>
              </div>
              <div className='goToRegistrationClick'>
                {errorMessage && <p>{errorMessage}</p>}
                {/* Go Back button */}
                <button onClick={goToSignUp}>SignUp</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
 );
};

export default LoginPage;

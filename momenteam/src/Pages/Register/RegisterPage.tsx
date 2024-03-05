// src/Pages/Registration/RegistrationPage.tsx
import React, { useState } from 'react';
import axios from 'axios';
import './RegisterPage.css'; // Ensure this file exists and contains your custom styles
import { useNavigate } from 'react-router-dom';
import  mainRegisterImage from '../../assets/firstOne2.png'
const RegistrationPage: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
    firstName: '',
    secondName: '',
    lastName: '',
    highestDegree: '',
    major: '',
    educationalInstitution: '',
    phoneNumber: ''
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/register', formData);
      console.log(response.data);
      navigate('/waiting'); // Assuming you have a waiting page or redirect to home
    } catch (error) {
      console.error('Error registering user:', error);
      navigate('/register'); // Redirect back to registration page in case of error
    }
  };

  const goBackToLogin = () => {
    navigate('/login');
  };

  const goToHome = () => {
    navigate('/');
  };

  return (
    <div className="container">
      <div className='mainImageRegisterPage'>
        <img src={mainRegisterImage} className='mainRegisterImage' alt="Registration Page" />
      </div>

      <div className="row justify-content-center">
        <div className="col-md-6">
        <div className="buttons-container mb-6">
            <button onClick={goBackToLogin} className="btn btn-secondary">Back to Login</button>
            <button onClick={goToHome} className="btn btn-secondary">Go to Home</button>
          </div>
          <h1 className="text-center mb-4">Registration Page</h1>
         
          <form onSubmit={handleSubmit} className="register-form">
            <div className="input-row">
              <div className="mb-3">
                <label htmlFor="username" className="form-label">Username:</label>
                <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} required className="form-control" />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email:</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="form-control" />
              </div>
            </div>
            <div className="input-row">
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password:</label>
                <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required className="form-control" autoComplete="new-password" />
              </div>
              <div className="mb-3">
                <label htmlFor="password_confirmation" className="form-label">Confirm Password:</label>
                <input type="password" id="password_confirmation" name="password_confirmation" value={formData.password_confirmation} onChange={handleChange} required className="form-control" autoComplete="new-password" />
              </div>
            </div>
            <div className="input-row">
              <div className="mb-3">
                <label htmlFor="firstName" className="form-label">First Name:</label>
                <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required className="form-control" />
              </div>
              <div className="mb-3">
                <label htmlFor="secondName" className="form-label">Second Name:</label>
                <input type="text" id="secondName" name="secondName" value={formData.secondName} onChange={handleChange} required className="form-control" />
              </div>
            </div>
            <div className="input-row">
              <div className="mb-3">
                <label htmlFor="lastName" className="form-label">Last Name:</label>
                <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required className="form-control" />
              </div>
              <div className="mb-3">
                <label htmlFor="highestDegree" className="form-label">Highest Degree:</label>
                <input type="text" id="highestDegree" name="highestDegree" value={formData.highestDegree} onChange={handleChange} required className="form-control" />
              </div>
            </div>
            <div className="input-row">
              <div className="mb-3">
                <label htmlFor="major" className="form-label">Major:</label>
                <input type="text" id="major" name="major" value={formData.major} onChange={handleChange} required className="form-control" />
              </div>
              <div className="mb-3">
                <label htmlFor="educationalInstitution" className="form-label">Educational Institution:</label>
                <input type="text" id="educationalInstitution" name="educationalInstitution" value={formData.educationalInstitution} onChange={handleChange} required className="form-control" />
              </div>
            </div>
            <div className="input-row">
              <div className="mb-3">
                <label htmlFor="phoneNumber" className="form-label">Phone Number:</label>
                <input type="tel" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required className="form-control" />
              </div>
                {/* If you have more fields, add them here, following the same pattern */}
            </div>
            <button type="submit" className="btn btn-primary">Register</button>
          </form>

      
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;

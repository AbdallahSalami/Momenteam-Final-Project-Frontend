import React from 'react';
import axios from 'axios';
import './contactUsModal.css';

interface ContactUsData {
 email: string;
 subject: string;
 description: string;
}

interface ContactUsModalProps {
 isOpen: boolean;
 onClose: () => void;
 onSubmit: (data: ContactUsData) => void;
}

const ContactUsModal: React.FC<ContactUsModalProps> = ({ isOpen, onClose }) => {
 const [email, setEmail] = React.useState('');
 const [subject, setSubject] = React.useState('');
 const [description, setDescription] = React.useState('');

 const sendEmail = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission

    const emailData: ContactUsData = {
      email,
      subject,
      description,
    };

    try {
      const response = await axios.post('http://localhost:8000/api/send-email', emailData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response.data);
      // Optionally, call the onSubmit prop here if you want to handle the response in the parent component
    } catch (error) {
      console.error('Error sending email:', error);
    }
 };

 if (!isOpen) return null;

 return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Contact Us</h2>
        <form onSubmit={sendEmail}>
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <button type="submit">Submit</button>
        </form>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
 );
};

export default ContactUsModal;

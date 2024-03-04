import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import {
 MDBCard,
 MDBCardTitle,
 MDBCardText,
 MDBCardOverlay,
 MDBCardImage
} from 'mdb-react-ui-kit';
import './eventComponent.css';
import ImageEvent from '../../assets/imageJustEvnt.png';
import ImageEventWith from '../../assets/imageWith.png';

interface DecodedToken {
 sub: string;
 username: string;
 roleId: string;
 roleName: string;
 emailVerification: string;
}

interface Event {
 id: number;
 title: string;
 description: string;
 date: string;
 location: string;
 status: string;
}

interface EventComponentProps {
 event: Event;
 userEvents: Event[];
}
interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  secondName: string;
  lastName: string;
  highestDegree: string;
  major: string;
  educationalInstitution: string;
  phoneNumber: number;
  emailVerification: string;
  dateOfCreation: string;
  status: string;
  created_at: string;
  updated_at: string;
  pivot: {  
     event_id: number;
     user_id: number;
  };
 }
const EventComponent: React.FC<EventComponentProps> = ({ event, userEvents }) => {
 const navigate = useNavigate();
 const [isRegistered, setIsRegistered] = useState(false);
 const [message, setMessage] = useState('');
 const [decodedToken, setDecodedToken] = useState<DecodedToken | null>(null);

 const eventDate = new Date(event.date);
 const today = new Date();
 today.setHours(0, 0, 0, 0);

 const token: string | null = sessionStorage.getItem('token');

 useEffect(() => {
    if (token !== null) {
      const decoded: DecodedToken = jwtDecode(token);
      setDecodedToken(decoded);
    }
 }, [token]);
 useEffect(() => {
  if (token !== null && decodedToken) {
     axios.get(`http://localhost:8000/api/events/${event.id}/with-users`)
       .then(response => {
         const users: User[] = response.data.users;
         // Check if the current user is in the list of registered users
         const isUserRegistered = users.some((user: User) => user.id === Number(decodedToken.sub));
         setIsRegistered(isUserRegistered);
       })
       .catch(error => {
         console.error('Failed to check registration status:', error);
       });
  }
 }, [token, event.id, decodedToken]);
 const registerForEvent = async () => {
    if (isRegistered) {
      setMessage('You are already registered for this event.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/api/events/add-user', {
        user_id: decodedToken?.sub,
        event_id: event.id
      });

      if (response.status === 200) {
        setIsRegistered(true);
        setMessage('You have been successfully registered for this event.');
      } else {
        setMessage('Failed to register for the event.');
      }
    } catch (error) {
      console.error('Failed to register for the event:', error);
      setMessage('Failed to register for the event.');
    }
 };

 const handleLogin = () => {
    navigate('/login');
 };

 const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const weekday = weekdays[date.getDay()];
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const time = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  return `${weekday}, ${day} - ${month} - ${year}, at ${time}`;
};


 return (
    <div className="event-component-wrapper">
    <MDBCard background='dark' className='textMainEvent'>
      <MDBCardImage className='imageMainForBackground' overlay src={ImageEvent} />
      <MDBCardOverlay className='mainTitleAndDetailsWithButtom'>
        <MDBCardTitle className='titleEvent'>
          <MDBCardTitle className='titleEventtext'>{event.title}</MDBCardTitle>
        </MDBCardTitle>
        <div className="event-details">
          <MDBCardText className='detailsEventtext'>{event.description}</MDBCardText>
          <MDBCardText className='detailsEventtext'>Date: {formatDate(event.date)}</MDBCardText>
          <MDBCardText className='detailsEventtext'>Location: {event.location}</MDBCardText>
          <MDBCardText className='detailsEventtext'>Status: {event.status}</MDBCardText>
          <div>
            {token && decodedToken && decodedToken.emailVerification === 'verified' ? (
              <div>
                {eventDate < today ? (
                 <MDBCardText>This event has already passed.</MDBCardText>
                ) : (
                  message ?  <MDBCardText>{message}</MDBCardText> 
                    :  isRegistered ? (
                    <MDBCardText>You are already registered for this event.</MDBCardText>
                 ) : (
                    <button onClick={registerForEvent} className='btn btn-primary'>Register</button>
                 )
                )}
                
              </div>
            ) : token ? 
              <MDBCardText>Please verify your email before registering for the event.</MDBCardText>
              : <button onClick={handleLogin} className='btn btn-primary'>Login to Register</button>
            }
          </div>
        </div>
      </MDBCardOverlay>
    </MDBCard>  
    </div>
 );
};

export default EventComponent;

import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import axios from 'axios';

const NotificationButton = ({ application, day, email, fetchApprovedApplications }) => {
  const [remainingTime, setRemainingTime] = useState('');
  const [showButton, setShowButton] = useState(true); // State to control button appearance

  const hasTimePassed = (notifyTime) => {
    const notifyDate = new Date(notifyTime);
    const timeDiff = notifyDate.getTime() - Date.now();
    return timeDiff < 0;
  };

  useEffect(() => {
    let intervalId;
  
    const updateRemainingTime = () => {
      if (application.notify) {
        const notifyDate = new Date(application.notify);
        const endTime = notifyDate.getTime() + (24*60* 60 * 1000); // Adjust this to your actual interval
        const currentTime = new Date().getTime();
        const timeDiff = endTime - currentTime;
  
        if (timeDiff > 0) {
          const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
          setRemainingTime(`${hours.toString().padStart(2, '0')}h ${minutes.toString().padStart(2, '0')}m ${seconds.toString().padStart(2, '0')}s`);
          setShowButton(false); // Hide button when countdown timer is active
        } else {
          clearInterval(intervalId);
          setRemainingTime(''); // Reset remaining time when the countdown is complete
          setShowButton(true); // Show button when countdown is complete
        }
      }
    };
  
    updateRemainingTime(); // Initial call to update remaining time
    intervalId = setInterval(updateRemainingTime, 1000); // Update remaining time every second
  
    return () => clearInterval(intervalId); // Cleanup the interval
  }, [application.notify]);
  

  const handleClick = async () => {
    try {
      const response = await axios.post(
        'http://localhost:9001/notify',
        { formId: application.id, day: day, email: email },
        { withCredentials: true }
      );
      fetchApprovedApplications(); // Update the application data after sending notification
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  };

  const renderButtonOrCountdown = () => {
    if (day <= 5 && day > 0) {
      if ((application.notify === null || hasTimePassed(application.notify)) && showButton) {
        return (
          <Button variant='contained' color='success' onClick={handleClick}>
            NOTIFY
          </Button>
        );
      } else {
        return (
          <div>
            NOTIFY AGAIN IN: {remainingTime}
          </div>
        );
      }
    } else if (day <= 0) {
      return (
        <Button variant='outlined' color='error'>
          EXPIRED
        </Button>
      );
    }
    return null;
  };

  return (
    <div>
      {renderButtonOrCountdown()}
    </div>
  );
};

export default NotificationButton;

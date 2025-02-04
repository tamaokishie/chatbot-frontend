import React from 'react';
import './App.css';

export const App = () => {
  const handleClick = async () => {
    try {
      const response = await fetch('http://localhost:8000/api', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: 'Hello from React' })
      });

      const data = await response.json();
      console.log('Response:', data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <button
        className="button"
        onClick={handleClick}>Hello
      </button>
    </>
  );
};
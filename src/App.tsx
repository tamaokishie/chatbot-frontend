import React from 'react';
import './App.css';

export const App = () => {
  const handleClick = async () => {
    try {
      const response = await fetch('http://localhost:8000/hello', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      console.log('Response:', data); // { hello: "world!" } が返るはず
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

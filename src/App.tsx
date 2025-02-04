import React, {useState} from 'react';
import './App.css';

export const App = () => {

  const [message, setMessage] = useState<string | null>(null);

  const handleClick = async () => {
    try {
      const response = await fetch('http://localhost:8000/hello', {
        method: 'GET'
      });
  
      const data = await response.json();
      console.log('Response:', data);

      setMessage(data.message);

    } catch (error) {
      console.error('Error:', error);
      setMessage("エラーが発生しました");
    }
  };
  

  return (
    <>
      <button
        className="button"
        onClick={handleClick}>Hello
      </button>
      {message && <p>受信したメッセージ: {message}</p>}
    </>
  );
};

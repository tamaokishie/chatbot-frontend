import React, {useState} from 'react';
import './App.css';

export const App = () => {

  const buttonId = [1, 2, 3, 4, 5];

  const [message, setMessage] = useState<string | null>(null);

  const handleClick = async (num: number) => {
    try {
      const response = await fetch(`http://localhost:8000/${num}`, {
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
    <div className="app">
      <h1>好きな数字をクリックしてください。</h1>
        {buttonId.map((num) => (
          <>
            <button
              key= {num}
              className="button"
              onClick={() => handleClick(num)}>{num}
            </button>
          </>
        ))}
      <p>{message}</p>
    </div>
  );
};

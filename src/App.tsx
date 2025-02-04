import React, {useState} from 'react';
import './App.css';

export const App = () => {

  const buttonId = [1, 2, 3, 4, 5];

  const [message, setMessage] = useState<string | null>(null);
  const [inputMessage, setInputMessage] = useState<string>('');

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

  // メッセージ送信ボタンを押したときの処理
  const handleMessageSubmit = async () => {
    try {
      const response = await fetch('http://localhost:8000/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: inputMessage }), // 入力されたメッセージを送信
      });

      const data = await response.json();
      console.log('Response:', data);

      setMessage(data.response); // 受け取ったメッセージを表示
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
      {/* メッセージ入力フォーム */}
      <div className="input-container">
        <input
          className="input"
          type="text"
          placeholder="ここにメッセージを入力して下さい"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
        />
        <button
          className="inputButton"
          onClick={handleMessageSubmit}>
          送信
        </button>
      </div>
    </div>
  );
};
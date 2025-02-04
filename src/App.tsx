import React, { useState } from 'react';
import './App.css';

interface ApiResponse {
  response?: string;
  message?: string;
  error?: string;
}

export const App: React.FC = () => {
  const BUTTON_IDS = [1, 2, 3, 4, 5];
  const API_BASE_URL = 'http://localhost:8000';
  const [message, setMessage] = useState<string | null>(null);
  const [inputMessage, setInputMessage] = useState<string>('');
  const fetchFromApi = async (url: string, options: RequestInit): Promise<ApiResponse> => {
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw new Error('APIリクエストに失敗しました');
    }
  };

  const handleClick = async (num: number) => {
    try {
      const data = await fetchFromApi(`${API_BASE_URL}/button/${num}`, {
        method: 'GET'
      });
      setMessage(data.response || null);
    } catch (error) {
      setMessage("エラーが発生しました");
    }
  };

  const handleMessageSubmit = async () => {
    if (!inputMessage.trim()) return;
    try {
      const data = await fetchFromApi(`${API_BASE_URL}/message/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ message: inputMessage }),
      });
      setMessage(data.message || null);
      setInputMessage('');
    } catch (error) {
      setMessage("エラーが発生しました");
    }
  };
  
  return (
    <div className="app">
      <h1>好きな数字をクリックしてください。</h1>
      <div className="button-container">
        {BUTTON_IDS.map((num) => (
          <button
            key={num}
            className="button"
            onClick={() => handleClick(num)}
          >
            {num}
          </button>
        ))}
      </div>
      <div className="message-container">
        {message && <p className="message">{message}</p>}
      </div>
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
          onClick={handleMessageSubmit}
          disabled={!inputMessage.trim()}
        >
          送信
        </button>
      </div>
    </div>
  );
};

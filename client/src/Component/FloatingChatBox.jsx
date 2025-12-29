import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import '../CSS/FloatingChatBox.css';

const socket = io('http://localhost:8000');

function FloatingChatBox() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [open, setOpen] = useState(false);

  const playSound = (url) => {
    const audio = new Audio(url);
    audio.addEventListener('canplaythrough', () => {
      audio.play().catch(err => console.warn("Playback failed:", err));
    });
    audio.addEventListener('error', () => {
      console.warn("Audio failed to load:", url);
    });
  };

  useEffect(() => {
    socket.on('bot message', (msg) => {
      setMessages(prev => [...prev, { sender: 'bot', text: '...', loading: true }]);

      setTimeout(() => {
        playSound('/sound.mp3');
        setMessages(prev => [
          ...prev.slice(0, -1),
          { sender: 'bot', text: msg, timestamp: new Date() }
        ]);
      }, 1500);
    });

    return () => socket.off('bot message');
  }, []);

  const sendMessage = () => {
    if (!input.trim()) return;
    playSound('/sound.mp3');
    socket.emit('user message', input);
    setMessages(prev => [...prev, { sender: 'user', text: input, timestamp: new Date() }]);
    setInput('');
  };

  return (
    <div className="chat-widget">
      <button className="chat-toggle btn btn-primary" onClick={() => setOpen(!open)}>
        💬 Chat
      </button>

      {open && (
        <div className="chat-box card shadow">
          <div className="card-header bg-primary text-white fw-bold">🤖 Ask Me Anything</div>
          <div className="card-body chat-body">
            {messages.map((msg, i) => (
              <div key={i} className={`alert ${msg.sender === 'user' ? 'alert-info' : 'alert-success'} mb-2`}>
                <strong>{msg.sender === 'user' ? 'You' : 'Bot'}:</strong>{' '}
                {msg.loading ? (
                  <span className="spinner-border spinner-border-sm mx-2" role="status" />
                ) : (
                  <>
                    {msg.text}
                    <small className="text-muted ms-2">{msg.timestamp?.toLocaleTimeString()}</small>
                  </>
                )}
              </div>
            ))}
          </div>
          <div className="card-footer d-flex">
            <input
              className="form-control me-2"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
              placeholder="Type a message..."
            />
            <button className="btn btn-primary" onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default FloatingChatBox;
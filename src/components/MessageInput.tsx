import React, { useState } from 'react';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    onSendMessage(message);
    setMessage('');
  };

  return (
    <div className="p-4">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="border rounded p-2 w-full"
      />
      <button
        onClick={handleSendMessage}
        className="bg-blue-500 text-white rounded p-2 mt-2"
      >
        Send
      </button>
    </div>
  );
};

export default MessageInput;
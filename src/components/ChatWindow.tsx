import React, { useState, useRef, useEffect } from 'react';
import { Message } from "@/repository/messages";

interface ChatViewProps {
  messages: Message[];
  subscriberName: string;
  loading: boolean;
  onSendMessage: (text: string) => void; // 🆕
}

export const ChatWindow: React.FC<ChatViewProps> = ({
  messages,
  subscriberName,
  loading,
  onSendMessage, // 🆕
}) => {
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const handleSend = () => {
    const trimmed = input.trim();
    if (trimmed) {
      onSendMessage(trimmed); // 🆕 Callback nutzen
      setInput('');
    }
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sortedMessages = [...messages].sort(
    (a, b) => new Date(a.time).getTime() - new Date(b.time).getTime()
  );

  return (
    <div className="w-full max-h-[calc(100vh-8rem)] bg-white rounded-xl shadow-md p-4 flex flex-col overflow-hidden">
      <h2 className="text-lg font-bold text-gray-800 mb-4">💬 Chat mit {subscriberName}</h2>

      {/* Nachrichtenbereich */}
      <div className="flex flex-col space-y-2 overflow-y-auto flex-grow pr-1">
        {loading ? (
          <div className="text-center text-gray-500">⏳ Lädt Nachrichten...</div>
        ) : messages.length === 0 ? (
          <div className="text-center text-gray-400 italic">Keine Nachrichten vorhanden</div>
        ) : (
          sortedMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-lg text-sm shadow-md
                  ${msg.sender === 'me'
                    ? 'bg-blue-500 text-white rounded-br-none'
                    : 'bg-gray-200 text-gray-800 rounded-bl-none'}
                `}
              >
                {msg.content}
                <div className="text-[10px] text-right opacity-60 mt-1">
                  {new Date(msg.time).toLocaleString()}
                </div>
              </div>
            </div>
          ))
        )}
        <div ref={bottomRef} />
      </div>

      {/* Eingabefeld */}
      <div className="mt-4 flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Nachricht schreiben..."
          className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleSend}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Senden
        </button>
      </div>
    </div>
  );
};
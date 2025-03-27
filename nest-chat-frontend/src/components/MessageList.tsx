import { useEffect, useRef } from 'react';
import { Message } from '../interface/message.interface';
import { ChatBubbleLeftEllipsisIcon } from '@heroicons/react/24/solid';

interface MessageListProps {
  messages: Message[];
  username: string;
}

const MessageList: React.FC<MessageListProps> = ({ messages, username }) => {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="mb-4">
      <h3 className="text-lg font-semibold mb-2 flex items-center space-x-2">
        <ChatBubbleLeftEllipsisIcon className="h-6 w-6 text-blue-400" />
        <span>Chat Messages</span>
      </h3>
      <div className="h-80 overflow-auto bg-gray-800 p-4 rounded-md space-y-3 border border-gray-700 shadow-md">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.sender === username ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`p-3 max-w-[75%] rounded-lg shadow-md ${
                msg.sender === username
                  ? 'bg-blue-500 text-white text-right'
                  : 'bg-gray-700 text-gray-200'
              }`}
            >
              <p className="text-xl font-bold">{msg.sender}</p>
              <p className="text-sm text-gray-200">{msg.message}</p>
            </div>
          </div>
        ))}
        {/* Auto-scroll anchor */}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default MessageList;

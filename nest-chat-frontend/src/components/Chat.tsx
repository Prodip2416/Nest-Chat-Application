import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import ActiveUserList from './ActiveUserList';
import JoinChatRoom from './JoinChatRoom';
import MessageList from './MessageList';
import { Message } from '../interface/message.interface';
import MessageInput from './MessageInput';

const socket = io('http://localhost:3000');

const Chat: React.FC = () => {
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [typingName, setTypingName] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [users, setUsers] = useState<string[]>([]);

  useEffect(() => {
    socket.on('message', (data: Message) => {
      setMessages((prev) => [...prev, data]);
    });

    socket.on('users', (userList: string[]) => {
      setUsers(userList);
    });

    return () => {
      socket.off('message');
      socket.off('users');
    };
  }, []);

  const sendMessage = (): void => {
    if (message.trim() !== '') {
      socket.emit('message', { sender: username, message });
      setMessage('');
    }
  };

  const joinChat = (): void => {
    if (typingName.trim() !== '') {
      const name = typingName.trim();
      setUsername(name);
      socket.emit('join', name);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-900 via-purple-800 to-purple-950 text-white">
      {!username ? (
        <JoinChatRoom setTypingName={setTypingName} joinChat={joinChat} />
      ) : (
        <div className="w-full max-w-2xl bg-gray-900 p-6 rounded-lg shadow-lg">
          <ActiveUserList users={users} />
          <MessageList messages={messages} username={username} />
          <MessageInput
            message={message}
            setMessage={setMessage}
            sendMessage={sendMessage}
          />
        </div>
      )}
    </div>
  );
};

export default Chat;

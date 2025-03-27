import React from 'react';

interface JoinChatRoomProps {
  setTypingName: (name: string) => void;
  joinChat: () => void;
}

const JoinChatRoom: React.FC<JoinChatRoomProps> = ({
  setTypingName,
  joinChat,
}) => {
  return (
    <div className="bg-gradient-to-r from-purple-800 via-purple-600 to-purple-700 p-8 rounded-lg shadow-lg text-center w-96 transform transition-all hover:scale-105 duration-300 ease-in-out">
      <h2 className="text-3xl font-extrabold text-white mb-6 animate__animated animate__fadeIn animate__delay-1s">
        Welcome to the NestChat Room!
      </h2>
      <p className="text-white text-lg mb-4 animate__animated animate__fadeIn animate__delay-2s">
        Please enter your name to join the conversation.
      </p>
      <input
        type="text"
        placeholder="Enter Your Name"
        className="w-full p-3 mb-6 rounded-xl bg-white text-gray-800 border-2 border-gray-300 outline-none focus:ring-4 focus:ring-purple-500 transition-all duration-300 ease-in-out"
        onChange={(e) => setTypingName(e.target.value)}
      />
      <button
        className="w-full bg-gradient-to-r from-purple-600 to-purple-800 text-white p-3 rounded-xl text-lg font-semibold shadow-xl transition-all duration-300 transform hover:scale-105 hover:bg-gradient-to-r hover:from-purple-700 hover:to-purple-900 focus:ring-4 focus:ring-purple-300"
        onClick={joinChat}
      >
        Join Chat
      </button>
    </div>
  );
};

export default JoinChatRoom;

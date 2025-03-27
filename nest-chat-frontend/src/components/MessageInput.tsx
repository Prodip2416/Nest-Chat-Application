interface MessageInputProps {
  message: string;
  setMessage: (message: string) => void;
  sendMessage: () => void;
}

const MessageInput: React.FC<MessageInputProps> = ({
  message,
  setMessage,
  sendMessage,
}) => {
  return (
    <div className="flex items-center space-x-2">
      <input
        type="text"
        value={message}
        placeholder="Type a message..."
        className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700 outline-none focus:border-blue-500"
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
      />
      <button
        className="bg-green-600 hover:bg-green-700 text-white p-2 rounded"
        onClick={sendMessage}
      >
        Send
      </button>
    </div>
  );
};

export default MessageInput;

import React from 'react';

interface ActiveUserListProps {
  users: string[];
}

const getInitials = (name: string) => {
  const words = name
    .trim()
    .split(' ')
    .filter((word) => word.length > 0);
  if (words.length === 1) return words[0][0]?.toUpperCase() || '';
  return (words[0][0] + words[words.length - 1][0]).toUpperCase();
};
const gradientColors = [
  'from-pink-500 to-yellow-500',
  'from-blue-500 to-purple-500',
  'from-green-500 to-teal-500',
  'from-red-500 to-orange-500',
  'from-indigo-500 to-cyan-500',
];

const getRandomGradient = (index: number) => {
  return gradientColors[index % gradientColors.length]; // Cycle through gradients
};
const ActiveUserList: React.FC<ActiveUserListProps> = ({ users }) => {
  return (
    <div className="mb-4 p-4 rounded-lg bg-gray-800 shadow-md border border-gray-700">
      <h3 className="text-lg font-semibold mb-3 text-white">
        💡 Active Users ({users.length})
      </h3>

      <ul className="max-h-60 overflow-auto space-y-3 p-2 bg-gray-800/50 backdrop-blur-md rounded-lg shadow-lg border border-gray-700 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
        {users.map((user, index) => (
          <li
            key={index}
            className="flex items-center space-x-4 p-2 rounded-lg bg-gray-700/50 hover:bg-gray-600 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg"
          >
            {/* Gradient Avatar */}
            <div
              className={`flex items-center justify-center w-12 h-12 bg-gradient-to-br ${getRandomGradient(
                index
              )} text-white font-bold rounded-full shadow-lg ring-2 ring-gray-300/50`}
            >
              {getInitials(user)}
            </div>

            {/* Username */}
            <span className="text-white font-medium text-lg">{user}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActiveUserList;

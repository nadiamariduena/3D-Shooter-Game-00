import { usePlayersList } from "playroomkit";
import { motion } from "framer-motion";
import React, { useState } from "react";

export const Leaderboard = () => {
  const players = usePlayersList(true);

  const [isOpen, setIsOpen] = useState(true);
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const closePopup = () => {
    setIsOpen(false);
  };

  const openPopup = () => {
    setIsButtonClicked(true);
  };

  const closeButton = () => {
    setIsButtonClicked(false);
    setIsOpen(true);
  };
  return (
    <>
      <div className="fixed top-0 left-0 right-0 p-4 flex z-10 gap-4">
        {players.map((player) => (
          <div
            key={player.id}
            className={`bg-white  bg-opacity-60 backdrop-blur-sm flex items-center rounded-lg gap-2 p-2 min-w-[140px]`}
          >
            <img
              src={player.state.profile?.photo || ""}
              className="w-10 h-10 border-2 rounded-full"
              style={{
                borderColor: player.state.profile?.color,
              }}
            />
            <div className="flex-grow">
              <h2 className={`font-bold text-sm`}>
                {player.state.profile?.name}
              </h2>
              <div className="flex text-sm items-center gap-4">
                <p>🔫 {player.state.kills}</p>
                <p>💀 {player.state.deaths}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button
        className="fixed top-4 right-4 z-10 text-white"
        onClick={() => {
          // toggle fullscreen
          if (document.fullscreenElement) {
            document.exitFullscreen();
          } else {
            document.documentElement.requestFullscreen();
          }
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
          />
        </svg>
      </button>
      {/*


 */}
      {isOpen && (
        <div className="popup-container fixed top-0 left-0 w-full h-full flex justify-center items-center z-50">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            className="popup bg-white rounded-lg shadow-lg p-6 max-w-sm text-center relative"
          >
            <button
              className="absolute top-0 right-0 mt-2 mr-2 focus:outline-none"
              onClick={closePopup}
            >
              <svg
                className="w-6 h-6 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
            <h2 className="text-xl font-bold mb-4">Welcome to the Game!</h2>
            <p className="text-gray-700 mb-4">Use the joystick to move.</p>
            <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-2">
              Start Playing
            </button>
            <p className="text-gray-700 text-xs">
              Hint: Open another window to face your enemy!
            </p>
          </motion.div>
        </div>
      )}
      {isOpen && (
        <div className="popup-container fixed top-0 left-0 w-full h-full flex justify-center items-center z-50">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            className="popup bg-white rounded-lg shadow-lg p-6 max-w-sm text-center relative"
          >
            <button
              className="absolute top-0 right-0 mt-2 mr-2 focus:outline-none"
              onClick={closePopup}
            >
              <svg
                className="w-6 h-6 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
            <h2 className="text-xl font-bold mb-4">Welcome to the Game!</h2>
            <p className="text-gray-700 mb-4">Use the joystick to move.</p>
            <button
              onClick={closePopup}
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-2"
            >
              Start Playing
            </button>
            <p className="text-gray-700 text-xs">
              Hint: Open another window to face your enemy!
            </p>
          </motion.div>
        </div>
      )}
      {!isOpen && !isButtonClicked && (
        <div className="popup-container fixed top-0 left-0 w-full h-full flex justify-center items-start z-50">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            className="popup bg-white rounded-lg shadow-lg p-6 max-w-sm text-center relative"
          >
            <button
              onClick={openPopup}
              className="text-blue-500 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline mb-2 border-2 border-white"
            >
              +
            </button>
          </motion.div>
        </div>
      )}
      {isButtonClicked && (
        <div className="popup-container fixed top-0 left-0 w-full h-full flex justify-center items-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.5 }}
            className="popup bg-white rounded-lg shadow-lg p-6 max-w-sm text-center relative"
          >
            <button
              onClick={closeButton}
              className="absolute top-0 right-0 mt-2 mr-2 focus:outline-none"
            >
              <svg
                className="w-6 h-6 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
            <h2 className="text-xl font-bold mb-4">Welcome to the Game!</h2>
            <p className="text-gray-700 mb-4">Use the joystick to move.</p>
            <button
              onClick={closeButton}
              className="text-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-2 border-2 border-white"
            >
              Start Playing
            </button>
            <p className="text-gray-700 text-xs">
              Hint: Open another window to face your enemy!
            </p>
          </motion.div>
        </div>
      )}
    </>
  );
};

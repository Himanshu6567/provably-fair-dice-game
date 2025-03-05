import React, { useContext } from "react";
import { RiResetLeftFill } from "react-icons/ri";
import { FaHistory } from "react-icons/fa";
import { LuDollarSign } from "react-icons/lu";
import { DiceContext } from "../Context/Context";

export default function Navbar() {
  const { Amount, setShowHistory, handleResetGame } = useContext(DiceContext);
  return (
    <nav className="py-2 text-white bg-gray-800">
      <div className="px-8 mx-auto max-w-7xl sm:px-6 lg:px-12">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <img className="w-12 h-12" src="./logo.webp" alt="Logo" />
          </div>

          <div className="flex items-center space-x-8">
            <div className="flex flex-col items-center">
              <span className="text-lg font-bold">My Balance</span>
              <span className="font-bold text-xl  mt-[-4px] flex items-center text-green-300">
                <LuDollarSign />
                <span> {Amount}</span>
              </span>
            </div>
            <div className="flex space-x-6 text-2xl">
              <button
                onClick={() => setShowHistory(true)}
                className="hover:text-gray-400 focus:outline-none"
                title="View history"
              >
                <FaHistory />
              </button>
              <button
                onClick={handleResetGame}
                className="hover:text-gray-400 focus:outline-none"
                title="Reset game"
              >
                <RiResetLeftFill />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

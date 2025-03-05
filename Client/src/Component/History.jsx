import React, { useContext } from "react";
import { FaHistory } from "react-icons/fa";
import { DiceContext } from "../Context/Context";

export default function History() {
  const { setShowHistory, gameHistory } = useContext(DiceContext);

  console.log("history", gameHistory);
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-300 bg-opacity-50">
      <div className="absolute flex flex-col w-2/5 px-5 py-10 border border-gray-200 rounded-md h-2/3 bg-secondary">
        <div>
          <h1 className="font-bold text-gray-100">Game History</h1>
          <p className="font-semibold text-gray-200">
            Your recent dice and outcomes
          </p>
        </div>
        <div className="flex flex-col mt-6 overflow-scroll h-72 no-scrollbar scrollbar-hide">
          {gameHistory.length > 0 ? (
            <div>
              {gameHistory.map((history, i) => {
                return (
                  <div
                    key={i}
                    className={` px-3 py-3 ${
                      history.returnAmount > 0 ? "bg-green-500" : "bg-red-500"
                    } rounded-xl justify-between items-center my-4  bg-opacity-30 flex `}
                  >
                    <div className="flex space-x-5">
                      <div
                        className={`bg-${
                          history.returnAmount > 0 ? "green" : "red"
                        }-500 h-12 w-12 flex justify-center items-center text-3xl font-bold text-gray-300 rounded-md`}
                      >
                        {history.diceNumber}
                      </div>
                      <div>
                        <h1 className="font-bold text-gray-200">
                          Bet: ${history.betAmount}
                        </h1>
                        <h1 className="font-semibold text-gray-300">
                          {history.time}
                        </h1>
                      </div>
                    </div>
                    <span
                      className={`bg-${
                        history.returnAmount > 0 ? "green" : "red"
                      }-500 px-2 py-1 rounded-2xl text-gray-300`}
                    >
                      {formatter.format(history.returnAmount)}
                    </span>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full space-y-2 ">
              <span className="flex items-center justify-center w-10 h-10 text-gray-200 rounded-full bg-primary">
                <FaHistory />
              </span>
              <h1 className="font-bold text-gray-400">No game history yet</h1>
              <p className="text-gray-500">
                Start playing to see your result here!
              </p>
            </div>
          )}
        </div>
        <button
          onClick={() => setShowHistory(false)}
          className="w-full py-2 my-auto text-gray-200 rounded-lg bg-primary"
        >
          close
        </button>
      </div>
    </div>
  );
}

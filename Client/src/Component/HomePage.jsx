import React, { useContext } from "react";
import WinTemplate from "./Template/WinTemplate";
import LostTemplate from "./Template/LostTemplate";
import { DiceContext } from "../Context/Context";

import DiceBox from "./Dice";

export default function HomePage() {
  const {
    DiceLoading,
    returnAmounts,
    gameData,
    DiceNumber,
    showDice,
    initialDice,
    result,
  } = useContext(DiceContext);

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return (
    <div className=" md:basis-[70%]  px-5 py-10 md:py-2 bg-dark">
      {/* Changed bg-dark to  */}
      <div>
        <div className="grid grid-cols-4 gap-4 py-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-10">
          {returnAmounts.map((balance, index) => (
            <h1
              key={index}
              className={`px-3 py-1 rounded-2xl flex items-center justify-center ${
                balance > 0 ? "bg-green-500" : "bg-red-300"
              } font-bold text-sm text-gray-100`}
            >
              {balance}
            </h1>
          ))}
        </div>
        <div className="px-6 py-8">
          <div className="grid grid-cols-3 gap-6 px-8 py-4 text-gray-100 bg-primary rounded-xl">
            <div className="flex flex-col items-center ">
              <h1 className="font-semibold">Win Rate</h1>
              <span className="text-2xl font-bold">{gameData.winRate}%</span>
            </div>
            <div className="flex flex-col items-center ">
              <h1 className="font-semibold">Wins</h1>
              <span className="text-2xl font-bold text-green-400">
                {gameData.wins}
              </span>
            </div>
            <div className="flex flex-col items-center ">
              <h1 className="font-semibold">Losses</h1>
              <span className="text-2xl font-bold text-red-400">
                {gameData.losses}
              </span>
            </div>
            <div className="flex flex-col items-center ">
              <h1 className="font-semibold">Total Won</h1>
              <span className="text-2xl font-bold text-green-400">
                ${gameData.totalWin}
              </span>
            </div>
            <div className="flex flex-col items-center ">
              <h1 className="font-semibold">Total Lost</h1>
              <span className="text-2xl font-bold text-red-400">
                ${gameData.TotalLost}
              </span>
            </div>
            <div className="flex flex-col items-center ">
              <h1 className="font-semibold">Net Profit</h1>
              <span
                className={`text-2xl font-bold text-${
                  gameData.NetProfit > 0 ? "green" : "red"
                }-400`}
              >
                {formatter.format(gameData.NetProfit)}
              </span>
            </div>
          </div>
        </div>
        {/*  */}
        <div className="flex items-center justify-center ">
          {initialDice && (
            <img className="h-40 px-0 " src="./dice5.png" />
          )}
          {DiceLoading && (
            <span>
              <img
                className="h-40 "
                src="https://media.tenor.com/sUiwSBs8S6QAAAAi/dice-game.gif"
              />
            </span>
          )}

          {showDice && <DiceBox DiceNumber={DiceNumber} />}
        </div>
      </div>
      {/* // */}
      <div className="mb-5">
        {/*  */}
        {result.game == "won" && <WinTemplate result={result} />}
        {result.game == "loss" && <LostTemplate result={result} />}
      </div>
    </div>
  );
}

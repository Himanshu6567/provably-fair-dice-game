import React, { useContext, useState } from "react";
import { PiSwap } from "react-icons/pi";

import { DiceContext } from "../Context/Context";

export default function SideBar() {
  const { Amount, betAmount, setbetAmount, handleDiceRoll, btntext } =
    useContext(DiceContext);

  const handlebetAmountChange = (e) => {
    // bet input change
    setbetAmount(e.target.value);
  };

  const handlesetBetAmount = (num) => {
    let x = (Amount * num) / 100; // set bet amount based on %
    setbetAmount(Math.round(x));
  };

  return (
    <div className="bg-secondary md:basis-[30%]   py-3 px-4">
      <div className="flex items-center justify-between px-2 py-2 text-sm font-bold bg-dark rounded-3xl">
        <button className="px-6 py-2 text-white bg-primary rounded-3xl">
          Manual
        </button>
        <button className="text-white">Auto</button>
        <PiSwap className="mr-4 text-gray-400" />
      </div>
      {/* // */}
      <div className="flex flex-col">
        <h1 className="mt-3 font-bold text-gray-400">Bet Amount</h1>
        <div className="flex items-center mt-2">
          <div className="w-full border border-primary">
            <input
              value={betAmount}
              onChange={handlebetAmountChange}
              placeholder="Enter Amount"
              type="number"
              className="w-full h-10 px-2 text-white bg-dark no-spinner"
            />
          </div>
          <span className=" p-1 h-4 w-4  text-sm flex items-center ml-[-28px] bg-[#C9BB57] rounded-full ">
            $
          </span>
        </div>
        <div className="flex items-center justify-between px-10 mt-6 space-x-4">
          <button
            onClick={() => handlesetBetAmount(10)}
            className="px-4 py-2 font-bold text-gray-400 bg-gray-100 hover:bg-gray-300 rounded-xl"
          >
            10%
          </button>
          <button
            onClick={() => handlesetBetAmount(50)}
            className="px-4 py-2 font-bold text-gray-400 bg-gray-100 hover:bg-gray-300 rounded-xl"
          >
            50%
          </button>
          <button
            onClick={() => handlesetBetAmount(100)}
            className="px-4 py-2 font-bold text-gray-400 bg-gray-100 hover:bg-gray-300 rounded-xl"
          >
            Max
          </button>
        </div>
        {/*  */}
        <div className="px-2 py-4 mt-5 md:mt-0">
          <button
            onClick={handleDiceRoll}
            className="bg-green-500 hover:bg-[#28b463] w-full font-bold py-2  rounded-md"
          >
            {btntext}
          </button>
        </div>
      </div>
    </div>
  );
}

import React from "react";

export default function LostTemplate({ result }) {
  return (
    <div className=" px-12 md:px-32 mt-10">
      <div className="bg-red-300 border-2 px-3 py-2 flex items-center justify-center flex-col border-red-700 rounded-md">
        <h1 className="text-red-700 font-bold ">You lost ${result.value}! 😥 </h1>
        <p className="text-red-700"> Better luck next time</p>
      </div>
    </div>
  );
}

import React from "react";

export default function WinTemplate({ result }) {
  return (
    <div className=" px-12 md:px-32 mt-10">
      <div className="bg-green-300 border-2 px-3 py-2 flex items-center justify-center flex-col border-green-700 rounded-md">
        <h1 className="text-green-700 font-bold ">
          You Won ${result.value}! 🎉
        </h1>
        <p className="text-green-700">Congratulations on your win</p>
      </div>
    </div>
  );
}

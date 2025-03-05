import React from "react";

export default function DiceBox({ DiceNumber }) {
  console.log("number is", DiceNumber);
  return (
    <div >
      <img className="h-40 px-0 shadow-xl " src={`./dice${DiceNumber}.png`} />
    </div>
  );
}

import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const DiceContext = createContext();

export const GameProvider = ({ children }) => {
  const storedAmount = localStorage.getItem("Amount"); // check if the amount alredy storad in the local storage
  const storedReturnAmounts = localStorage.getItem("returnAmounts"); // get return value array from local storage
  const storedGameData = localStorage.getItem("gameData"); // get  GameData from local storage
  const storedGameHistory = localStorage.getItem("gameHistory"); // get  GameHistory from local storage

  // condition if the value is not stored in the localstorage then we initial the value
  const initialAmount = storedAmount ? JSON.parse(storedAmount) : 1000; // if not then initial value is 1000
  const initialReturnAmounts = storedReturnAmounts
    ? JSON.parse(storedReturnAmounts)
    : [];

  const initialGameData = storedGameData
    ? JSON.parse(storedGameData)
    : {
        totalBets: 0,
        winRate: 0,
        wins: 0,
        losses: 0,
        totalWin: 0,
        TotalLost: 0,
        NetProfit: 0,
      };

  const initialGameHistory = storedGameHistory
    ? JSON.parse(storedGameHistory)
    : [];

  const [Amount, setAmount] = useState(initialAmount); // the initial amount $10000
  const [betAmount, setbetAmount] = useState(""); // state to store the user bet amount

  const [DiceLoading, setDiceLoading] = useState(false); //during beting show the dice loading animation
  const [btntext, setbtnText] = useState("Bet"); // during beting show the button text "Dice rolling"
  const [returnAmounts, setreturnAmounts] = useState(initialReturnAmounts); // state to store the bet return amount
  const [showHistory, setShowHistory] = useState(false); // state to store the history tab show or hide
  const [initialDice, setInitialDice] = useState(true); // state to store when the page load ,show the initail dice
  const [DiceNumber, setDiceNumber] = useState(); // state to store the dice number which get from the backend
  const [showDice, setShowDice] = useState(false); // state to store the dice after bet
  const [result, setresult] = useState({}); // state to store batting result
  const [clientSeed, setclientSeed] = useState("");
  const [hash, setHash] = useState(" "); // hash for verification
  const [serverSeed, setserverSeed] = useState(""); // state fir store server hash
  const [gameData, setGameData] = useState(initialGameData); // state to store the game data

  const [gameHistory, setGameHistory] = useState(initialGameHistory); // stete to store the the game history

  // Update local storage when states change
  useEffect(() => {
    localStorage.setItem("Amount", JSON.stringify(Amount));
  }, [Amount]);

  useEffect(() => {
    localStorage.setItem("returnAmounts", JSON.stringify(returnAmounts));
  }, [returnAmounts]);

  useEffect(() => {
    localStorage.setItem("gameData", JSON.stringify(gameData));
  }, [gameData]);

  useEffect(() => {
    localStorage.setItem("gameHistory", JSON.stringify(gameHistory));
  }, [gameHistory]);

  // reset the game
  const handleResetGame = () => {
    const resetAmount = 1000;
    setAmount(resetAmount); // Reset amount to initial value
    localStorage.setItem("Amount", JSON.stringify(resetAmount));

    setbetAmount(""); // Clear bet amount
    setDiceLoading(false); // Ensure dice is not loading
    setbtnText("Bet"); // Reset button text

    setreturnAmounts([]); // Clear return amounts
    localStorage.setItem("returnAmounts", JSON.stringify([]));

    setShowHistory(false); // Hide history
    setInitialDice(true); // Show initial dice state
    setDiceNumber(undefined); // Clear dice number
    setShowDice(false); // Hide dice
    setresult({}); // Clear result
    setGameData({
      // Reset game data
      totalBets: 0,
      winRate: 0,
      wins: 0,
      losses: 0,
      totalWin: 0,
      TotalLost: 0,
      NetProfit: 0,
    });
    localStorage.setItem(
      "gameData",
      JSON.stringify({
        totalBets: 0,
        winRate: 0,
        wins: 0,
        losses: 0,
        totalWin: 0,
        TotalLost: 0,
        NetProfit: 0,
      })
    );

    setGameHistory([]); // Clear game history
    localStorage.setItem("gameHistory", JSON.stringify([]));
  };

  // function to  roll the dice
  const handleDiceRoll = async () => {
    const newClientSeed = Math.random().toString(36).substring(2);
    setclientSeed(newClientSeed);

    console.log("client", clientSeed);

    if (betAmount < 0) {
      alert("Please Enter the positive betAmount");
      return;
    }

    if (betAmount == "" || betAmount == 0) {
      // check if betamount is empty or 0
      alert("Please Enter the betAmount");
      return;
    }
    if (Amount < betAmount || Amount == 0) {
      //check if amount is less then betAmount
      alert("Not sufficient Balance");
      return;
    }
    setbtnText("Dice rolling.."); //
    setShowDice(false);
    setInitialDice(false);
    setDiceLoading(true); // show the dice loading

    try {
      const response = await axios.post(
        "https://provably-fair-dice-game-server.up.railway.app/roll-dice",
        {
          clientSeed: newClientSeed,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status == 200) {
        const Dicevalue = response.data.diceRoll;
        setDiceNumber(Dicevalue);
        setHash(response.data.hash);
        setserverSeed(response.data.serverSeed);

        setTimeout(() => {
          setDiceLoading(false); //stop dice loading animation
          setShowDice(true); // show actual dice value
          setbtnText("Bet"); // button text change
          // const Dicevalue = response.data.diceRoll;

          // setDiceNumber(Dicevalue);
          if (Dicevalue <= 3) {
            setreturnAmounts((prev) => [...prev, -betAmount]);
            setGameHistory((prev) => [
              {
                diceNumber: Dicevalue,
                betAmount: betAmount,
                time: new Date().toLocaleTimeString(),
                returnAmount: 0 - betAmount,
              },
              ...prev,
            ]);

            setAmount((prevAmount) => {
              const newAmount = prevAmount - betAmount;
              setGameData((prev) => ({
                // updatw the game Data
                ...prev,
                totalBets: prev.totalBets + 1,
                losses: prev.losses + 1,
                TotalLost: prev.TotalLost + betAmount,
                NetProfit: newAmount - 1000,

                winRate:
                  prev.totalBets === 0
                    ? 0
                    : Number(
                        ((prev.wins / (prev.totalBets + 1)) * 100).toFixed(1)
                      ),
              }));
              return newAmount;
            });
            setresult({
              // update the game game result
              value: betAmount,
              game: "loss",
            });
            console.log("lost");
          } else {
            console.log("won");

            setreturnAmounts((prev) => [...prev, betAmount * 2]); // update the return amount list
            setGameHistory((prev) => [
              // update the game history
              {
                diceNumber: Dicevalue,
                betAmount: betAmount,
                time: new Date().toLocaleTimeString(),
                returnAmount: betAmount * 2,
              },
              ...prev,
            ]);

            setresult({
              // update the game result
              value: betAmount * 2,
              game: "won",
            });

            setAmount((prevAmount) => {
              const newAmount = prevAmount + betAmount * 2;
              setGameData((prev) => ({
                // updatw the game Data
                ...prev,
                totalBets: prev.totalBets + 1,
                wins: prev.wins + 1,
                totalWin: prev.totalWin + betAmount * 2,
                NetProfit: newAmount - 1000,
                winRate:
                  prev.totalBets === 0
                    ? 0
                    : Number(
                        (
                          ((prev.wins + 1) / (prev.totalBets + 1)) *
                          100
                        ).toFixed(1)
                      ),
              }));
              return newAmount;
            });
          }
        }, 3000);
      }
    } catch (error) {
      console.error("Error sending request:", error);
    }
  };

  return (
    <DiceContext.Provider
      value={{
        Amount,
        handleDiceRoll,
        returnAmounts,
        gameHistory,
        betAmount,
        setbetAmount,
        DiceLoading,
        btntext,
        showHistory,
        setShowHistory,
        gameData,
        initialDice,
        DiceNumber,
        showDice,
        result,
        handleResetGame,
      }}
    >
      {children}
    </DiceContext.Provider>
  );
};

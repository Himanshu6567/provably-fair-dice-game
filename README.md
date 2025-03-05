# Provably Fair Dice Game

A simple provably fair dice game where players can bet and roll a dice to win or lose credits. The game tracks the player's history, including bets, winnings, and losses.

## 🚀 Features

- 🎲 **Dice Roll Mechanism**: Players roll a dice (1-6), winning on 4, 5, or 6 and losing on 1, 2, or 3.
- 💰 **Betting System**: Players enter a bet amount before rolling the dice.
- 📜 **Provably Fair System**: Uses **SHA-256 hashing** to ensure fairness and verify dice roll outcomes.
- 🎞️ **Rolling Animation**: When the user clicks **"Roll Dice"**, the dice starts rolling and stops at a random number. The final result is determined using SHA-256 hashing for fairness.
- 📊 **Win/Loss Tracking**:
  - Win Rate
  - Total Wins & Losses
  - Net Profit
- ⏳ **Game History**:
  - Bet Amount
  - Roll Outcome (Dice Number)
  - Time of Bet
- 💾 **Local Storage Persistence**: Player balance and game history are stored in localStorage.
- 🎨 **Dark-Themed UI**: Clean and responsive design using Tailwind CSS.

## 🛠️ Tech Stack

- **Frontend**: React.js (JSX), Tailwind CSS
- **Backend**: Node.js, Express.js
- **Storage**: LocalStorage (for balance and game history)

## 📜 How It Works

1.  Players start with **$1000 credits**.
2.  Enter a **bet amount**.
3.  Click **“Roll Dice”**.
4.  The dice starts rolling and stops at a **random number (1-6)**.
    - If the number is **4, 5, or 6** → **Win** (2x payout)
    - If the number is **1, 2, or 3** → **Lose** (bet is deducted)
5.  Balance is updated accordingly.
6.  Game history is recorded.
7.  SHA-256 hashing is used to verify the fairness of each dice roll.

## 🖥️ Installation & Setup

1.  Clone the repository:

    ```sh
    git clone https://github.com/himanshu6567/provably-fair-dice-game.git
    cd provably-fair-dice-game

    ```

2.  Install dependencies & Start the backend server:

    ```sh
    cd server
    npm install
    node server.js
    ```

3.  Start the frontend:

    ```sh
    cd client
    npm install
    npm run dev
    ```

## 🌐 Deployment

- Hosted on **vercel**: [Live Link](https://provably-fair-dice-game-mu.vercel.app)

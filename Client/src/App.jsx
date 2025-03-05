import { useContext } from "react";
import History from "./Component/History";
import HomePage from "./Component/HomePage";
import Navbar from "./Component/Navbar";
import SideBar from "./Component/SideBar";

import { DiceContext } from "./Context/Context";

function App() {
  const { showHistory } = useContext(DiceContext);
  return (
    <div>
      <Navbar />
      <div className="flex flex-col md:min-h-screen md:flex-row">
        <SideBar />
        <HomePage />
      </div>
      {showHistory && <History />}
    </div>
  );
}

export default App;

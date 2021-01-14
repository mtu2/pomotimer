import styles from "./App.module.scss";

import { EntryContextProvider } from "../../context/EntryContext";
import Dashboard from "./../Dashboard/Dashboard";
import Navbar from "./../Navbar/Navbar";

// Import font awesome icons
// Only solid icons for free users
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);

function App() {
  return (
    <EntryContextProvider>
      <div className={styles.app}>
        <Navbar />
        <Dashboard />
      </div>
    </EntryContextProvider>
  );
}

export default App;

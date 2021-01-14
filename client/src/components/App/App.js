import styles from "./App.module.scss";
import Dashboard from "./../Dashboard/Dashboard";
import Navbar from "./../Navbar/Navbar";

// Import font awesome icons
// Only solid icons for free users
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);

function App() {
  return (
    <div className={styles.app}>
      <Navbar />
      <Dashboard />
    </div>
  );
}

export default App;

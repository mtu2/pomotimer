import styles from "./App.module.scss";
import Dashboard from "./../Dashboard/Dashboard";

// Import font awesome icons
// Only solid icons for free users
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);

function App() {
  return (
    <div className={styles.app}>
      <Dashboard />
    </div>
  );
}

export default App;

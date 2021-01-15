import styles from "./App.module.scss";

import { ModalContextProvider } from "../../context/ModalContext/ModalContext";
import { EntryContextProvider } from "../../context/EntryContext/EntryContext";
import Modal from "../Modal/Modal";
import Dashboard from "./../Dashboard/Dashboard";
import Navbar from "./../Navbar/Navbar";

// Import font awesome icons
// Only solid icons for free users
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";

library.add(fab, fas);

function App() {
  return (
    <ModalContextProvider>
      <EntryContextProvider>
        <div className={styles.app}>
          <Modal />
          <Navbar />
          <Dashboard />
        </div>
      </EntryContextProvider>
    </ModalContextProvider>
  );
}

export default App;

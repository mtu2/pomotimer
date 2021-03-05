import { Toaster } from "react-hot-toast";
import { ModalContextProvider } from "../../context/ModalContext/ModalContext";
import { EntryContextProvider } from "../../context/EntryContext/EntryContext";
import { AuthContextProvider } from "../../context/AuthContext/AuthContext";
import { SettingsContextProvider } from "../../context/SettingsContext/SettingsContext";
import Modal from "../Modal/Modal";
import Dashboard from "../Dashboard/Dashboard";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

// Import font awesome icons
// Only solid icons for free users
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";

library.add(fab, fas);

function App() {
  return (
    <ModalContextProvider>
      <AuthContextProvider>
        <EntryContextProvider>
          <SettingsContextProvider>
            <div>
              <Toaster />
              <Modal />
              <Navbar />
              <Dashboard />
              <Footer />
            </div>
          </SettingsContextProvider>
        </EntryContextProvider>
      </AuthContextProvider>
    </ModalContextProvider>
  );
}

export default App;

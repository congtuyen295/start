import { BrowserRouter as Router } from "react-router-dom";
import AppRoutesComponent from "./routes/index";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { positions, Provider as AlertProvider, transitions } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import "antd/dist/antd.min.css";

import { persistor, store } from "./redux/store";
import AppContainer from "./AppContainer";
import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";        
import DataProvider from "./DataProvider";
                        //icons

const options = {
  timeout: 5000,
  position: positions.TOP_RIGHT,
  transition: transitions.SCALE
};

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <DataProvider>
          <Router>
            <AlertProvider template={AlertTemplate} {...options}>
              <AppContainer>
                <AppRoutesComponent />
              </AppContainer>
            </AlertProvider>
          </Router>
          </DataProvider>
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;

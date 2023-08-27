import {} from "antd";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import AppHeader from "./components/AppHeader";
import AppFooter from "./components/AppFooter";
import PageContent from "./components/PageContent";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AppHeader />
        <PageContent />
        <AppFooter />
      </BrowserRouter>
    </div>
  );
}

export default App;

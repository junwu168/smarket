import {} from "antd";
import "./App.css";
import AppHeader from "./components/AppHeader";
import AppFooter from "./components/AppFooter";
import PageContent from "./components/PageContent";

function App() {
  return (
    <div className="App">
      <AppHeader />
      <PageContent />
      <AppFooter />
    </div>
  );
}

export default App;

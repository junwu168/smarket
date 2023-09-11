import React, { useState, createContext } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import AppHeader from "./components/AppHeader";
import AppFooter from "./components/AppFooter";
import PageContent from "./components/PageContent";

export const SearchContext = createContext();

function App() {
  const [searchResults, setSearchResults] = useState([]);
  return (
    <div className="App">
      <BrowserRouter>
        <SearchContext.Provider value={{ searchResults, setSearchResults }}>
          <AppHeader />
          <PageContent />
        </SearchContext.Provider>
        <AppFooter />
      </BrowserRouter>
    </div>
  );
}

export default App;

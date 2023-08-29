import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import AppHeader from './components/AppHeader';
import AppFooter from './components/AppFooter';
import PageContent from './components/PageContent';
import SellingOverview from './components/SellingOverview';

function App() {
    return (
        <div className="App">
            <Router>
                <AppHeader />
                <Routes>
                    <Route path="/" element={<PageContent />} />
                    <Route path="/selling-overview" element={<SellingOverview />} />
                    {/* You can add more routes as your application grows */}
                </Routes>
                <AppFooter />
            </Router>
        </div>
    );
}

export default App;

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ShopPage from './pages/ShopPage';
import AccountPage from './pages/AccountPage';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<ShopPage />} />
                <Route path="/accounts/:id" element={<AccountPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
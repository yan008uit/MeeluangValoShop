import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/shop.css';

const ACCOUNT_STATUS = {
    AVAILABLE: 'Available',
    SOLD: 'Sold',
};

function ShopPage() {
    const [accounts, setAccounts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('/api/accounts')
            .then(res => res.json())
            .then(setAccounts)
            .catch(console.error);
    }, []);

    const handleBuy = (e, acc) => {
        e.stopPropagation();
        alert(`Buying account: ${acc.username}`);
    };

    return (
        <>
            <Navbar />
            <Hero />

            <main className="shop-container">
                <h2 className="section-title">Valorant Accounts</h2>

                <div className="shop-grid">
                    {accounts.map(acc => {
                        const isSold = acc.status === ACCOUNT_STATUS.SOLD;

                        return (
                            <div
                                key={acc.id}
                                className={`shop-item account-card ${isSold ? 'sold' : ''}`}
                                onClick={() => {
                                    if (!isSold) {
                                        navigate(`/accounts/${acc.id}`);
                                    }
                                }}
                            >
                                <div className="image-wrapper">
                                    <img
                                        src={acc.image_url}
                                        alt={acc.username}
                                        className="shop-page-item-image"
                                    />

                                    {isSold && (
                                        <div className="sold-overlay">
                                            SOLD
                                        </div>
                                    )}
                                </div>

                                <h3 className="item-name">{acc.username}</h3>
                                <p className="item-price">{acc.rank}</p>
                                <p className="item-price">{acc.skin_count} skins</p>

                                <div className="card-footer">
                                    <strong className="price">
                                        ฿{acc.price.toLocaleString()}
                                    </strong>

                                    {!isSold ? (
                                        <button
                                            className="buy-btn"
                                            onClick={(e) => handleBuy(e, acc)}
                                        >
                                            Buy
                                        </button>
                                    ) : (
                                        <span className="sold-text">Sold</span>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </main>
        </>
    );
}

export default ShopPage;
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/shop.css';

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
        e.stopPropagation(); // prevent card click
        alert(`Buying account: ${acc.username}`);
        // later: open modal / redirect to contact / checkout
    };

    return (
        <>
            <Navbar />
            <Hero />

            <main className="shop-container">
                <h2 className="section-title">Valorant Accounts</h2>

                <div className="shop-grid">
                    {accounts.map(acc => (
                        <div
                            key={acc.id}
                            className="shop-item account-card"
                            onClick={() => navigate(`/accounts/${acc.id}`)}
                        >
                            <img
                                src={acc.image_url}
                                alt={acc.username}
                                className="item-image"
                            />

                            <h3 className="item-name">{acc.username}</h3>
                            <p className="item-price">{acc.rank}</p>
                            <p className="item-price">{acc.skin_count} skins</p>

                            <div className="card-footer">
                                <strong className="price">฿{acc.price.toLocaleString()}</strong>

                                <button
                                    className="buy-btn"
                                    onClick={(e) => handleBuy(e, acc)}
                                >
                                    Buy
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </>
    );
}

export default ShopPage;
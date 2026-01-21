import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/shop.css';

const ACCOUNT_STATUS = {
    AVAILABLE: 'Available',
    SOLD: 'Sold',
};

const SORT_BY = {
    ID: 'ID',
    PRICE: 'PRICE',
    RANK: 'RANK',
};

const SORT_ORDER = {
    ASC: 'ASC',
    DESC: 'DESC',
};

function ShopPage() {
    const [accounts, setAccounts] = useState([]);
    const [sortBy, setSortBy] = useState(SORT_BY.ID);
    const [sortOrder, setSortOrder] = useState(SORT_ORDER.ASC);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('/api/accounts')
            .then(res => res.json())
            .then(data => {
                setAccounts(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        document.title = 'SIAICE RANGSIT SHOP ( SIER )';
    }, []);

    const handleBuy = (e, acc) => {
        e.stopPropagation();

        window.open(
            `https://www.facebook.com/messages/t/watcharakorn.bucha.5`,
            '_blank'
        );
    };

    /* ===== SORT LOGIC ===== */
    const handleSortChange = (type) => {
        if (sortBy === type) {
            setSortOrder(prev =>
                prev === SORT_ORDER.ASC ? SORT_ORDER.DESC : SORT_ORDER.ASC
            );
        } else {
            setSortBy(type);
            setSortOrder(SORT_ORDER.ASC);
        }
    };

    const sortAccounts = (a, b) => {
        let result = 0;

        if (sortBy === SORT_BY.ID) {
            const numA = parseInt(a.id.replace(/\D/g, ''), 10);
            const numB = parseInt(b.id.replace(/\D/g, ''), 10);
            result = numA - numB;
        }

        if (sortBy === SORT_BY.PRICE) {
            result = a.price - b.price;
        }

        if (sortBy === SORT_BY.RANK) {
            result = a.rank.localeCompare(b.rank);
        }

        return sortOrder === SORT_ORDER.ASC ? result : -result;
    };

    const availableAccounts = accounts.filter(
        acc => acc.status === ACCOUNT_STATUS.AVAILABLE
    );

    const soldAccounts = accounts.filter(
        acc => acc.status === ACCOUNT_STATUS.SOLD
    );

    const renderAccountCard = (acc) => {
        const isSold = acc.status === ACCOUNT_STATUS.SOLD;

        return (
            <div
                key={acc.id}
                className={`shop-item account-card ${isSold ? 'sold' : ''}`}
                onClick={() => {
                    if (!isSold) navigate(`/accounts/${acc.id}`);
                }}
            >
                <div className="image-wrapper">
                    <img
                        src={acc.image_url}
                        alt={acc.id}
                        className="shop-page-item-image"
                    />
                    {isSold && <div className="sold-overlay">SOLD</div>}
                </div>

                <h3 className="item-name">{acc.id}</h3>
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
                            Contact to Buy
                        </button>
                    ) : (
                        <span className="sold-text">Sold</span>
                    )}
                </div>
            </div>
        );
    };

    return (
        <>
            <Navbar />
            <Hero />

            <main className="shop-container">
                {/* SORT BAR */}
                <div className="sort-bar">
                    <span>Sort by:</span>

                    <button
                        className={sortBy === SORT_BY.ID ? 'active' : ''}
                        onClick={() => handleSortChange(SORT_BY.ID)}
                    >
                        ID {sortBy === SORT_BY.ID && (sortOrder === 'ASC' ? '↑' : '↓')}
                    </button>

                    <button
                        className={sortBy === SORT_BY.PRICE ? 'active' : ''}
                        onClick={() => handleSortChange(SORT_BY.PRICE)}
                    >
                        Price {sortBy === SORT_BY.PRICE && (sortOrder === 'ASC' ? '↑' : '↓')}
                    </button>

                    <button
                        className={sortBy === SORT_BY.RANK ? 'active' : ''}
                        onClick={() => handleSortChange(SORT_BY.RANK)}
                    >
                        Rank {sortBy === SORT_BY.RANK && (sortOrder === 'ASC' ? '↑' : '↓')}
                    </button>
                </div>

                {/* AVAILABLE */}
                <section className="shop-section">
                    <h2 className="section-title">
                        Available Accounts ({availableAccounts.length})
                    </h2>

                    <div className="shop-grid">
                        {loading ? (
                            <p className="loading-text">Loading accounts...</p>
                        ) : availableAccounts.length > 0 ? (
                            [...availableAccounts]
                                .sort(sortAccounts)
                                .map(renderAccountCard)
                        ) : (
                            <p className="empty-text">No available accounts</p>
                        )}
                    </div>
                </section>

                {/* SOLD */}
                <section className="shop-section sold-section">
                    <h2 className="section-title">
                        Sold Accounts ({soldAccounts.length})
                    </h2>

                    <div className="shop-grid">
                        {loading ? (
                            <p className="loading-text">Loading accounts...</p>
                        ) : soldAccounts.length > 0 ? (
                            [...soldAccounts]
                                .sort(sortAccounts)
                                .map(renderAccountCard)
                        ) : (
                            <p className="empty-text">No sold accounts</p>
                        )}
                    </div>
                </section>
            </main>
        </>
    );
}

export default ShopPage;
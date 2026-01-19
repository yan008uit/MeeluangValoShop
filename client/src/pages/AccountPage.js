import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from "../components/Navbar";

function AccountPage() {
    const { id } = useParams();
    const [account, setAccount] = useState(null);

    useEffect(() => {
        fetch(`/api/accounts/${id}`)
            .then(res => res.json())
            .then(setAccount);
    }, [id]);

    useEffect(() => {
        if (account) {
            document.title = `${account.username} · ${account.rank}`;
        }
    }, [account]);

    if (!account) return null;

    return (
        <>
            <Navbar />
            {/* HERO */}
            <section className="account-detail-hero">
                <img
                    src={account.image_url}
                    alt={account.username}
                    className="account-detail-image"
                />

                <div className="account-detail-overlay">
                    <span className={`rank-badge rank-${account.rank.toLowerCase().replace(' ', '')}`}>
                        {account.rank}
                    </span>

                    <h1>{account.username}</h1>

                    <div className="account-detail-actions">
                        <div className="price">฿{account.price.toLocaleString()}</div>
                        <button className="contact-btn">Buy</button>
                    </div>
                </div>
            </section>

            {/* META */}
            <section className="account-meta">
                <div>
                    <strong>{account.vp}</strong>
                    <span>VP Remaining</span>
                </div>
                <div>
                    <strong>{account.radianite}</strong>
                    <span>R Points</span>
                </div>
                <div>
                    <strong>{account.weapons.length}</strong>
                    <span>Skins</span>
                </div>
            </section>

            {/* WEAPONS */}
            <main className="shop-container">
                <h2 className="section-title">Skins in this Account</h2>

                <div className="shop-grid">
                    {account.weapons.map(w => (
                        <div key={w.id} className="shop-item">
                            <img
                                src={w.image_url}
                                alt={w.skin_name}
                                className="item-image"
                                loading="lazy"
                            />
                            <h4 className="item-name">{w.skin_name}</h4>
                            <small className="item-price">{w.type}</small>
                        </div>
                    ))}
                </div>
            </main>
        </>
    );
}

export default AccountPage;
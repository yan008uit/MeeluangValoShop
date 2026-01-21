import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from "../components/Navbar";

const WEAPON_ORDER = [
    'Set',
    'Classic',
    'Shorty',
    'Frenzy',
    'Ghost',
    'Sheriff',
    'Stinger',
    'Spectre',
    'Bucky',
    'Judge',
    'Bulldog',
    'Guardian',
    'Phantom',
    'Vandal',
    'Marshal',
    'Operator',
    'Ares',
    'Odin',
];

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
            document.title = `${account.id}`;
        }
    }, [account]);

    if (!account) return null;

    const groupedWeapons = WEAPON_ORDER.map(type => ({
        type,
        items: account.weapons.filter(
            w => w.weapon_type === type
        )
    })).filter(group => group.items.length > 0);

    const handleBuy = (e, acc) => {
        e.stopPropagation();

        window.open(
            `https://www.facebook.com/messages/t/watcharakorn.bucha.5`,
            '_blank'
        );
    };

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
                        <button
                            className="contact-btn"
                            onClick={(e) => handleBuy(e, acc)}
                        >
                            Contact to Buy
                        </button>
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
                    <strong>{account.rp}</strong>
                    <span>R Points</span>
                </div>
                <div>
                    <strong>{account.weapons.length}</strong>
                    <span>Skins</span>
                </div>
                <div>
                    <strong>{account.rename_available_date}</strong>
                    <span>Rename available date</span>
                </div>
                <div>
                    <strong>
                        {account.premier_locked ? 'Locked' : 'Not Locked'}
                    </strong>
                    <span>Premier Status</span>
                </div>
                <div>
                    <strong>
                        {account.warranty}
                    </strong>
                    <span>Warranty</span>
                </div>
            </section>

            {/* WEAPONS */}
            <main className="account-container">
                <h2 className="section-title">Skins in this Account</h2>

                {groupedWeapons.map(group => (
                    <section key={group.type} className="weapon-section">
                        <h3 className="weapon-section-title">
                            {group.type === 'Set' ? 'Full Sets' : group.type}
                        </h3>

                        <div className="account-grid">
                            {group.items.map(w => (
                                <div key={w.id} className="shop-item">
                                    <img
                                        src={w.image_url}
                                        alt={w.set_name}
                                        className="item-image"
                                        loading="lazy"
                                    />
                                    <h4 className="item-name">{w.set_name}</h4>
                                    <small className="item-price">{w.weapon_type}</small>
                                </div>
                            ))}
                        </div>
                    </section>
                ))}
            </main>
        </>
    );
}

export default AccountPage;
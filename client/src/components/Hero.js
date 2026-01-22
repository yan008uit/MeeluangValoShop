function Hero() {
    const handleBuy = (e) => {
        e.stopPropagation();

        window.open(
            `https://www.facebook.com/messages/t/watcharakorn.bucha.5`,
            '_blank'
        );
    };

    return (
        <section className="hero hero-bg">
            <div className="hero-text">
                <h1>Exclusive Valorant Skins</h1>
                <p>Daily rotating offers for your account</p>
                <button
                    className="contact-btn"
                    onClick={(e) => handleBuy(e)}
                >
                    Buy Now
                </button>
            </div>
        </section>
    );
}

export default Hero;
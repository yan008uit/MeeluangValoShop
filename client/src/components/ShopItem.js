function ShopItem({ weapon }) {
    return (
        <div className="shop-item">
            <img
                src={weapon.image_url}
                alt={weapon.skin_name}
                className="item-image"
                loading="lazy"
            />

            <h3 className="item-name">{weapon.skin_name}</h3>
            <p className="item-price">{weapon.type}</p>
        </div>
    );
}

export default ShopItem;
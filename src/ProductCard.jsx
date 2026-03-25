import { useNavigate } from "react-router";

function ProductCard({ item, onAdd }) {
    const navigate = useNavigate();

    return (
    <div className="card">
        <div className="card-content" onClick={() => navigate(`/product/${item.id}`)}>
            <img src={item.thumbnail} alt={item.title} />
            <h3>{item.title}</h3>
            <p className="price">${item.price}</p>
        </div>
        <button className="details-btn" onClick={() => navigate(`/product/${item.id}`)}>
            Характеристики
        </button>
        <button className="add-button" onClick={() => onAdd(item)}>
            В корзину
        </button>
    </div>
    );
}

export default ProductCard;

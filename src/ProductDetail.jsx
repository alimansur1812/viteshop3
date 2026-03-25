import { useParams, Link } from "react-router";

function ProductDetail({ products, onAdd }) {
    const { id } = useParams();
    const product = products.find(p => p.id === parseInt(id));

    if (!product) return <h2>Товар не найден</h2>;

    return (
        <div className="detail-container">
            <Link to="/" className="back-link">← Назад</Link>
            <div className="detail-content">
                <img src={product.thumbnail} alt={product.title} />
                <div className="detail-info">
                    <h1>{product.title}</h1>
                    <p className="detail-price">Цена: ${product.price}</p>
                    <div className="specs">
                        <p><b>Описание:</b> {product.description}</p>
                        <p><b>Бренд:</b> {product.brand}</p>
                        <p><b>Рейтинг:</b> {product.rating} / 5</p>
                    </div>
                    <button className="add-button" onClick={() => onAdd(product)}>
                        Добавить в корзину
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;
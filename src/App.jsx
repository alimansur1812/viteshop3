import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router";
import ProductCard from "./ProductCard";
import ProductDetail from "./ProductDetail";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [korzina, setKorzina] = useState([]);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    fetch("https://dummyjson.com/products/category/laptops")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
      });
  }, []);

  const addToCart = (item) => setKorzina([...korzina, item]);

  const clearCart = () => {
    setKorzina([]);
    setFirstName("");
    setLastName("");
    setEmail("");
  };

  const handleOrder = (e) => {
    e.preventDefault();
    alert(`Заказ оформлен! Покупатель: ${firstName} ${lastName}. Товаров: ${korzina.length}`);
    clearCart();
  };

  const total = korzina.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="container">
      <nav className="navbar">
        <div className="logo">Чурхан Шоп</div>
        <div className="nav-links">
          <Link to="/" className="nav-item">Каталог</Link>
          <Link to="/contacts" className="nav-item">Контакты</Link>
          <Link to="/cart" className="nav-item">Корзина ({korzina.length})</Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={
            <div className="grid">
              {products.map(p => <ProductCard key={p.id} item={p} onAdd={addToCart} />)}
            </div>
        } />

        <Route path="/product/:id" element={<ProductDetail products={products} onAdd={addToCart} />} />

        <Route path="/contacts" element={
          <div className="contacts">
            <h2>Наши контакты</h2>
            <p><b>Адрес:</b> г. Бишкек, проспект Чуй 999</p>
            <p><b>Телефон:</b> +996 (755) 06-50-00</p>
            <p><b>Почта:</b> alimansur.satybaldiev@alatoo.edu.kg</p>
          </div>
        } />

        <Route path="/cart" element={
          <div className="contacts">
            <h2>Ваша корзина</h2>
            {korzina.length === 0 ? <p>Пока пусто</p> : (
              <div>
                {korzina.map((item, i) => (
                  <div key={i} className="cart-item">
                    <span>{item.title}</span> <b>${item.price}</b>
                  </div>
                ))}
                <h3>Итого: ${total}</h3>
                <form className="order-form" onSubmit={handleOrder}>
                  <input type="text" placeholder="Имя" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                  <input type="text" placeholder="Фамилия" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                  <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                  <button type="submit" className="buy-now-btn">Купить</button>
                  <br />
                  <button type="button" onClick={clearCart} className="clear-cart-btn">Очистить</button>
                </form>
              </div>
            )} 
          </div>
        } />
      </Routes>
    </div>
  );
}

export default App;
import PropTypes from 'prop-types';
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';
import CartCard from '../components/CartCard';
import { getCartItems, removeFromCart, clearCart } from '../services/CartService';
import '../styles/CartModal.css';

const CartModal = ({ visible, onClose }) => {
    const cart = getCartItems();

    const handleClearCart = () => {
        clearCart();
        onClose();
        window.location.reload();
    };

    const handleRemoveFromCart = (productId) => {
        removeFromCart(productId);
        onClose();
        window.location.reload();
    };

    return (
        <div className={`cart-modal ${visible ? 'show' : 'hide'}`}>
            {cart.length === 0 ? (
                <div className="cart-empty">Seu carrinho está vazio.</div>
            ) : (
                <div className="cart-items">
                    {cart.map((item) => (
                        <CartCard
                            key={item.id}
                            id={item.id}
                            image={item.img}
                            name={item.title}
                            price={item.price}
                            quantity={item.quantity}
                            onRemove={handleRemoveFromCart}
                        />
                    ))}
                    <div className="cart-total mr-3">
                        <p>Valor total: <span className='text-red-500'>R$ {cart.reduce((total, item) => total + item.price * item.quantity, 0)}</span></p>
                    </div>
                    <div className="cart-buttons">
                        <Button label="Esvaziar" className="p-button-danger" onClick={handleClearCart} />
                        <Link to="/my-orders" onClick={onClose}>
                            <Button label="Ver Carrinho" className="p-button-primary" />
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

CartModal.propTypes = {
    visible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default CartModal;

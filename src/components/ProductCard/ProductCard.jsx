import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ id, image, name, price, priceDiscount, type }) => {
    const navigate = useNavigate();
    const discountPercentage = priceDiscount ? Math.round(((price - priceDiscount) / price) * 100) : 0;

    const handleCardClick = () => {
        navigate(`/products/${id}`);
    };

    return (
        <ul className='list-none gap-0 p-0 m-0 w-12 justify-content-between pt-2 px-1 md:justify-content-around' onClick={handleCardClick}>
            <li className='product-card bg-gray-100 lg:mx-2 md:mx-0 sm:mx-0 w-max lg:gap-2 md:gap-0   '> 
                <div className='image-container bg-blue-000 flex'>
                    {priceDiscount && <div className="discount-badge">{discountPercentage}% OFF</div>}
                    <img src={image} alt={name} className='w-12 img' />
                </div>
                <div className='product-text'>
                    <p className='my-2'>{type}</p>
                    <h3 className='my-1'>{name}</h3>
                    <div>
                        {priceDiscount && <span className="product-price-discount">R$ {priceDiscount}</span>}
                        <span className={`product-price ${priceDiscount ? 'original-price' : ''}`}>R$ {price}</span>
                    </div>
                </div>
            </li>
        </ul>
    );
};

ProductCard.propTypes = {
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    type: PropTypes.string,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    priceDiscount: PropTypes.number,
};

export default ProductCard;

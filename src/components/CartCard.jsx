import PropTypes from 'prop-types';
import '../styles/CartCard.css';

const CartCard = ({ id, image, name, price, quantity, onRemove }) => {
    return (
        <section className='m-0 p-0 '>
        <div className='flex row-flew gap-1 border-none w-full shadow-none p-1 m-0'>
            

            <div className='flex column-flew flex-wrap gap-1 w-12  '>
                <div className='flex w-4 mx-1'>
                    <img src={image} alt={name} className='w-12 h-6rem bg-gray-300 border-round-lg m-0 p-0 ' />
                    
                </div>
                <div className='flex flex-wrap w-7 mt-0 pt-0 w-7'>
                    <h3 className='w-12 pt-0 mt-0'>{name}</h3>
                    <p className='w-12'>R$ {price}</p>
                </div>
            </div>
        </div>
        </section>
    );
};

CartCard.propTypes = {
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
    onRemove: PropTypes.func.isRequired,
};

export default CartCard;

import { useState, useContext, useRef } from 'react';
import LogoHeader from '../../assets/logo-header.svg';
import MiniCart from '../../assets/mini-cart.svg';
import { Sidebar } from 'primereact/sidebar';
import { Divider } from 'primereact/divider';
import { Button } from 'primereact/button';
import { Badge } from 'primereact/badge';
import { InputText } from 'primereact/inputtext';
import { OverlayPanel } from 'primereact/overlaypanel'; // Importando OverlayPanel
import { Link, useLocation } from 'react-router-dom';
import CartModal from '../CartModal';
import { CartContext } from '../../context/CartContext';
import './Header.css';

export const MySearch = () => {
    return (
        <InputText className='flex col-12 justify-content-center' placeholder="Pesquisar produto..." />
    );
};

const Header = () => {
    const { cartCount } = useContext(CartContext); // Usando o contexto do carrinho
    const op = useRef(null); // Referência para o OverlayPanel

    const [showInput, setShowInput] = useState(false);
    const handleIconClick = () => {
        setShowInput(!showInput);
    };

    const [visible, setVisible] = useState(false);

    const location = useLocation();
    const items = [
        { label: 'Home', path: '/' },
        { label: 'Produtos', path: '/products' },
        { label: 'Categorias', path: '/categories' },
        { label: 'Meus Pedidos', path: '/my-orders' }
    ];
    const logar = [
        { label: 'Cadastre-se', path: '/register' },
        { label: 'Entrar', path: '/login' }
    ];

    const getActiveIndex = () => {
        switch (true) {
            case location.pathname === '/':
                return 0;
            case location.pathname.startsWith('/products'):
                return 1;
            case location.pathname === '/categories':
                return 2;
            case location.pathname === '/my-orders':
                return 3;
            default:
                return null;
        }
    };

    return (
        <header className="header md:px-8">
            <ul className='list-none flex md:gap-4 align-items-center justify-content-between px-0 mx-0 gap-3'>

                {/* Sidebar */}
                <li className='md:hidden'>
                    <Sidebar visible={visible} onHide={() => setVisible(false)}>
                        <div className="w-full border-none sidebar-menu">
                            {items.map((item, index) => (
                                <Link
                                    key={index}
                                    to={item.path}
                                    onClick={() => setVisible(false)}
                                    className={`menu-item ${getActiveIndex() === index ? 'active' : ''}`}
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                        <Divider className='m-0' />
                        <div className="w-full border-none sidebar-menu">
                            {logar.map((item, index) => (
                                <Link
                                    key={index}
                                    to={item.path}
                                    onClick={() => setVisible(false)}
                                    className={`logar-item ${getActiveIndex() === index ? 'active' : ''}`}
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    </Sidebar>
                    <Button icon='pi pi-bars' text onClick={() => setVisible(true)} />
                </li>

                {/* Logo */}
                <li>
                    <Link to="/">
                        <img src={LogoHeader} alt="Logo" />
                    </Link>
                </li>

                {/* Search */}
                <li>
                    <Button
                        icon="pi pi-search"
                        className="p-button-rounded p-button-outlined md:hidden"
                        onClick={handleIconClick}
                        text />
                    <div className='hidden md:block'>
                        {MySearch()}
                    </div>
                </li>

                {/* Login */}
                <li className='hidden md:block'>
                    <Link to="/register">
                        <Button label={logar[0].label} link />
                    </Link>
                    <Link to="/login" className="p-button font-bold">
                        {logar[1].label}
                    </Link>
                </li>

                {/* CartIcon */}
                <li style={{ position: 'relative' }}>
                    <img
                        src={MiniCart}
                        className='static'
                        alt="Cart"
                        onClick={(e) => op.current.toggle(e)}
                        style={{ cursor: 'pointer' }}
                    />
                    {cartCount > 0 && (
                        <Badge value={cartCount} className='absolute m-3 mb-5' />
                    )}
                    <OverlayPanel ref={op} id="overlay_panel" style={{ width: '380px'}} className="">
                        <CartModal visible={true} onClose={() => op.current.hide()} />
                    </OverlayPanel>
                </li>
            </ul>
            {/* Search */}
            <div className='md:hidden'>
                {showInput && MySearch()}
            </div>

            {/* TabMenu */}
            <div className="hidden md:block tab-menu my-4">
                {items.map((item, index) => (
                    <Link
                        key={index}
                        to={item.path}
                        className={`tab-item ${getActiveIndex() === index ? 'active' : ''}`}>
                        {item.label}
                    </Link>
                ))}
            </div>
        </header>
    );
};

export default Header;

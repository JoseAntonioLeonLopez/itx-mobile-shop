import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import './Header.css';

const Header = () => {
    const { cartCount } = useCart();
    const location = useLocation();

    // Determinar si estamos en la página de detalle para mostrar el breadcrumb adecuado
    const isDetail = location.pathname.startsWith('/product/');

    return (
        <header className="header">
            
            {/* Logo */}
            <Link to="/" className="header__logo">
                <span className="material-symbols-rounded header__logo-icon">storefront</span>
                <span>ITX <span className="header__logo-accent">Mobile Shop</span></span>
            </Link>
        
            {/* Breadcrumbs */}
            <nav className="header__breadcrumb">
                <Link to="/">
                    <span className="material-symbols-rounded" style={{ fontSize: '16px' }}>home</span>
                    Inicio
                </Link>
                {isDetail && (
                <>
                    <span className="material-symbols-rounded header__breadcrumb-sep">chevron_right</span>
                    <span>Detalle del producto</span>
                </>
                )}
            </nav>

            {/* Carrito */}
            <div className="header__cart">
                <span className="material-symbols-rounded">shopping_cart</span>
                {cartCount > 0 && <span className="header__cart-badge">{cartCount}</span>}
                {cartCount === 0 && <span className="header__cart-count">{cartCount}</span>}
            </div>

            </header>
  )
}

export default Header
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
                📱 Mobile Shop
            </Link>
        
            {/* Breadcrumbs */}
            <nav className="header__breadcrumb">
                <Link to="/">Inicio</Link>
                {isDetail && (
                <>
                    <span> / </span>
                    <span>Detalle del producto</span>
                </>
                )}
            </nav>

            {/* Carrito */}
            <div className="header__cart">
                🛒 <span>{cartCount}</span>
            </div>

            </header>
  )
}

export default Header
import './ProductCard.css'

const ProductCard = ({ product, onClick }) => {
  return (
    <div className="product-card" onClick={onClick}>
      <img
        src={product.imgUrl}
        alt={`${product.brand} ${product.model}`}
        className="product-card__image"
      />
      <div className="product-card__info">
        <p className="product-card__brand">{product.brand}</p>
        <p className="product-card__model">{product.model}</p>
        <p className="product-card__price">
          {product.price ? `${product.price} €` : 'Precio no disponible'}
        </p>
      </div>
    </div>
  )
}

export default ProductCard
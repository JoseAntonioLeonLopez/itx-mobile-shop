import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductById, addToCart } from "../../services/api";
import { useCart } from "../../hooks/useCart";
import "./ProductDetail.css";

const ProductDetail = () => {
  const { id } = useParams(); // sacamos el id de la URL /product/:id
  const { updateCartCount } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Opciones seleccionadas por el usuario
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedStorage, setSelectedStorage] = useState(null);

  // Estado del botón añadir
  const [adding, setAdding] = useState(false);
  const [addedMessage, setAddedMessage] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data);

        // Seleccionamos la primera opción por defecto
        if (data.options?.colors?.length > 0) {
          setSelectedColor(data.options.colors[0].code);
        }
        if (data.options?.storages?.length > 0) {
          setSelectedStorage(data.options.storages[0].code);
        }
      } catch (err) {
        setError("Error al cargar el producto: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!selectedColor || !selectedStorage) return;

    try {
      setAdding(true);
      const result = await addToCart(id, selectedColor, selectedStorage);
      updateCartCount(result.count); // actualizamos el Header
      setAddedMessage("¡Producto añadido al carrito!");

      // Limpiamos el mensaje después de 2 segundos
      setTimeout(() => setAddedMessage(""), 2000);
    } catch (err) {
      setAddedMessage("Error al añadir el producto: " + err.message);
    } finally {
      setAdding(false);
    }
  };

  if (loading) return <p className="status">Cargando producto...</p>;
  if (error) return <p className="status error">{error}</p>;
  if (!product) return null;

  return (
    <div className="product-detail">
      {/* Link para volver al listado */}
      <Link to="/" className="product-detail__back">
        ← Volver al listado
      </Link>

      <div className="product-detail__content">
        {/* Columna izquierda: imagen */}
        <div className="product-detail__image-col">
          <img
            src={product.imgUrl}
            alt={`${product.brand} ${product.model}`}
            className="product-detail__image"
          />
        </div>

        {/* Columna derecha: descripción + acciones */}
        <div className="product-detail__info-col">
          {/* Descripción */}
          <div className="product-detail__description">
            <h1>
              {product.brand} {product.model}
            </h1>
            <ul>
              <li>
                <strong>Precio:</strong>{" "}
                {product.price ? `${product.price} €` : "No disponible"}
              </li>
              <li>
                <strong>CPU:</strong> {product.cpu || "No disponible"}
              </li>
              <li>
                <strong>RAM:</strong> {product.ram || "No disponible"}
              </li>
              <li>
                <strong>Sistema operativo:</strong>{" "}
                {product.os || "No disponible"}
              </li>
              <li>
                <strong>Resolución:</strong>{" "}
                {product.displayResolution || "No disponible"}
              </li>
              <li>
                <strong>Batería:</strong> {product.battery || "No disponible"}
              </li>
              <li>
                <strong>Cámaras:</strong>{" "}
                {Array.isArray(product.primaryCamera)
                  ? product.primaryCamera.join(", ")
                  : product.primaryCamera || "No disponible"}
              </li>
              <li>
                <strong>Dimensiones:</strong>{" "}
                {product.dimentions || "No disponible"}
              </li>
              <li>
                <strong>Peso:</strong>{" "}
                {product.weight ? `${product.weight} g` : "No disponible"}
              </li>
            </ul>
          </div>

          {/* Acciones */}
          <div className="product-detail__actions">
            {/* Selector de almacenamiento */}
            <div className="product-detail__selector">
              <label>Almacenamiento</label>
              <select
                value={selectedStorage ?? ""}
                onChange={(e) => setSelectedStorage(Number(e.target.value))}
              >
                {product.options?.storages?.map((storage) => (
                  <option key={storage.code} value={storage.code}>
                    {storage.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Selector de color */}
            <div className="product-detail__selector">
              <label>Color</label>
              <select
                value={selectedColor ?? ""}
                onChange={(e) => setSelectedColor(Number(e.target.value))}
              >
                {product.options?.colors?.map((color) => (
                  <option key={color.code} value={color.code}>
                    {color.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Botón añadir */}
            <button
              className="product-detail__btn"
              onClick={handleAddToCart}
              disabled={adding}
            >
              {adding ? "Añadiendo..." : "Añadir al carrito"}
            </button>

            {/* Mensaje feedback */}
            {addedMessage && (
              <p className="product-detail__message">{addedMessage}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

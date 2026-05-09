import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../../services/api";
import SearchBar from "../../components/SearchBar/SearchBar";
import ProductCard from "../../components/ProductCard/ProductCard";
import "./ProductList.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch de productos al montar el componente
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
        setFiltered(data);
      } catch (err) {
        setError("Error al cargar los productos: " + err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Función para manejar la búsqueda
  const handleSearch = (query) => {
    const q = query.toLowerCase().trim();

    if (!q) {
      setFiltered(products); // Si la búsqueda está vacía, mostrar todos los productos
      return;
    }

    const result = products.filter(
      (p) =>
        p.brand.toLowerCase().includes(q) || p.model.toLowerCase().includes(q),
    );

    setFiltered(result);
  };

  if (loading) return <p className="status">Cargando productos...</p>;
  if (error) return <p className="status error">{error}</p>;

  return (
    <div className="product-list">

      <div className="product-list__toolbar">
        <span>{filtered.length} productos</span>
        <SearchBar onSearch={handleSearch} />
      </div>

      {filtered.length === 0 ? (
        <p className="status">No se encontraron productos</p>
      ) : (
        <div className="product-list__grid">
          {filtered.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={() => navigate(`/product/${product.id}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;

import { useProducts } from '../../hooks/useProducts.js';
import { ProductCard } from '../productCard/productCard.component.jsx';
import styles from './productList.styles.module.css';

export const ProductList = () => {
  const { products, loading, error } = useProducts();

  if (loading) {
    return <p className={styles.status}>Loading products...</p>;
  }

  if (error) {
    return <p className={styles.status}>{error}</p>;
  }

  if (products.length === 0) {
    return <p className={styles.status}>No products available.</p>;
  }

  return (
    <div className={styles.grid}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          title={product.title}
          price={product.price}
          rating={product.rating}
          image={product.image}
        />
      ))}
    </div>
  );
};

import { Link } from 'react-router-dom';
import { Product } from '../types';
import '../styles/globals.css';

type Props = {
  product: Product;
  onDelete: () => void;
};

export default function ProductCard({ product, onDelete }: Props) {
  return (
    <div className="product-card">
      <Link to={`/products/${product.id}`}>
        <img src={product.imageUrl} alt={product.name} />
        <h3>{product.name}</h3>
      </Link>
      <p>Count: {product.count}</p>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
}

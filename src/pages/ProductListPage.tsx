import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { addProduct, deleteProduct, setSort } from '../store/productsSlice';
import ProductCard from '../components/ProductCard';
import ProductFormModal from '../components/ProductFormModal';
import { Product } from '../types';

export default function ProductListPage() {
  const dispatch = useAppDispatch();
  const { products, sort } = useAppSelector((s) => s.products);
  const [showModal, setShowModal] = useState(false);

  const handleAdd = (data: Partial<Product>) => {
    const newProduct: Product = {
      id: Date.now(),
      comments: [],
      size: { width: data.width || 0, height: data.height || 0 },
      name: data.name || '',
      imageUrl: data.imageUrl || '',
      count: data.count || 0,
      weight: data.weight || '',
    };
    dispatch(addProduct(newProduct));
  };

  return (
    <div className="product-list-page">
      <header className="list-header">
        <h1>Products</h1>
        <div className="actions">
          <button className="btn-add" onClick={() => setShowModal(true)}>
            Add Product
          </button>
          <select
            value={sort}
            onChange={(e) => dispatch(setSort(e.target.value as 'alphabetical' | 'count'))}
          >
            <option value="alphabetical">Sort alphabetically</option>
            <option value="count">Sort in ascending order</option>
          </select>
        </div>
      </header>

      <div className="product-list">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} onDelete={() => dispatch(deleteProduct(p.id))} />
        ))}
      </div>

      {showModal && <ProductFormModal onClose={() => setShowModal(false)} onSave={handleAdd} />}
    </div>
  );
}

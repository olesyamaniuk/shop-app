import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks';
import { updateProduct } from '../store/productsSlice';
import ProductFormModal from '../components/ProductFormModal';
import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';
import { addComment, deleteComment } from '../store/commentsSlice';
import '../styles/globals.css';
export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((s) => s.products);
  const { items: comments } = useAppSelector((s) => s.comments);
  const [editOpen, setEditOpen] = useState(false);

  const selectedProduct = products.find((p) => p.id === Number(id));
  if (!selectedProduct) return <p>Product not found</p>;

  const productComments = comments.filter((c) => c.productId === selectedProduct.id);

  return (
    <div className="product-detail-page section">
      <button onClick={() => navigate(-1)}>← Back</button>
      <h1>{selectedProduct.name}</h1>
      <img src={selectedProduct.imageUrl} alt={selectedProduct.name} className="detail-img" />
      <p>Count: {selectedProduct.count}</p>
      <p>
        Size: {selectedProduct.size.width}x{selectedProduct.size.height}
      </p>
      <p>Weight: {selectedProduct.weight}</p>

      <button onClick={() => setEditOpen(true)}>Edit</button>

      <section className="comments-section">
        <h2>Comments</h2>
        <CommentList comments={productComments} onDelete={(id) => dispatch(deleteComment(id))} />
        <CommentForm
          productId={selectedProduct.id}
          onSubmit={(data) => dispatch(addComment(data))}
        />
      </section>

      {editOpen && (
        <ProductFormModal
          product={selectedProduct}
          onClose={() => setEditOpen(false)}
          onSave={(data) => dispatch(updateProduct({ ...selectedProduct, ...data }))}
        />
      )}
    </div>
  );
}

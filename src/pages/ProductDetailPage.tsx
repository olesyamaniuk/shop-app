import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../hooks'
import { fetchProductById } from '../store/productsSlice'
import { updateProduct } from '../store/productsSlice'
import { fetchComments, addComment, deleteComment } from '../store/commentsSlice'
import ProductFormModal from '../components/ProductFormModal'
import CommentList from '../components/CommentList'
import CommentForm from '../components/CommentForm'
// import '../styles/ProductDetailPage.css'

export default function ProductDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { selectedProduct, loading } = useAppSelector((s) => s.products)
  const { items: comments } = useAppSelector((s) => s.comments)
  const [editOpen, setEditOpen] = useState(false)

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(Number(id)))
      dispatch(fetchComments(Number(id)))
    }
  }, [dispatch, id])

  if (loading) return <p>Loading...</p>
  if (!selectedProduct) return <p>Product not found</p>

  return (
    <div className="product-detail-page">
      <button className="btn-back" onClick={() => navigate(-1)}>← Back</button>
      <h1>{selectedProduct.name}</h1>
      <img src={selectedProduct.imageUrl} alt={selectedProduct.name} className="detail-img" />
      <p>Count: {selectedProduct.count}</p>
      <p>Size: {selectedProduct.size.width}x{selectedProduct.size.height}</p>
      <p>Weight: {selectedProduct.weight}</p>

      <button className="btn-edit" onClick={() => setEditOpen(true)}>Edit</button>

      <section className="comments-section">
        <h2>Comments</h2>
        <CommentList comments={comments} onDelete={(id) => dispatch(deleteComment(id))} />
        <CommentForm productId={selectedProduct.id} onSubmit={(data) => dispatch(addComment(data))} />
      </section>

      {editOpen && (
        <ProductFormModal
  product={selectedProduct}
  onClose={() => setEditOpen(false)}
  onSave={(data) => dispatch(updateProduct({ ...selectedProduct, ...data }))}
/>
      )}
    </div>
  )
}
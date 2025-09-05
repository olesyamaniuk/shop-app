import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
import { fetchProducts, deleteProduct, addProduct } from '../store/productsSlice'
import ProductCard from '../components/ProductCard'
import ProductFormModal from '../components/ProductFormModal'
import ConfirmModal from '../components/ConfirmModal'


export default function ProductListPage() {
  const dispatch = useAppDispatch()
  const { products, loading, sort } = useAppSelector((s) => s.products)
  const [showModal, setShowModal] = useState(false)
  const [deleteId, setDeleteId] = useState<number | null>(null)

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  const handleDelete = (id: number) => setDeleteId(id)
  const confirmDelete = () => {
    if (deleteId !== null) {
      dispatch(deleteProduct(deleteId))
      setDeleteId(null)
    }
  }

  return (
    <div className="product-list-page">
      <header className="list-header">
        <h1>Products</h1>
        <button className="btn-add" onClick={() => setShowModal(true)}>Add Product</button>
      </header>

      {loading && <p>Loading...</p>}
      <div className="product-list">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} onDelete={() => handleDelete(p.id)} />
        ))}
      </div>

      {showModal && <ProductFormModal
  onClose={() => setShowModal(false)}
  onSave={(data) => dispatch(addProduct(data))}
/>}
      {deleteId !== null && (
        <ConfirmModal
          message="Are you sure you want to delete this product?"
          onCancel={() => setDeleteId(null)}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  )
}
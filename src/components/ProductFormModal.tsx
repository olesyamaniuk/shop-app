import { useState } from 'react'
import { Product } from '../types'
import '../styles/modal.css'

type Props = {
  product?: Product
  onClose: () => void
  onSave: (data: Partial<Product>) => void
}

export default function ProductFormModal({ product, onClose, onSave }: Props) {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    imageUrl: product?.imageUrl || '',
    count: product?.count || 0,
    width: product?.size?.width || 0,
    height: product?.size?.height || 0,
    weight: product?.weight || ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: name === 'count' || name === 'width' || name === 'height' ? Number(value) : value }))
  }

  const handleSubmit = () => {
    if (!formData.name.trim()) return alert('Name is required')
    onSave({
      ...formData,
      size: { width: formData.width, height: formData.height }
    })
    onClose()
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{product ? 'Edit Product' : 'Add Product'}</h2>

        <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
        <input name="imageUrl" placeholder="Image URL" value={formData.imageUrl} onChange={handleChange} />
        <input name="count" type="number" placeholder="Count" value={formData.count} onChange={handleChange} />
        <input name="width" type="number" placeholder="Width" value={formData.width} onChange={handleChange} />
        <input name="height" type="number" placeholder="Height" value={formData.height} onChange={handleChange} />
        <input name="weight" placeholder="Weight" value={formData.weight} onChange={handleChange} />

        <div className="modal-actions">
          <button onClick={handleSubmit}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  )
}
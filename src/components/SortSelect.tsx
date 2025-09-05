import { useAppDispatch, useAppSelector } from '../hooks'
import { setSort } from '../store/productsSlice'

export default function SortSelect() {
  const dispatch = useAppDispatch()
  const { sort } = useAppSelector((s) => s.products)

  return (
    <select value={sort} onChange={(e) => dispatch(setSort(e.target.value))}>
      <option value="alphabetical">Sort by Name</option>
      <option value="count">Sort by Count</option>
    </select>
  )
}
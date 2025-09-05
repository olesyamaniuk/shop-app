export type Comment = {
  id: number
  productId: number
  description: string
  date: string // "HH:MM DD.MM.YYYY"
}

export type Product = {
  id: number
  imageUrl: string
  name: string
  count: number
  size: { width: number; height: number }
  weight: string
  // comments у бекенді окремо; тут поле опційне, щоб не ламати модель з умови
  comments?: Comment[]
}

export type SortKey = 'name-asc' | 'name-desc' | 'count-asc' | 'count-desc'
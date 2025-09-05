import { Comment } from '../types'

type Props = {
  comments: Comment[]
  onDelete: (id: number) => void
}

export default function CommentList({ comments, onDelete }: Props) {
  return (
    <ul>
      {comments.map((c) => (
        <li key={c.id}>
          <span>{c.description}</span>
          <button onClick={() => onDelete(c.id)}>x</button>
        </li>
      ))}
    </ul>
  )
}
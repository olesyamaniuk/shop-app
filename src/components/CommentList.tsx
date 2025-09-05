import { Comment } from '../types';
import '../styles/globals.css';
type Props = {
  comments: Comment[];
  onDelete: (id: number) => void;
};

export default function CommentList({ comments, onDelete }: Props) {
  return (
    <ul className="comment-list">
      {comments.map((c) => (
        <li className="comment-item" key={c.id}>
          <span>{c.description}</span>
          <button className="btn-delete" onClick={() => onDelete(c.id)}>
            x
          </button>
        </li>
      ))}
    </ul>
  );
}

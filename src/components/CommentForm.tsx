import { useState } from 'react';
import { NewComment } from '../types';

type Props = {
  productId: number;
  onSubmit: (data: NewComment) => void;
};

export default function CommentForm({ productId, onSubmit }: Props) {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSubmit({ productId, description: text, date: new Date().toLocaleString() });
    setText('');
  };

  return (
    <form className='comment-form' onSubmit={handleSubmit}>
      <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Write comment" />
      <button type="submit">Add</button>
    </form>
  );
}

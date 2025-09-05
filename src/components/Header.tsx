import { Link } from 'react-router-dom'
import '../styles/layout.css'

export default function Header() {
  return (
    <header className="header">
      <Link to="/" className="logo">Shop App</Link>
    </header>
  )
}
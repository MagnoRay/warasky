import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  return (
    <nav>
      <NavLink to="/admin/products">Productos</NavLink>
    </nav>
  );
}

import { useState } from "react";
import styles from "./Navbar.module.css";

export default function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.container}>

        {/* IZQUIERDA */}
        <div className={styles.left}>
          <div className={styles.logo}>MiLogo</div>
        </div>

        {/* CENTRO: ☰ + BUSCADOR */}
        <div className={styles.center}>
          <button
            className={styles.menuIcon}
            onClick={() => setDropdownOpen(!dropdownOpen)}
            aria-label="Mostrar productos"
          >
            ☰
          </button>

          <input
            type="text"
            placeholder="Buscar..."
            className={styles.searchInput}
          />

          {/* Dropdown productos */}
          {dropdownOpen && (
            <div className={styles.dropdownMenu}>
              <a href="#">Producto 1</a>
              <a href="#">Producto 2</a>
              <a href="#">Producto 3</a>
            </div>
          )}
        </div>

        {/* DERECHA */}
        <div className={styles.right}>
          <a href="#" className={styles.login}>Iniciar sesión</a>

          {/* Hamburguesa móvil */}
          <button
            className={styles.hamburger}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Abrir menú móvil"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Menú móvil */}
      {menuOpen && (
        <div className={styles.mobileMenu}>
          <a href="#">Producto 1</a>
          <a href="#">Producto 2</a>
          <a href="#">Producto 3</a>
          <a href="#">Iniciar sesión</a>
        </div>
      )}
    </header>
  );
}

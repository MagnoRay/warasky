import { useEffect, useState } from "react";
import Logo from "./Logo";
import styles from "./Navbar.module.css";
import { useGetProductByNameQuery } from "../../features/products/productsApi";
import { useNavigate } from "react-router-dom";

const Navbar = ()=>{
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();
 

 // 🔹 Debounce para la búsqueda en tiempo real
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300); // 300ms de retraso
    return () => clearTimeout(handler);
  }, [search]);

   // 🔹 Hook RTK Query con debounce
  const { data: products=[], isLoading, error } = useGetProductByNameQuery(debouncedSearch, {
    skip: debouncedSearch.trim().length < 2,
  });

  const highlightText = (text, query) => {
  if (!query) return text;

  const regex = new RegExp(`(${query})`, "ig");
  const parts = text.split(regex);

  return parts.map((part, index) =>
    regex.test(part) ? (
      <span key={index} className={styles.highlight}>
        {part}
      </span>
    ) : (
      <span key={index}>{part}</span>
    )
  );
};
 

  return (
    <header className={styles.header}>
      <div className={styles.container}>

        {/* IZQUIERDA */}
        <div className={styles.left}>
          <div className={styles.logo}><Logo /></div>
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
          <div className={styles.gradientWrapper}>
              <input
                type="text"
                placeholder="Buscar..."
                value={search}
                className={styles.searchInput}
                onChange={(e) => setSearch(e.target.value)}
              />
                {/* Dropdown de resultados */}
            {debouncedSearch.trim() && products?.length > 0 && (
              <div className={styles.searchDropdown}>
                {isLoading && <div className={styles.info}>Cargando...</div>}
                {!isLoading && products.length === 0 && ( 
                  <div className={styles.info}>No se encontraron productos</div>
                )}
                {error && (
                  <div className={styles.info}>Error al buscar productos</div>
                )}
                {products.map((product) => (
                  <div key={product.id} className={styles.searchItem} onClick={() => {navigate(`/products/${product.id}`);setSearch(""); }} >
                    {highlightText(product.name, debouncedSearch)}
                  </div>
                ))}
              </div>
            )}

          </div>

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

export default Navbar;

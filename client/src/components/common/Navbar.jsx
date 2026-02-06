import { useEffect, useState } from "react";
import Logo from "./Logo";
import styles from "./Navbar.module.css";
import { useGetProductByNameQuery } from "../../features/products/productsApi";
import { useNavigate } from "react-router-dom";
import { MoonIcon, ShoppingCartIcon, MapPinIcon, SunIcon } from '@heroicons/react/24/outline';


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
            <divi className={styles.searchWrapper}>
              <svg
                className={styles.searchIcon}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
                <input
                  type="text"
                  placeholder="Buscar productos, marcas, tiendas y más..."
                  value={search}
                  className={styles.searchInput}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </divi>
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
          <button>
            <MoonIcon className="h-5 w-5 text-gray-600" />
            </button>         
          <button>
            <SunIcon className="h-5 w-5 text-gray-600" />
          </button>
            <MapPinIcon className="h-5 w-5 text-gray-600" /> Lima, PE         
          <button>
            <ShoppingCartIcon className="h-5 w-5 text-gray-600" />
          </button>
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

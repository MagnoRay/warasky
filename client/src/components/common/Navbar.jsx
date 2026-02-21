import { useEffect, useState, useRef } from "react";
import Logo from "./Logo";
import styles from "./Navbar.module.css";
import { useGetProductByNameQuery } from "../../features/products/productsApi";
import { useNavigate } from "react-router-dom";
import { Sun, Moon, MapPin, X, User,LayoutGrid, ChevronDown } from "lucide-react";
import CartButton from "./CartButton";
import { useTheme } from "./ThemeContext";
import WaraskyIcon from "./WaraskyIcon";


const Navbar = ({className, cartOpen, setCartOpen})=>{
  const { darkMode, toggleDarkMode } = useTheme();

   const [scrolled, setScrolled] = useState(false);
  
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();
  const clearSearch = () => setSearch("");
  const timeoutRef = useRef(null);
 

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
 
    useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

const handleEnter = () => {
  clearTimeout(timeoutRef.current);
  setDropdownOpen(true);
};

const handleLeave = () => {
  timeoutRef.current = setTimeout(() => {
    setDropdownOpen(false);
  }, 150);
};

  return (
    <nav className={`${styles.header} ${
        scrolled ? styles.scrolled : styles.top
      }`}>
    <div className={styles.navWrapper}>
      <div className={styles.container}>

        {/* IZQUIERDA */}
        <div className={styles.left}>
          <div className={styles.logo}><Logo /></div>
        </div>

        {/* CENTRO: ☰ + BUSCADOR */}
        <div className={styles.center}>  
          <div className={styles.dropdownWrapper} 
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
          >        
           <button
            className="flex items-center justify-center gap-1 p-2 rounded hover:bg-indigo-100 transition">          
              <LayoutGrid />
            Categorías
            <ChevronDown size={16} />
          </button>
          {/* Dropdown productos */}
          {dropdownOpen && (            
            <div className={styles.dropdownMenu}> 
              <a href="#">Producto 1</a>
              <a href="#">Producto 2</a>
              <a href="#">Producto 3</a>
            </div>
          )}
          </div>

          <div className={styles.gradientWrapper}>
            <div className={styles.searchWrapper}>
              <WaraskyIcon />
                <input
                  type="text"
                  placeholder="Buscar productos, marcas, tiendas y más..."
                  value={search}
                  className={styles.searchInput}
                  onChange={(e) => setSearch(e.target.value)}
                  style={{ paddingRight: "2rem" }}
                />
                {search && (
                <button
                  onClick={() => setSearch("")}
                  className={styles.clearButton}
                  aria-label="Limpiar búsqueda"
                  type="button"
                >
                  <X size={18} />
                </button>
              )}
              </div>
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
           
        </div>

        {/* DERECHA */}
        <div className={styles.right}>
            
          <div className="flex items-center gap-4">
            
             {/* Botón Sun */}
              <button
                onClick={toggleDarkMode}
                className="relative flex items-center justify-center p-2 rounded hover:bg-indigo-100 transition"
                aria-label="Cambiar tema"
              >
                {darkMode ? (
                  <Sun className="w-5 h-5 text-yellow-400" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                )}
              </button>
              <div className="flex items-center gap-1 text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>Huaraz, PE</span>
              </div>
            <CartButton cartOpen={cartOpen} setCartOpen={setCartOpen} />
          </div>

          <button className={styles.loginButton} type="button">
            <User className={styles.icon} />
            Iniciar sesión
          </button>

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
      </div>
    </nav>
  );
}

export default Navbar;

import { useEffect } from "react";
import { ShoppingCart, Package, Menu, X } from "lucide-react";
import { createPortal } from "react-dom";
import styles from "./Navbar.module.css";

export default function CartButton({ totalItems = 0, cartOpen, setCartOpen }) {

  // 🔥 Bloquear scroll al abrir carrito
  useEffect(() => {
    document.body.style.overflow = cartOpen ? "hidden" : "auto";
    return () => { document.body.style.overflow = "auto"; };
  }, [cartOpen]);

  // Overlay + Drawer en Portal
  const drawer = cartOpen && createPortal(
    <>
      {/* Overlay brillante 40% debajo del navbar */}
      <div
        className="fixed left-0 right-0 bottom-0 z-40"
        style={{
          top: "75px", // empieza debajo del navbar
          backgroundColor: "rgba(0,0,0,0.4)",
          boxShadow: "inset 0 0 120px rgba(255,255,255,0.2)" // brillo sutil
        }}
        onClick={() => setCartOpen(false)} // Cierra al click en overlay
        aria-hidden="true"
      />

      {/* Drawer sobre el navbar */}
      <div
        className="fixed right-0 w-96 bg-white shadow-xl p-6 flex flex-col z-60"
        style={{
          top: "75px", // para que el drawer quede sobre el navbar
          height: "calc(100vh - 75px)",
        }}
      >
        {/* Header drawer */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 text-yellow-400 font-semibold text-lg">
            <Menu className="w-6 h-6" />
            <span>Mi Carrito</span>
          </div>
          {/* 🔹 Botón de cierre dentro del drawer */}
          <button
            onClick={() => setCartOpen(false)}
            aria-label="Cerrar carrito"
            className="relative flex items-center justify-center p-2 rounded hover:bg-indigo-100 transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Contenido */}
        {totalItems === 0 ? (
          <div className="flex flex-col items-center justify-center grow text-center text-gray-400">
            <div className="w-20 h-20 flex items-center justify-center rounded-full bg-gray-100 mb-4">
              <ShoppingCart className="w-10 h-10 text-gray-600" />
            </div>            
            <p className="font-semibold mb-1 text-black">Tu carrito está vacío</p>
            <p className="mb-6">Agrega productos para comenzar tu compra</p>
            <button
              onClick={() => setCartOpen(false)}
              className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition"
            >
              Seguir comprando
            </button>
          </div>
        ) : (
          <div className="grow overflow-y-auto">
            <ul className="divide-y divide-gray-200">
              <li className="py-4">Producto 1</li>
              <li className="py-4">Producto 2</li>
              <li className="py-4">Producto 3</li>
            </ul>
          </div>
        )}
      </div>
    </>,
    document.body
  );

  return (
    <>
      {/* Botón del carrito en Navbar (toggle) */}
      <button
        type="button"
        className="relative flex items-center justify-center p-2 rounded-full hover:bg-indigo-100 transition"
        onClick={() => setCartOpen(!cartOpen)} // 🔹 toggle abre/cierra
        aria-label="Abrir/Cerrar carrito"
      >
        <ShoppingCart className="w-5 h-5 text-black" strokeWidth={1.8} />

        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 h-4 min-w-[16px] flex items-center justify-center rounded-full bg-red-600 text-white text-xs font-semibold px-[4px]">
            {totalItems}
          </span>
        )}
      </button>

      {/* Drawer + Overlay */}
      {drawer}
    </>
  );
}

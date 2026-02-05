import styles from "./Navbar.module.css";
export default function Logo() {
  return (
    <div className="flex items-center gap-3 bg-white">
      
      {/* TEXTO */}
      <div className="flex items-baseline font-extrabold text-5xl">
        <span className={`bg-clip-text text-transparent ${styles.gradientW}`}>
         W
        </span>
        <span className="text-gray-900">ara</span>
        <span className="bg-gradient-to-r from-sky-400 to-violet-500 bg-clip-text text-transparent">
          sky
        </span>
      </div>

    </div>
  )
}

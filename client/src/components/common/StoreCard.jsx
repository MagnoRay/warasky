import styles from "./StoreCard.module.css"

export default function StoreCard({ title }) {
  return (
    <div className={`${styles.card} bg-neutral-800`}>
      <h2 className="text-xl font-semibold text-white">
        {title}
      </h2>

      <p className="text-sm text-neutral-300 mt-2">
        Decisiones claras. Sin ruido.
      </p>

      <button className="mt-4 bg-white text-black py-2 rounded-lg">
        Entrar
      </button>
    </div>
  )
}

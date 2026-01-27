import { useNavigate } from 'react-router-dom';

export default function ProductsCards({ products }) {
   console.log('ProductsCards render', products);
  const navigate = useNavigate();

  return (
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full">
        {products.map((p) => (
          <div
            key={p.id}
            onClick={() => navigate(`/products/${p.id}`)}
            className="card-warasky-market w-full"
          >
            {/* IMAGEN */}
            <div className="card-warasky-image-wrapper">
              <img
                src={p.image}
                alt={p.name}
                className="card-warasky-image"
              />
            </div>
            {/* CONTENIDO */}
            <div className="card-warasky-content">
              <span className="card-warasky-category">
                {p.category}
              </span>

              <h3 className="card-warasky-title">
                {p.name}
              </h3>

              <div className="flex items-center gap-2">
                <span className="card-warasky-price">
                  S/ {p.final_price}
                </span>
              </div>

              <p className="text-xs text-green-600">
                {p.status ? 'Disponible' : 'Agotado'}
              </p>
            </div>
          </div>
        ))}
      </div>
  );
}

import { useParams } from 'react-router-dom';
import { useGetProductsQuery } from '../../features/products/productsApi';

export default function ProductDetail() {
  const { id } = useParams();
  const { data: products = [], isLoading, isError } = useGetProductsQuery(id);

  if (isLoading) return <p>Cargando...</p>;
  if (isError) return <p>Error al cargar el producto</p>;
  const product = products.find((p) => p.id === id);

  if (!product) return <p>Producto no encontrado</p>;

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">{product.name}</h2>

      <p className="text-gray-600 mb-2">
        <strong>ID:</strong> {product.id.slice(0, 8)}
      </p>

      <p className="text-lg">
        <strong>Precio:</strong> ${product.initial_price}
      </p>
    </div>
  );
}

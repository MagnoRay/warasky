import { useGetProductsQuery } from '../../features/products/productsApi';
import ProductsCards from '../../components/products/ProductsCards';

export default function Products() {
  const {
    data: products = [],
    isLoading,  
    isError,
  } = useGetProductsQuery();

  if (isLoading) return <p>Cargando productos...</p>;
  if (isError) return <p>Error al cargar los productos</p>;

  return <ProductsCards products={products} />
  ;
}

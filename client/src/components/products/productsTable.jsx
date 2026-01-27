import PropTypes from 'prop-types';

ProductsTable.propTypes = {
  products: PropTypes.array.isRequired,
};
export default function ProductsTable({ products }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Producto</th>
          <th>Imagen</th>
          <th>Precio Inicial</th>
        </tr>
      </thead>
      <tbody>
        {products.length === 0 ?(
          <tr>
            <td colSpan="2">No hay productos</td>
          </tr>
        ) : (
        products.map((p) => (
          <tr key={p.id}>
            <td>{p.id.slice(0, 8)}</td>
            <td>{p.name}</td>
            <td>{p.image}</td>
            <td>{p.initial_price}</td>
          </tr>
        ))
        )}
      </tbody>
    </table>
  );
}


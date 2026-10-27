// src/components/ProductoList.jsx
import React from 'react';

const ProductoList = ({ productos, onEdit, onDelete }) => {
  return (
    <div style={styles.container}>
      <h3>Lista de Productos</h3>
      {productos.length === 0 ? (
        <p>No hay productos registrados.</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>ID</th>
              <th style={styles.th}>Nombre</th>
              <th style={styles.th}>Precio</th>
              <th style={styles.th}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((prod) => (
              <tr key={prod.id}>
                <td style={styles.td}>{prod.id}</td>
                <td style={styles.td}>{prod.nombre}</td>
                <td style={styles.td}>${Number(prod.precio).toFixed(2)}</td>
                <td style={styles.td}>
                  <button onClick={() => onEdit(prod)} style={styles.btnEdit}>
                    Editar
                  </button>
                  <button onClick={() => onDelete(prod.id)} style={styles.btnDelete}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const styles = {
  container: { marginTop: '20px' },
  table: { width: '100%', borderCollapse: 'collapse', marginTop: '10px' },
  th: { borderBottom: '2px solid #ccc', padding: '10px', textAlign: 'left', backgroundColor: '#f8f9fa' },
  td: { borderBottom: '1px solid #eee', padding: '10px' },
  btnEdit: { marginRight: '8px', padding: '5px 10px', backgroundColor: '#ffc107', border: 'none', borderRadius: '4px', cursor: 'pointer' },
  btnDelete: { padding: '5px 10px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }
};

export default ProductoList;
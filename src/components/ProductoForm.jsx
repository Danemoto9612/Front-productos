// src/components/ProductoForm.jsx
import React, { useState, useEffect } from 'react';

const ProductoForm = ({ onSave, productoEditando, onCancel }) => {
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');

  useEffect(() => {
    if (productoEditando) {
      setNombre(productoEditando.nombre || '');
      setPrecio(productoEditando.precio || '');
    } else {
      setNombre('');
      setPrecio('');
    }
  }, [productoEditando]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nombre.trim() || !precio) {
      alert('Por favor complete todos los campos');
      return;
    }

    const productoData = {
      nombre,
      precio: parseFloat(precio)
    };

    onSave(productoData);
    setNombre('');
    setPrecio('');
  };

  return (
    <div style={styles.card}>
      <h3>{productoEditando ? 'Editar Producto' : 'Nuevo Producto'}</h3>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <label>Nombre del Producto:</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ej. Teclado Mecánico"
            required
            style={styles.input}
          />
        </div>

        <div style={styles.inputGroup}>
          <label>Precio:</label>
          <input
            type="number"
            step="0.01"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            placeholder="Ej. 49.99"
            required
            style={styles.input}
          />
        </div>

        <div style={styles.buttonGroup}>
          <button type="submit" style={styles.btnPrimary}>
            {productoEditando ? 'Actualizar' : 'Guardar'}
          </button>
          {productoEditando && (
            <button type="button" onClick={onCancel} style={styles.btnSecondary}>
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

const styles = {
  card: { padding: '20px', border: '1px solid #ccc', borderRadius: '8px', marginBottom: '20px' },
  form: { display: 'flex', flexDirection: 'column', gap: '12px' },
  inputGroup: { display: 'flex', flexDirection: 'column', textAlign: 'left' },
  input: { padding: '8px', marginTop: '4px', borderRadius: '4px', border: '1px solid #ccc' },
  buttonGroup: { display: 'flex', gap: '10px' },
  btnPrimary: { padding: '8px 16px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' },
  btnSecondary: { padding: '8px 16px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }
};

export default ProductoForm;
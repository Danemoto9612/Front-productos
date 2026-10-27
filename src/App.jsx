// src/App.jsx
import React, { useState, useEffect } from 'react';
import { getProductos, createProducto, updateProducto, deleteProducto } from './services/productoService';
import ProductoForm from './components/ProductoForm';
import ProductoList from './components/ProductoList';

function App() {
  const [productos, setProductos] = useState([]);
  const [productoEditando, setProductoEditando] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // GET: Cargar productos al montar el componente
  const fetchProductos = async () => {
    setLoading(true);
    try {
      const data = await getProductos();
      setProductos(data);
      setError(null);
    } catch (err) {
      console.error("Error al cargar productos:", err);
      setError("No se pudo conectar con el servidor (localhost:8080).");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  // POST / PUT: Guardar o actualizar producto
  const handleSaveProducto = async (productoData) => {
    try {
      if (productoEditando) {
        // PUT
        await updateProducto(productoEditando.id, productoData);
      } else {
        // POST
        await createProducto(productoData);
      }
      setProductoEditando(null);
      fetchProductos(); // Recargar la lista
    } catch (err) {
      console.error("Error al guardar el producto:", err);
      alert("Ocurrió un error al guardar el producto.");
    }
  };

  // DELETE: Eliminar producto
  const handleDeleteProducto = async (id) => {
    if (window.confirm("¿Seguro que deseas eliminar este producto?")) {
      try {
        await deleteProducto(id);
        fetchProductos(); // Recargar la lista
      } catch (err) {
        console.error("Error al eliminar el producto:", err);
        alert("Ocurrió un error al eliminar el producto.");
      }
    }
  };

  const handleEditClick = (producto) => {
    setProductoEditando(producto);
  };

  const handleCancelEdit = () => {
    setProductoEditando(null);
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Gestión de Productos</h1>
      
      {error && <div style={{ color: 'red', padding: '10px', backgroundColor: '#ffe6e6', marginBottom: '10px', borderRadius: '4px' }}>{error}</div>}

      <ProductoForm 
        onSave={handleSaveProducto} 
        productoEditando={productoEditando} 
        onCancel={handleCancelEdit} 
      />

      {loading ? (
        <p>Cargando productos...</p>
      ) : (
        <ProductoList 
          productos={productos} 
          onEdit={handleEditClick} 
          onDelete={handleDeleteProducto} 
        />
      )}
    </div>
  );
}

export default App;
// src/services/productoService.js
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/productos';

// GET: Obtener todos los productos
export const getProductos = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// POST: Crear un nuevo producto (id es autogenerado por el backend normalmente)
export const createProducto = async (producto) => {
  const response = await axios.post(API_URL, producto);
  return response.data;
};

// PUT: Actualizar un producto existente
export const updateProducto = async (id, producto) => {
  const response = await axios.put(`${API_URL}/${id}`, producto);
  return response.data;
};

// DELETE: Eliminar un producto por ID
export const deleteProducto = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};
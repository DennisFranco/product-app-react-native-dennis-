import axios from 'axios';
import { Product, ProductFormData } from '../types/product';

// Instancia de axios con baseURL predefinida
const api = axios.create({
    baseURL: 'https://fakestoreapi.com',
});

/**
 * Obtiene todos los productos disponibles.
 */
export const getAllProducts = async (): Promise<Product[]> => {
    const response = await api.get<Product[]>('/products');
    return response.data;
};

/**
 * Obtiene un producto por su ID.
 * @param id - ID del producto
 */
export const getProductById = async (id: number): Promise<Product> => {
    const response = await api.get<Product>(`/products/${id}`);
    return response.data;
};

/**
 * Crea un nuevo producto.
 * Aunque la API no persiste el cambio, responde como si lo hiciera.
 * @param newProduct - Datos del producto a crear
 */
export const createProduct = async (newProduct: ProductFormData): Promise<Product> => {
    const response = await api.post<Product>('/products', newProduct);
    return response.data;
};

/**
 * Actualiza un producto existente por su ID.
 * @param id - ID del producto a actualizar
 * @param updatedProduct - Nuevos datos del producto
 */
export const updateProduct = async (id: number, updatedProduct: ProductFormData): Promise<Product> => {
    const response = await api.put<Product>(`/products/${id}`, updatedProduct);
    return response.data;
};

/**
 * Elimina un producto por su ID.
 * @param id - ID del producto a eliminar
 */
export const deleteProduct = async (id: number): Promise<Product> => {
    const response = await api.delete<Product>(`/products/${id}`);
    return response.data;
};

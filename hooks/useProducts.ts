import { useEffect } from 'react';
import { useProductStore } from '../store/useProductStore';

/**
 * Hook personalizado para acceder al estado de productos.
 * Encapsula lógica de carga automática y evita duplicación en pantallas.
 */
export const useProducts = () => {
    const {
        products,
        isLoading,
        error,
        fetchProducts,
        addProduct,
        editProduct,
        removeProduct,
        fetchProductById,
    } = useProductStore();

    // Cargar productos automáticamente al montar el componente
    useEffect(() => {
        if (products.length === 0) {
            fetchProducts();
        }
    }, []);

    return {
        products,
        isLoading,
        error,
        addProduct,
        editProduct,
        removeProduct,
        fetchProductById,
    };
};

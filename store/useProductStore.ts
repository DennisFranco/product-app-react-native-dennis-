import { create } from 'zustand';
import {
    createProduct,
    deleteProduct,
    getAllProducts,
    getProductById,
    updateProduct,
} from '../services/productService';
import { Product, ProductFormData } from '../types/product';

/**
 * Estado global para manejar productos de forma simulada (CRUD local).
 */
interface ProductStore {
    products: Product[];
    isLoading: boolean;
    error: string | null;

    // Acciones
    fetchProducts: () => Promise<void>;
    fetchProductById: (id: number) => Promise<Product | null>;
    addProduct: (data: ProductFormData) => Promise<void>;
    editProduct: (id: number, data: ProductFormData) => Promise<void>;
    removeProduct: (id: number) => Promise<void>;
}

export const useProductStore = create<ProductStore>((set, get) => ({
    products: [],
    isLoading: false,
    error: null,

    /**
     * Obtiene todos los productos desde la API y los almacena localmente.
     */
    fetchProducts: async () => {
        try {
            set({ isLoading: true, error: null });
            const data = await getAllProducts();
            set({ products: data });
        } catch (error) {
            set({ error: 'Error al cargar productos.' });
        } finally {
            set({ isLoading: false });
        }
    },

    /**
     * Obtiene un producto por ID desde la API (sin guardarlo en el array local).
     */
    fetchProductById: async (id: number) => {
        try {
            return await getProductById(id);
        } catch {
            return null;
        }
    },

    /**
     * Agrega un nuevo producto al estado local y lo simula en la API.
     */
    addProduct: async (data: ProductFormData) => {
        try {
            const newProduct = await createProduct(data);
            const current = get().products;
            set({ products: [...current, newProduct] });
        } catch (error) {
            set({ error: 'Error al agregar el producto.' });
        }
    },

    /**
     * Edita un producto existente, actualizando solo el estado local.
     */
    editProduct: async (id: number, data: ProductFormData) => {
        try {
            const updated = await updateProduct(id, data);
            const updatedList = get().products.map((p) =>
                p.id === id ? updated : p
            );
            set({ products: updatedList });
        } catch (error) {
            set({ error: 'Error al editar el producto.' });
        }
    },

    /**
     * Elimina un producto del estado local y de la API (simulado).
     */
    removeProduct: async (id: number) => {
        try {
            await deleteProduct(id);
            const filtered = get().products.filter((p) => p.id !== id);
            set({ products: filtered });
        } catch (error) {
            set({ error: 'Error al eliminar el producto.' });
        }
    },
}));

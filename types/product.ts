/**
 * Representa un producto de la Fake Store API.
 */
export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: Rating;
}

/**
 * Representa el rating asociado a un producto.
 */
export interface Rating {
    rate: number;
    count: number;
}

/**
 * Modelo de producto usado para crear o editar.
 * El campo 'id' es opcional porque aún no existe cuando se crea uno nuevo.
 */
export interface ProductFormData {
    id?: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
}

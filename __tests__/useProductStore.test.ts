import { act } from '@testing-library/react-native';
import { useProductStore } from '../store/useProductStore';
import { ProductFormData } from '../types/product';

// Conjunto de pruebas para las acciones asincrónicas del store
describe('useProductStore async actions', () => {

    // Prueba para verificar que se puede agregar un producto correctamente
    it('should add a product', async () => {
        const store = useProductStore.getState(); // Accedemos directamente al estado global

        // Datos del producto a agregar
        const product: ProductFormData = {
            title: 'Camisa',
            price: 50,
            description: 'Camisa azul',
            category: 'ropa',
            image: 'https://example.com/camisa.jpg',
        };

        // Ejecutamos la acción asincrónica dentro de `act` para asegurar comportamiento estable en tests
        await act(async () => {
            await store.addProduct(product);
        });

        // Buscamos el producto recién agregado y verificamos sus datos
        const addedProduct = useProductStore.getState().products.find(p => p.title === 'Camisa');
        expect(addedProduct).toBeDefined(); // El producto debe existir
        expect(addedProduct?.price).toBe(50); // Y debe tener el precio correcto
    });

    // Prueba para editar un producto existente
    it('should update a product', async () => {
        const store = useProductStore.getState();

        // Primero agregamos un producto para luego editarlo
        const initialData: ProductFormData = {
            title: 'Zapatos',
            price: 80,
            description: 'Zapatos de cuero',
            category: 'calzado',
            image: 'https://example.com/zapatos.jpg',
        };

        await act(async () => {
            await store.addProduct(initialData);
        });

        // Lo buscamos en el estado actual
        const original = useProductStore.getState().products.find(p => p.title === 'Zapatos');
        expect(original).toBeDefined(); // Verificamos que se agregó correctamente

        // Nuevos datos para actualizar el producto
        const updated: ProductFormData = {
            title: 'Zapatos deportivos',
            price: 90,
            description: 'Actualizado',
            category: 'deporte',
            image: 'https://example.com/deportivos.jpg',
        };

        // Ejecutamos la edición usando el ID del producto original
        await act(async () => {
            await store.editProduct(original!.id, updated);
        });

        // Verificamos que los cambios se reflejaron en el estado
        const updatedProduct = useProductStore.getState().products.find(p => p.id === original!.id);
        expect(updatedProduct?.title).toBe('Zapatos deportivos');
        expect(updatedProduct?.price).toBe(90);
    });

    // Prueba para eliminar un producto
    it('should remove a product', async () => {
        const store = useProductStore.getState();

        // Creamos un producto para eliminarlo después
        const product: ProductFormData = {
            title: 'Gorra',
            price: 25,
            description: 'Gorra negra',
            category: 'accesorios',
            image: 'https://example.com/gorra.jpg',
        };

        await act(async () => {
            await store.addProduct(product);
        });

        // Lo localizamos en el estado
        const added = useProductStore.getState().products.find(p => p.title === 'Gorra');
        expect(added).toBeDefined();

        // Ejecutamos la eliminación
        await act(async () => {
            await store.removeProduct(added!.id);
        });

        // Verificamos que ya no está en el estado
        const removed = useProductStore.getState().products.find(p => p.id === added!.id);
        expect(removed).toBeUndefined();
    });
});

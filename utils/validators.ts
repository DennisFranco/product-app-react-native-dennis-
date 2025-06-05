/**
 * Valida que un campo de texto no esté vacío.
 * @param value - Texto a validar
 * @returns Mensaje de error si está vacío, o null si es válido.
 */
export const validateRequired = (value: string): string | null => {
    return value.trim() === '' ? 'Este campo es obligatorio.' : null;
};

/**
 * Valida que un valor sea un número positivo mayor a cero.
 * @param value - Texto o número a validar
 * @returns Mensaje de error si no es válido, o null si es válido.
 */
export const validatePrice = (value: string | number): string | null => {
    const num = typeof value === 'string' ? parseFloat(value) : value;
    if (isNaN(num) || num <= 0) return 'El precio debe ser un número positivo.';
    return null;
};

/**
 * Valida que una URL tenga formato válido.
 * (Puede usarse para validar la imagen del producto).
 * @param url - URL a validar
 */
export const validateImageUrl = (url: string): string | null => {
    const pattern = /^(https?:\/\/.*\.(?:png|jpg|jpeg|webp|svg))$/i;
    return pattern.test(url) ? null : 'URL de imagen no válida.';
};

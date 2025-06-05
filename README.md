# Product App – React Native (Expo + TypeScript)

## Desarrollador
**Nombre:** Dennis Franco

---

## Descripción del proyecto

Aplicación móvil desarrollada con React Native y Expo Router que permite realizar operaciones básicas de productos (listar, crear, editar, eliminar y ver detalles), utilizando la Fake Store API como fuente de datos. 

Incluye manejo de estado global con Zustand, validaciones, navegación basada en archivos, y pruebas unitarias para funciones clave.

---

## Tecnologías utilizadas

- React Native con Expo
- TypeScript
- Zustand para gestión de estado global
- Expo Router para navegación
- Fake Store API como backend simulado
- Jest y React Native Testing Library para pruebas unitarias

---

## Instrucciones para clonar y ejecutar la aplicación

1. Clonar el repositorio

```
git clone https://github.com/DennisFranco/product-app-react-native-dennis-.git
cd product-app-react-native-dennis-
```

2. Instalar las dependencias

> Nota: Si usas Node.js 18+ y ocurre un conflicto al instalar los paquetes de testing, usa la opción `--legacy-peer-deps`.

```
npm install --legacy-peer-deps
```

3. Ejecutar en un emulador o dispositivo

**Android:**

```
npx expo run:android
```

**iOS:**

```
npx expo run:ios
```

**Web (opcional):**

```
npm run web
```

---

## Enlace a la API utilizada

[https://fakestoreapi.com](https://fakestoreapi.com)

---

## Pruebas unitarias

Para ejecutar los tests:

```
npm test
```

Cobertura de pruebas:

- Componente `InputField` (renderizado, validación y eventos)
- Store `useProductStore` (agregar, editar, eliminar productos)

Configuración personalizada con `babel.config.js` y `jest.config.js` para transformar correctamente los módulos ESM (como `expo-modules-core`).

---

## Capturas de pantalla o video

Imágenes dentro del directorio `assets/screenshots/`

---

## Decisiones de diseño o arquitectura 

- Se eligió Zustand por su simplicidad y claridad frente a soluciones como Redux.
- Expo Router permite un enfoque más limpio y escalable basado en estructura de carpetas.
- Se separaron claramente los archivos en carpetas por dominio (`components`, `hooks`, `store`, `services`, etc.) para mantener una arquitectura clara y extensible.
- Se aplicó tipado estricto con TypeScript para mejorar mantenibilidad.
- Se usaron pruebas unitarias enfocadas en funciones puras del store y componentes desacoplados.

# Frontend - Administrador de Servidores
Interfaz de usuario para la aplicación de administración de servidores. 
Es una Single-Page Application (SPA) desarrollada con Vue 3 (Composition API), Vite, y Pinia para el manejo de estado.

## Características Principales
- Vista de servidores en formato de tabla clara y ordenada.

- Creación, edición y eliminación de servidores sin recargar la página.

- Funcionalidad de Drag & Drop para reordenar la lista de servidores.

- Validaciones en el formulario para una mejor experiencia de usuario (formato de IP, campos requeridos, etc.).

- Notificaciones (toasts) para dar feedback de las operaciones realizadas.

- Manejo de estado centralizado y reactivo con Pinia.

## Requisitos
- Node.js >= 20.x

- npm

## Instalación y Ejecución Local
1. Clonar el repositorio y navegar a la carpeta del frontend:

    ```
    cd frontend-tc
    ```
2. Instalar las dependencias de npm:
    ```
    npm install
    ```
3. Crear un archivo de entorno para configurar la URL de la API. Crea un archivo llamado .env.local en la raíz de frontend-tc y añade el siguiente contenido:
    ```
    VITE_API_URL=http://localhost:8000/api
    ```
4. Iniciar el servidor de desarrollo de Vite:
    ```
    npm run dev
    ```
La aplicación estará disponible en la URL que indique la terminal (usualmente http://localhost:5173).

## Testing
Para ejecutar los tests de componentes con Vitest, corre el siguiente comando:

```
npm run test:unit
```
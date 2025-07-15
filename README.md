# Tienda SENA

Proyecto de tienda virtual desarrollado con Node.js, Express y EJS, orientado a la venta de productos de emprendimiento SENA.

---

## Autores

- Juan Camilo Gallego Jurado


---

## Tabla de Contenidos

- [Instalación](#instalación)
- [Uso](#uso)
- [Login con Google](#login-con-google)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Funcionalidades](#funcionalidades)
- [Dependencias](#dependencias)
- [Pruebas](#pruebas)
- [Configuración de Autenticación Social](#configuración-de-autenticación-social)
- [Variables de Entorno Requeridas](#variables-de-entorno-requeridas)
- [Versionado](#versionado)
- [Convenciones](#convenciones)
- [Contacto](#contacto)


---

## Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/DarkJ-18/tienda_sena_node.git
   cd tienda_sena_node
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Configura las variables de entorno:
   - Copia el archivo `env_example` a `.env`
   - Completa todas las variables requeridas:
     ```env
     BD=nombre_de_tu_base_de_datos
     USUARIOBD=usuario_mongodb
     PASSBD=contraseña_mongodb
     PORT=8585
     SESSION_SECRET=tu_clave_secreta_para_sesiones
     GOOGLE_CLIENT_ID=tu_google_client_id
     GOOGLE_CLIENT_SECRET=tu_google_client_secret
     FACEBOOK_CLIENT_ID=tu_facebook_client_id
     FACEBOOK_CLIENT_SECRET=tu_facebook_client_secret
     GITHUB_CLIENT_ID=tu_github_client_id
     GITHUB_CLIENT_SECRET=tu_github_client_secret
     EMAIL_USER=tu_correo@gmail.com
     EMAIL_PASS=tu_contraseña_de_aplicacion
     ```

4. Asegúrate de tener una base de datos MongoDB configurada y accesible.

---

## Uso

Inicia la aplicación en modo desarrollo:
```bash
npm run dev
```
O en modo producción:
```bash
npm start
```

La aplicación se ejecutará en el puerto configurado en las variables de entorno (variable `PORT` en el archivo `.env`).

> **IMPORTANTE:**  
> Si deseas usar el login con Google, debes ejecutar la aplicación en el **puerto 8585**.  
> Accede a la aplicación en [http://localhost:8585](http://localhost:8585)  
> El login social solo funcionará correctamente en ese puerto, ya que es el configurado en Google Console como callback:
> ```
> http://localhost:8585/auth/google/callback
> ```

---

## Login con Google

Para que el inicio de sesión con Google funcione correctamente:

1. Asegúrate de que tu archivo `.env` tenga el puerto:
   ```
   PORT=8585
   ```
2. En la [Google Cloud Console](https://console.developers.google.com/), la URI de redirección debe ser:
   ```
   http://localhost:8585/auth/google/callback
   ```
3. Accede a la app desde [http://localhost:8585](http://localhost:8585)

Si usas otro puerto, el login con Google mostrará un error de `redirect_uri_mismatch`.

### Credenciales de Administrador por Defecto

Para acceder como administrador a la aplicación:

- **Correo:** admin@gmail.com
- **Contraseña:** admin

> **Nota:** Estas credenciales deben cambiarse en producción por motivos de seguridad.

---


## Estructura del Proyecto

- `src/`: Código fuente principal
  - `config/`: Configuración de base de datos y Passport (autenticación social)
  - `controller/`: Controladores de usuarios y productos
  - `data/`: Acceso a datos (DAO) para usuarios y productos
  - `middleware/`: Middlewares personalizados (autenticación JWT)
  - `models/`: Modelos de Mongoose (usuarios, productos, pedidos)
- `routes/`: Definición de rutas (usuarios, productos, administración, API REST)
- `public/`: Archivos estáticos (imágenes, CSS, JS)
  - `assets/`: Imágenes y recursos gráficos
  - `css/`: Hojas de estilo (Bootstrap, estilos personalizados)
  - `js/`: Scripts JavaScript (Bootstrap, jQuery)
- `views/`: Vistas EJS (páginas y parciales)
  - `pages/`: Páginas principales (login, registro, productos, administración)
  - `partials/`: Componentes reutilizables (header, footer, head)
- `tests/`: Archivos de prueba (tests de API)
- `index.js`: Punto de entrada principal
- `.env`: Variables de entorno (no incluido en el repositorio)
- `env_example`: Ejemplo de configuración de variables de entorno
- `package.json`: Configuración y dependencias del proyecto
- `CHANGELOG.md`: Registro de cambios del proyecto

---

## Funcionalidades

### Autenticación y Usuarios
- Registro e inicio de sesión local con validación de campos
- Autenticación social con Google, Facebook y GitHub (Passport.js)
- Sistema de recuperación de contraseñas vía email
- Gestión de sesiones con Express Session y MongoDB Store
- Roles de usuario (Administrador, Cliente, Vendedor)
- Protección de rutas con middleware de autenticación JWT

### Gestión de Productos
- CRUD completo de productos (crear, leer, actualizar, eliminar)
- Categorización de productos
- Sistema de ofertas y descuentos
- Gestión de imágenes múltiples por producto
- Control de stock e inventario
- API REST para productos

### Panel de Administración
- Gestión completa de productos desde interfaz web
- Listado paginado con filtros por categoría y stock
- Edición en línea de productos
- Gestión de usuarios (estructura base implementada)

### Características Técnicas
- Vistas responsivas con Bootstrap 5
- Notificaciones y mensajes en tiempo real
- Envío de emails de bienvenida y recuperación
- Protección CSRF en formularios
- Validación de datos tanto frontend como backend

---

## Dependencias

### Dependencias de Producción
- **express**: Framework web para Node.js
- **mongoose**: ODM para MongoDB
- **ejs**: Motor de plantillas
- **express-ejs-layouts**: Layouts para EJS
- **express-session**: Manejo de sesiones
- **connect-mongo**: Almacenamiento de sesiones en MongoDB
- **passport**: Middleware de autenticación
- **passport-google-oauth20**: Estrategia OAuth2 para Google
- **passport-facebook**: Estrategia OAuth para Facebook  
- **passport-github2**: Estrategia OAuth para GitHub
- **bcrypt**: Hashing de contraseñas
- **bcryptjs**: Alternativa a bcrypt
- **jsonwebtoken**: Generación y verificación de JWT
- **dotenv**: Manejo de variables de entorno
- **nodemailer**: Envío de emails
- **bootstrap**: Framework CSS
- **pm2**: Gestor de procesos para producción

### Dependencias de Desarrollo
- **nodemon**: Reinicio automático del servidor en desarrollo

### Scripts Disponibles
- `npm start`: Inicia la aplicación con PM2 (producción)
- `npm run dev`: Inicia la aplicación con Nodemon (desarrollo)
- `npm test`: Ejecuta las pruebas (actualmente no configurado)

---

## Pruebas

El proyecto incluye un archivo de pruebas para la API de productos en `tests/api_productos_test.js`. Este archivo contiene ejemplos de cómo probar los endpoints de la API usando herramientas como Postman.

### Endpoints de la API

- `GET /api/productos` - Obtener todos los productos
- `GET /api/productos/:id` - Obtener un producto por ID
- `POST /api/productos` - Crear un nuevo producto
- `PUT /api/productos/:id` - Actualizar un producto
- `DELETE /api/productos/:id` - Eliminar un producto

---

## Configuración de Autenticación Social

### Google OAuth
1. Ve a [Google Cloud Console](https://console.developers.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Habilita la Google+ API
4. Crea credenciales OAuth 2.0
5. Configura la URI de redirección: `http://localhost:8585/auth/google/callback`

### Facebook OAuth
1. Ve a [Facebook Developers](https://developers.facebook.com/)
2. Crea una nueva app
3. Configura Facebook Login
4. Agrega la URL de redirección: `http://localhost:8585/auth/facebook/callback`

### GitHub OAuth
1. Ve a GitHub Settings > Developer settings > OAuth Apps
2. Crea una nueva OAuth App
3. Configura la Authorization callback URL: `http://localhost:8585/auth/github/callback`

---

## Variables de Entorno Requeridas

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `BD` | Nombre de la base de datos MongoDB | `tienda_sena` |
| `USUARIOBD` | Usuario de MongoDB | `admin` |
| `PASSBD` | Contraseña de MongoDB | `password123` |
| `PORT` | Puerto del servidor | `8585` |
| `SESSION_SECRET` | Clave secreta para sesiones | `mi_clave_super_secreta` |
| `GOOGLE_CLIENT_ID` | ID de cliente de Google OAuth | |
| `GOOGLE_CLIENT_SECRET` | Secreto de cliente de Google OAuth | |
| `FACEBOOK_CLIENT_ID` | ID de app de Facebook | |
| `FACEBOOK_CLIENT_SECRET` | Secreto de app de Facebook | |
| `GITHUB_CLIENT_ID` | ID de cliente de GitHub OAuth | |
| `GITHUB_CLIENT_SECRET` | Secreto de cliente de GitHub OAuth | |
| `EMAIL_USER` | Correo para envío de emails | `correo@gmail.com` |
| `EMAIL_PASS` | Contraseña de aplicación de Gmail | |

---

## Convenciones

### Estructura de Archivos
- Código fuente en `src/`
- Rutas en `routes/`
- Archivos estáticos en `public/`
- Vistas EJS en `views/`
- Variables sensibles en `.env` (no incluir en git)
- Uso de controladores y modelos separados

### Convenciones de Desarrollo
- Nombres de archivos en snake_case (ej. `usuario_controller.js`)
- Nombres de variables y funciones en camelCase
- Nombres de modelos en PascalCase (ej. `Usuario`, `Producto`)
- Uso de async/await para operaciones asíncronas
- Validación tanto en frontend como backend
- Manejo de errores con try/catch

### Base de Datos
- Conexión a MongoDB Atlas
- Uso de Mongoose como ODM
- Esquemas definidos en `src/models/`
- Validaciones a nivel de esquema

---## 
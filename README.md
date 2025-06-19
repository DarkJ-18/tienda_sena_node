# Tienda SENA

Proyecto de tienda virtual desarrollado con Node.js, Express y EJS, orientado a la venta de productos de emprendimiento SENA.

---

## Autores

- Juan Camilo Gallego Jurado
- Carlos Andres Usuga Arenas
- Cristian David Vargas Arenas

---

## Tabla de Contenidos

- [Instalación](#instalación)
- [Uso](#uso)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Funcionalidades](#funcionalidades)
- [Dependencias](#dependencias)
- [Versionado](#versionado)
- [Convenciones](#convenciones)
- [Contacto](#contacto)


---

## Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/DarkJ-18/tienda_sena_node.git
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Configura las variables de entorno en un archivo `.env` (puedes usar `.env_example` como referencia).

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
Accede a la aplicación en [http://localhost:3000](http://localhost:3000) (puerto configurable en `.env`).

---

## Estructura del Proyecto

- `src/`: Código fuente principal
  - `config/`: Configuración de base de datos y Passport
  - `controller/`: Controladores de usuarios y productos
  - `data/`: Acceso a datos (DAO)
  - `middleware/`: Middlewares personalizados (ej. autenticación)
  - `models/`: Modelos de Mongoose para usuarios y productos
- `routes/`: Definición de rutas (usuarios, productos, API REST)
- `public/`: Archivos estáticos (imágenes, CSS, JS)
- `views/`: Vistas EJS (páginas y parciales)
- `index.js`: Punto de entrada principal
- `.env`: Variables de entorno
- `package.json`: Configuración y dependencias

---

## Funcionalidades

- Registro e inicio de sesión de usuarios (local y con Google, Facebook, GitHub)
- Gestión de productos (CRUD) con roles de usuario
- Listado y detalle de productos
- Panel de administración (estructura base)
- Protección de rutas y sesiones con JWT y Passport
- Vistas responsivas con Bootstrap y EJS
- Notificaciones y mensajes en la interfaz

---

## Dependencias

- express
- mongoose
- ejs
- express-session
- connect-mongo
- passport, passport-google-oauth20, passport-facebook, passport-github2
- bcrypt, bcryptjs
- dotenv
- bootstrap

---


## Convenciones

- Código fuente en `src/`
- Rutas en `routes/`
- Archivos estáticos en `public/`
- Vistas en `views/`
- Variables sensibles en `.env` (no subir a git)
- Uso de controladores y modelos separados

---

# Guía de Trabajo con Git para Equipos

### Antes de Comenzar a Hacer Cambios

## 1. Antes de Empezar a Trabajar

### Mantener la rama `main` actualizada

```bash
# Cambiar a la rama main
git checkout main

# Traer los últimos cambios del servidor
git pull origin main
```

### Crear o actualizar tu rama de trabajo

```bash
# Cambiar a tu rama de trabajo
git checkout dark  # O el nombre de tu rama

# Fusionar los cambios recientes de main
git merge main     # O usa git rebase main si prefieres un historial más limpio
```

---

## 2. Trabajando y Subiendo Cambios

### Hacer cambios y subirlos

```bash
git add .
git commit -m "Descripción de los cambios"
git push origin dark  # O el nombre de tu rama
```

---

## 3. ¿Qué Hacer Si Otra Persona Ya Subió Cambios?

Si alguien más modificó el mismo archivo y ya subió los cambios:

1. **Guarda tus cambios localmente**

   ```bash
   git add .
   git commit -m "Mis cambios locales"
   ```

2. **Trae los últimos cambios del servidor sin fusionarlos directamente**

   ```bash
   git fetch origin
   ```

3. **Integra los cambios recientes**

   - **Opción 1 (merge, más sencillo):**
     ```bash
     git merge origin/dark  # Si tu rama es "dark"
     ```
   - **Opción 2 (rebase, mantiene un historial más limpio):**
     ```bash
     git rebase origin/dark
     ```

> **Nota:**  
> La diferencia entre merge y rebase es que merge crea un nuevo commit de fusión, mientras que rebase aplica tus cambios sobre los cambios de la rama main, creando un historial más limpio.

4. **Resolver conflictos (si los hay)**

   - Si Git marca un conflicto, abre el archivo y edita las partes conflictivas.
   - Luego, marca el archivo como resuelto y continúa el proceso:
     ```bash
     git add archivo_conflictivo
     git rebase --continue  # Solo si usaste rebase
     ```

5. **Subir los cambios corregidos**

   ```bash
   git push origin dark
   ```
   - Si usaste `rebase`, podrías necesitar `git push --force`.

---

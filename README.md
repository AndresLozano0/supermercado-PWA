# 🛒 Supermercado PWA

Este es un proyecto final desarrollado por aprendices del SENA: una **Aplicación Web Progresiva (PWA)** para la gestión de un supermercado, que incluye diseño de interfaz, conexión con base de datos, gestión de productos, pedidos y más.

---

## 🧩 Estructura del Proyecto

```
supermercado-pwa/
├── frontend/      # HTML, CSS, JavaScript (interfaz visual)
├── backend/       # Node.js + Express (servidor y lógica)
├── database/      # Script SQL para crear la base de datos
└── README.md      # Instrucciones del proyecto
```

---

## 🚀 Cómo usar este proyecto

### 1. Clonar el repositorio

```bash
git clone https://github.com/tucuenta/supermercado-pwa.git
```

### 2. Instalar dependencias del backend

```bash
cd supermercado-pwa/backend
npm install
```

### 3. Configurar variables de entorno

Crea un archivo `.env` dentro de `backend/` con el siguiente contenido (ajusta según tu base de datos):

```
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=supermercado
```

### 4. Iniciar el servidor backend

```bash
npm start
```

El backend estará disponible en `http://localhost:3000`

### 5. Levantar el frontend

- Abre la carpeta `frontend/`.
- Abre el archivo `index.html` en tu navegador.
- O usa [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) en Visual Studio Code.

### 6. Importar la base de datos

- Abre **phpMyAdmin** o tu cliente de MySQL favorito.
- Crea una base de datos llamada `supermercado`.
- Importa el archivo `database/supermercado.sql`.

---

## 📦 Tecnologías usadas

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express
- **Base de datos:** MySQL
- **Herramientas:** Git, GitHub, Visual Studio Code, XAMPP (para base de datos local)
- **PWA:** Manifest, Service Worker, diseño responsivo

---

## 👥 Equipo de trabajo

- Aprendiz 1 - [nombre o usuario de GitHub]
- Aprendiz 2 - [nombre o usuario]
- Aprendiz 3 - [nombre o usuario]

---

## 📌 Estado del proyecto

✅ Proyecto en desarrollo  
📅 Entrega final: [poner fecha]

---

## 📄 Licencia

Este proyecto es de uso académico. Todos los derechos reservados al equipo desarrollador del SENA.

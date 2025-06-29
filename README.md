# 🎓 Inglés Interactivo para Agustina

Una aplicación educativa interactiva diseñada especialmente para que Agustina aprenda inglés de manera divertida y efectiva.

## 🌟 Características

- **5 temas principales** con actividades interactivas
- **Personajes favoritos**: Hanako-kun, Harry Potter, y Mashle
- **Feedback visual inmediato** con emojis y colores
- **Diseño amigable para niños** con TailwindCSS
- **Actividades variadas**: opción múltiple y completar frases
- **Progreso visual** en el desafío final
- **Responsive design** para diferentes dispositivos

## 📚 Temas Incluidos

1. **Tema 1: Greetings & Introductions** - Saludos y presentaciones
2. **Tema 2: Personal Information** - Información personal
3. **Tema 3: Countries & Nationalities** - Países y nacionalidades
4. **Tema 4: Colours & Days** - Colores y días de la semana
5. **Desafío Final** - Actividades integradoras de todos los temas

## 🚀 Instalación y Ejecución

### Prerrequisitos
- Node.js (versión 16 o superior)
- npm (incluido con Node.js)

### Pasos de instalación

1. **Clonar o descargar el proyecto**
   ```bash
   git clone [URL_DEL_REPOSITORIO]
   cd ingles-interactivo
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Ejecutar en modo desarrollo**
   ```bash
   npm run dev
   ```

4. **Abrir en el navegador**
   - La aplicación se abrirá automáticamente en `http://localhost:5173`
   - Si no se abre automáticamente, abre manualmente tu navegador y ve a esa dirección

### Comandos disponibles

```bash
npm run dev      # Ejecutar en modo desarrollo
npm run build    # Construir para producción
npm run preview  # Previsualizar la versión de producción
npm run lint     # Ejecutar el linter
```

## 🌐 Despliegue

### Opción 1: GitHub Pages (Recomendado)

1. **Crear un repositorio en GitHub**
   - Ve a GitHub.com y crea un nuevo repositorio
   - Sube tu código al repositorio

2. **Configurar GitHub Pages**
   ```bash
   npm run deploy
   ```

3. **Configurar la fuente en GitHub**
   - Ve a Settings > Pages en tu repositorio
   - Selecciona "Deploy from a branch"
   - Elige la rama `gh-pages`
   - Guarda los cambios

4. **Tu sitio estará disponible en**
   `https://[tu-usuario].github.io/[nombre-del-repositorio]`

### Opción 2: Netlify (Alternativa gratuita)

1. **Crear cuenta en Netlify**
   - Ve a netlify.com y crea una cuenta

2. **Conectar tu repositorio**
   - Haz clic en "New site from Git"
   - Conecta tu repositorio de GitHub
   - Configura el comando de build: `npm run build`
   - Configura el directorio de publicación: `dist`

3. **Desplegar**
   - Netlify detectará automáticamente los cambios y desplegará tu sitio

### Opción 3: Vercel (Alternativa gratuita)

1. **Crear cuenta en Vercel**
   - Ve a vercel.com y crea una cuenta

2. **Importar proyecto**
   - Haz clic en "New Project"
   - Importa tu repositorio de GitHub
   - Vercel detectará automáticamente que es un proyecto Vite

3. **Desplegar**
   - Haz clic en "Deploy" y tu sitio estará listo

## 🎮 Cómo usar la aplicación

1. **Navegación**
   - Usa la barra de navegación superior para moverte entre temas
   - Comienza desde "Inicio" para ver la bienvenida

2. **Actividades**
   - Cada tema tiene múltiples actividades interactivas
   - Puedes elegir entre opciones múltiples o completar frases
   - Recibirás feedback inmediato con ✅ o ❌

3. **Progreso**
   - En el Desafío Final verás una barra de progreso
   - Completa todas las actividades para recibir una felicitación especial

## 🛠️ Tecnologías utilizadas

- **React 18+** - Biblioteca de JavaScript para interfaces
- **Vite** - Herramienta de construcción rápida
- **React Router** - Navegación entre páginas
- **TailwindCSS** - Framework de CSS utilitario
- **PostCSS** - Procesador de CSS
- **Autoprefixer** - Agregar prefijos automáticamente

## 📁 Estructura del proyecto

```
ingles-interactivo/
├── src/
│   ├── components/
│   │   ├── Feedback.jsx
│   │   └── NavBar.jsx
│   ├── pages/
│   │   ├── Bienvenida.jsx
│   │   ├── Tema1.jsx
│   │   ├── Tema2.jsx
│   │   ├── Tema3.jsx
│   │   ├── Tema4.jsx
│   │   └── Final.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── public/
├── package.json
├── vite.config.js
├── postcss.config.cjs
└── README.md
```

## 🎨 Personalización

### Agregar nuevos temas

1. Crea un nuevo archivo en `src/pages/` (ej: `Tema5.jsx`)
2. Sigue la estructura de los temas existentes
3. Agrega la ruta en `src/App.jsx`
4. Agrega el enlace en `src/components/NavBar.jsx`

### Agregar nuevas actividades

Cada tema usa un array de actividades con esta estructura:

```javascript
{
  tipo: 'opcion', // o 'completar'
  pregunta: 'Tu pregunta aquí',
  opciones: ['Opción 1', 'Opción 2', 'Opción 3', 'Opción 4'], // solo para tipo 'opcion'
  respuesta: 'Respuesta correcta',
  personaje: 'Harry Potter' // o 'Hanako-kun' o 'Mashle'
}
```

## 🐛 Solución de problemas

### Error de puerto ocupado
Si el puerto 5173 está ocupado, Vite automáticamente usará otro puerto.

### Error de dependencias
```bash
rm -rf node_modules package-lock.json
npm install
```

### Error de build
```bash
npm run build
```
Revisa la consola para ver errores específicos.

## 📞 Soporte

Si tienes problemas o preguntas:
1. Revisa la consola del navegador (F12)
2. Verifica que todas las dependencias estén instaladas
3. Asegúrate de estar usando Node.js 16 o superior

## 🎉 ¡Disfruta aprendiendo inglés!

Esta aplicación está diseñada para hacer el aprendizaje del inglés divertido y efectivo. ¡Que lo disfrutes, Agustina! 🌟

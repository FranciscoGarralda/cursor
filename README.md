# 📱💻 Upload App - Aplicación Multiplataforma de Subida de Archivos

Una aplicación completa para subir archivos al servidor, disponible para iPhone y escritorio.

## 🏗️ Estructura del Proyecto

```
upload-app-workspace/
├── backend/                    # Servidor Node.js/Express
│   ├── src/
│   │   ├── controllers/        # Controladores de la API
│   │   ├── middleware/         # Middleware personalizado
│   │   ├── models/            # Modelos de datos
│   │   ├── routes/            # Rutas de la API
│   │   └── utils/             # Utilidades
│   ├── config/                # Configuración del servidor
│   ├── uploads/               # Archivos subidos
│   └── package.json
├── desktop-app/               # Aplicación de escritorio (Electron)
│   ├── src/
│   │   ├── main/              # Proceso principal de Electron
│   │   ├── renderer/          # Interfaz de usuario
│   │   └── shared/            # Código compartido
│   ├── assets/                # Recursos estáticos
│   ├── build/                 # Archivos de construcción
│   └── package.json
├── mobile-app/                # Aplicación móvil (React Native)
│   ├── src/
│   │   ├── components/        # Componentes reutilizables
│   │   ├── screens/           # Pantallas de la aplicación
│   │   ├── navigation/        # Navegación
│   │   ├── services/          # Servicios de API
│   │   └── utils/             # Utilidades
│   ├── assets/                # Recursos estáticos
│   ├── config/                # Configuración
│   └── package.json
├── ios-app/                   # Aplicación iOS nativa
│   ├── UploadApp/             # Código fuente Swift
│   ├── UploadApp.xcodeproj/   # Proyecto Xcode
│   └── UploadAppTests/        # Tests
├── shared/                    # Código compartido
│   ├── types/                 # Tipos TypeScript
│   ├── api/                   # Definiciones de API
│   └── constants/             # Constantes
└── assets/                    # Recursos compartidos
```

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js >= 18.0.0
- npm >= 8.0.0
- Para iOS: Xcode (macOS)
- Para Android: Android Studio

### Instalación
```bash
# Instalar todas las dependencias
npm run install-all

# O instalar por separado:
npm install                    # Dependencias del workspace
npm run install:backend        # Dependencias del servidor
npm run install:desktop        # Dependencias de la app de escritorio
npm run install:mobile         # Dependencias de la app móvil
```

## 🏃‍♂️ Cómo Ejecutar

### Desarrollo
```bash
# Ejecutar backend y desktop app simultáneamente
npm run dev

# Ejecutar cada aplicación por separado:
npm run start:backend          # Servidor en http://localhost:3000
npm run start:desktop          # Aplicación de escritorio
npm run start:mobile           # Metro bundler para React Native
```

### Aplicaciones Móviles
```bash
# iOS
npm run ios

# Android
npm run android
```

### Construcción para Producción
```bash
# Construir todas las aplicaciones
npm run build:mobile
npm run build:desktop
npm run build:backend
```

## 🔧 Configuración del Servidor

El servidor backend incluye:
- **Express.js** para la API REST
- **Multer** para la subida de archivos
- **Sharp** para el procesamiento de imágenes
- **JWT** para autenticación
- **MongoDB** para la base de datos
- **Rate limiting** para seguridad
- **CORS** habilitado para las apps cliente

### Variables de Entorno
Crea un archivo `.env` en la carpeta `backend/`:
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/uploadapp
JWT_SECRET=your_jwt_secret_here
UPLOAD_PATH=./uploads
MAX_FILE_SIZE=10485760  # 10MB
```

## 📱 Características de las Aplicaciones

### Aplicación de Escritorio (Electron)
- Interfaz nativa multiplataforma
- Drag & drop para subir archivos
- Vista previa de archivos
- Progreso de subida en tiempo real
- Soporte para múltiples archivos

### Aplicación Móvil (React Native)
- Interfaz nativa para iOS y Android
- Selección de archivos desde la galería
- Tomar fotos con la cámara
- Subida en background
- Notificaciones push

### Aplicación iOS Nativa (Swift)
- Implementación completamente nativa
- Integración con iOS Files app
- Soporte para Document Provider
- Widgets y extensiones

## 🔒 Seguridad

- Rate limiting configurado
- Validación de tipos de archivo
- Sanitización de nombres de archivo
- Autenticación JWT
- Headers de seguridad con Helmet

## 🧪 Testing

```bash
# Ejecutar todos los tests
npm test

# Tests por aplicación
npm run test:backend
npm run test:desktop
npm run test:mobile
```

## 📚 API Endpoints

### Archivos
- `POST /api/upload` - Subir archivo(s)
- `GET /api/files` - Listar archivos
- `GET /api/files/:id` - Obtener archivo específico
- `DELETE /api/files/:id` - Eliminar archivo

### Autenticación
- `POST /api/auth/login` - Iniciar sesión
- `POST /api/auth/register` - Registrar usuario
- `POST /api/auth/refresh` - Renovar token

## 🛠️ Tecnologías Utilizadas

- **Backend**: Node.js, Express, MongoDB, JWT
- **Desktop**: Electron, React/Vue
- **Mobile**: React Native
- **iOS**: Swift, UIKit
- **Shared**: TypeScript, ESLint, Prettier

## 📝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/amazing-feature`)
3. Commit tus cambios (`git commit -m 'Add some amazing feature'`)
4. Push a la rama (`git push origin feature/amazing-feature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está licenciado bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 🤝 Soporte

¿Necesitas ayuda? Abre un issue en GitHub o contacta al equipo de desarrollo.

---

Made with ❤️ for cross-platform file uploading
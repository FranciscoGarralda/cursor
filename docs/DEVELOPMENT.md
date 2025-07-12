# 🛠️ Guía de Desarrollo

Esta guía contiene instrucciones específicas para desarrollar cada componente de la aplicación.

## 📋 Tabla de Contenidos

1. [Configuración del Entorno](#configuración-del-entorno)
2. [Backend Development](#backend-development)
3. [Desktop App Development](#desktop-app-development)
4. [Mobile App Development](#mobile-app-development)
5. [iOS Native App Development](#ios-native-app-development)
6. [Debugging y Testing](#debugging-y-testing)

## 🔧 Configuración del Entorno

### Prerrequisitos por Plataforma

#### Windows
```bash
# Instalar Node.js desde nodejs.org
# Instalar Visual Studio Code
# Instalar Git
# Para React Native: Instalar Android Studio
```

#### macOS
```bash
# Instalar Homebrew
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Instalar Node.js
brew install node

# Instalar Xcode desde App Store
# Instalar CocoaPods para React Native
sudo gem install cocoapods
```

#### Linux
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install nodejs npm
sudo apt install build-essential

# Para React Native
sudo apt install android-sdk
```

### Variables de Entorno
```bash
# Copiar archivo de ejemplo
cp backend/.env.example backend/.env

# Editar con tus valores
nano backend/.env
```

## 🖥️ Backend Development

### Estructura del Código
```
backend/src/
├── controllers/        # Lógica de negocio
├── middleware/         # Middleware personalizado
├── models/            # Modelos de datos
├── routes/            # Rutas de API
└── utils/             # Utilidades
```

### Comandos Importantes
```bash
# Instalar dependencias
cd backend && npm install

# Desarrollo con recarga automática
npm run dev

# Ejecutar tests
npm test

# Lint del código
npm run lint

# Crear base de datos inicial
npm run seed
```

### Añadir Nuevas Rutas
1. Crear controlador en `src/controllers/`
2. Definir modelo en `src/models/` (si es necesario)
3. Crear rutas en `src/routes/`
4. Registrar rutas en `src/server.js`

### Ejemplo de Controlador
```javascript
// src/controllers/fileController.js
const File = require('../models/File');

exports.uploadFile = async (req, res) => {
  try {
    const file = new File({
      filename: req.file.filename,
      originalName: req.file.originalname,
      size: req.file.size,
      userId: req.user.id
    });
    
    await file.save();
    res.json({ success: true, file });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
```

## 🖥️ Desktop App Development

### Tecnologías
- **Electron**: Framework principal
- **React/Vue**: Frontend framework
- **Webpack**: Bundler

### Comandos
```bash
cd desktop-app
npm install
npm start       # Desarrollo
npm run build   # Producción
```

### Estructura
```
desktop-app/src/
├── main/          # Proceso principal de Electron
├── renderer/      # Interfaz de usuario
└── shared/        # Código compartido
```

### Configuración de Electron
```javascript
// src/main/main.js
const { app, BrowserWindow } = require('electron');

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  win.loadFile('dist/index.html');
}

app.whenReady().then(createWindow);
```

## 📱 Mobile App Development

### React Native Setup
```bash
cd mobile-app
npm install

# iOS
cd ios && pod install && cd ..
npx react-native run-ios

# Android
npx react-native run-android
```

### Estructura
```
mobile-app/src/
├── components/     # Componentes reutilizables
├── screens/        # Pantallas
├── navigation/     # Navegación
├── services/       # Servicios de API
└── utils/          # Utilidades
```

### Configuración de Navegación
```javascript
// src/navigation/AppNavigator.js
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import UploadScreen from '../screens/UploadScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Upload" component={UploadScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

### Permisos
```javascript
// android/app/src/main/AndroidManifest.xml
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
```

## 🍎 iOS Native App Development

### Xcode Setup
```bash
# Abrir proyecto
open ios-app/UploadApp.xcodeproj

# Compilar desde terminal
cd ios-app
xcodebuild -scheme UploadApp -configuration Debug
```

### Estructura Swift
```
ios-app/UploadApp/
├── Models/         # Modelos de datos
├── Views/          # Vistas SwiftUI/UIKit
├── Controllers/    # Controladores
├── Services/       # Servicios de red
└── Utils/          # Utilidades
```

### Ejemplo de Servicio de Upload
```swift
// Services/UploadService.swift
import Foundation

class UploadService {
    func uploadFile(data: Data, filename: String, completion: @escaping (Result<String, Error>) -> Void) {
        let url = URL(string: "http://localhost:3000/api/upload")!
        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        
        let boundary = UUID().uuidString
        request.setValue("multipart/form-data; boundary=\(boundary)", forHTTPHeaderField: "Content-Type")
        
        let httpBody = NSMutableData()
        httpBody.appendString("--\(boundary)\r\n")
        httpBody.appendString("Content-Disposition: form-data; name=\"file\"; filename=\"\(filename)\"\r\n")
        httpBody.appendString("Content-Type: application/octet-stream\r\n\r\n")
        httpBody.append(data)
        httpBody.appendString("\r\n--\(boundary)--\r\n")
        
        request.httpBody = httpBody as Data
        
        URLSession.shared.dataTask(with: request) { data, response, error in
            if let error = error {
                completion(.failure(error))
                return
            }
            
            completion(.success("Upload successful"))
        }.resume()
    }
}
```

## 🐛 Debugging y Testing

### Backend Testing
```bash
# Unit tests
npm run test

# Integration tests
npm run test:integration

# Coverage
npm run test:coverage
```

### Frontend Testing
```bash
# React Native
cd mobile-app
npm test

# Electron
cd desktop-app
npm test
```

### Debugging
```bash
# Backend: Usar VS Code debugger o
node --inspect src/server.js

# React Native: Usar Flipper o React Native Debugger
npx react-native log-android  # Android logs
npx react-native log-ios      # iOS logs

# Electron: Usar Chrome DevTools
```

### Herramientas Útiles
- **Postman**: Para testing de API
- **MongoDB Compass**: Para inspeccionar la base de datos
- **React Native Debugger**: Para debugging de React Native
- **Xcode Instruments**: Para profiling de iOS

## 📚 Recursos Adicionales

### Documentación
- [Express.js](https://expressjs.com/)
- [React Native](https://reactnative.dev/)
- [Electron](https://electronjs.org/)
- [Swift](https://developer.apple.com/swift/)

### Comunidad
- [Stack Overflow](https://stackoverflow.com/)
- [Reddit r/reactnative](https://reddit.com/r/reactnative)
- [Electron Discord](https://discord.gg/electron)

## 🔄 Workflow de Desarrollo

1. **Crear rama**: `git checkout -b feature/nueva-funcionalidad`
2. **Desarrollar**: Implementar cambios
3. **Probar**: Ejecutar tests
4. **Commit**: `git commit -m "feat: descripción del cambio"`
5. **Push**: `git push origin feature/nueva-funcionalidad`
6. **PR**: Crear Pull Request
7. **Review**: Esperar aprobación
8. **Merge**: Fusionar a main

## 📋 Checklist de Deployment

### Pre-deployment
- [ ] Todos los tests pasan
- [ ] Linting sin errores
- [ ] Variables de entorno configuradas
- [ ] Base de datos migrada
- [ ] Certificados SSL configurados

### Production
- [ ] Backend deployado
- [ ] Apps compiladas
- [ ] Monitoring configurado
- [ ] Backups automáticos
- [ ] Logs centralizados

---

¡Happy coding! 🚀
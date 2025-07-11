# Upload App - Cross-Platform File Upload Application

A comprehensive cross-platform file upload application built for iPhone and Desktop platforms with a robust backend server.

## 🏗️ Project Structure

```
upload-app-workspace/
├── mobile-app/           # React Native mobile application
├── ios-app/             # Native iOS application (optional)
├── desktop-app/         # Electron desktop application
├── backend/             # Node.js/Express backend server
├── shared/              # Shared types and constants
├── docs/                # Documentation
├── assets/              # Shared assets
└── package.json         # Workspace configuration
```

## 🚀 Features

### Mobile App (React Native)
- **Cross-platform**: Works on iOS and Android
- **File Selection**: Pick multiple files from device storage
- **Upload Progress**: Real-time upload progress tracking
- **File Management**: View, organize, and delete uploaded files
- **Settings**: Configure server URL, upload preferences
- **Modern UI**: Clean, intuitive interface with native feel

### Desktop App (Electron)
- **Cross-platform**: Windows, macOS, and Linux support
- **Drag & Drop**: Easy file selection via drag and drop
- **Native Integration**: OS-level file dialogs and notifications
- **Menu Bar**: Full application menu with keyboard shortcuts
- **Auto-updater**: Built-in update mechanism

### Backend Server (Node.js/Express)
- **RESTful API**: Clean API endpoints for file operations
- **Multiple Upload**: Support for single and multiple file uploads
- **File Processing**: Automatic thumbnail generation for images
- **Security**: Rate limiting, CORS, and file type validation
- **Storage**: Organized file storage by category
- **Health Monitoring**: Built-in health check endpoints

## �️ Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- For mobile development: React Native CLI, Xcode (iOS), Android Studio (Android)
- For desktop development: Electron

### Quick Start

1. **Clone and Install Dependencies**
```bash
git clone <repository-url>
cd upload-app-workspace
npm run install-all
```

2. **Start Backend Server**
```bash
npm run start:backend
```

3. **Start Desktop App**
```bash
npm run start:desktop
```

4. **Start Mobile App**
```bash
# For iOS
npm run ios

# For Android
npm run android
```

### Individual Setup

#### Backend Server
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your configuration
npm run dev
```

#### Mobile App
```bash
cd mobile-app
npm install
# For iOS
npx react-native run-ios
# For Android
npx react-native run-android
```

#### Desktop App
```bash
cd desktop-app
npm install
npm run dev
```

## 📱 Mobile App Screens

### Home Screen
- Welcome interface with navigation options
- Quick access to upload, files, and settings
- Feature overview and app information

### Upload Screen
- File selection from device storage
- Multiple file upload support
- Real-time upload progress
- File preview and management

### Files Screen
- List of all uploaded files
- File details (name, size, upload date)
- Delete functionality
- Pull-to-refresh

### Settings Screen
- Server configuration
- Upload preferences
- App information and cache management

## 🖥️ Desktop App Features

### Main Window
- Clean, modern interface
- File drag & drop support
- Upload progress tracking
- File management

### Menu Bar
- File operations (Open, New Upload)
- Edit operations (Cut, Copy, Paste)
- View options (Zoom, Full Screen)
- Help and About

## 🔧 Backend API Endpoints

### Upload Endpoints
- `POST /api/upload/single` - Upload single file
- `POST /api/upload/multiple` - Upload multiple files
- `GET /api/upload/progress/:uploadId` - Get upload progress

### File Management
- `GET /api/files` - List all files
- `GET /api/files/:filename` - Get file info
- `DELETE /api/files/:filename` - Delete file

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/logout` - User logout

### Health Check
- `GET /health` - Server health status

## 🔒 Security Features

- **Rate Limiting**: Prevents abuse with request limits
- **CORS Protection**: Configurable cross-origin requests
- **File Type Validation**: Restricts allowed file types
- **File Size Limits**: Configurable maximum file sizes
- **Secure Headers**: Helmet.js for security headers

## 📁 File Storage

Files are automatically organized by type:
- `uploads/images/` - Image files (jpg, png, gif, webp)
- `uploads/videos/` - Video files (mp4, mov)
- `uploads/audio/` - Audio files (mp3, wav)
- `uploads/documents/` - Document files (pdf, doc, docx, txt)
- `uploads/others/` - Other file types

## 🎨 UI/UX Features

### Mobile App
- **Native Feel**: Platform-specific design patterns
- **Responsive Design**: Works on all screen sizes
- **Accessibility**: VoiceOver and TalkBack support
- **Dark Mode**: Automatic theme switching

### Desktop App
- **Native Menus**: Platform-specific menu bars
- **Keyboard Shortcuts**: Full keyboard navigation
- **Window Management**: Proper window state management
- **System Integration**: OS notifications and file associations

## 🔄 Development Workflow

### Available Scripts

```bash
# Install all dependencies
npm run install-all

# Start all services in development
npm run dev

# Start individual services
npm run start:backend
npm run start:desktop
npm run start:mobile

# Build for production
npm run build:backend
npm run build:desktop
npm run build:mobile

# Run tests
npm run test
```

### Environment Configuration

Create `.env` files in each project:

**Backend (.env)**
```
PORT=3001
NODE_ENV=development
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:19006
MAX_FILE_SIZE=52428800
JWT_SECRET=your-secret-key
```

## 📦 Building for Production

### Mobile App
```bash
cd mobile-app
# iOS
npm run build:ios
# Android
npm run build:android
```

### Desktop App
```bash
cd desktop-app
# All platforms
npm run build
# Specific platform
npm run build:win
npm run build:mac
npm run build:linux
```

### Backend Server
```bash
cd backend
npm run build
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation in the `docs/` folder
- Review the example configurations

## 🔮 Future Enhancements

- [ ] Cloud storage integration (AWS S3, Google Cloud)
- [ ] Real-time collaboration features
- [ ] Advanced file preview capabilities
- [ ] Batch operations and bulk uploads
- [ ] User authentication and permissions
- [ ] File sharing and public links
- [ ] Advanced search and filtering
- [ ] Integration with popular cloud services
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const sharp = require('sharp');
const mime = require('mime-types');

const router = express.Router();

// Ensure upload directory exists
const uploadDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const typeDir = path.join(uploadDir, getFileCategory(file.mimetype));
    if (!fs.existsSync(typeDir)) {
      fs.mkdirSync(typeDir, { recursive: true });
    }
    cb(null, typeDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${uuidv4()}-${Date.now()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    'image/jpeg', 'image/png', 'image/gif', 'image/webp',
    'application/pdf', 'text/plain',
    'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'video/mp4', 'video/quicktime',
    'audio/mpeg', 'audio/wav'
  ];
  
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type'), false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB
    files: 10
  },
  fileFilter: fileFilter
});

function getFileCategory(mimetype) {
  if (mimetype.startsWith('image/')) return 'images';
  if (mimetype.startsWith('video/')) return 'videos';
  if (mimetype.startsWith('audio/')) return 'audio';
  if (mimetype.includes('pdf')) return 'documents';
  if (mimetype.includes('word') || mimetype.includes('excel') || mimetype.includes('text')) return 'documents';
  return 'others';
}

// Single file upload
router.post('/single', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded',
        error: 'NO_FILE'
      });
    }

    const file = req.file;
    let processedFile = file;

    // Process images (create thumbnail)
    if (file.mimetype.startsWith('image/')) {
      try {
        const thumbnailPath = path.join(path.dirname(file.path), `thumb_${file.filename}`);
        await sharp(file.path)
          .resize(200, 200, { fit: 'inside', withoutEnlargement: true })
          .jpeg({ quality: 80 })
          .toFile(thumbnailPath);
        
        processedFile.thumbnail = `/uploads/${getFileCategory(file.mimetype)}/thumb_${file.filename}`;
      } catch (error) {
        console.error('Thumbnail generation failed:', error);
      }
    }

    const fileResponse = {
      id: uuidv4(),
      name: file.originalname,
      size: file.size,
      type: file.mimetype,
      url: `/uploads/${getFileCategory(file.mimetype)}/${file.filename}`,
      thumbnail: processedFile.thumbnail,
      uploadStatus: 'completed',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    res.json({
      success: true,
      message: 'File uploaded successfully',
      file: fileResponse
    });

  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({
      success: false,
      message: 'Upload failed',
      error: error.message
    });
  }
});

// Multiple files upload
router.post('/multiple', upload.array('files', 10), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No files uploaded',
        error: 'NO_FILES'
      });
    }

    const uploadedFiles = [];

    for (const file of req.files) {
      let processedFile = file;

      // Process images (create thumbnail)
      if (file.mimetype.startsWith('image/')) {
        try {
          const thumbnailPath = path.join(path.dirname(file.path), `thumb_${file.filename}`);
          await sharp(file.path)
            .resize(200, 200, { fit: 'inside', withoutEnlargement: true })
            .jpeg({ quality: 80 })
            .toFile(thumbnailPath);
          
          processedFile.thumbnail = `/uploads/${getFileCategory(file.mimetype)}/thumb_${file.filename}`;
        } catch (error) {
          console.error('Thumbnail generation failed:', error);
        }
      }

      const fileResponse = {
        id: uuidv4(),
        name: file.originalname,
        size: file.size,
        type: file.mimetype,
        url: `/uploads/${getFileCategory(file.mimetype)}/${file.filename}`,
        thumbnail: processedFile.thumbnail,
        uploadStatus: 'completed',
        createdAt: new Date(),
        updatedAt: new Date()
      };

      uploadedFiles.push(fileResponse);
    }

    res.json({
      success: true,
      message: `${uploadedFiles.length} files uploaded successfully`,
      files: uploadedFiles
    });

  } catch (error) {
    console.error('Multiple upload error:', error);
    res.status(500).json({
      success: false,
      message: 'Upload failed',
      error: error.message
    });
  }
});

// Get upload progress (for chunked uploads)
router.get('/progress/:uploadId', (req, res) => {
  // This would typically connect to a real-time system like Socket.IO
  res.json({
    success: true,
    uploadId: req.params.uploadId,
    progress: 100,
    status: 'completed'
  });
});

module.exports = router;
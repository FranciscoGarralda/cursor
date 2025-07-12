const express = require('express');
const path = require('path');
const fs = require('fs');
const router = express.Router();

// Get all files
router.get('/', (req, res) => {
  const uploadDir = path.join(__dirname, '../../uploads');
  const files = [];
  
  try {
    const categories = ['images', 'videos', 'audio', 'documents', 'others'];
    
    categories.forEach(category => {
      const categoryPath = path.join(uploadDir, category);
      if (fs.existsSync(categoryPath)) {
        const categoryFiles = fs.readdirSync(categoryPath);
        categoryFiles.forEach(filename => {
          if (!filename.startsWith('thumb_')) {
            const filePath = path.join(categoryPath, filename);
            const stats = fs.statSync(filePath);
            files.push({
              id: filename,
              name: filename,
              size: stats.size,
              type: category,
              url: `/uploads/${category}/${filename}`,
              createdAt: stats.birthtime,
              updatedAt: stats.mtime
            });
          }
        });
      }
    });
    
    res.json({
      success: true,
      files: files.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve files',
      error: error.message
    });
  }
});

// Delete a file
router.delete('/:filename', (req, res) => {
  const { filename } = req.params;
  const uploadDir = path.join(__dirname, '../../uploads');
  
  try {
    const categories = ['images', 'videos', 'audio', 'documents', 'others'];
    let fileDeleted = false;
    
    categories.forEach(category => {
      const filePath = path.join(uploadDir, category, filename);
      const thumbnailPath = path.join(uploadDir, category, `thumb_${filename}`);
      
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        fileDeleted = true;
        
        // Delete thumbnail if exists
        if (fs.existsSync(thumbnailPath)) {
          fs.unlinkSync(thumbnailPath);
        }
      }
    });
    
    if (fileDeleted) {
      res.json({
        success: true,
        message: 'File deleted successfully'
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'File not found',
        error: 'FILE_NOT_FOUND'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete file',
      error: error.message
    });
  }
});

// Get file info
router.get('/:filename', (req, res) => {
  const { filename } = req.params;
  const uploadDir = path.join(__dirname, '../../uploads');
  
  try {
    const categories = ['images', 'videos', 'audio', 'documents', 'others'];
    
    for (const category of categories) {
      const filePath = path.join(uploadDir, category, filename);
      if (fs.existsSync(filePath)) {
        const stats = fs.statSync(filePath);
        return res.json({
          success: true,
          file: {
            id: filename,
            name: filename,
            size: stats.size,
            type: category,
            url: `/uploads/${category}/${filename}`,
            createdAt: stats.birthtime,
            updatedAt: stats.mtime
          }
        });
      }
    }
    
    res.status(404).json({
      success: false,
      message: 'File not found',
      error: 'FILE_NOT_FOUND'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve file info',
      error: error.message
    });
  }
});

module.exports = router;
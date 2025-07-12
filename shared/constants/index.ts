export const API_ENDPOINTS = {
  UPLOAD: '/api/upload',
  FILES: '/api/files',
  AUTH: '/api/auth',
  USER: '/api/user',
} as const;

export const UPLOAD_CONFIG = {
  MAX_FILE_SIZE: 50 * 1024 * 1024, // 50MB
  MAX_FILES: 10,
  ALLOWED_TYPES: [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
    'application/pdf',
    'text/plain',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'video/mp4',
    'video/quicktime',
    'audio/mpeg',
    'audio/wav',
  ],
  CHUNK_SIZE: 1024 * 1024, // 1MB chunks
} as const;

export const STATUS_CODES = {
  SUCCESS: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  PAYLOAD_TOO_LARGE: 413,
  INTERNAL_SERVER_ERROR: 500,
} as const;

export const MESSAGES = {
  UPLOAD_SUCCESS: 'File uploaded successfully',
  UPLOAD_FAILED: 'File upload failed',
  INVALID_FILE_TYPE: 'Invalid file type',
  FILE_TOO_LARGE: 'File size exceeds limit',
  NETWORK_ERROR: 'Network error occurred',
  UNAUTHORIZED: 'Unauthorized access',
  SERVER_ERROR: 'Server error occurred',
} as const;

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_DATA: 'user_data',
  UPLOAD_QUEUE: 'upload_queue',
  SETTINGS: 'app_settings',
} as const;

export const PLATFORMS = {
  IOS: 'ios',
  ANDROID: 'android',
  DESKTOP: 'desktop',
  WEB: 'web',
} as const;
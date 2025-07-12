export interface UploadFile {
  id: string;
  name: string;
  size: number;
  type: string;
  url?: string;
  uploadProgress?: number;
  uploadStatus: 'pending' | 'uploading' | 'completed' | 'failed';
  createdAt: Date;
  updatedAt: Date;
}

export interface UploadResponse {
  success: boolean;
  message: string;
  file?: UploadFile;
  error?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: User;
  token?: string;
  error?: string;
}

export interface ApiError {
  message: string;
  status: number;
  code?: string;
}

export interface UploadConfig {
  maxFileSize: number;
  allowedTypes: string[];
  maxFiles: number;
  endpoint: string;
}

export interface ProgressCallback {
  (progress: number, file: UploadFile): void;
}

export interface UploadOptions {
  onProgress?: ProgressCallback;
  onComplete?: (file: UploadFile) => void;
  onError?: (error: ApiError) => void;
}
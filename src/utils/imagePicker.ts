// src/utils/imagePicker.ts

import {Alert, PermissionsAndroid, Platform} from 'react-native';
import {
  ImagePickerResponse,
  launchImageLibrary,
  launchCamera,
  MediaType,
  ImageLibraryOptions,
  CameraOptions,
} from 'react-native-image-picker';

export interface PickedImage {
  uri: string;
  fileName: string;
  fileSize: number;
  type: string;
  width?: number;
  height?: number;
  // New fields for uploaded images
  relativePath?: string;
  viewUrl?: string;
  isUploaded?: boolean;
}

export interface ImagePickerResult {
  success: boolean;
  images?: PickedImage[];
  error?: string;
}

export interface UploadedImageResult {
  success: boolean;
  relativePath?: string;
  viewUrl?: string;
  error?: string;
}

const API_BASE_URL = 'https://dev.surf.mt';
const API_AUTH_HEADER =
  'Basic YWRtaW5Ac3VyZi5tdDpOOW9aMnlXMzc3cEg1VTExNTFiY3YyZlYyNDYySTk1NA==';

// Optimized upload function that directly uses the working method
export const uploadImageToServer = async (
  imageUri: string,
  fileName: string,
  mimeType?: string,
): Promise<UploadedImageResult> => {
  try {
    console.log('🚀 Uploading image:', {fileName, mimeType});

    const detectedMimeType = mimeType || getMimeTypeFromExtension(fileName);
    const formData = new FormData();

    // Add the file
    formData.append('file', {
      uri: imageUri,
      type: detectedMimeType,
      name: fileName,
    } as any);

    // Add required parameters that make the API work
    formData.append('lang_code', 'en');
    formData.append('type', 'product_image');

    console.log('📤 Sending request to upload API...');

    const response = await fetch(
      'https://dev.surf.mt/api.php?_d=NtSeFileUploaderApi',
      {
        method: 'POST',
        headers: {
          Authorization: API_AUTH_HEADER,
        },
        body: formData,
      },
    );

    const responseText = await response.text();
    console.log(
      '📥 Upload response:',
      response.status,
      responseText.substring(0, 200) + '...',
    );

    if (!response.ok) {
      return {
        success: false,
        error: `HTTP ${response.status}: ${responseText}`,
      };
    }

    const responseData = JSON.parse(responseText);

    if (responseData.result && responseData.file_data) {
      const {relative_path, view_url} = responseData.file_data;

      console.log('✅ Upload successful:', {
        fileName,
        relativePath: relative_path,
        viewUrl: view_url,
      });

      return {
        success: true,
        relativePath: relative_path,
        viewUrl: view_url,
      };
    } else {
      console.log('❌ Upload failed:', responseData);
      return {
        success: false,
        error: responseData.message || 'Upload failed - no file data returned',
      };
    }
  } catch (error: any) {
    console.error('💥 Upload error:', error);
    return {
      success: false,
      error: `Upload error: ${error.message}`,
    };
  }
};

// Original upload method
const uploadImageOriginal = async (
  imageUri: string,
  fileName: string,
  mimeType?: string,
): Promise<UploadedImageResult> => {
  const detectedMimeType = mimeType || getMimeTypeFromExtension(fileName);

  const formData = new FormData();
  formData.append('file', {
    uri: imageUri,
    type: detectedMimeType,
    name: fileName,
  } as any);

  const uploadUrl = 'https://dev.surf.mt/api.php?_d=NtSeFileUploaderApi';

  const response = await fetch(uploadUrl, {
    method: 'POST',
    headers: {
      Authorization: API_AUTH_HEADER,
    },
    body: formData,
  });

  const responseText = await response.text();
  console.log('Original method response:', response.status, responseText);

  if (!response.ok) {
    throw new Error(
      `HTTP ${response.status}: ${response.statusText} - ${responseText}`,
    );
  }

  const responseData = JSON.parse(responseText);

  if (
    responseData.result === true ||
    responseData.result === 'true' ||
    responseData.result === 1
  ) {
    return {
      success: true,
      relativePath: responseData.relative_path,
      viewUrl:
        responseData.view_url ||
        `https://dev.surf.mt/${responseData.relative_path}`,
    };
  } else {
    throw new Error(
      responseData.message || responseData.error || 'Upload failed',
    );
  }
};

// Test API endpoint availability
const testAPIEndpoint = async (): Promise<{
  success: boolean;
  status?: number;
  error?: string;
  response?: string;
}> => {
  try {
    console.log('Testing API endpoint availability...');

    const response = await fetch(
      'https://dev.surf.mt/api.php?_d=NtSeFileUploaderApi',
      {
        method: 'GET', // First test with GET to see if endpoint exists
        headers: {
          Authorization: API_AUTH_HEADER,
        },
      },
    );

    const responseText = await response.text();

    console.log('Test GET Response:', {
      status: response.status,
      statusText: response.statusText,
      responseText: responseText.substring(0, 200),
    });

    return {
      success: response.status !== 404,
      status: response.status,
      response: responseText,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
};

// Using XMLHttpRequest (more similar to curl)
const uploadImageWithXHR = async (
  imageUri: string,
  fileName: string,
  mimeType?: string,
): Promise<UploadedImageResult> => {
  return new Promise(resolve => {
    try {
      console.log('Uploading with XHR method:', {imageUri, fileName, mimeType});

      const xhr = new XMLHttpRequest();
      const formData = new FormData();

      const detectedMimeType = mimeType || getMimeTypeFromExtension(fileName);

      formData.append('file', {
        uri: imageUri,
        type: detectedMimeType,
        name: fileName,
      } as any);

      xhr.open(
        'POST',
        'https://dev.surf.mt/api.php?_d=NtSeFileUploaderApi',
        true,
      );
      xhr.setRequestHeader('Authorization', API_AUTH_HEADER);

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          console.log('XHR Response status:', xhr.status);
          console.log('XHR Response text:', xhr.responseText);

          if (xhr.status === 200) {
            try {
              const responseData = JSON.parse(xhr.responseText);
              if (responseData.result) {
                resolve({
                  success: true,
                  relativePath: responseData.relative_path,
                  viewUrl:
                    responseData.view_url ||
                    `https://dev.surf.mt/${responseData.relative_path}`,
                });
              } else {
                resolve({
                  success: false,
                  error: responseData.message || 'Upload failed',
                });
              }
            } catch (parseError) {
              resolve({
                success: false,
                error: `Parse error: ${xhr.responseText}`,
              });
            }
          } else {
            resolve({
              success: false,
              error: `XHR HTTP ${xhr.status}: ${xhr.statusText}`,
            });
          }
        }
      };

      xhr.onerror = function () {
        resolve({
          success: false,
          error: 'XHR Network error',
        });
      };

      xhr.send(formData);
    } catch (error) {
      resolve({
        success: false,
        error: `XHR Setup error: ${error.message}`,
      });
    }
  });
};

// Try with different URL format
const uploadWithAlternativeURL = async (
  imageUri: string,
  fileName: string,
  mimeType?: string,
): Promise<UploadedImageResult> => {
  try {
    console.log('Trying alternative URL format...');

    const detectedMimeType = mimeType || getMimeTypeFromExtension(fileName);
    const formData = new FormData();

    formData.append('file', {
      uri: imageUri,
      type: detectedMimeType,
      name: fileName,
    } as any);

    // Try different URL formats
    const urlsToTry = [
      'https://dev.surf.mt/api.php?_d=NtSeFileUploaderApi',
      'https://dev.surf.mt/2.0/api/api.php?_d=NtSeFileUploaderApi',
      'https://dev.surf.mt/api/api.php?_d=NtSeFileUploaderApi',
    ];

    for (const url of urlsToTry) {
      console.log(`Trying URL: ${url}`);

      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            Authorization: API_AUTH_HEADER,
          },
          body: formData,
        });

        console.log(
          `Response for ${url}:`,
          response.status,
          response.statusText,
        );

        if (response.status !== 404 && response.status !== 405) {
          const responseText = await response.text();
          console.log(`Response text for ${url}:`, responseText);

          if (response.ok) {
            try {
              const responseData = JSON.parse(responseText);
              if (responseData.result) {
                return {
                  success: true,
                  relativePath: responseData.relative_path,
                  viewUrl:
                    responseData.view_url ||
                    `https://dev.surf.mt/${responseData.relative_path}`,
                };
              }
            } catch (parseError) {
              // Continue to next URL
            }
          }
        }
      } catch (urlError) {
        console.log(`Error with ${url}:`, urlError.message);
        // Continue to next URL
      }
    }

    return {
      success: false,
      error: 'All URL formats failed',
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
};

// Upload with additional parameters (in case they're required)
const uploadWithParameters = async (
  imageUri: string,
  fileName: string,
  mimeType?: string,
): Promise<UploadedImageResult> => {
  try {
    console.log('Trying upload with additional parameters...');

    const detectedMimeType = mimeType || getMimeTypeFromExtension(fileName);
    const formData = new FormData();

    formData.append('file', {
      uri: imageUri,
      type: detectedMimeType,
      name: fileName,
    } as any);

    // Add required parameters that make this method work
    formData.append('lang_code', 'en');
    formData.append('type', 'product_image');

    const response = await fetch(
      'https://dev.surf.mt/api.php?_d=NtSeFileUploaderApi',
      {
        method: 'POST',
        headers: {
          Authorization: API_AUTH_HEADER,
        },
        body: formData,
      },
    );

    const responseText = await response.text();
    console.log('Upload with params response:', response.status, responseText);

    if (response.ok) {
      try {
        const responseData = JSON.parse(responseText);
        console.log('Parsed upload response:', responseData);

        if (responseData.result) {
          // Handle the correct response structure from your logs
          const fileData = responseData.file_data;

          return {
            success: true,
            relativePath: fileData?.relative_path || responseData.relative_path,
            viewUrl:
              fileData?.view_url ||
              responseData.view_url ||
              `https://dev.surf.mt/${fileData?.relative_path}`,
          };
        } else {
          return {
            success: false,
            error: responseData.message || 'Upload failed with parameters',
          };
        }
      } catch (parseError) {
        console.error('Parse error with parameters:', parseError);
        return {
          success: false,
          error: `Parse error with parameters: ${responseText}`,
        };
      }
    } else {
      return {
        success: false,
        error: `HTTP ${response.status} with parameters: ${responseText}`,
      };
    }
  } catch (error) {
    console.error('Parameter method error:', error);
    return {
      success: false,
      error: `Parameter method error: ${error.message}`,
    };
  }
};
export const uploadMultipleImages = async (
  images: PickedImage[],
  onProgress?: (current: number, total: number) => void,
): Promise<{
  success: boolean;
  uploadedImages: PickedImage[];
  errors: string[];
}> => {
  const uploadedImages: PickedImage[] = [];
  const errors: string[] = [];

  for (let i = 0; i < images.length; i++) {
    const image = images[i];

    if (onProgress) {
      onProgress(i, images.length); // Start at 0 for current image
    }

    try {
      const uploadResult = await uploadImageToServer(
        image.uri,
        image.fileName,
        image.type,
      );

      if (uploadResult.success) {
        uploadedImages.push({
          ...image,
          relativePath: uploadResult.relativePath,
          viewUrl: uploadResult.viewUrl,
          isUploaded: true,
        });
        console.log(`Successfully uploaded ${image.fileName}`);
      } else {
        const errorMsg = `Failed to upload ${image.fileName}: ${uploadResult.error}`;
        console.error(errorMsg);
        errors.push(errorMsg);
      }
    } catch (error) {
      const errorMsg = `Error uploading ${image.fileName}: ${error.message}`;
      console.error(errorMsg);
      errors.push(errorMsg);
    }

    // Update progress after each upload
    if (onProgress) {
      onProgress(i + 1, images.length);
    }
  }

  console.log('Upload summary:', {
    totalImages: images.length,
    successful: uploadedImages.length,
    failed: errors.length,
  });

  return {
    success: uploadedImages.length > 0,
    uploadedImages,
    errors,
  };
};

// Request camera permission for Android
const requestCameraPermission = async (): Promise<boolean> => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'App needs camera permission to take photos',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  }
  return true;
};

// Pick images from gallery
export const pickImagesFromGallery = async (
  options: {
    multiple?: boolean;
    quality?: number;
    maxWidth?: number;
    maxHeight?: number;
  } = {},
): Promise<ImagePickerResult> => {
  return new Promise(resolve => {
    const {
      multiple = true,
      quality = 0.8,
      maxWidth = 1024,
      maxHeight = 1024,
    } = options;

    const imageLibraryOptions: ImageLibraryOptions = {
      mediaType: 'photo' as MediaType,
      includeBase64: false,
      selectionLimit: multiple ? 10 : 1,
      quality,
      maxWidth,
      maxHeight,
    };

    launchImageLibrary(imageLibraryOptions, (response: ImagePickerResponse) => {
      if (response.didCancel) {
        resolve({success: false, error: 'User cancelled image selection'});
        return;
      }

      if (response.errorMessage) {
        resolve({success: false, error: response.errorMessage});
        return;
      }

      if (response.assets && response.assets.length > 0) {
        const images: PickedImage[] = response.assets
          .filter(asset => asset.uri)
          .map(asset => ({
            uri: asset.uri!,
            fileName: asset.fileName || `image_${Date.now()}.jpg`,
            fileSize: asset.fileSize || 0,
            type: asset.type || 'image/jpeg',
            width: asset.width,
            height: asset.height,
            isUploaded: false,
          }));

        resolve({success: true, images});
      } else {
        resolve({success: false, error: 'No images selected'});
      }
    });
  });
};

// Take photo with camera
export const takePhotoWithCamera = async (
  options: {
    quality?: number;
    maxWidth?: number;
    maxHeight?: number;
  } = {},
): Promise<ImagePickerResult> => {
  const hasPermission = await requestCameraPermission();

  if (!hasPermission) {
    return {
      success: false,
      error: 'Camera permission denied',
    };
  }

  return new Promise(resolve => {
    const {quality = 0.8, maxWidth = 1024, maxHeight = 1024} = options;

    const cameraOptions: CameraOptions = {
      mediaType: 'photo' as MediaType,
      includeBase64: false,
      quality,
      maxWidth,
      maxHeight,
    };

    launchCamera(cameraOptions, (response: ImagePickerResponse) => {
      if (response.didCancel) {
        resolve({success: false, error: 'User cancelled camera'});
        return;
      }

      if (response.errorMessage) {
        resolve({success: false, error: response.errorMessage});
        return;
      }

      if (response.assets && response.assets.length > 0) {
        const asset = response.assets[0];
        if (asset.uri) {
          const image: PickedImage = {
            uri: asset.uri,
            fileName: asset.fileName || `photo_${Date.now()}.jpg`,
            fileSize: asset.fileSize || 0,
            type: asset.type || 'image/jpeg',
            width: asset.width,
            height: asset.height,
            isUploaded: false,
          };

          resolve({success: true, images: [image]});
        } else {
          resolve({success: false, error: 'No image captured'});
        }
      } else {
        resolve({success: false, error: 'No image captured'});
      }
    });
  });
};

// Format file size for display
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
};

// Get file extension from filename or URI
export const getFileExtension = (filename: string): string => {
  return filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2);
};

// Get MIME type from file extension
export const getMimeTypeFromExtension = (filename: string): string => {
  const extension = getFileExtension(filename).toLowerCase();
  const mimeTypes: Record<string, string> = {
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    gif: 'image/gif',
    webp: 'image/webp',
  };
  return mimeTypes[extension] || 'image/jpeg';
};

// Validate image file
export const validateImage = (
  image: PickedImage,
): {valid: boolean; error?: string} => {
  // Check file size (limit to 10MB)
  const maxSize = 10 * 1024 * 1024; // 10MB
  if (image.fileSize > maxSize) {
    return {
      valid: false,
      error: `File size too large. Maximum ${formatFileSize(maxSize)} allowed.`,
    };
  }

  // Check file type
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
  if (!allowedTypes.includes(image.type.toLowerCase())) {
    return {
      valid: false,
      error: 'Unsupported file type. Please select JPG, PNG, or GIF images.',
    };
  }

  return {valid: true};
};

// Show image source selection alert
export const showImageSourceAlert = (): Promise<
  'gallery' | 'camera' | 'cancel'
> => {
  return new Promise(resolve => {
    Alert.alert(
      'Select Image Source',
      'Choose how you want to add images',
      [
        {
          text: 'Gallery',
          onPress: () => resolve('gallery'),
        },
        {
          text: 'Camera',
          onPress: () => resolve('camera'),
        },
        {
          text: 'Cancel',
          onPress: () => resolve('cancel'),
          style: 'cancel',
        },
      ],
      {cancelable: true, onDismiss: () => resolve('cancel')},
    );
  });
};

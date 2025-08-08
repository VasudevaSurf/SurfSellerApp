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
}

export interface ImagePickerResult {
  success: boolean;
  images?: PickedImage[];
  error?: string;
}

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

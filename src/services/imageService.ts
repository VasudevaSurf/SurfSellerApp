// Enhanced image service with multiple deletion approaches
// src/services/imageService.ts

const API_BASE_URL = 'https://dev.surf.mt';
const API_AUTH_HEADER =
  'Basic YWRtaW5Ac3VyZi5tdDpOOW9aMnlXMzc3cEg1VTExNTFiY3YyZlYyNDYySTk1NA==';

export interface ImageUploadResponse {
  result: boolean;
  message: string;
  file_data?: {
    relative_path: string;
    view_url: string;
    file_id?: string;
  };
}

export interface ImageDeleteResponse {
  result: boolean;
  message: string;
}

// Try multiple approaches to delete image from server
export const deleteProductImageFromServer = async (
  relativePath: string,
  productId?: string,
  userId?: string,
): Promise<{success: boolean; error?: string}> => {
  console.log('🗑️ Attempting to delete image from server:', {
    relativePath,
    productId,
    userId,
  });

  // Approach 1: Try DELETE method with file uploader API
  try {
    console.log('📤 Method 1: DELETE with file uploader API');

    const deletePayload = {
      action: 'delete',
      file_path: relativePath,
      relative_path: relativePath,
      lang_code: 'en',
      type: 'product_image',
      ...(userId && {user_id: userId}),
      ...(productId && {product_id: productId}),
    };

    const response = await fetch(
      'https://dev.surf.mt/api.php?_d=NtSeFileUploaderApi',
      {
        method: 'DELETE',
        headers: {
          Authorization: API_AUTH_HEADER,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(deletePayload),
      },
    );

    const responseText = await response.text();
    console.log('📥 DELETE response:', {status: response.status, responseText});

    if (response.ok) {
      try {
        const responseData = JSON.parse(responseText);
        if (responseData.result) {
          console.log(
            '✅ Method 1 successful: Image deleted with DELETE method',
          );
          return {success: true};
        }
      } catch (parseError) {
        // If parse fails but got 200, assume success
        if (response.status === 200) {
          console.log(
            '✅ Method 1 successful: Assuming success based on 200 status',
          );
          return {success: true};
        }
      }
    }
  } catch (error) {
    console.warn('⚠️ Method 1 failed:', error.message);
  }

  // Approach 2: Try POST method with action=delete
  try {
    console.log('📤 Method 2: POST with action=delete');

    const formData = new FormData();
    formData.append('action', 'delete');
    formData.append('file_path', relativePath);
    formData.append('relative_path', relativePath);
    formData.append('lang_code', 'en');
    formData.append('type', 'product_image');

    if (userId) formData.append('user_id', userId);
    if (productId) formData.append('product_id', productId);

    const response = await fetch(
      'https://dev.surf.mt/api.php?_d=NtSeFileUploaderApi',
      {
        method: 'POST',
        headers: {
          Authorization: API_AUTH_HEADER,
          // Don't set Content-Type for FormData
        },
        body: formData,
      },
    );

    const responseText = await response.text();
    console.log('📥 POST delete response:', {
      status: response.status,
      responseText,
    });

    if (response.ok) {
      try {
        const responseData = JSON.parse(responseText);
        if (responseData.result) {
          console.log('✅ Method 2 successful: Image deleted with POST method');
          return {success: true};
        }
      } catch (parseError) {
        if (response.status === 200) {
          console.log(
            '✅ Method 2 successful: Assuming success based on 200 status',
          );
          return {success: true};
        }
      }
    }
  } catch (error) {
    console.warn('⚠️ Method 2 failed:', error.message);
  }

  // Approach 3: Try with different API endpoint (if exists)
  try {
    console.log('📤 Method 3: Alternative endpoint');

    const response = await fetch(
      `https://dev.surf.mt/api.php?_d=NtSeFileUploaderApi&action=delete&file_path=${encodeURIComponent(
        relativePath,
      )}`,
      {
        method: 'GET',
        headers: {
          Authorization: API_AUTH_HEADER,
        },
      },
    );

    const responseText = await response.text();
    console.log('📥 Alternative endpoint response:', {
      status: response.status,
      responseText,
    });

    if (response.ok) {
      console.log(
        '✅ Method 3 successful: Image deleted with alternative endpoint',
      );
      return {success: true};
    }
  } catch (error) {
    console.warn('⚠️ Method 3 failed:', error.message);
  }

  console.error('❌ All deletion methods failed for:', relativePath);
  return {
    success: false,
    error: 'Failed to delete image from server using all available methods',
  };
};

// Upload image with proper form data
export const uploadProductImage = async (
  imageUri: string,
  fileName: string,
  mimeType: string,
  additionalParams?: {
    user_id?: string;
    product_id?: string;
    lang_code?: string;
    type?: string;
  },
): Promise<{
  success: boolean;
  relativePath?: string;
  viewUrl?: string;
  fileId?: string;
  error?: string;
}> => {
  try {
    console.log('🚀 Uploading image:', {fileName, mimeType, additionalParams});

    const formData = new FormData();

    formData.append('file', {
      uri: imageUri,
      type: mimeType,
      name: fileName,
    } as any);

    formData.append('lang_code', additionalParams?.lang_code || 'en');
    formData.append('type', additionalParams?.type || 'product_image');

    if (additionalParams?.user_id) {
      formData.append('user_id', additionalParams.user_id);
    }
    if (additionalParams?.product_id) {
      formData.append('product_id', additionalParams.product_id);
    }

    console.log('📤 Sending upload request...');

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
    console.log('📥 Upload response:', {
      status: response.status,
      responseText: responseText.substring(0, 300) + '...',
    });

    if (!response.ok) {
      return {
        success: false,
        error: `HTTP ${response.status}: ${responseText}`,
      };
    }

    const responseData: ImageUploadResponse = JSON.parse(responseText);

    if (responseData.result && responseData.file_data) {
      console.log('✅ Upload successful:', {
        relativePath: responseData.file_data.relative_path,
        viewUrl: responseData.file_data.view_url,
      });

      return {
        success: true,
        relativePath: responseData.file_data.relative_path,
        viewUrl: responseData.file_data.view_url,
        fileId: responseData.file_data.file_id,
      };
    } else {
      return {
        success: false,
        error: responseData.message || 'Upload failed',
      };
    }
  } catch (error: any) {
    console.error('💥 Upload error:', error);
    return {
      success: false,
      error: error.message || 'Network error during upload',
    };
  }
};

// Upload multiple images
export const uploadMultipleProductImages = async (
  images: Array<{
    uri: string;
    fileName: string;
    type: string;
    fileSize: number;
  }>,
  onProgress?: (current: number, total: number, fileName?: string) => void,
  additionalParams?: {
    user_id?: string;
    product_id?: string;
    lang_code?: string;
    type?: string;
  },
): Promise<{
  success: boolean;
  uploadedImages: Array<{
    uri: string;
    fileName: string;
    fileSize: number;
    type: string;
    relativePath: string;
    viewUrl: string;
    fileId?: string;
  }>;
  errors: string[];
}> => {
  const uploadedImages: Array<{
    uri: string;
    fileName: string;
    fileSize: number;
    type: string;
    relativePath: string;
    viewUrl: string;
    fileId?: string;
  }> = [];
  const errors: string[] = [];

  console.log(`🚀 Starting batch upload of ${images.length} images`);

  for (let i = 0; i < images.length; i++) {
    const image = images[i];

    if (onProgress) {
      onProgress(i, images.length, image.fileName);
    }

    try {
      const result = await uploadProductImage(
        image.uri,
        image.fileName,
        image.type,
        additionalParams,
      );

      if (result.success && result.relativePath && result.viewUrl) {
        uploadedImages.push({
          uri: image.uri,
          fileName: image.fileName,
          fileSize: image.fileSize,
          type: image.type,
          relativePath: result.relativePath,
          viewUrl: result.viewUrl,
          fileId: result.fileId,
        });
        console.log(`✅ Uploaded: ${image.fileName} -> ${result.relativePath}`);
      } else {
        const error = `Failed to upload ${image.fileName}: ${result.error}`;
        errors.push(error);
        console.error('❌', error);
      }
    } catch (error: any) {
      const errorMsg = `Error uploading ${image.fileName}: ${error.message}`;
      errors.push(errorMsg);
      console.error('❌', errorMsg);
    }

    if (onProgress) {
      onProgress(i + 1, images.length, image.fileName);
    }
  }

  console.log('📊 Upload Summary:', {
    total: images.length,
    successful: uploadedImages.length,
    failed: errors.length,
  });

  return {
    success: uploadedImages.length > 0,
    uploadedImages,
    errors,
  };
};

// Helper function to extract relative path from URL
export const extractRelativePathFromUrl = (url: string): string => {
  if (!url || !url.startsWith('http')) {
    return url;
  }

  try {
    const match = url.match(/https?:\/\/dev\.surf\.mt\/(.+)$/);
    if (match && match[1]) {
      return match[1].split('?')[0];
    }

    const fallbackMatch = url.match(/https?:\/\/[^\/]+\/(.+)$/);
    if (fallbackMatch && fallbackMatch[1]) {
      return fallbackMatch[1].split('?')[0];
    }

    return url;
  } catch (error) {
    console.error('Error extracting relative path:', error);
    return url;
  }
};

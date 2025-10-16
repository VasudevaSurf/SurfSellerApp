// Enhanced image service with product-specific deletion
const API_BASE_URL = 'https://surf.mt';
const API_AUTH_HEADER =
  'Basic YWRtaW5Ac3VyZi5tdDpSMlZXbjE2N1VaUFc2Y3VLNDEwMWdCMTM2UTk0UFQ2SA==';

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

export interface UploadedImageData {
  uri: string;
  fileName: string;
  fileSize: number;
  type: string;
  relativePath: string;
  viewUrl: string;
  fileId?: string;
  // NEW: Image pair data for deletion
  pairId?: string;
  detailedId?: string;
  isMainPair?: boolean;
}

// Extract image pair information from API response
export const extractImagePairData = (
  apiResponse: any,
): {pairId: string; detailedId: string; isMainPair: boolean} | null => {
  try {
    console.log('🔍 Extracting image pair data from response:', apiResponse);

    // Check for main_pair first
    if (apiResponse.main_pair) {
      const mainPair = apiResponse.main_pair;
      return {
        pairId: mainPair.pair_id?.toString() || '',
        detailedId: mainPair.detailed_id?.toString() || '',
        isMainPair: true,
      };
    }

    // Check for image_pairs
    if (
      apiResponse.image_pairs &&
      typeof apiResponse.image_pairs === 'object'
    ) {
      const pairIds = Object.keys(apiResponse.image_pairs);
      if (pairIds.length > 0) {
        const firstPairId = pairIds[0];
        const imagePair = apiResponse.image_pairs[firstPairId];
        return {
          pairId: firstPairId,
          detailedId: imagePair.detailed_id?.toString() || '',
          isMainPair: false,
        };
      }
    }

    console.warn('⚠️ Could not extract image pair data from response');
    return null;
  } catch (error) {
    console.error('❌ Error extracting image pair data:', error);
    return null;
  }
};

// Delete product image using the Products API
export const deleteProductImageFromServer = async (
  userId: string,
  productId: string,
  imagePairData: {
    pairId: string;
    detailedId: string;
    isMainPair?: boolean;
  },
): Promise<{success: boolean; error?: string}> => {
  try {
    console.log('🗑️ Deleting product image via Products API:', {
      userId,
      productId,
      imagePairData,
    });

    const imageObject = {
      pair_id: imagePairData.pairId,
      detailed_id: imagePairData.detailedId,
      object_id: productId,
    };

    const requestData: any = {
      user_id: userId,
      delete_image: 1,
      product_data: {
        product_id: productId,
        lang_code: 'en',
      },
    };

    if (imagePairData.isMainPair) {
      requestData.product_data.main_pair = {
        ...imageObject,
        image_id: 0,
        position: 0,
        object_type: 'product',
        detailed: {
          object_id: productId,
          object_type: 'product',
          type: 'M',
        },
      };
    } else {
      requestData.product_data.image_pairs = {
        [imagePairData.pairId]: imageObject,
      };
    }

    console.log(
      '📤 Delete request payload:',
      JSON.stringify(requestData, null, 2),
    );

    const response = await fetch(
      `${API_BASE_URL}/api.php?_d=NtSeProductsApi&user_id=${userId}`, // Uses API_BASE_URL
      {
        method: 'POST',
        headers: {
          Authorization: API_AUTH_HEADER,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      },
    );

    const responseText = await response.text();
    console.log('📥 Delete response:', {status: response.status, responseText});

    if (response.ok) {
      try {
        const responseData = JSON.parse(responseText);
        if (responseData.result) {
          console.log('✅ Image deleted successfully via Products API');
          return {success: true};
        } else {
          return {
            success: false,
            error: responseData.message || 'Failed to delete image',
          };
        }
      } catch (parseError) {
        if (response.status === 200) {
          console.log('✅ Assuming success based on 200 status');
          return {success: true};
        }
        return {success: false, error: 'Invalid response format'};
      }
    }

    return {
      success: false,
      error: `HTTP ${response.status}: Failed to delete image`,
    };
  } catch (error: any) {
    console.error('❌ Delete image error:', error);
    return {
      success: false,
      error: error.message || 'Network error during deletion',
    };
  }
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
      'https://surf.mt/api.php?_d=NtSeFileUploaderApi', // UPDATED
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
  uploadedImages: UploadedImageData[];
  errors: string[];
}> => {
  const uploadedImages: UploadedImageData[] = [];
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
    // Specific pattern for surf.mt URLs (UPDATED)
    // Example: https://surf.mt/images/detailed/123/image.jpg -> images/detailed/123/image.jpg
    const surfPattern = /https?:\/\/surf\.mt\/(.+)$/; // UPDATED
    const match = url.match(surfPattern);

    if (match && match[1]) {
      const relativePath = match[1].split('?')[0];
      console.log(`✅ Extracted relative path: ${url} -> ${relativePath}`);
      return relativePath;
    }

    // Fallback: try general pattern
    const generalPattern = /https?:\/\/[^\/]+\/(.+)$/;
    const generalMatch = url.match(generalPattern);

    if (generalMatch && generalMatch[1]) {
      const relativePath = generalMatch[1].split('?')[0];
      console.log(`✅ Extracted with fallback: ${url} -> ${relativePath}`);
      return relativePath;
    }

    console.warn(
      '⚠️ Could not extract relative path, returning original URL:',
      url,
    );
    return url;
  } catch (error) {
    console.error('❌ Error extracting relative path:', error);
    return url;
  }
};

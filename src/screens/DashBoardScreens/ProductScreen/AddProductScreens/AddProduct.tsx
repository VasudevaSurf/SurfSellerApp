import React, {useState, useEffect} from 'react';
import {ScrollView, View, Alert} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useRoute, RouteProp} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import ArrowLeftIcon from '../../../../assets/icons/ArrowLeftIcon';
import {
  Button,
  ButtonSize,
  ButtonState,
  ButtonVariant,
} from '../../../../components/UserComponents/Button';
import {Header} from '../../../../components/UserComponents/Header/Header';
import {TypographyVariant} from '../../../../components/UserComponents/Typography/Typography.types';
import {ColorPalette} from '../../../../config/colorPalette';
import {getScreenHeight} from '../../../../helpers/screenSize';
import {goBack} from '../../../../navigation/utils/navigationRef';
import {styles} from './AddProduct.styles';
import FeaturesStep from './ProgressStepperPages/FeaturesStepPages/FeaturesStep';
import InventoryStep from './ProgressStepperPages/InventoryStepPages/InventoryStep';
import ProductInfoStep from './ProgressStepperPages/ProductInfoPages/ProductInfoStep';
import ProgressStepper from './ProgressStepperPages/ProgressStepper';
import UploadMediaStep from './ProgressStepperPages/UploadMediaPages/UploadMediaStep';
import ArrowLeft from '../../../../assets/icons/ArrowLeft';
import {RootState} from '../../../../redux/store';
import {
  createProductApi,
  updateProductApi,
  transformFormDataToApiFormat,
} from '../../../../services/apiService';
import {useCategories} from '../../../../hooks/useCategories';

const STEPS = [
  {id: 1, label: 'Product Info'},
  {id: 2, label: 'Upload Media'},
  {id: 3, label: 'Inventory'},
  {id: 4, label: 'Variant(s)'},
];

interface RouteParams {
  productId?: string;
  editMode?: boolean;
  productData?: {
    productId?: string;
    productName: string;
    price: string;
    category: string;
    subcategory?: string;
    description: string;
    images: string[];
    imageRelativePaths?: string[];
    productCode: string;
    quantity: string;
    minQuantity: string;
    maxQuantity: string;
    trackInventory: boolean;
    taxType: string;
    brand: string;
    color: string;
    size: string;
    weight: string;
    manufacturer: string;
    countryOfOrigin: string;
    status?: string;
    categoryPath?: string[];
  };
}

type AddProductRouteProp = RouteProp<{AddProduct: RouteParams}, 'AddProduct'>;

// Define the complete form data interface
interface FormData {
  productId: string;
  productName: string;
  price: string;
  category: string;
  subcategory: string;
  description: string;
  images: string[];
  imageRelativePaths: string[]; // For API relative paths
  productCode: string;
  quantity: string;
  minQuantity: string;
  maxQuantity: string;
  trackInventory: boolean;
  taxType: string;
  brand: string;
  color: string;
  size: string;
  weight: string;
  manufacturer: string;
  countryOfOrigin: string;
  categoryPath: string[];
  categoryDisplay?: string;
}

const AddProduct = () => {
  const route = useRoute<AddProductRouteProp>();
  const {productId, editMode = false, productData} = route.params || {};

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [originalImages, setOriginalImages] = useState<string[]>([]); // Track original images

  // Get userId from Redux store
  const userId = useSelector(
    (state: RootState) => state.auth.userData?.user_id,
  );

  // Use categories hook to get available categories
  const {categories} = useCategories();

  // Initialize formData with all required fields and proper defaults
  const [formData, setFormData] = useState<FormData>({
    productId: productId || '',
    productName: '',
    price: '',
    category: '',
    subcategory: '',
    description: '',
    images: [],
    imageRelativePaths: [],
    productCode: '',
    quantity: '',
    minQuantity: '',
    maxQuantity: '',
    trackInventory: false,
    taxType: 'VAT',
    brand: '',
    color: '',
    size: '',
    weight: '',
    manufacturer: '',
    countryOfOrigin: '',
    categoryPath: [],
    categoryDisplay: '',
  });

  // Pre-fill form data if in edit mode
  useEffect(() => {
    if (editMode && productData) {
      console.log('🔄 Loading product data for editing:', productData);

      // Store original images for comparison
      const originalImageList = Array.isArray(productData.images)
        ? productData.images
        : [];
      setOriginalImages(originalImageList);

      setFormData(prevData => ({
        ...prevData,
        productId: productData.productId || productId || '',
        productName: productData.productName || '',
        price: productData.price || '',
        category: productData.category || '',
        subcategory: productData.subcategory || '',
        description: productData.description || '',
        images: originalImageList,
        imageRelativePaths: Array.isArray(productData.imageRelativePaths)
          ? productData.imageRelativePaths
          : [],
        productCode: productData.productCode || '',
        quantity: productData.quantity || '',
        minQuantity: productData.minQuantity || '',
        maxQuantity: productData.maxQuantity || '',
        trackInventory: Boolean(productData.trackInventory),
        taxType: productData.taxType || 'VAT',
        brand: productData.brand || '',
        color: productData.color || '',
        size: productData.size || '',
        weight: productData.weight || '',
        manufacturer: productData.manufacturer || '',
        countryOfOrigin: productData.countryOfOrigin || '',
        categoryPath: Array.isArray(productData.categoryPath)
          ? productData.categoryPath
          : [],
        categoryDisplay: productData.categoryPath
          ? productData.categoryPath.join(' > ')
          : '',
      }));
    }
  }, [editMode, productData, productId]);

  // Safe update function that preserves existing data
  const updateFormData = (newData: Partial<FormData>) => {
    console.log('📝 Updating form data:', newData);

    setFormData(prevData => {
      const updatedData = {
        ...prevData,
        ...newData,
      };

      // If categoryPath is updated, also update categoryDisplay
      if (newData.categoryPath) {
        updatedData.categoryDisplay = newData.categoryPath.join(' > ');
      }

      // Debug log for image data
      if (newData.images || newData.imageRelativePaths) {
        console.log('🖼️ Image data update:', {
          originalImages,
          currentImages: updatedData.images,
          imageRelativePaths: updatedData.imageRelativePaths,
          deletedImages: originalImages.filter(
            img => !updatedData.images.includes(img),
          ),
        });
      }

      return updatedData;
    });
  };

  // Enhanced handleSubmit with proper image deletion handling
  const debugImageState = () => {
    console.log('🔍 DEBUG: Current image state before API call:', {
      editMode,
      productId: formData.productId,

      // Original images (what we started with)
      originalImages: {
        count: originalImages.length,
        list: originalImages,
      },

      // Current form data images (what's currently shown in UI)
      formDataImages: {
        count: formData.images?.length || 0,
        list: formData.images || [],
      },

      // Uploaded image paths (new images that were uploaded)
      imageRelativePaths: {
        count: formData.imageRelativePaths?.length || 0,
        list: formData.imageRelativePaths || [],
      },

      // Comparison
      imagesRemoved: originalImages.filter(
        (img: string) => !formData.images?.includes(img),
      ),
      imagesAdded:
        formData.images?.filter(
          (img: string) => !originalImages.includes(img),
        ) || [],

      // What should be sent to API (existing images that remain + new uploads)
      shouldSendToAPI: {
        existingImages:
          formData.images?.filter(
            (img: string) =>
              img.startsWith('http') && originalImages.includes(img),
          ) || [],
        newImages:
          formData.imageRelativePaths?.filter(
            (path: string) => path && !path.startsWith('http'),
          ) || [],
      },
    });
  };

  // Updated handleSubmit with debug info
  const handleSubmit = async () => {
    // Add debug logging
    debugImageState();

    console.log('🚀 Form submitted:', {
      editMode,
      productId,
      formData: {
        productName: formData.productName,
        price: formData.price,
        originalImages: originalImages.length,
        currentImages: formData.images?.length || 0,
        newImages: formData.imageRelativePaths?.length || 0,
      },
    });

    // Validate required fields
    const requiredFields = ['productName', 'price'];
    const missingFields = requiredFields.filter(
      field => !formData[field]?.trim(),
    );

    if (missingFields.length > 0) {
      console.warn('⚠️ Missing required fields:', missingFields);
      Alert.alert(
        'Validation Error',
        `Please fill in all required fields: ${missingFields.join(', ')}`,
      );
      return;
    }

    // For edit mode: ensure we have a valid image state
    if (editMode) {
      const remainingImages = formData.images || [];
      const newUploads = formData.imageRelativePaths || [];

      console.log('📸 Edit mode image validation:', {
        remainingImages: remainingImages.length,
        newUploads: newUploads.length,
        totalImages: remainingImages.length,
      });

      // Check if new images are still uploading
      const newImageUrls = remainingImages.filter(
        (img: string) => !originalImages.includes(img),
      );

      if (newImageUrls.length > 0 && newUploads.length === 0) {
        Alert.alert(
          'Images Still Uploading',
          'Please wait for new images to finish uploading before updating the product.',
        );
        return;
      }
    }

    // For new products, check if images are properly uploaded (if any were selected)
    if (!editMode && formData.images?.length > 0) {
      if (
        !formData.imageRelativePaths ||
        formData.imageRelativePaths.length === 0
      ) {
        Alert.alert(
          'Images Not Uploaded',
          'Please wait for images to finish uploading before saving the product.',
        );
        return;
      }
    }

    if (!userId) {
      Alert.alert('Error', 'User session expired. Please login again.');
      return;
    }

    // Show loading state
    setIsSubmitting(true);

    try {
      // Transform form data to API format
      const apiData = transformFormDataToApiFormat(
        formData,
        userId,
        editMode,
        categories,
        originalImages, // Pass original images for comparison
      );

      console.log('🎯 Final API call data:', {
        method: editMode ? 'UPDATE' : 'CREATE',
        productId: apiData.product_id,
        productName: apiData.product_data.product,
        imageCount: apiData.image_pair_positon?.length || 0,
        imagePaths: apiData.image_pair_positon || [],
      });

      let result;
      if (editMode) {
        console.log('🔄 Updating existing product...');
        result = await updateProductApi(apiData);
      } else {
        console.log('✨ Creating new product...');
        result = await createProductApi(apiData);
      }

      console.log('🎉 Product operation successful:', result);

      // Show success message
      Alert.alert(
        'Success',
        editMode
          ? 'Product updated successfully!'
          : 'Product created successfully!',
        [
          {
            text: 'OK',
            onPress: () => goBack(),
          },
        ],
      );
    } catch (error: any) {
      console.error('💥 Error saving product:', error);

      Alert.alert(
        editMode ? 'Update Failed' : 'Creation Failed',
        error.message ||
          `Failed to ${
            editMode ? 'update' : 'create'
          } product. Please try again.`,
        [
          {text: 'OK', style: 'default'},
          {
            text: 'Retry',
            onPress: () => handleSubmit(),
            style: 'default',
          },
        ],
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNext = () => {
    console.log('➡️ Moving to next step from:', currentStep);
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    console.log('⬅️ Going back from step:', currentStep);
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      goBack();
    }
  };

  // const handleSubmit = async () => {
  //   console.log('🚀 Form submitted:', {
  //     editMode,
  //     productId,
  //     formData: {
  //       productName: formData.productName,
  //       price: formData.price,
  //       images: formData.images.length,
  //       relativePaths: formData.imageRelativePaths.length,
  //     },
  //   });

  //   // Validate required fields
  //   const requiredFields = ['productName', 'price'];
  //   const missingFields = requiredFields.filter(
  //     field => !formData[field]?.trim(),
  //   );

  //   if (missingFields.length > 0) {
  //     console.warn('⚠️ Missing required fields:', missingFields);
  //     Alert.alert(
  //       'Validation Error',
  //       `Please fill in all required fields: ${missingFields.join(', ')}`,
  //     );
  //     return;
  //   }

  //   // For new products, check if images are properly uploaded (if any were selected)
  //   if (!editMode && formData.images.length > 0) {
  //     if (
  //       !formData.imageRelativePaths ||
  //       formData.imageRelativePaths.length === 0
  //     ) {
  //       Alert.alert(
  //         'Images Not Uploaded',
  //         'Please wait for images to finish uploading before saving the product.',
  //       );
  //       return;
  //     }

  //     console.log('✅ Images validation passed:', {
  //       imageCount: formData.images.length,
  //       relativePathCount: formData.imageRelativePaths.length,
  //       relativePaths: formData.imageRelativePaths,
  //     });
  //   }

  //   if (!userId) {
  //     Alert.alert('Error', 'User session expired. Please login again.');
  //     return;
  //   }

  //   // Show loading state
  //   setIsSubmitting(true);

  //   try {
  //     // Transform form data to API format with enhanced image handling
  //     const apiData = transformFormDataToApiFormat(
  //       formData,
  //       userId,
  //       editMode,
  //       categories,
  //     );

  //     console.log('🎯 API Data prepared:', {
  //       product: apiData.product_data.product,
  //       price: apiData.product_data.price,
  //       imageCount: apiData.image_pair_positon?.length || 0,
  //       imagePaths: apiData.image_pair_positon || [],
  //     });

  //     let result;
  //     if (editMode) {
  //       console.log('🔄 Updating existing product...');
  //       result = await updateProductApi(apiData);
  //     } else {
  //       console.log('✨ Creating new product...');
  //       result = await createProductApi(apiData);
  //     }

  //     console.log('🎉 Product operation successful:', result);

  //     // Show success message
  //     Alert.alert(
  //       'Success',
  //       editMode
  //         ? 'Product updated successfully!'
  //         : 'Product created successfully!',
  //       [
  //         {
  //           text: 'OK',
  //           onPress: () => goBack(),
  //         },
  //       ],
  //     );
  //   } catch (error: any) {
  //     console.error('💥 Error saving product:', error);

  //     Alert.alert(
  //       editMode ? 'Update Failed' : 'Creation Failed',
  //       error.message ||
  //         `Failed to ${
  //           editMode ? 'update' : 'create'
  //         } product. Please try again.`,
  //       [
  //         {text: 'OK', style: 'default'},
  //         {
  //           text: 'Retry',
  //           onPress: () => handleSubmit(),
  //           style: 'default',
  //         },
  //       ],
  //     );
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  const handleStepPress = (stepId: number) => {
    console.log('🎯 Navigating to step:', stepId);
    setCurrentStep(stepId);
  };

  const renderStep = () => {
    console.log('🖥️ Rendering step:', currentStep);

    switch (currentStep) {
      case 1:
        return (
          <ProductInfoStep
            formData={formData}
            updateFormData={updateFormData}
            editMode={editMode}
          />
        );
      case 2:
        return (
          <UploadMediaStep
            formData={formData}
            updateFormData={updateFormData}
            editMode={editMode}
          />
        );
      case 3:
        return (
          <InventoryStep
            formData={formData}
            updateFormData={updateFormData}
            editMode={editMode}
          />
        );
      case 4:
        return (
          <FeaturesStep
            formData={formData}
            updateFormData={updateFormData}
            editMode={editMode}
          />
        );
      default:
        console.warn('❓ Unknown step:', currentStep);
        return null;
    }
  };

  const getHeaderTitle = () => {
    return editMode ? 'Edit Product' : 'Add Product';
  };

  const getSubmitButtonText = () => {
    if (isSubmitting) {
      return editMode ? 'Updating...' : 'Creating...';
    }

    if (editMode) {
      return currentStep === STEPS.length ? 'Update Product' : 'Continue';
    }
    return currentStep === STEPS.length ? 'Save Product' : 'Continue';
  };

  // FIXED: Improved validation logic that accounts for edit mode
  const isValidStep = () => {
    switch (currentStep) {
      case 1:
        // Product info step - always require name and price
        return formData.productName.trim() && formData.price.trim();
      case 2:
        // Media step - always valid (images are optional)
        return true;
      case 3:
        // Inventory step - require product code
        return formData.productCode.trim();
      case 4:
        // Features step - always valid (features are optional)
        return true;
      default:
        return true;
    }
  };

  // FIXED: Improved image upload check that accounts for edit mode
  const areImagesUploading = () => {
    // In edit mode, if we have existing images, don't block submission
    if (editMode && formData.images.length > 0) {
      return false; // Allow submission in edit mode even if some images are still uploading
    }

    // For new products, only block if there are images selected but none uploaded
    return (
      !editMode &&
      formData.images.length > 0 &&
      (!formData.imageRelativePaths ||
        formData.imageRelativePaths.length !== formData.images.length)
    );
  };

  // FIXED: Better disabled state logic for edit mode
  const isButtonDisabled = () => {
    // Always disable if submitting
    if (isSubmitting) return true;

    // Always disable if step validation fails
    if (!isValidStep()) return true;

    // Only disable for image uploading on final step for new products
    if (currentStep === STEPS.length && !editMode && areImagesUploading()) {
      return true;
    }

    return false;
  };

  console.log('🔍 AddProduct render - Current step:', currentStep, {
    formDataKeys: Object.keys(formData),
    imageCount: formData.images.length,
    relativePathCount: formData.imageRelativePaths.length,
    isUploading: areImagesUploading(),
    isValidStep: isValidStep(),
    isDisabled: isButtonDisabled(),
    editMode,
  });

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <Header
        name={getHeaderTitle()}
        variant={TypographyVariant.H6_SMALL_SEMIBOLD}
        textColor={ColorPalette.AgreeTerms}
        leftIcon={
          <ArrowLeft
            style={undefined}
            size={15}
            onPress={handleBack}
            color={ColorPalette.GREY_TEXT_400}
          />
        }
      />

      <ProgressStepper
        steps={STEPS}
        currentStep={currentStep}
        onStepPress={handleStepPress}
      />

      <View style={[styles.mainContainer, {paddingBottom: getScreenHeight(9)}]}>
        <ScrollView
          style={styles.mainContainer}
          contentContainerStyle={[styles.scrollContent]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          <View>{renderStep()}</View>
        </ScrollView>
      </View>

      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          paddingHorizontal: 16,
          paddingVertical: 12,
          backgroundColor: 'white',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: -2,
          },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 5,
        }}>
        <Button
          text={getSubmitButtonText()}
          onPress={currentStep === STEPS.length ? handleSubmit : handleNext}
          variant={ButtonVariant.PRIMARY}
          state={ButtonState.DEFAULT}
          size={ButtonSize.MEDIUM}
          withShadow
          disabled={isButtonDisabled()}
          customStyles={{
            opacity: isButtonDisabled() ? 0.6 : 1,
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default AddProduct;

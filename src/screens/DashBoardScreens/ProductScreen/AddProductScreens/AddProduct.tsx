// Updated AddProduct.tsx with proper user ID and product ID passing

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

interface FormData {
  productId: string;
  productName: string;
  price: string;
  category: string;
  subcategory: string;
  description: string;
  images: string[];
  imageRelativePaths: string[];
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
  // NEW: Add user and product context for image operations
  userId?: string;
}

const AddProduct = () => {
  const route = useRoute<AddProductRouteProp>();
  const {productId, editMode = false, productData} = route.params || {};

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [originalImages, setOriginalImages] = useState<string[]>([]);

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
    // NEW: Pass user context for image operations
    userId: userId,
  });

  // Pre-fill form data if in edit mode
  useEffect(() => {
    if (editMode && productData) {
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
        // NEW: Ensure user context is passed
        userId: userId,
      }));
    }
  }, [editMode, productData, productId, userId]);

  // Update user context when userId changes
  useEffect(() => {
    if (userId) {
      setFormData(prevData => ({
        ...prevData,
        userId: userId,
      }));
    }
  }, [userId]);

  const updateFormData = (newData: Partial<FormData>) => {
    console.log('📝 Updating form data:', {
      keys: Object.keys(newData),
      imageCount: newData.images?.length,
      relativePathCount: newData.imageRelativePaths?.length,
    });

    setFormData(prevData => {
      const updatedData = {
        ...prevData,
        ...newData,
      };

      if (newData.categoryPath) {
        updatedData.categoryDisplay = newData.categoryPath.join(' > ');
      }

      return updatedData;
    });
  };

  // const debugImageState = () => {
  //   console.log('🔍 DEBUG: Current image state before API call:', {
  //     editMode,
  //     productId: formData.productId,
  //     userId: formData.userId,

  //     // Original images (what we started with)
  //     originalImages: {
  //       count: originalImages.length,
  //       list: originalImages,
  //     },

  //     // Current form data images (what's currently shown in UI)
  //     formDataImages: {
  //       count: formData.images?.length || 0,
  //       list: formData.images || [],
  //     },

  //     // Uploaded image paths (new images that were uploaded)
  //     imageRelativePaths: {
  //       count: formData.imageRelativePaths?.length || 0,
  //       list: formData.imageRelativePaths || [],
  //     },

  //     // What should be sent to API
  //     shouldSendToAPI: {
  //       existingImages:
  //         formData.images?.filter((img: string) => img.startsWith('http')) ||
  //         [],
  //       newImages:
  //         formData.imageRelativePaths?.filter(
  //           (path: string) => path && !path.startsWith('http'),
  //         ) || [],
  //     },
  //   });
  // };

  const handleSubmit = async () => {
    // Add debug logging
    // debugImageState();

    // console.log('🚀 Form submitted:', {
    //   editMode,
    //   productId: formData.productId,
    //   userId: formData.userId,
    //   formData: {
    //     productName: formData.productName,
    //     price: formData.price,
    //     currentImages: formData.images?.length || 0,
    //     imageRelativePaths: formData.imageRelativePaths?.length || 0,
    //   },
    // });

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

    // For new products, check if images are properly uploaded (if any were selected)
    if (!editMode && formData.images.length > 0) {
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
        originalImages,
      );

      // console.log('🎯 Final API call:', {
      //   method: editMode ? 'UPDATE' : 'CREATE',
      //   productId: apiData.product_id,
      //   productName: apiData.product_data.product,
      //   imageCount: apiData.image_pair_positon?.length || 0,
      //   imagePaths: apiData.image_pair_positon || [],
      // });

      let result;
      if (editMode) {
        // console.log('🔄 Updating existing product...');
        result = await updateProductApi(apiData);
      } else {
        // console.log('✨ Creating new product...');
        result = await createProductApi(apiData);
      }

      // Show success message
      Alert.alert(
        'Success',
        editMode
          ? 'Product updated successfully! Image changes have been saved.'
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

  const handleStepPress = (stepId: number) => {
    setCurrentStep(stepId);
  };

  const renderStep = () => {
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
      return currentStep === STEPS.length ? 'Update Product' : 'Next';
    }
    return currentStep === STEPS.length ? 'Save Product' : 'Next';
  };

  const isValidStep = () => {
    switch (currentStep) {
      case 1:
        return formData.productName.trim() && formData.price.trim();
      case 2:
        return true; // Images are optional
      case 3:
        return formData.productCode.trim();
      case 4:
        return true; // Features are optional
      default:
        return true;
    }
  };

  const isButtonDisabled = () => {
    if (isSubmitting) return true;
    if (!isValidStep()) return true;
    return false;
  };

  console.log('🔍 AddProduct render state:', {
    currentStep,
    editMode,
    userId,
    productId: formData.productId,
    imageCount: formData.images.length,
    relativePathCount: formData.imageRelativePaths.length,
    isValidStep: isValidStep(),
    isDisabled: isButtonDisabled(),
  });

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <Header
        name={getHeaderTitle()}
        variant={TypographyVariant.H6_BOLD}
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

      <View style={[styles.mainContainer, {paddingBottom: getScreenHeight(7)}]}>
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

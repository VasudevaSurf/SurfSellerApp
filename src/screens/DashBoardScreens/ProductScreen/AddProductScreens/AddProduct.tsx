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
    imageRelativePaths: [], // New field for API relative paths
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

      setFormData(prevData => ({
        ...prevData, // Keep all existing fields as defaults
        productId: productData.productId || productId || '',
        productName: productData.productName || '',
        price: productData.price || '',
        category: productData.category || '',
        subcategory: productData.subcategory || '',
        description: productData.description || '',
        images: Array.isArray(productData.images) ? productData.images : [],
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
          images: updatedData.images,
          imageRelativePaths: updatedData.imageRelativePaths,
        });
      }

      console.log('✅ Form data after update:', {
        ...updatedData,
        // Only log key fields to avoid noise
        productName: updatedData.productName,
        price: updatedData.price,
        imageCount: updatedData.images.length,
        relativePathCount: updatedData.imageRelativePaths.length,
      });
      return updatedData;
    });
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

  const handleSubmit = async () => {
    console.log('🚀 Form submitted:', {
      editMode,
      productId,
      formData: {
        productName: formData.productName,
        price: formData.price,
        images: formData.images.length,
        relativePaths: formData.imageRelativePaths.length,
      },
    });

    // Validate required fields and image upload status
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

    // Check if images are properly uploaded (for new products)
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

      console.log('✅ Images validation passed:', {
        imageCount: formData.images.length,
        relativePathCount: formData.imageRelativePaths.length,
        relativePaths: formData.imageRelativePaths,
      });
    }

    if (!userId) {
      Alert.alert('Error', 'User session expired. Please login again.');
      return;
    }

    // Show loading state
    setIsSubmitting(true);

    try {
      // Transform form data to API format with enhanced image handling
      const apiData = transformFormDataToApiFormat(
        formData,
        userId,
        editMode,
        categories,
      );

      console.log('🎯 API Data prepared:', {
        product: apiData.product_data.product,
        price: apiData.product_data.price,
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

  // Check if current step is valid
  const isValidStep = () => {
    switch (currentStep) {
      case 1:
        return formData.productName.trim() && formData.price.trim();
      case 2:
        return true; // Media is optional
      case 3:
        return formData.productCode.trim();
      case 4:
        return true; // Features are optional
      default:
        return true;
    }
  };

  // Check if images are still uploading
  const areImagesUploading = () => {
    return (
      formData.images.length > 0 &&
      (!formData.imageRelativePaths ||
        formData.imageRelativePaths.length !== formData.images.length)
    );
  };

  console.log('🔍 AddProduct render - Current step:', currentStep, {
    formDataKeys: Object.keys(formData),
    imageCount: formData.images.length,
    relativePathCount: formData.imageRelativePaths.length,
    isUploading: areImagesUploading(),
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
          disabled={
            !isValidStep() ||
            isSubmitting ||
            (currentStep === STEPS.length && areImagesUploading())
          }
          customStyles={{
            opacity:
              !isValidStep() || isSubmitting || areImagesUploading() ? 0.6 : 1,
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default AddProduct;

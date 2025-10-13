// src/screens/DashBoardScreens/ProductScreen/AddProductScreens/AddProduct.tsx

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
  ProductFeature,
} from '../../../../services/apiService';
import {useCategories} from '../../../../hooks/useCategories';
import {showCustomToast} from '../../../../components/MainComponents/Toast/ToastComponent';
import SuccessTickSquareIcon from '../../../../assets/icons/ToastIcons/SuccessTick';
import {useProductFeatures} from '../../../../hooks/useProductFeatures';

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
    qtyStep?: string;
    listQtyCount?: string;
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
    category_listing?: {
      id: number;
      name: string;
    };
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
  qtyStep: string;
  listQtyCount: string;
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
  userId?: string;
  category_listing: {
    id: number;
    name: string;
  };
  selectedCategories: {id: string; name: string; path: string[]}[];
  // NEW: Features fields
  availableFeatures?: ProductFeature[];
  selectedFeatures?: {[fieldName: string]: string};
}

const AddProduct = () => {
  const route = useRoute<AddProductRouteProp>();
  const {productId, editMode = false, productData} = route.params || {};
  console.log('AddProduct route params:', productData);

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [originalImages, setOriginalImages] = useState<string[]>([]);

  // Get userId from Redux store
  const userId = useSelector(
    (state: RootState) => state.auth.userData?.user_id,
  );

  // Use categories hook to get available categories
  const {categories} = useCategories();

  // NEW: Load features if in edit mode
  const {
    features: availableFeatures,
    loading: featuresLoading,
    error: featuresError,
  } = useProductFeatures(editMode ? productId : undefined);

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
    qtyStep: '',
    listQtyCount: '',
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
    userId: userId,
    category_listing: {
      id: 0,
      name: '',
    },
    selectedCategories: [] as {id: string; name: string; path: string[]}[],
    availableFeatures: [],
    selectedFeatures: {},
  });

  // Pre-fill form data if in edit mode
  useEffect(() => {
    if (editMode && productData) {
      console.log('🔄 Pre-filling form data in edit mode:', productData);

      const originalImageList = Array.isArray(productData.images)
        ? productData.images
        : [];
      setOriginalImages(originalImageList);

      setFormData(prevData => {
        const updatedData = {
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
          qtyStep: productData.qtyStep || '',
          listQtyCount: productData.listQtyCount || '',
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
          userId: userId,
          category_listing: productData.category_listing || {id: 0, name: ''},
          selectedCategories: productData.selectedCategories || [],
        };

        console.log('✅ Form data updated with inventory values:', {
          minQuantity: updatedData.minQuantity,
          maxQuantity: updatedData.maxQuantity,
          qtyStep: updatedData.qtyStep,
          listQtyCount: updatedData.listQtyCount,
        });

        return updatedData;
      });
    }
  }, [editMode, productData, productId, userId]);

  // NEW: Update formData when features are loaded from API
  useEffect(() => {
    if (availableFeatures && availableFeatures.length > 0) {
      console.log('🎨 Features loaded from API, updating form data:', {
        featuresCount: availableFeatures.length,
        features: availableFeatures.map(f => ({
          name: f.name,
          fieldName: f.field_name,
          value: f.value,
        })),
      });

      // Extract current feature values from API
      const selectedFeatures: {[fieldName: string]: string} = {};

      availableFeatures.forEach(feature => {
        if (feature.value) {
          selectedFeatures[feature.field_name] = feature.value;
          console.log(
            `✅ Loaded feature: ${feature.name} (${feature.field_name}) = ${feature.value}`,
          );
        }
      });

      setFormData(prevData => ({
        ...prevData,
        availableFeatures,
        selectedFeatures,
      }));
    }
  }, [availableFeatures]);

  console.log('formData on edit screen', formData);

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
      hasFeatures: !!newData.selectedFeatures,
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

  const debugImageState = () => {
    console.log('🔍 DEBUG: Current image state before API call:', {
      editMode,
      productId: formData.productId,
      userId: formData.userId,

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

      // What should be sent to API
      shouldSendToAPI: {
        existingImages:
          formData.images?.filter((img: string) => img.startsWith('http')) ||
          [],
        newImages:
          formData.imageRelativePaths?.filter(
            (path: string) => path && !path.startsWith('http'),
          ) || [],
      },
    });
  };

  const handleSubmit = async () => {
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🚀 [SUBMIT] Form submission started');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('Mode:', editMode ? 'EDIT' : 'CREATE');
    console.log('Product ID:', formData.productId);
    console.log('User ID:', userId);

    // Debug image state
    debugImageState();

    console.log('\n🎨 [FEATURES] Current feature state:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    if (formData.selectedFeatures) {
      console.log('Selected Features:', formData.selectedFeatures);
      console.log(
        'Feature Count:',
        Object.keys(formData.selectedFeatures).length,
      );

      Object.entries(formData.selectedFeatures).forEach(([key, value]) => {
        console.log(`  📌 Feature [${key}] = "${value}"`);
      });
    } else {
      console.log('⚠️ NO SELECTED FEATURES');
    }
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    console.log('\n📋 Complete Form Data:');
    console.log(JSON.stringify(formData, null, 2));
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    // Validate required fields
    const requiredFields = ['productName', 'price'];
    const missingFields = requiredFields.filter(
      field => !formData[field]?.trim(),
    );

    if (!userId) {
      console.error('❌ No userId available');
      showCustomToast('Session expired. Please login again.', '❌');
      return;
    }

    setIsSubmitting(true);

    try {
      console.log('\n🔄 Transforming form data to API format...');
      const apiData = transformFormDataToApiFormat(
        formData,
        userId,
        editMode,
        categories,
        originalImages,
      );

      console.log('\n🎯 Final API call details:');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('Method:', editMode ? 'UPDATE' : 'CREATE');
      console.log('Product ID:', apiData.product_id);
      console.log('Product Name:', apiData.product_data.product);
      console.log('Image Count:', apiData.image_pair_positon?.length || 0);
      console.log(
        'Feature Count:',
        apiData.product_features
          ? Object.keys(apiData.product_features).length
          : 0,
      );

      if (apiData.product_features) {
        console.log('\n🎨 Features being sent to API:');
        Object.entries(apiData.product_features).forEach(([key, value]) => {
          console.log(`  📌 [${key}] = "${value}"`);
        });
      }
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

      let result;
      if (editMode) {
        console.log('📤 Calling updateProductApi...');
        result = await updateProductApi(apiData);
      } else {
        console.log('📤 Calling createProductApi...');
        result = await createProductApi(apiData);
      }

      console.log('\n✅ API call successful!');
      console.log('Result:', result);

      goBack();
      const successMessage = editMode
        ? 'Product details updated successfully.'
        : 'Product added successfully.';

      showCustomToast(successMessage, '✅');
    } catch (error: any) {
      console.error('\n❌ Error during submit:', error);
      console.error('Error details:', {
        message: error.message,
        stack: error.stack,
        response: error.response?.data,
      });

      const errorMessage = `Failed to ${
        editMode ? 'update' : 'create'
      } product. Please try again.`;
      showCustomToast(errorMessage, '❌');
    } finally {
      setIsSubmitting(false);
    }

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
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
    featuresCount: formData.availableFeatures?.length || 0,
    selectedFeaturesCount: formData.selectedFeatures
      ? Object.keys(formData.selectedFeatures).length
      : 0,
    isValidStep: isValidStep(),
    isDisabled: isButtonDisabled(),
    featuresLoading,
    featuresError,
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
            size={22}
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

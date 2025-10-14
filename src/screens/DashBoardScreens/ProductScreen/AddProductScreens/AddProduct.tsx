// Updated AddProduct.tsx with conditional steps based on edit mode

import React, {useState, useEffect, useMemo} from 'react';
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
import {showCustomToast} from '../../../../components/MainComponents/Toast/ToastComponent';
import SuccessTickSquareIcon from '../../../../assets/icons/ToastIcons/SuccessTick';

// ✅ Define steps arrays for both modes
const ADD_PRODUCT_STEPS = [
  {id: 1, label: 'Product Info'},
  {id: 2, label: 'Upload Media'},
  {id: 3, label: 'Inventory'},
];

const EDIT_PRODUCT_STEPS = [
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
  apiResponse?: any;
  brandFieldId?: string;
  sizeFieldId?: string;
  weightFieldId?: string;
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

  // ✅ Dynamically select steps based on edit mode
  const STEPS = useMemo(() => {
    return editMode ? EDIT_PRODUCT_STEPS : ADD_PRODUCT_STEPS;
  }, [editMode]);

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
    tax_ids: [], // ✅ ADD THIS
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
    apiResponse: undefined,
    brandFieldId: '',
    sizeFieldId: '',
    weightFieldId: '',
  });

  // Pre-fill form data if in edit mode
  useEffect(() => {
    if (editMode && productData) {
      console.log('='.repeat(80));
      console.log('📝 ADD PRODUCT SCREEN - RECEIVED PRODUCT DATA:');
      console.log('='.repeat(80));
      console.log(JSON.stringify(productData, null, 2));
      console.log('='.repeat(80));

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
          tax_ids: productData.tax_ids || [], // ✅ ADD THIS
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
          apiResponse: productData.apiResponse,
        };

        console.log('✅ Form data updated with tax_ids:', updatedData.tax_ids);

        return updatedData;
      });
    }
  }, [editMode, productData, productId, userId]);

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
      originalImages: {
        count: originalImages.length,
        list: originalImages,
      },
      formDataImages: {
        count: formData.images?.length || 0,
        list: formData.images || [],
      },
      imageRelativePaths: {
        count: formData.imageRelativePaths?.length || 0,
        list: formData.imageRelativePaths || [],
      },
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
    debugImageState();

    console.log('🚀 Form submitted:', {
      editMode,
      productId: formData.productId,
      userId: formData.userId,
      formData,
    });

    const requiredFields = ['productName', 'price'];
    const missingFields = requiredFields.filter(
      field => !formData[field]?.trim(),
    );

    if (!editMode && formData.images.length > 0) {
      if (
        !formData.imageRelativePaths ||
        formData.imageRelativePaths.length === 0
      ) {
        showCustomToast('Oops! Upload failed. Try again.', '❌');
        return;
      }
    }

    if (!userId) {
      showCustomToast('Session expired. Please login again.', '❌');
      return;
    }

    setIsSubmitting(true);

    try {
      const apiData = transformFormDataToApiFormat(
        formData,
        userId,
        editMode,
        categories,
        originalImages,
      );

      console.log('🎯 Final API call:', {
        method: editMode ? 'UPDATE' : 'CREATE',
        productId: apiData.product_id,
        productName: apiData.product_data.product,
        imageCount: apiData.image_pair_positon?.length || 0,
        imagePaths: apiData.image_pair_positon || [],
      });

      let result;
      if (editMode) {
        result = await updateProductApi(apiData);
      } else {
        result = await createProductApi(apiData);
      }

      goBack();
      const successMessage = editMode
        ? 'Product details updated successfully.'
        : 'Product added successfully.';

      showCustomToast(successMessage, '✅');
    } catch (error: any) {
      console.error('💥 Error saving product:', error);

      const erroMessage = `Failed to ${
        editMode ? 'update' : 'create'
      } product. Please try again.`;
      showCustomToast(erroMessage, '❌');
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
        // ✅ Only render Features step in edit mode
        if (editMode) {
          return (
            <FeaturesStep
              formData={formData}
              updateFormData={updateFormData}
              editMode={editMode}
            />
          );
        }
        return null;
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
        return true;
      case 3:
        return formData.productCode.trim();
      case 4:
        return true;
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
    totalSteps: STEPS.length,
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

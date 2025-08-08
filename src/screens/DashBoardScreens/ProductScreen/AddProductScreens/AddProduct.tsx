import React, {useState, useEffect} from 'react';
import {ScrollView, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useRoute, RouteProp} from '@react-navigation/native';
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

  // Initialize formData with all required fields and proper defaults
  const [formData, setFormData] = useState<FormData>({
    productId: productId || '',
    productName: '',
    price: '',
    category: '',
    subcategory: '',
    description: '',
    images: [],
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
      console.log('Loading product data for editing:', productData);

      setFormData(prevData => ({
        ...prevData, // Keep all existing fields as defaults
        productId: productData.productId || productId || '',
        productName: productData.productName || '',
        price: productData.price || '',
        category: productData.category || '',
        subcategory: productData.subcategory || '',
        description: productData.description || '',
        images: Array.isArray(productData.images) ? productData.images : [],
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
    console.log('Updating form data:', newData);

    setFormData(prevData => {
      const updatedData = {
        ...prevData,
        ...newData,
      };

      // If categoryPath is updated, also update categoryDisplay
      if (newData.categoryPath) {
        updatedData.categoryDisplay = newData.categoryPath.join(' > ');
      }

      console.log('Form data after update:', updatedData);
      return updatedData;
    });
  };

  const handleNext = () => {
    console.log('Moving to next step from:', currentStep);
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    console.log('Going back from step:', currentStep);
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      goBack();
    }
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    console.log('Edit mode:', editMode);
    console.log('Product ID:', productId);

    // Validate required fields
    const requiredFields = ['productName', 'price'];
    const missingFields = requiredFields.filter(
      field => !formData[field]?.trim(),
    );

    if (missingFields.length > 0) {
      console.warn('Missing required fields:', missingFields);
      // You can add alert or validation UI here
      return;
    }

    // TODO: Implement actual API call for create/update
    // Example API call structure:
    /*
    try {
      if (editMode) {
        await updateProductApi(formData.productId, formData);
      } else {
        await createProductApi(formData);
      }
      goBack();
    } catch (error) {
      console.error("Error saving product:", error);
      // Handle error
    }
    */

    // For now, just go back
    goBack();
  };

  const handleStepPress = (stepId: number) => {
    console.log('Navigating to step:', stepId);
    setCurrentStep(stepId);
  };

  const renderStep = () => {
    console.log('Rendering step:', currentStep, 'with formData:', formData);

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
        console.warn('Unknown step:', currentStep);
        return null;
    }
  };

  const getHeaderTitle = () => {
    return editMode ? 'Edit Product' : 'Add Product';
  };

  const getSubmitButtonText = () => {
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

  console.log(
    'AddProduct render - Current step:',
    currentStep,
    'Form data keys:',
    Object.keys(formData),
  );

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
          disabled={!isValidStep()}
          customStyles={{
            opacity: isValidStep() ? 1 : 0.6,
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default AddProduct;

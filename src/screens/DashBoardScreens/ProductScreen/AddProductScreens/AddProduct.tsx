import React, {useState} from 'react';
import {ScrollView, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
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

const STEPS = [
  {id: 1, label: 'Product Info'},
  {id: 2, label: 'Upload Media'},
  {id: 3, label: 'Inventory'},
  {id: 4, label: 'Variant(s)'},
];

const AddProduct = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    productName: '',
    price: '',
    category: '',
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
  });

  const updateFormData = newData => {
    setFormData(prevData => ({...prevData, ...newData}));
  };

  const handleNext = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      goBack();
    }
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    goBack();
  };

  const handleStepPress = stepId => {
    // Navigate to the selected step
    setCurrentStep(stepId);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <ProductInfoStep
            formData={formData}
            updateFormData={updateFormData}
          />
        );
      case 2:
        return <UploadMediaStep />;
      case 3:
        return <InventoryStep />;
      case 4:
        return <FeaturesStep />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <Header
        name="Add Product"
        variant={TypographyVariant.LMEDIUM_BOLD}
        textColor={ColorPalette.AgreeTerms}
        leftIcon={
          <ArrowLeftIcon style={undefined} size={15} onPress={handleBack} />
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
          showsVerticalScrollIndicator={false}>
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
        }}>
        <Button
          text={currentStep === STEPS.length ? 'Save Product' : 'Continue'}
          onPress={currentStep === STEPS.length ? handleSubmit : handleNext}
          variant={ButtonVariant.PRIMARY}
          state={ButtonState.DEFAULT}
          size={ButtonSize.MEDIUM}
        />
      </View>
    </SafeAreaView>
  );
};

export default AddProduct;

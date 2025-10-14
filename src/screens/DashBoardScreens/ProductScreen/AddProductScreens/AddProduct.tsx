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
import {showCustomToast} from '../../../../components/MainComponents/Toast/ToastComponent';
import SuccessTickSquareIcon from '../../../../assets/icons/ToastIcons/SuccessTick';

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

  // NEW: Add product features from Extra Fields
  productFeatures?: {
    [fieldName: string]: string | number; // field_name -> selected variant id
  };

  // NEW: Store the complete extra fields structure for reference
  extraFieldsData?: Array<{
    name: string;
    field_name: string;
    main_object: string;
    field_type: string;
    field_type_desc: string;
    field_disabled: boolean;
    required: boolean;
    value: string | null;
    variants: Array<{
      id: string;
      name: string;
    }>;
  }>;
}

const extractExtraFieldsFromProductData = (
  productData: any,
): {
  productFeatures: {[fieldName: string]: string | number};
  extraFieldsData: Array<any>;
} => {
  console.log('🔍 Starting Extra Fields extraction');
  console.log(
    '📦 Product Data Structure:',
    JSON.stringify(productData, null, 2),
  );

  const productFeatures: {[fieldName: string]: string | number} = {};
  let extraFieldsData: Array<any> = [];

  // Check if we have the raw API response structure
  if (productData.sections && Array.isArray(productData.sections)) {
    console.log(
      '✅ Found sections array, length:',
      productData.sections.length,
    );

    // Log all section names to debug
    productData.sections.forEach((section: any, index: number) => {
      console.log(`Section ${index}:`, {
        name: section.name,
        section_type: section.section_type,
        has_blocks: !!section.blocks,
        blocks_length: section.blocks?.length || 0,
      });
    });

    const featuresSection = productData.sections.find(
      (section: any) => section.section_type === 'features',
    );

    if (featuresSection) {
      console.log('✅ Found Features section:', {
        name: featuresSection.name,
        blocks_count: featuresSection.blocks?.length || 0,
      });

      if (featuresSection.blocks && Array.isArray(featuresSection.blocks)) {
        // Log all block names
        featuresSection.blocks.forEach((block: any, index: number) => {
          console.log(`Block ${index}:`, {
            block_name: block.block_name,
            has_fields: !!block.fields,
            fields_length: block.fields?.length || 0,
          });
        });

        // Find the "Extra Fields" block
        const extraFieldsBlock = featuresSection.blocks.find(
          (block: any) => block.block_name === 'Extra Fields',
        );

        if (extraFieldsBlock) {
          console.log('✅ Found Extra Fields block');

          if (
            extraFieldsBlock.fields &&
            Array.isArray(extraFieldsBlock.fields)
          ) {
            console.log(
              '✅ Found fields array, length:',
              extraFieldsBlock.fields.length,
            );

            // Filter out fields without variants (like Brand with null variants)
            extraFieldsData = extraFieldsBlock.fields.filter((field: any) => {
              const hasVariants =
                field.variants && Array.isArray(field.variants);
              console.log(`Field "${field.name}" (${field.field_name}):`, {
                has_variants: hasVariants,
                variants_count: hasVariants ? field.variants.length : 0,
                current_value: field.value,
              });
              return hasVariants;
            });

            console.log(
              '✅ Filtered fields (with variants):',
              extraFieldsData.length,
            );

            // Extract current values for all fields (even those without variants)
            extraFieldsBlock.fields.forEach((field: any) => {
              if (
                field.value !== null &&
                field.value !== '' &&
                field.value !== undefined
              ) {
                productFeatures[field.field_name] = field.value;
                console.log(
                  `Set feature value: ${field.field_name} = ${field.value}`,
                );
              }
            });

            console.log('✅ Final Extracted Data:', {
              fieldCount: extraFieldsData.length,
              featureCount: Object.keys(productFeatures).length,
              fields: extraFieldsData.map(f => f.name),
              currentValues: productFeatures,
            });
          } else {
            console.warn('⚠️ Extra Fields block has no fields array');
          }
        } else {
          console.warn('⚠️ No "Extra Fields" block found');
          console.log(
            'Available blocks:',
            featuresSection.blocks.map((b: any) => b.block_name),
          );
        }
      } else {
        console.warn('⚠️ Features section has no blocks array');
      }
    } else {
      console.warn('⚠️ No Features section found');
      console.log(
        'Available sections:',
        productData.sections.map((s: any) => ({
          name: s.name,
          type: s.section_type,
        })),
      );
    }
  } else {
    console.warn('⚠️ No sections array found in product data');
    console.log('Product data keys:', Object.keys(productData));
  }

  console.log('🏁 Extraction complete:', {
    fieldsExtracted: extraFieldsData.length,
    featuresExtracted: Object.keys(productFeatures).length,
  });

  return {productFeatures, extraFieldsData};
};

const AddProduct = () => {
  const route = useRoute<AddProductRouteProp>();
  const {productId, editMode = false, productData} = route.params || {};

  useEffect(() => {
    console.log('🧪 TEST - AddProduct received params:', {
      productId,
      editMode,
      hasProductData: !!productData,
      productDataKeys: productData ? Object.keys(productData) : [],
      hasSections: productData?.sections ? true : false,
      sectionsCount: productData?.sections?.length || 0,
    });

    if (productData?.sections) {
      console.log(
        '🧪 TEST - Sections structure:',
        JSON.stringify(
          productData.sections.map((s: any) => ({
            name: s.name,
            type: s.section_type,
            blocksCount: s.blocks?.length || 0,
            blockNames: s.blocks?.map((b: any) => b.block_name) || [],
          })),
          null,
          2,
        ),
      );
    }
  }, [productId, editMode, productData]);
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
    qtyStep: '', // ✅ ADD THIS
    listQtyCount: '', // ✅ ADD THIS
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
  });
  // Pre-fill form data if in edit mode
  useEffect(() => {
    if (editMode && productData) {
      console.log('🔄 Pre-filling form data in edit mode');
      console.log(
        '📦 Raw productData received:',
        JSON.stringify(productData, null, 2),
      );

      const originalImageList = Array.isArray(productData.images)
        ? productData.images
        : [];
      setOriginalImages(originalImageList);

      // Extract extra fields features
      console.log('🔍 About to extract extra fields...');
      const {productFeatures, extraFieldsData} =
        extractExtraFieldsFromProductData(productData);

      console.log('📋 Extraction results:', {
        productFeatures,
        extraFieldsDataCount: extraFieldsData.length,
        extraFieldsData: extraFieldsData.map(f => ({
          name: f.name,
          field_name: f.field_name,
          value: f.value,
          variants_count: f.variants?.length || 0,
        })),
      });

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

          // Add extracted features
          productFeatures: productFeatures,
          extraFieldsData: extraFieldsData,
        };

        console.log('✅ Form data updated:', {
          productName: updatedData.productName,
          featuresCount: Object.keys(productFeatures).length,
          extraFieldsCount: extraFieldsData.length,
          productFeatures: updatedData.productFeatures,
          extraFieldsData: updatedData.extraFieldsData,
        });

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
    // Add debug logging
    debugImageState();

    console.log('🚀 Form submitted:', {
      editMode,
      productId: formData.productId,
      userId: formData.userId,
      // formData: {
      //   productName: formData.productName,
      //   price: formData.price,
      //   currentImages: formData.images?.length || 0,
      //   imageRelativePaths: formData.imageRelativePaths?.length || 0,
      // },
      formData,
    });

    // Validate required fields
    const requiredFields = ['productName', 'price'];
    const missingFields = requiredFields.filter(
      field => !formData[field]?.trim(),
    );

    // if (missingFields.length > 0) {
    //   console.warn('⚠️ Missing required fields:', missingFields);
    //   // Alert.alert(
    //   //   'Validation Error',
    //   //   `Please fill in all required fields: ${missingFields.join(', ')}`,
    //   // );
    //   showCustomToast(
    //     `Missing required fields: ${missingFields.join(', ')}`,
    //     <SuccessTickSquareIcon size={18} />
    //   )
    //   return;
    // }

    // For new products, check if images are properly uploaded (if any were selected)
    if (!editMode && formData.images.length > 0) {
      if (
        !formData.imageRelativePaths ||
        formData.imageRelativePaths.length === 0
      ) {
        // Alert.alert(
        //   'Images Not Uploaded',
        //   'Please wait for images to finish uploading before saving the product.',
        // );
        showCustomToast('Oops! Upload failed. Try again.', '❌');

        return;
      }
    }

    if (!userId) {
      // Alert.alert('Error', 'User session expired. Please login again.');
      showCustomToast('Session expired. Please login again.', '❌');
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

      console.log('🎯 Final API call:', {
        method: editMode ? 'UPDATE' : 'CREATE',
        productId: apiData.product_id,
        productName: apiData.product_data.product,
        imageCount: apiData.image_pair_positon?.length || 0,
        imagePaths: apiData.image_pair_positon || [],
      });

      let result;
      if (editMode) {
        // console.log('🔄 Updating existing product...');
        result = await updateProductApi(apiData);
      } else {
        // console.log('✨ Creating new product...');
        result = await createProductApi(apiData);
      }

      // Show success message
      // Alert.alert(
      //   'Success',
      //   editMode
      //     ? 'Product updated successfully! Image changes have been saved.'
      //     : 'Product created successfully!',
      //   [
      //     {
      //       text: 'OK',
      //       onPress: () => goBack(),
      //     },
      //   ],
      // );

      goBack();
      const successMessage = editMode
        ? 'Product details updated successfully.'
        : 'Product added successfully.';

      showCustomToast(successMessage, '✅');
    } catch (error: any) {
      console.error('💥 Error saving product:', error);

      // Alert.alert(
      //   editMode ? 'Update Failed' : 'Creation Failed',
      //   error.message ||
      //   `Failed to ${editMode ? 'update' : 'create'
      //   } product. Please try again.`,
      //   [
      //     { text: 'OK', style: 'default' },
      //     {
      //       text: 'Retry',
      //       onPress: () => handleSubmit(),
      //       style: 'default',
      //     },
      //   ],
      // );

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

import {useState, useEffect, useCallback} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import {
  fetchProductDetailsApi,
  ProductFeature,
  ProductFeaturesSection,
} from '../services/apiService';

export const useProductFeatures = (productId?: string) => {
  const [features, setFeatures] = useState<ProductFeature[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const userId = useSelector(
    (state: RootState) => state.auth.userData?.user_id,
  );

  const loadFeatures = useCallback(async () => {
    if (!userId || !productId) {
      console.log('⚠️ Cannot load features - missing userId or productId');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('📥 [LOAD FEATURES] Fetching product features');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('User ID:', userId);
      console.log('Product ID:', productId);

      const response = await fetchProductDetailsApi(userId, productId);

      console.log('\n📊 API Response received');
      console.log('Has sections:', !!response.sections);
      console.log('Section count:', response.sections?.length || 0);

      // Find the Features section
      const featuresSection = response.sections?.find(
        section => section.section_type === 'features',
      ) as ProductFeaturesSection | undefined;

      console.log('\n🎨 Features Section:');
      console.log('Found:', !!featuresSection);

      if (featuresSection) {
        console.log('Block count:', featuresSection.blocks?.length || 0);

        if (featuresSection.blocks) {
          const allFeatures: ProductFeature[] = [];

          featuresSection.blocks.forEach((block, blockIndex) => {
            console.log(`\nBlock ${blockIndex}: "${block.block_name}"`);

            if (block.fields && Array.isArray(block.fields)) {
              console.log(`  Fields: ${block.fields.length}`);

              block.fields.forEach((field, fieldIndex) => {
                console.log(`  Field ${fieldIndex}:`, {
                  name: field.name,
                  field_name: field.field_name,
                  value: field.value,
                  has_variants: !!field.variants,
                  variant_count: field.variants?.length || 0,
                });

                allFeatures.push(field);
              });
            } else {
              console.log('  No fields in this block');
            }
          });

          console.log(`\n✅ Total features loaded: ${allFeatures.length}`);
          setFeatures(allFeatures);
        }
      } else {
        console.log('⚠️ No features section found');
        setFeatures([]);
      }

      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    } catch (err: any) {
      console.error('❌ Error loading features:', err);
      setError(err.message || 'Failed to load features');
    } finally {
      setLoading(false);
    }
  }, [userId, productId]);

  useEffect(() => {
    if (productId) {
      loadFeatures();
    }
  }, [productId, loadFeatures]);

  return {
    features,
    loading,
    error,
    refreshFeatures: loadFeatures,
  };
};

import {Dimensions} from 'react-native';
import HTML from 'react-native-render-html';
import {getScreenWidth} from '../../../../helpers/screenSize';

/**
 * Extracts product details from the API response sections
 * @param {Object} data - The API response data
 * @returns {Object} Extracted product details
 */
export const extractProductDetailsFromSections = data => {
  // Default values if nothing is found
  let productInfo = {
    productName: 'N/A',
    price: '€0.00',
    status: 'H',
    stockAmount: '0',
    description: '',
    productCode: '',
    minQty: '',
    maxQty: '',
    qtyStep: '',
    shortDescription: '',
    searchWords: '',
    promoText: '',
  };

  if (!data || !data.sections || !Array.isArray(data.sections)) {
    return productInfo;
  }

  // Iterate through all sections blocks to find product data
  data.sections.forEach(section => {
    if (section.blocks && Array.isArray(section.blocks)) {
      section.blocks.forEach(block => {
        if (block.fields && Array.isArray(block.fields)) {
          block.fields.forEach(field => {
            // Extract all relevant product information
            switch (field.field_name) {
              case 'product':
                productInfo.productName = field.value || 'N/A';
                break;
              case 'nt_price':
                if (field.value) {
                  productInfo.price = `${data.currency?.symbol || '€'}${
                    field.value
                  }`;
                }
                break;
              case 'status':
                productInfo.status = field.value || 'H';
                break;
              case 'amount':
                productInfo.stockAmount = field.value || '0';
                break;
              case 'full_description':
                productInfo.description = field.value || '';
                break;
              case 'product_code':
                productInfo.productCode = field.value || '';
                break;
              case 'min_qty':
                productInfo.minQty = field.value || '';
                break;
              case 'max_qty':
                productInfo.maxQty = field.value || '';
                break;
              case 'qty_step':
                productInfo.qtyStep = field.value || '';
                break;
              case 'short_description':
                productInfo.shortDescription = field.value || '';
                break;
              case 'search_words':
                productInfo.searchWords = field.value || '';
                break;
              case 'promo_text':
                productInfo.promoText = field.value || '';
                break;
            }
          });
        }
      });
    }
  });

  return productInfo;
};

/**
 * Gets product categories from API response
 * @param {Object} data - The API response data
 * @returns {Array} Array of product categories
 */
export const getProductCategories = data => {
  if (
    !data ||
    !data.category_listing ||
    !Array.isArray(data.category_listing)
  ) {
    return [];
  }
  return data.category_listing;
};

/**
 * Gets product images from API response
 * @param {Object} data - The API response data
 * @param {Object} defaultImage - Default image to use if none found
 * @returns {Array} Array of product images
 */
export const getProductImages = (data, defaultImage) => {
  if (
    !data ||
    !data.images ||
    !Array.isArray(data.images) ||
    data.images.length === 0
  ) {
    return [{id: 'default', image: defaultImage}];
  }

  return data.images.map(img => ({
    id: img.id,
    image: img.image,
  }));
};

/**
 * Renders HTML content with react-native-render-html
 * @param {string} htmlContent - The HTML content to render
 * @param {number} screenWidth - The screen width for responsive rendering
 * @returns {JSX.Element|null} The rendered HTML content
 */
export const renderHtmlContent = (htmlContent, screenWidth) => {
  if (!htmlContent) return null;

  return (
    <HTML
      source={{html: htmlContent}}
      contentWidth={screenWidth - getScreenWidth(10)}
      tagsStyles={{
        p: {marginBottom: 10, lineHeight: 22},
        li: {marginBottom: 5, lineHeight: 22},
        ul: {marginLeft: 20},
        ol: {marginLeft: 20},
        strong: {fontWeight: 'bold'},
      }}
    />
  );
};

// src/screens/DashBoardScreens/ProductScreen/ProductScreen.tsx

import QuestionMarkIcon from '../../../assets/icons/QuestionMarkIcon';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  View,
  RefreshControl,
  Alert,
  Image,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import BellIcon from '../../../assets/icons/BellIcon';
import PlusIcon from '../../../assets/icons/PlusIcon';
import TrashIcon from '../../../assets/icons/NewProductIcons/TrashIcon';
import CheckIcon from '../../../assets/icons/CheckIcon';
import {
  AddModal,
  ButtonConfig,
} from '../../../components/MainComponents/AddModal/AddModal';
import {ProductInfo} from '../../../components/MainComponents/ProductInfo/ProductInfo';
import {SlidingBar} from '../../../components/MainComponents/SlidingBar/SlidingBar';
import {
  Button,
  ButtonSize,
  ButtonState,
  ButtonType,
  ButtonVariant,
} from '../../../components/UserComponents/Button';
import {Header} from '../../../components/UserComponents/Header/Header';
import {SearchBox} from '../../../components/UserComponents/SearchBox/SearchBox';
import {Typography} from '../../../components/UserComponents/Typography/Typography';
import {TypographyVariant} from '../../../components/UserComponents/Typography/Typography.types';
import {ColorPalette} from '../../../config/colorPalette';
import {getScreenHeight, getScreenWidth} from '../../../helpers/screenSize';
import {navigate} from '../../../navigation/utils/navigationRef';
import {
  fetchProducts,
  fetchProductsByStatus,
  fetchLowStockProducts,
  searchProducts,
  fetchFilterCounts,
  setCurrentFilter,
  setSearchTerm,
  updateProductStatus,
  updateMultipleProductsStatus,
  deleteMultipleProducts,
  clearDeleteError,
  clearStatusUpdateError,
  setPriceFilter,
  clearPriceFilter,
} from '../../../redux/slices/productsSlice';
import {PriceRangeModal} from '../../../components/MainComponents/PriceRangeModal/PriceRangeModal.tsx';
import {AppDispatch, RootState} from '../../../redux/store';
import {styles} from './ProductScreen.styles';
import EyeOpen from '../../../assets/icons/EyeOpen';
import EmptyBox from '../../../assets/icons/EmptyBox.tsx';
import FilterIcon from '../../../assets/icons/FilterIcon.tsx';
import LoaderIcon, {AnimatedLoader} from '../../../assets/icons/LoaderIcon.tsx';

const ProductScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [searchText, setSearchText] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isPriceModalVisible, setIsPriceModalVisible] = useState(false);

  // Multi-select state
  const [isMultiSelectMode, setIsMultiSelectMode] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [showBulkStatusModal, setShowBulkStatusModal] = useState(false);

  const userId = useSelector(
    (state: RootState) => state.auth.userData?.user_id,
  );

  const handleOpenPriceModal = () => {
    setIsPriceModalVisible(true);
  };

  const handleClosePriceModal = () => {
    setIsPriceModalVisible(false);
  };

  const {
    products = [],
    loading,
    error,
    totalItems,
    currentFilter,
    filterCounts,
    searchTerm,
    deletingProducts,
    deleteError,
    updatingStatus = [],
    statusUpdateError,
    priceFilter,
  } = useSelector((state: RootState) => state.products);

  // Local price range state
  const [priceRange, setPriceRange] = useState({
    min: priceFilter?.minPrice || 0,
    max: priceFilter?.maxPrice || 1000,
  });

  // Sync local price range with Redux state
  useEffect(() => {
    if (priceFilter) {
      setPriceRange({
        min: priceFilter.minPrice,
        max: priceFilter.maxPrice,
      });
    }
  }, [priceFilter]);

  // Create filter options with dynamic counts
  const filterOptions = [
    {
      id: 'all',
      label: `All${filterCounts.all > 0 ? ` ${filterCounts.all}` : ''}`,
    },
    {
      id: 'active',
      label: `Active${
        filterCounts.active > 0 ? ` ${filterCounts.active}` : ''
      }`,
    },
    {
      id: 'lowStock',
      label: `Low Stock${
        filterCounts.lowStock > 0 ? ` ${filterCounts.lowStock}` : ''
      }`,
    },
    {
      id: 'pending',
      label: `Pending${
        filterCounts.pending > 0 ? ` ${filterCounts.pending}` : ''
      }`,
    },
    {
      id: 'disabled',
      label: `Hidden${
        filterCounts.disabled > 0 ? ` ${filterCounts.disabled}` : ''
      }`,
    },
  ];

  const [selectedFilter, setSelectedFilter] = useState(
    filterOptions.find(option => option.id === currentFilter) ||
      filterOptions[0],
  );

  // Update selected filter when currentFilter changes
  useEffect(() => {
    const newSelectedFilter = filterOptions.find(
      option => option.id === currentFilter,
    );
    if (newSelectedFilter) {
      setSelectedFilter(newSelectedFilter);
    }
  }, [currentFilter, filterCounts]);

  // Clear selected products when switching filters or search
  useEffect(() => {
    if (isMultiSelectMode) {
      setSelectedProducts([]);
    }
  }, [currentFilter, searchTerm]);

  // Clear errors when component mounts
  useEffect(() => {
    if (deleteError) {
      dispatch(clearDeleteError());
    }
    if (statusUpdateError) {
      dispatch(clearStatusUpdateError());
    }
  }, [dispatch, deleteError, statusUpdateError]);

  // Function to fetch products based on current filter with price filtering
  const fetchProductsForFilter = (
    filterId: string,
    search: string = '',
    priceMin?: number,
    priceMax?: number,
  ) => {
    if (!userId) return;

    const filters: any = {
      status:
        filterId === 'all'
          ? 'all'
          : filterId === 'active'
          ? 'A'
          : filterId === 'pending'
          ? 'P'
          : filterId === 'disabled'
          ? 'D'
          : 'all',
      lowStock: filterId === 'lowStock',
      page: 1,
    };

    // Add price filters if set
    if (priceMin !== undefined) {
      filters.minPrice = priceMin;
    }
    if (priceMax !== undefined) {
      filters.maxPrice = priceMax;
    }

    if (search.trim()) {
      const statusMap: {[key: string]: 'A' | 'P' | 'D' | 'all'} = {
        all: 'all',
        active: 'A',
        pending: 'P',
        disabled: 'D',
        lowStock: 'A',
      };

      dispatch(
        searchProducts({
          userId,
          searchTerm: search,
          filters: {
            status: statusMap[filterId] || 'all',
            lowStock: filterId === 'lowStock',
            page: 1,
            minPrice: priceMin,
            maxPrice: priceMax,
          },
        }),
      );
    } else {
      switch (filterId) {
        case 'active':
          dispatch(fetchProductsByStatus({userId, status: 'A', page: 1}));
          break;
        case 'pending':
          dispatch(fetchProductsByStatus({userId, status: 'P', page: 1}));
          break;
        case 'disabled':
          dispatch(fetchProductsByStatus({userId, status: 'D', page: 1}));
          break;
        case 'lowStock':
          dispatch(fetchLowStockProducts({userId, threshold: 2, page: 1}));
          break;
        case 'all':
        default:
          dispatch(fetchProducts({userId, filters}));
          break;
      }
    }
  };

  // Fetch filter counts on component mount
  useEffect(() => {
    if (userId) {
      dispatch(fetchFilterCounts({userId}));
    }
  }, [dispatch, userId]);

  // Initial load
  useEffect(() => {
    if (userId && products.length === 0 && !loading && !error) {
      fetchProductsForFilter('all');
    }
  }, [userId]);

  // Handle filter selection
  const handleFilterSelect = (option: any) => {
    setSelectedFilter(option);
    dispatch(setCurrentFilter(option.id));

    // Apply current price filter if exists
    if (priceFilter) {
      fetchProductsForFilter(
        option.id,
        searchText,
        priceFilter.minPrice,
        priceFilter.maxPrice,
      );
    } else {
      fetchProductsForFilter(option.id, searchText);
    }

    // Exit multi-select mode when filter changes
    if (isMultiSelectMode) {
      setIsMultiSelectMode(false);
      setSelectedProducts([]);
    }
  };

  // Handle search with debouncing
  const handleSearch = (text: string) => {
    setSearchText(text);
    dispatch(setSearchTerm(text));

    // Simple debouncing
    setTimeout(() => {
      if (priceFilter) {
        fetchProductsForFilter(
          selectedFilter.id,
          text,
          priceFilter.minPrice,
          priceFilter.maxPrice,
        );
      } else {
        fetchProductsForFilter(selectedFilter.id, text);
      }
    }, 300);
  };

  // Handle refresh
  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      if (userId) {
        await Promise.all([
          dispatch(fetchFilterCounts({userId})),
          priceFilter
            ? fetchProductsForFilter(
                selectedFilter.id,
                searchText,
                priceFilter.minPrice,
                priceFilter.maxPrice,
              )
            : fetchProductsForFilter(selectedFilter.id, searchText),
        ]);
      }
    } catch (error) {
      console.error('Refresh failed:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleAddManually = () => {
    setTimeout(() => {
      navigate('Dashboard', {
        screen: 'Product',
        params: {screen: 'AddProduct'},
      });
    }, 300);
  };

  // Multi-select functions
  const activateMultiSelectMode = (productId: string) => {
    setIsMultiSelectMode(true);
    setSelectedProducts([productId]);
  };

  const exitMultiSelectMode = () => {
    setIsMultiSelectMode(false);
    setSelectedProducts([]);
  };

  const toggleProductSelection = (productId: string) => {
    setSelectedProducts(prev => {
      const isSelected = prev.includes(productId);
      const newSelection = isSelected
        ? prev.filter(id => id !== productId)
        : [...prev, productId];

      if (newSelection.length === 0) {
        setIsMultiSelectMode(false);
      }

      return newSelection;
    });
  };

  const selectAllProducts = () => {
    const allProductIds = products.map(p => p.product_id);
    setSelectedProducts(allProductIds);
  };

  const deselectAllProducts = () => {
    setSelectedProducts([]);
  };

  const handleBulkDelete = () => {
    if (selectedProducts.length === 0) {
      Alert.alert('No Selection', 'Please select products to delete.');
      return;
    }

    setShowDeleteConfirmModal(true);
  };

  const confirmBulkDelete = async () => {
    setShowDeleteConfirmModal(false);

    if (!userId) {
      Alert.alert('Error', 'Unable to delete products. Please try again.');
      return;
    }

    if (selectedProducts.length === 0) {
      return;
    }

    try {
      const result = await dispatch(
        deleteMultipleProducts({
          userId,
          productIds: selectedProducts,
        }),
      ).unwrap();

      setSelectedProducts([]);
      setIsMultiSelectMode(false);

      setTimeout(() => {
        if (userId) {
          dispatch(fetchFilterCounts({userId}));
        }
      }, 500);

      Alert.alert(
        'Success',
        `${selectedProducts.length} product${
          selectedProducts.length > 1 ? 's' : ''
        } deleted successfully`,
        [{text: 'OK', style: 'default'}],
      );
    } catch (error: any) {
      console.error('Failed to delete products:', error);

      Alert.alert(
        'Delete Failed',
        error.message || 'Failed to delete products. Please try again.',
        [
          {text: 'OK', style: 'default'},
          {
            text: 'Retry',
            onPress: () => confirmBulkDelete(),
            style: 'default',
          },
        ],
      );
    }
  };

  // Product status toggle function
  const handleToggleProductStatus = async (
    productId: string,
    isActive: boolean,
  ) => {
    if (!userId) {
      console.error('No userId available for status update');
      Alert.alert(
        'Error',
        'Unable to update product status. Please try again.',
      );
      return;
    }

    if (updatingStatus.includes(productId)) {
      return;
    }

    try {
      const result = await dispatch(
        updateProductStatus({
          userId,
          productId,
          isActive,
        }),
      ).unwrap();

      Alert.alert(
        'Success',
        `Product status updated to ${isActive ? 'Active' : 'Hidden'}`,
        [{text: 'OK', style: 'default'}],
      );

      setTimeout(() => {
        if (userId) {
          dispatch(fetchFilterCounts({userId}));
        }
      }, 500);
    } catch (error: any) {
      console.error('Failed to update product status:', error);

      Alert.alert(
        'Update Failed',
        error || 'Failed to update product status. Please try again.',
        [
          {
            text: 'OK',
            style: 'default',
          },
          {
            text: 'Retry',
            onPress: () => handleToggleProductStatus(productId, isActive),
            style: 'default',
          },
        ],
      );
    }
  };

  // Bulk status update function
  const handleBulkStatusUpdate = async (status: 'A' | 'D' | 'H') => {
    if (selectedProducts.length === 0) {
      Alert.alert('No Selection', 'Please select products to update.');
      return;
    }

    if (!userId) {
      Alert.alert('Error', 'Unable to update products. Please try again.');
      return;
    }

    const statusText =
      status === 'A' ? 'Active' : status === 'D' ? 'Hidden' : 'Archived';

    Alert.alert(
      'Update Status',
      `Are you sure you want to change ${selectedProducts.length} product${
        selectedProducts.length > 1 ? 's' : ''
      } to ${statusText}?`,
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Update',
          onPress: async () => {
            try {
              const result = await dispatch(
                updateMultipleProductsStatus({
                  userId,
                  productIds: selectedProducts,
                  status,
                }),
              ).unwrap();

              setSelectedProducts([]);
              setIsMultiSelectMode(false);

              setTimeout(() => {
                if (userId) {
                  dispatch(fetchFilterCounts({userId}));
                }
              }, 500);

              Alert.alert(
                'Success',
                `${selectedProducts.length} product${
                  selectedProducts.length > 1 ? 's' : ''
                } updated to ${statusText}`,
                [{text: 'OK', style: 'default'}],
              );
            } catch (error: any) {
              console.error('Failed to update products status:', error);

              Alert.alert(
                'Update Failed',
                error || 'Failed to update products status. Please try again.',
                [
                  {text: 'OK', style: 'default'},
                  {
                    text: 'Retry',
                    onPress: () => handleBulkStatusUpdate(status),
                    style: 'default',
                  },
                ],
              );
            }
          },
        },
      ],
    );
  };

  // NEW: Handle apply price range
  const handleApplyPriceRange = (minPrice: number, maxPrice: number) => {
    console.log('Applying price range filter:', {minPrice, maxPrice});

    setPriceRange({min: minPrice, max: maxPrice});

    dispatch(setPriceFilter({minPrice, maxPrice}));

    fetchProductsForFilter(selectedFilter.id, searchText, minPrice, maxPrice);

    setIsPriceModalVisible(false);
  };

  // NEW: Handle clear price filter
  const handleClearPriceFilter = () => {
    console.log('Clearing price filter');

    setPriceRange({min: 0, max: 1000});

    dispatch(clearPriceFilter());

    fetchProductsForFilter(selectedFilter.id, searchText);
  };

  // Delete confirmation modal buttons
  const deleteConfirmButtons: ButtonConfig[] = [
    {
      text: `Delete ${selectedProducts.length} Product${
        selectedProducts.length > 1 ? 's' : ''
      }`,
      onPress: confirmBulkDelete,
      variant: ButtonVariant.PRIMARY,
      state: ButtonState.DEFAULT,
      size: ButtonSize.MEDIUM,
      customStyles: {backgroundColor: ColorPalette.RED_100},
      textVariant: TypographyVariant.LMEDIUM_EXTRASEMIBOLD,
    },
    {
      text: 'Cancel',
      onPress: () => setShowDeleteConfirmModal(false),
      variant: ButtonVariant.PRIMARY,
      state: ButtonState.DEFAULT,
      type: ButtonType.OUTLINED,
      size: ButtonSize.MEDIUM,
      customStyles: {borderWidth: 1},
      textVariant: TypographyVariant.LMEDIUM_EXTRASEMIBOLD,
    },
  ];

  const searchBarHeight = getScreenHeight(6);

  const getEmptyStateMessage = () => {
    if (searchText.trim()) {
      return (
        <View style={styles.emptyMessageContainer}>
          <Image
            source={require('../../../assets/images/emptyBox.png')}
            style={styles.emptyBoxPng}
          />{' '}
          <Typography
            text={`No products found for "${searchText}"`}
            variant={TypographyVariant.LMEDIUM_REGULAR}
            customTextStyles={styles.emptyStateText}
          />
        </View>
      );
    }

    switch (selectedFilter.id) {
      case 'all':
        return (
          <View style={styles.emptyMessageContainer}>
            <Image
              source={require('../../../assets/images/emptyBox.png')}
              style={styles.emptyBoxPng}
            />
            <View style={styles.textContainer}>
              <Typography
                text="No products listed!"
                variant={TypographyVariant.LMEDIUM_BOLD}
                customTextStyles={styles.emptyStateText}
              />
              <Typography
                text="Add a product to start selling."
                variant={TypographyVariant.LSMALL_REGULAR}
                customTextStyles={styles.emptyStateText}
              />
            </View>
          </View>
        );
      case 'active':
        return (
          <View style={styles.emptyMessageContainer}>
            <Image
              source={require('../../../assets/images/emptyBox.png')}
              style={styles.emptyBoxPng}
            />
            <View style={styles.textContainer}>
              <Typography
                text="No active products listed!"
                variant={TypographyVariant.PMEDIUM_SEMIBOLD}
                customTextStyles={styles.emptyStateText}
              />
            </View>
          </View>
        );
      case 'lowStock':
        return (
          <View style={styles.emptyMessageContainer}>
            <Image
              source={require('../../../assets/images/emptyBox.png')}
              style={styles.emptyBoxPng}
            />
            <Typography
              text="No low stocks products found"
              variant={TypographyVariant.PMEDIUM_SEMIBOLD}
              customTextStyles={styles.emptyStateText}
            />
          </View>
        );
      case 'pending':
        return (
          <View style={styles.emptyMessageContainer}>
            <Image
              source={require('../../../assets/images/emptyBox.png')}
              style={styles.emptyBoxPng}
            />
            <Typography
              text="No pending products found"
              variant={TypographyVariant.PMEDIUM_SEMIBOLD}
              customTextStyles={styles.emptyStateText}
            />
          </View>
        );
      case 'disabled':
        return (
          <View style={styles.emptyMessageContainer}>
            <Image
              source={require('../../../assets/images/emptyBox.png')}
              style={styles.emptyBoxPng}
            />
            <Typography
              text="No hidden products found"
              variant={TypographyVariant.PMEDIUM_SEMIBOLD}
              customTextStyles={styles.emptyStateText}
            />
          </View>
        );
      default:
        return (
          <View style={styles.emptyMessageContainer}>
            <Image
              source={require('../../../assets/images/emptyBox.png')}
              style={styles.emptyBoxPng}
            />
            <Typography
              text="No products found"
              variant={TypographyVariant.PMEDIUM_SEMIBOLD}
              customTextStyles={styles.emptyStateText}
            />
          </View>
        );
    }
  };

  const getEmptyStateAction = () => {
    return selectedFilter.id === 'all' && !searchText.trim();
  };

  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: ColorPalette.SearchBack}}
      edges={['top', 'bottom']}>
      <Header
        name={
          isMultiSelectMode ? `${selectedProducts.length} Selected` : 'Products'
        }
        variant={TypographyVariant.H6_BOLD}
        textColor={ColorPalette.AgreeTerms}
        leftIcon={
          isMultiSelectMode ? (
            <TouchableOpacity onPress={exitMultiSelectMode}>
              <Typography
                text="Cancel"
                variant={TypographyVariant.LMEDIUM_MEDIUM}
                customTextStyles={{color: ColorPalette.PURPLE_300}}
              />
            </TouchableOpacity>
          ) : undefined
        }
        rightIcons={[
          {
            icon: BellIcon,
            onPress: () =>
              navigate('Dashboard', {
                screen: 'Account',
                params: {screen: 'NotificationScreen'},
              }),
            size: 22,
            color: ColorPalette.IconColor,
            strokeWidth: 1.5,
          },
          {
            icon: FilterIcon,
            onPress: () => setIsPriceModalVisible(true),
            size: 24,
            color: priceFilter
              ? ColorPalette.PURPLE_300
              : ColorPalette.IconColor,
            strokeWidth: 1.5,
          },
        ]}
      />

      <View style={styles.searchContainer}>
        <SearchBox
          value={searchText}
          onChangeText={handleSearch}
          placeholder="Search products..."
          customContainerStyle={{
            flex: 1,
            height: searchBarHeight,
          }}
        />

        {isMultiSelectMode && (
          <View style={{flexDirection: 'row', gap: getScreenWidth(2)}}>
            {selectedProducts.length > 0 && (
              <Button
                text={`Delete (${selectedProducts.length})`}
                type={ButtonType.PRIMARY}
                variant={ButtonVariant.PRIMARY}
                size={ButtonSize.MEDIUM}
                state={ButtonState.DEFAULT}
                customStyles={{
                  height: searchBarHeight,
                  paddingHorizontal: getScreenWidth(3),
                  backgroundColor: ColorPalette.RED_100,
                }}
                IconComponent={() => (
                  <TrashIcon
                    color={ColorPalette.White}
                    strokeWidth={2}
                    size={20}
                  />
                )}
                iconPosition="left"
                onPress={handleBulkDelete}
                textVariant={TypographyVariant.PMEDIUM_SEMIBOLD}
              />
            )}

            <Button
              text={
                selectedProducts.length === products.length
                  ? 'Deselect All'
                  : 'Select All'
              }
              type={ButtonType.OUTLINED}
              variant={ButtonVariant.PRIMARY}
              size={ButtonSize.MEDIUM}
              state={ButtonState.DEFAULT}
              customStyles={{
                height: searchBarHeight,
                paddingHorizontal: getScreenWidth(3),
                borderColor: ColorPalette.PURPLE_300,
              }}
              onPress={
                selectedProducts.length === products.length
                  ? deselectAllProducts
                  : selectAllProducts
              }
              textVariant={TypographyVariant.PMEDIUM_SEMIBOLD}
            />
          </View>
        )}
      </View>

      {/* NEW: Active price filter indicator */}
      {priceFilter && (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: getScreenWidth(4),
            paddingVertical: getScreenHeight(1),
            backgroundColor: '#F3E8FF',
            borderBottomWidth: 1,
            borderBottomColor: ColorPalette.GREY_100,
          }}>
          <Typography
            text={`Price: €${priceFilter.minPrice} - €${priceFilter.maxPrice}`}
            variant={TypographyVariant.PSMALL_MEDIUM}
            customTextStyles={{color: ColorPalette.PURPLE_300}}
          />
          <TouchableOpacity onPress={handleClearPriceFilter}>
            <Typography
              text="Clear"
              variant={TypographyVariant.PSMALL_SEMIBOLD}
              customTextStyles={{color: ColorPalette.RED_100}}
            />
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.slidingBarsContainer}>
        <SlidingBar
          options={filterOptions}
          selectedOption={selectedFilter}
          onOptionSelect={handleFilterSelect}
        />
      </View>

      {isMultiSelectMode && selectedProducts.length > 0 && (
        <View
          style={{
            flexDirection: 'row',
            gap: getScreenWidth(2),
            paddingHorizontal: getScreenWidth(4),
            paddingVertical: getScreenHeight(1),
            backgroundColor: ColorPalette.White,
            borderBottomWidth: 1,
            borderBottomColor: ColorPalette.GREY_100,
          }}>
          <Button
            text="Make Active"
            type={ButtonType.OUTLINED}
            variant={ButtonVariant.PRIMARY}
            size={ButtonSize.SMALL}
            state={ButtonState.DEFAULT}
            customStyles={{
              borderColor: ColorPalette.GREEN_200,
              paddingHorizontal: getScreenWidth(3),
            }}
            onPress={() => handleBulkStatusUpdate('A')}
            textVariant={TypographyVariant.PSMALL_SEMIBOLD}
          />

          <Button
            text="Hide"
            type={ButtonType.OUTLINED}
            variant={ButtonVariant.PRIMARY}
            size={ButtonSize.SMALL}
            state={ButtonState.DEFAULT}
            customStyles={{
              borderColor: ColorPalette.GREY_400,
              paddingHorizontal: getScreenWidth(3),
            }}
            onPress={() => handleBulkStatusUpdate('D')}
            textVariant={TypographyVariant.PSMALL_SEMIBOLD}
          />
        </View>
      )}

      {loading && !isRefreshing ? (
        <View style={styles.loadingContainer}>
          <AnimatedLoader size={52} />
          <Typography
            text="Loading"
            variant={TypographyVariant.PSMALL_MEDIUM}
            customTextStyles={{
              color: ColorPalette.PRIMARY_GRADIENT_SELLER.colors[0],
              marginTop: getScreenHeight(1),
            }}
          />
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Typography
            text={error}
            variant={TypographyVariant.LMEDIUM_REGULAR}
            customTextStyles={{
              color: ColorPalette.RED_100,
              textAlign: 'center',
              marginBottom: getScreenHeight(2),
            }}
          />
          <Button
            text="Retry"
            variant={ButtonVariant.PRIMARY}
            state={ButtonState.DEFAULT}
            size={ButtonSize.MEDIUM}
            onPress={handleRefresh}
            customStyles={styles.retryButton}
          />
        </View>
      ) : (
        <ScrollView
          style={styles.mainContainer}
          contentContainerStyle={[
            styles.scrollContent,
            {paddingBottom: getScreenHeight(12)},
          ]}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
              colors={[ColorPalette.PURPLE_300]}
              tintColor={ColorPalette.PURPLE_300}
            />
          }>
          <View style={styles.ProductContainer}>
            {products && products.length > 0 ? (
              products.map(product => {
                const isUpdatingThisProduct = updatingStatus.includes(
                  product.product_id,
                );
                const isSelected = selectedProducts.includes(
                  product.product_id,
                );
                const isBeingDeleted = deletingProducts.includes(
                  product.product_id,
                );

                const productData = {
                  productId: product.product_id,
                  productName: product.product,
                  price: product.price,
                  category: product.category || '',
                  subcategory: '',
                  description:
                    product.full_description || product.short_description || '',
                  images: product.image_url ? [product.image_url] : [],
                  productCode: product.product_id,
                  quantity: product.amount.toString(),
                  minQuantity: product.min_qty?.toString() || '',
                  maxQuantity: product.max_qty?.toString() || '',
                  trackInventory: product.amount > 0,
                  taxType: 'VAT',
                  brand: product.company_name || '',
                  color: '',
                  size: '',
                  weight: '',
                  manufacturer: product.company_name || '',
                  countryOfOrigin: '',
                  status: product.status,
                  listPrice: product.list_price,
                  formatListPrice: product.format_list_price,
                  productType: product.product_type,
                  companyId: product.company_id,
                  isReturnable: product.is_returnable,
                  returnPeriod: product.return_period,
                  averageRating: product.average_rating,
                  ageVerification: product.age_verification,
                  ageLimit: product.age_limit,
                  statusDetails: product.status_details,
                };

                return (
                  <View key={product.product_id} style={{position: 'relative'}}>
                    {isMultiSelectMode && (
                      <TouchableOpacity
                        style={{
                          position: 'absolute',
                          top: getScreenWidth(2),
                          left: getScreenWidth(2),
                          zIndex: 10,
                          width: getScreenWidth(8),
                          height: getScreenWidth(8),
                          borderRadius: getScreenWidth(4),
                          backgroundColor: isSelected
                            ? ColorPalette.PURPLE_300
                            : ColorPalette.White,
                          borderWidth: 2,
                          borderColor: isSelected
                            ? ColorPalette.PURPLE_300
                            : ColorPalette.GREY_200,
                          justifyContent: 'center',
                          alignItems: 'center',
                          shadowColor: '#000',
                          shadowOffset: {width: 0, height: 2},
                          shadowOpacity: 0.1,
                          shadowRadius: 4,
                          elevation: 3,
                        }}
                        onPress={() =>
                          toggleProductSelection(product.product_id)
                        }>
                        {isSelected && (
                          <CheckIcon size={16} color={ColorPalette.White} />
                        )}
                      </TouchableOpacity>
                    )}

                    <ProductInfo
                      productId={product.product_id}
                      orderImage={product.image_url}
                      productName={product.product}
                      sellerPrice={product.format_price}
                      platformFee="€0.00"
                      stock={product.amount.toString()}
                      active={product.status === 'A'}
                      productData={productData}
                      onActiveChange={isActive =>
                        !isMultiSelectMode &&
                        !isUpdatingThisProduct &&
                        handleToggleProductStatus(product.product_id, isActive)
                      }
                      onShare={() => console.log(`Share ${product.product}`)}
                      onMoreOptions={() =>
                        console.log(`More options for ${product.product}`)
                      }
                      onLongPress={activateMultiSelectMode}
                      style={[
                        isUpdatingThisProduct || isBeingDeleted
                          ? {opacity: 0.7}
                          : undefined,
                        isSelected
                          ? {
                              borderColor: ColorPalette.PURPLE_300,
                              borderWidth: 2,
                              marginHorizontal: getScreenWidth(1),
                            }
                          : undefined,
                      ]}
                      disabled={isUpdatingThisProduct || isBeingDeleted}
                    />

                    {isUpdatingThisProduct && (
                      <View
                        style={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: [{translateX: -12}, {translateY: -12}],
                          zIndex: 5,
                        }}>
                        <ActivityIndicator
                          size="small"
                          color={ColorPalette.PURPLE_300}
                        />
                      </View>
                    )}
                  </View>
                );
              })
            ) : (
              <View style={styles.emptyStateContainer}>
                {getEmptyStateMessage()}
                {getEmptyStateAction() && (
                  <Button
                    IconComponent={PlusIcon}
                    iconProps={{
                      size: 30,
                      color: ColorPalette.White,
                      strokeWidth: 2.5,
                    }}
                    text="ADD NEW PRODUCT"
                    variant={ButtonVariant.PRIMARY}
                    state={ButtonState.DEFAULT}
                    size={ButtonSize.MEDIUM}
                    onPress={() => handleAddManually()}
                    customStyles={{
                      minWidth: getScreenWidth(70),
                    }}
                  />
                )}
              </View>
            )}
          </View>
        </ScrollView>
      )}

      <AddModal
        isVisible={showDeleteConfirmModal}
        onClose={() => setShowDeleteConfirmModal(false)}
        headerText="Delete Products"
        buttons={deleteConfirmButtons}
      />

      <PriceRangeModal
        isVisible={isPriceModalVisible}
        onClose={handleClosePriceModal}
        onApply={handleApplyPriceRange}
        initialMinPrice={priceRange.min}
        initialMaxPrice={priceRange.max}
        minValue={0}
        maxValue={1000}
        currency="€"
        headerText="Filter by Price"
        step={10}
      />

      {!isMultiSelectMode &&
        (products.length > 0 || selectedFilter.id === 'active') && (
          <TouchableOpacity
            style={styles.floatingButtonWithText}
            onPress={() => handleAddManually()}
            activeOpacity={0.8}>
            <PlusIcon size={36} color={ColorPalette.White} strokeWidth={2.5} />
            <Typography
              text="Add Product"
              variant={TypographyVariant.LMEDIUM_BOLD}
              customTextStyles={styles.addProductText}
            />
          </TouchableOpacity>
        )}
    </SafeAreaView>
  );
};

export default ProductScreen;

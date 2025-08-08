import {useSelector, useDispatch} from 'react-redux';
import {useEffect} from 'react';
import {RootState, AppDispatch} from '../redux/store';
import {fetchInitializer} from '../redux/slices/initializerSlice';
import {cleanUrl} from '../config/regex';

export const useAppConfig = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {data, loading, error, lastFetched} = useSelector(
    (state: RootState) => state.initializer,
  );

  useEffect(() => {
    // Fetch initializer data if not already loaded or if it's older than 1 hour
    if (!data || (lastFetched && Date.now() - lastFetched > 3600000)) {
      dispatch(fetchInitializer());
    }
  }, [dispatch, data, lastFetched]);

  const config = data?.application_config;

  return {
    // App configuration flags
    isSignupAllowed: config?.is_signup_allowed ?? true,
    isSettingEnabled: config?.is_setting_enable ?? false,
    isBookingEnabled: config?.is_booking_enable ?? false,
    isAuctionEnabled: config?.is_auction_enable ?? true,
    isLanguageChangeEnabled: config?.is_change_language_enable ?? true,
    isStorefrontChangeEnabled: config?.is_change_storefront_enable ?? false,
    isSellerPromotionEnabled: config?.is_seller_promotion_enable ?? true,
    isWalletEnabled: config?.is_wallet_enable ?? true,
    isBlogEnabled: config?.is_blog_enable ?? false,
    isDarkModeEnabled: config?.is_dark_mode_enable ?? false,
    isDarkMode: config?.is_dark_mode ?? true,
    isBiometricEnabled: config?.is_biomatric_enable ?? false,
    isYoutubeEnabled: config?.is_youtube_enable ?? true,
    isProductFilterEnabled: config?.is_product_filter_enable ?? false,
    isOrderFilterEnabled: config?.is_order_filter_enable ?? false,
    isChatEnabled: config?.is_chat_enable ?? true,
    isOrderEnabled: config?.is_order_enable ?? true,
    isProductEnabled: config?.is_product_enable ?? true,
    isDashboardEnabled: config?.is_dashboard ?? true,
    isForgotPasswordEnabled: config?.is_forgot_password_enable ?? true,
    isBlockEnabled: config?.is_block_enable ?? false,
    isChatArchiveEnabled: config?.is_chat_archive_enable ?? true,
    isChatAttachmentEnabled: config?.is_chat_attachment_enable ?? true,
    isChatDeleteEnabled: config?.is_chat_delete_enable ?? true,
    isCompanyProfileEnabled: config?.is_company_profile_enable ?? true,

    // Other data with cleaned URLs
    languages: data?.languages ?? [],
    platformFees: data?.platform_fee ?? [],
    termsUrl: data?.terms_of_use_page ?? '', // Already cleaned in slice
    privacyUrl: data?.privacy_policy_page ?? '', // Already cleaned in slice
    whatsappUrl: data?.whatsapp_url ?? '', // Already cleaned in slice
    defaultLanguage: data?.default_language ?? 'en',
    storefronts: data?.storefronts ?? [],

    // State
    loading,
    error,

    // Actions
    refetchConfig: () => dispatch(fetchInitializer()),
  };
};

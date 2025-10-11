// src/screens/DashBoardScreens/AccountScreen/AccountOptionScreens/PersonalInfo/LogoTab.tsx

import React, {useState, useEffect, useRef} from 'react';
import {
  ScrollView,
  View,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  launchImageLibrary,
  ImagePickerResponse,
} from 'react-native-image-picker';
import {Typography} from '../../../../../../components/UserComponents/Typography/Typography';
import {TypographyVariant} from '../../../../../../components/UserComponents/Typography/Typography.types';
import {ColorPalette} from '../../../../../../config/colorPalette';
import CloudDownloadIcon from '../../../../../../assets/icons/CloudDownloadIcon';
import {styles} from '../PerosanlInfo.styles';
import {containerStyles} from '../../CompanyProfilePages/ImageContainer.styles';
import {getScreenHeight} from '../../../../../../helpers/screenSize';
import {RootState, AppDispatch} from '../../../../../../redux/store';
import {
  uploadCompanyLogo,
  fetchProfileLogos,
  fetchProfile,
} from '../../../../../../redux/slices/profileSlice';
import Svg, {Circle, Path} from 'react-native-svg';

const InfoIcon = () => (
  <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <Circle
      cx="9.99984"
      cy="9.99996"
      r="8.33333"
      stroke="#4A4A4A"
      strokeWidth="1.5"
    />
    <Path
      d="M9.99325 12.5H10.0007"
      stroke="#4A4A4A"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M10 10L10 6.66667"
      stroke="#4A4A4A"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const LogoTab: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const userData = useSelector((state: RootState) => state.auth.userData);
  const {uploadingLogo, logoUploadError, rawProfileData} = useSelector(
    (state: RootState) => state.profile,
  );

  const [companyLogoUri, setCompanyLogoUri] = useState<string | null>(null);
  const [invoiceLogoUri, setInvoiceLogoUri] = useState<string | null>(null);
  const [uploadingType, setUploadingType] = useState<'theme' | 'mail' | null>(
    null,
  );

  // Track if we've already processed the profile data
  const processedRef = useRef(false);

  // Extract logo URLs from the raw profile data - ONLY when rawProfileData changes
  useEffect(() => {
    if (!rawProfileData?.sections || processedRef.current) {
      return;
    }

    console.log('🔍 Extracting logos from rawProfileData');
    processedRef.current = true;

    const logoSection = rawProfileData.sections.find(
      section => section.section_type === 'profile_logo',
    );

    if (logoSection?.blocks?.[0]?.fields?.[0]?.logos) {
      const logosData = logoSection.blocks[0].fields[0].logos;

      console.log('📦 Logos data:', logosData);

      // Extract theme logo
      if (logosData.theme) {
        console.log('🎨 Theme logo data:', logosData.theme);

        if (
          logosData.theme.image &&
          Array.isArray(logosData.theme.image) &&
          logosData.theme.image.length > 0
        ) {
          const themeImage = logosData.theme.image[0];
          console.log('🖼️ Theme image object:', themeImage);

          const imagePath =
            themeImage?.detailed?.image_path ||
            themeImage?.icon?.image_path ||
            themeImage?.image_path ||
            themeImage?.http_image_path;

          if (imagePath) {
            const fullUrl = imagePath.startsWith('http')
              ? imagePath
              : `https://dev.surf.mt/${imagePath}`;
            console.log('✅ Setting company logo URL:', fullUrl);
            setCompanyLogoUri(fullUrl);
          }
        }
      }

      // Extract mail logo
      if (logosData.mail) {
        console.log('📧 Mail logo data:', logosData.mail);

        if (
          logosData.mail.image &&
          Array.isArray(logosData.mail.image) &&
          logosData.mail.image.length > 0
        ) {
          const mailImage = logosData.mail.image[0];
          console.log('🖼️ Mail image object:', mailImage);

          const imagePath =
            mailImage?.detailed?.image_path ||
            mailImage?.icon?.image_path ||
            mailImage?.image_path ||
            mailImage?.http_image_path;

          if (imagePath) {
            const fullUrl = imagePath.startsWith('http')
              ? imagePath
              : `https://dev.surf.mt/${imagePath}`;
            console.log('✅ Setting invoice logo URL:', fullUrl);
            setInvoiceLogoUri(fullUrl);
          }
        }
      }
    }

    // Reset the ref when profile data changes
    return () => {
      processedRef.current = false;
    };
  }, [rawProfileData]);

  const handleImagePicker = (logoType: 'theme' | 'mail') => {
    console.log('📸 Opening image picker for:', logoType);

    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 0.8,
        maxWidth: 1024,
        maxHeight: 1024,
        includeBase64: false,
      },
      (response: ImagePickerResponse) => {
        if (response.didCancel) {
          console.log('❌ User cancelled image picker');
          return;
        }

        if (response.errorMessage) {
          console.error('❌ Image picker error:', response.errorMessage);
          Alert.alert('Error', response.errorMessage);
          return;
        }

        if (response.assets && response.assets.length > 0) {
          const asset = response.assets[0];
          console.log('✅ Image selected:', {
            uri: asset.uri,
            fileName: asset.fileName,
            type: asset.type,
            fileSize: asset.fileSize,
          });

          if (asset.uri) {
            handleUploadLogo(asset.uri, logoType);
          }
        }
      },
    );
  };

  const handleUploadLogo = async (uri: string, logoType: 'theme' | 'mail') => {
    if (!userData?.user_id) {
      Alert.alert('Error', 'User not found. Please login again.');
      return;
    }

    console.log('🚀 Starting logo upload:', {
      uri,
      logoType,
      userId: userData.user_id,
    });
    setUploadingType(logoType);

    try {
      const result = await dispatch(
        uploadCompanyLogo({
          userId: userData.user_id,
          logoUri: uri,
          logoType: logoType,
        }),
      ).unwrap();

      console.log('✅ Upload successful, result:', result);

      // Refresh profile data to get the updated logo
      // Reset the processed ref so we extract logos again
      processedRef.current = false;
      await dispatch(fetchProfile(userData.user_id));

      Alert.alert(
        'Success',
        `${
          logoType === 'theme' ? 'Company' : 'Invoice'
        } logo uploaded successfully`,
      );
    } catch (error: any) {
      console.error('❌ Upload failed:', error);
      Alert.alert(
        'Upload Failed',
        error.message || 'Failed to upload logo. Please try again.',
      );
    } finally {
      setUploadingType(null);
    }
  };

  const renderLogoImage = (uri: string | null, defaultImage: any) => {
    if (uri && uri.startsWith('http')) {
      return (
        <Image
          source={{uri}}
          style={containerStyles.image}
          resizeMode="contain"
          onError={error => {
            console.error('❌ Image load error:', error.nativeEvent.error);
          }}
          onLoad={() => {
            console.log('✅ Image loaded successfully:', uri);
          }}
        />
      );
    }
    return (
      <Image
        source={defaultImage}
        style={containerStyles.image}
        resizeMode="contain"
      />
    );
  };

  return (
    <ScrollView
      style={styles.mainContainer}
      contentContainerStyle={[
        styles.scrollContent,
        {paddingTop: getScreenHeight(2)},
      ]}
      showsVerticalScrollIndicator={false}>
      <View style={styles.imageContainer}>
        <View style={{flexDirection: 'row', gap: 5, marginBottom: 25}}>
          <Typography
            text="Upload Logo"
            variant={TypographyVariant.LMEDIUM_EXTRABOLD}
            customTextStyles={{color: ColorPalette.GREY_TEXT_500}}
          />
          <InfoIcon />
        </View>

        <View style={containerStyles.wrapper}>
          {/* Company Logo Section */}
          <View style={containerStyles.logoContainer}>
            <View style={containerStyles.imageWrapper}>
              {renderLogoImage(
                companyLogoUri,
                require('../../../../../../assets/images/companyProfile.png'),
              )}
              <TouchableOpacity
                style={containerStyles.editButton}
                onPress={() => handleImagePicker('theme')}
                disabled={uploadingLogo && uploadingType === 'theme'}>
                {uploadingLogo && uploadingType === 'theme' ? (
                  <ActivityIndicator
                    size="small"
                    color={ColorPalette.Primary}
                  />
                ) : (
                  <CloudDownloadIcon
                    size={18}
                    color={ColorPalette.GREY_TEXT_400}
                  />
                )}
              </TouchableOpacity>
            </View>
            <Typography
              text="Company logo"
              variant={TypographyVariant.LMEDIUM_REGULAR}
              customTextStyles={containerStyles.labelText}
            />
          </View>

          <View style={containerStyles.divider} />

          {/* Invoice Logo Section */}
          <View style={containerStyles.logoContainer}>
            <View style={containerStyles.imageWrapper}>
              {renderLogoImage(
                invoiceLogoUri,
                require('../../../../../../assets/images/invoiceLogo.png'),
              )}
              <TouchableOpacity
                style={containerStyles.editButton}
                onPress={() => handleImagePicker('mail')}
                disabled={uploadingLogo && uploadingType === 'mail'}>
                {uploadingLogo && uploadingType === 'mail' ? (
                  <ActivityIndicator
                    size="small"
                    color={ColorPalette.Primary}
                  />
                ) : (
                  <CloudDownloadIcon
                    size={18}
                    color={ColorPalette.GREY_TEXT_400}
                  />
                )}
              </TouchableOpacity>
            </View>

            <Typography
              text="Invoice logo"
              variant={TypographyVariant.LMEDIUM_REGULAR}
              customTextStyles={containerStyles.labelText}
            />
          </View>
        </View>

        {/* Error Message */}
        {logoUploadError && (
          <View style={{marginTop: 16}}>
            <Typography
              text={logoUploadError}
              variant={TypographyVariant.PSMALL_REGULAR}
              customTextStyles={{color: ColorPalette.RED_100}}
            />
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default LogoTab;

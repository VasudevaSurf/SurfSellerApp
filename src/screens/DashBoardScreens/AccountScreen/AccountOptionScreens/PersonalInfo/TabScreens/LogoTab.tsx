// src/screens/DashBoardScreens/AccountScreen/AccountOptionScreens/PersonalInfo/TabScreens/LogoTab.tsx

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
import {fetchProfile} from '../../../../../../redux/slices/profileSlice';
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

// ✅ UPDATED: Production authorization header
const API_AUTH_HEADER =
  'Basic YWRtaW5Ac3VyZi5tdDpSMlZXbjE2N1VaUFc2Y3VLNDEwMWdCMTM2UTk0UFQ2SA==';

const LogoTab: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const userData = useSelector((state: RootState) => state.auth.userData);
  const {rawProfileData} = useSelector((state: RootState) => state.profile);

  const [companyLogoUri, setCompanyLogoUri] = useState<string | null>(null);
  const [invoiceLogoUri, setInvoiceLogoUri] = useState<string | null>(null);
  const [uploadingType, setUploadingType] = useState<'theme' | 'mail' | null>(
    null,
  );

  const [themeLogoId, setThemeLogoId] = useState<string | null>(null);
  const [mailLogoId, setMailLogoId] = useState<string | null>(null);

  const processedRef = useRef(false);

  // Extract logo URLs AND logo IDs from profile data
  useEffect(() => {
    if (!rawProfileData?.sections || processedRef.current) {
      return;
    }

    console.log('🔍 Extracting logos and logo IDs from rawProfileData');
    processedRef.current = true;

    const logoSection = rawProfileData.sections.find(
      section => section.section_type === 'profile_logo',
    );

    if (logoSection?.blocks?.[0]?.fields?.[0]?.logos) {
      const logosData = logoSection.blocks[0].fields[0].logos;

      console.log('📦 Full logos data:', JSON.stringify(logosData, null, 2));

      // Extract theme logo and logo_id
      if (logosData.theme) {
        console.log('🎨 Theme logo data:', logosData.theme);

        if (logosData.theme.logo_id) {
          setThemeLogoId(logosData.theme.logo_id);
          console.log('✅ Theme logo_id extracted:', logosData.theme.logo_id);
        }

        if (logosData.theme.image) {
          const themeImage = logosData.theme.image;
          const imagePath =
            themeImage.image_path ||
            themeImage.http_image_path ||
            themeImage.https_image_path;

          if (imagePath) {
            // ✅ UPDATED: Production URL
            const fullUrl = imagePath.startsWith('http')
              ? imagePath
              : `https://surf.mt/${imagePath}`;
            console.log('✅ Setting company logo URL:', fullUrl);
            setCompanyLogoUri(fullUrl);
          }
        }
      }

      // Extract mail logo and logo_id
      if (logosData.mail) {
        console.log('📧 Mail logo data:', logosData.mail);

        if (logosData.mail.logo_id) {
          setMailLogoId(logosData.mail.logo_id);
          console.log('✅ Mail logo_id extracted:', logosData.mail.logo_id);
        }

        if (logosData.mail.image) {
          const mailImage = logosData.mail.image;
          const imagePath =
            mailImage.image_path ||
            mailImage.http_image_path ||
            mailImage.https_image_path;

          if (imagePath) {
            // ✅ UPDATED: Production URL
            const fullUrl = imagePath.startsWith('http')
              ? imagePath
              : `https://surf.mt/${imagePath}`;
            console.log('✅ Setting invoice logo URL:', fullUrl);
            setInvoiceLogoUri(fullUrl);
          }
        }
      }

      console.log('📊 Extracted Logo IDs:', {
        theme: themeLogoId,
        mail: mailLogoId,
      });
    }

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
        maxWidth: 1200,
        maxHeight: 400,
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
            handleUploadLogo(asset.uri, asset.fileName, asset.type, logoType);
          }
        }
      },
    );
  };

  const handleUploadLogo = async (
    uri: string,
    fileName: string | undefined,
    mimeType: string | undefined,
    logoType: 'theme' | 'mail',
  ) => {
    if (!userData?.user_id) {
      Alert.alert('Error', 'User not found. Please login again.');
      return;
    }

    const objectId = logoType === 'theme' ? themeLogoId : mailLogoId;

    if (!objectId) {
      console.error('❌ Logo ID not found for type:', logoType);
      Alert.alert(
        'Error',
        'Logo information not loaded. Please refresh and try again.',
      );
      return;
    }

    console.log('🚀 Starting logo upload:', {
      uri,
      logoType,
      userId: userData.user_id,
      objectId: objectId,
    });

    setUploadingType(logoType);

    // 🔥 STEP 1: Show image immediately (optimistic update)
    console.log('⚡ Immediate UI update - showing selected image');
    if (logoType === 'theme') {
      setCompanyLogoUri(uri);
    } else {
      setInvoiceLogoUri(uri);
    }

    try {
      const formData = new FormData();

      const actualFileName = fileName || `logo_${logoType}_${Date.now()}.jpg`;
      const actualMimeType = mimeType || 'image/jpeg';

      console.log('📋 Upload details:', {
        fileName: actualFileName,
        mimeType: actualMimeType,
        logoType,
        objectId,
        userId: userData.user_id,
      });

      formData.append(`file_logotypes_image_icon[${logoType}]`, {
        uri: uri,
        type: actualMimeType,
        name: actualFileName,
      } as any);

      formData.append(`type_logotypes_image_icon[${logoType}]`, 'local');
      formData.append(`is_high_res_logotypes_image_icon[${logoType}]`, '');
      formData.append(`logotypes_image_data[${logoType}][type]`, 'M');
      formData.append(`logotypes_image_data[${logoType}][object_id]`, objectId);
      formData.append(
        `logotypes_image_data[${logoType}][image_alt]`,
        logoType === 'theme' ? 'Company Logo' : 'Invoice Logo',
      );
      formData.append('user_id', userData.user_id);
      formData.append('logo_update', '1');

      console.log('📤 Uploading to server...');

      // ✅ UPDATED: Production URL
      const response = await fetch(
        'https://surf.mt/api.php?_d=NtSeProfilesApi',
        {
          method: 'POST',
          headers: {
            Authorization: API_AUTH_HEADER,
          },
          body: formData,
        },
      );

      const responseText = await response.text();
      console.log('📥 Upload response:', {
        status: response.status,
        responseText: responseText.substring(0, 500),
      });

      if (!response.ok) {
        // 🔥 Revert optimistic update on error
        console.error('❌ Upload failed, reverting image');
        throw new Error(`HTTP ${response.status}: Failed to upload logo`);
      }

      let responseData;
      try {
        responseData = JSON.parse(responseText);
      } catch (parseError) {
        if (response.status === 200) {
          console.log('✅ Upload successful (200 status)');
          responseData = {result: true, message: 'Logo uploaded successfully'};
        } else {
          throw new Error('Failed to parse response');
        }
      }

      if (responseData.result) {
        console.log('✅ Logo uploaded successfully to server');

        // 🔥 STEP 2: Refresh profile data in background (silent)
        console.log('🔄 Refreshing profile data in background...');
        processedRef.current = false;
        dispatch(fetchProfile(userData.user_id));

        // 🔥 STEP 3: Show success message
        Alert.alert(
          'Success',
          `${
            logoType === 'theme' ? 'Company' : 'Invoice'
          } logo uploaded successfully`,
        );
      } else {
        throw new Error(responseData.message || 'Upload failed');
      }
    } catch (error: any) {
      console.error('❌ Upload failed:', error);

      // 🔥 Revert optimistic update on error
      console.log('⏪ Reverting to previous image state');
      if (logoType === 'theme') {
        // Try to restore from rawProfileData
        const logoSection = rawProfileData?.sections?.find(
          section => section.section_type === 'profile_logo',
        );
        const previousImage =
          logoSection?.blocks?.[0]?.fields?.[0]?.logos?.theme?.image;
        const previousPath =
          previousImage?.image_path || previousImage?.http_image_path;

        if (previousPath) {
          // ✅ UPDATED: Production URL
          const fullUrl = previousPath.startsWith('http')
            ? previousPath
            : `https://surf.mt/${previousPath}`;
          setCompanyLogoUri(fullUrl);
        } else {
          setCompanyLogoUri(null);
        }
      } else {
        // Try to restore from rawProfileData
        const logoSection = rawProfileData?.sections?.find(
          section => section.section_type === 'profile_logo',
        );
        const previousImage =
          logoSection?.blocks?.[0]?.fields?.[0]?.logos?.mail?.image;
        const previousPath =
          previousImage?.image_path || previousImage?.http_image_path;

        if (previousPath) {
          // ✅ UPDATED: Production URL
          const fullUrl = previousPath.startsWith('http')
            ? previousPath
            : `https://surf.mt/${previousPath}`;
          setInvoiceLogoUri(fullUrl);
        } else {
          setInvoiceLogoUri(null);
        }
      }

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

    // 🔥 Handle local file URIs (file://)
    if (uri && uri.startsWith('file://')) {
      return (
        <Image
          source={{uri}}
          style={containerStyles.image}
          resizeMode="contain"
          onError={error => {
            console.error(
              '❌ Local image load error:',
              error.nativeEvent.error,
            );
          }}
          onLoad={() => {
            console.log('✅ Local image loaded:', uri);
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
                disabled={uploadingType === 'theme' || !themeLogoId}>
                {uploadingType === 'theme' ? (
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
                disabled={uploadingType === 'mail' || !mailLogoId}>
                {uploadingType === 'mail' ? (
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
      </View>
    </ScrollView>
  );
};

export default LogoTab;

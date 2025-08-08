import React, {useState, useEffect} from 'react';
import {Alert, Image, TouchableOpacity, View} from 'react-native';
import InfoIconPay from '../../../../../../assets/icons/InfoIconPay';
import CircleOutlineClose from '../../../../../../assets/icons/NewProductIcons/CircleOutlineClose';
import CloudManIcon from '../../../../../../assets/icons/NewProductIcons/CloudManIcon';
import CrossArrowsIcon from '../../../../../../assets/icons/NewProductIcons/CrossArrowsIcon';
import {AddModal} from '../../../../../../components/MainComponents/AddModal/AddModal';
import FileItem from '../../../../../../components/MainComponents/FileItem/FileItem';
import {
  Button,
  ButtonSize,
  ButtonState,
  ButtonType,
  ButtonVariant,
} from '../../../../../../components/UserComponents/Button';
import {Typography} from '../../../../../../components/UserComponents/Typography/Typography';
import {TypographyVariant} from '../../../../../../components/UserComponents/Typography/Typography.types';
import {ColorPalette} from '../../../../../../config/colorPalette';
import {getFigmaDimension} from '../../../../../../helpers/screenSize';
import {styles} from './UploadMediaStep.styles';

interface UploadMediaStepProps {
  formData: any;
  updateFormData: (data: any) => void;
  editMode?: boolean;
}

const UploadMediaStep: React.FC<UploadMediaStepProps> = ({
  formData,
  updateFormData,
  editMode = false,
}) => {
  const [uploadStatus, setUploadStatus] = useState('initial');
  const [uploadProgress, setUploadProgress] = useState(30);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);

  const [files, setFiles] = useState([
    {
      id: '1',
      name: 'cool-shoes.jpg',
      size: '240 KB',
      date: 'Aug 24 2025',
      thumbnailSource: require('../../../../../../assets/images/sample.png'),
    },
    {
      id: '2',
      name: 'product-design.pdf',
      size: '1.2 MB',
      date: 'Aug 20 2025',
      thumbnailSource: require('../../../../../../assets/images/sample.png'),
    },
    {
      id: '3',
      name: 'product-design.pdf',
      size: '1.2 MB',
      date: 'Aug 20 2025',
      thumbnailSource: require('../../../../../../assets/images/sample.png'),
    },
    {
      id: '4',
      name: 'product-design.pdf',
      size: '1.2 MB',
      date: 'Aug 20 2025',
      thumbnailSource: require('../../../../../../assets/images/sample.png'),
    },
  ]);

  // Pre-fill images if in edit mode
  useEffect(() => {
    if (editMode && formData.images && formData.images.length > 0) {
      const preFilledFiles = formData.images.map((imageUrl, index) => {
        // Extract filename from URL or create a descriptive name
        const urlParts = imageUrl.split('/');
        const fullFilename =
          urlParts[urlParts.length - 1] || `product-image-${index + 1}.jpg`;

        // Remove query parameters if any
        const filename = fullFilename.split('?')[0];

        // Get file extension from URL or default to jpg
        const fileExtension = filename.includes('.')
          ? filename.split('.').pop()?.toLowerCase()
          : 'jpg';

        // Estimate file size based on image dimensions (this is approximate)
        const estimatedSize =
          fileExtension === 'jpg' || fileExtension === 'jpeg'
            ? '180 KB'
            : fileExtension === 'png'
            ? '250 KB'
            : '200 KB';

        return {
          id: `prefilled-${index}`,
          name: filename,
          size: estimatedSize,
          date: 'Uploaded',
          thumbnailSource: {uri: imageUrl}, // Use actual image URL
          isExisting: true,
          originalUrl: imageUrl, // Keep reference to original URL
        };
      });

      setFiles(preFilledFiles);
      setUploadStatus('completed');
    }
  }, [editMode]); // Remove formData.images from dependencies

  const handleDelete = (fileId: string) => {
    Alert.alert('Delete File', 'Are you sure you want to delete this file?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        onPress: () => {
          const updatedFiles = files.filter(file => file.id !== fileId);
          setFiles(updatedFiles);

          // Update form data
          const imageUrls = updatedFiles
            .filter(file => file.thumbnailSource?.uri)
            .map(file => file.thumbnailSource.uri);
          updateFormData({images: imageUrls});

          // If no files left, reset to initial state
          if (updatedFiles.length === 0) {
            setUploadStatus('initial');
          }
        },
        style: 'destructive',
      },
    ]);
  };

  const handleOptimize = (fileId: string) => {
    Alert.alert(
      'Optimizing file',
      `Starting optimization for file ID: ${fileId}`,
    );
  };

  const handleBrowseFiles = () => {
    setIsAddModalVisible(true);
  };

  const handleUploadStart = (source: string) => {
    setIsAddModalVisible(false);

    setUploadStatus('uploading');

    console.log(`Upload started from: ${source}`);

    let progress = 0;
    const progressInterval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);

      if (progress >= 100) {
        clearInterval(progressInterval);
        setUploadStatus('completed');

        // Simulate adding new files
        const newFiles = [
          {
            id: `new-${Date.now()}-1`,
            name: 'new-product-1.jpg',
            size: '180 KB',
            date: new Date().toLocaleDateString(),
            thumbnailSource: require('../../../../../../assets/images/sample.png'),
          },
          {
            id: `new-${Date.now()}-2`,
            name: 'new-product-2.jpg',
            size: '220 KB',
            date: new Date().toLocaleDateString(),
            thumbnailSource: require('../../../../../../assets/images/sample.png'),
          },
        ];

        const updatedFiles = [...files, ...newFiles];
        setFiles(updatedFiles);

        // Update form data with new images
        const imageUrls = updatedFiles
          .filter(file => file.thumbnailSource?.uri)
          .map(file => file.thumbnailSource.uri);
        updateFormData({images: imageUrls});
      }
    }, 500);
  };

  const handleCancelUpload = () => {
    setUploadStatus(files.length > 0 ? 'completed' : 'initial');
    setUploadProgress(0);
  };

  const modalButtons = [
    {
      text: 'Upload from Gallery',
      onPress: () => handleUploadStart('gallery'),
      variant: ButtonVariant.PRIMARY,
      state: ButtonState.DEFAULT,
      type: ButtonType.PRIMARY,
      size: ButtonSize.MEDIUM,
    },
    {
      text: 'Select from Drive',
      onPress: () => handleUploadStart('drive'),
      variant: ButtonVariant.PRIMARY,
      state: ButtonState.DEFAULT,
      type: ButtonType.OUTLINED,
      size: ButtonSize.MEDIUM,
      customStyles: styles.customButton,
    },
    {
      text: 'Take a Photo',
      onPress: () => handleUploadStart('camera'),
      variant: ButtonVariant.PRIMARY,
      state: ButtonState.DEFAULT,
      type: ButtonType.OUTLINED,
      size: ButtonSize.MEDIUM,
      customTextStyles: styles.customText,
    },
  ];

  const getHeaderText = () => {
    if (editMode && files.length > 0) {
      return 'Update Product Images';
    }
    return 'Product Images';
  };

  const getBrowseButtonText = () => {
    if (editMode && files.length > 0) {
      return 'Add More Files';
    }
    return 'Browse Files';
  };

  return (
    <View style={styles.container}>
      <View style={styles.mainHeader}>
        <View style={styles.headerContainer}>
          <Typography
            variant={TypographyVariant.LMEDIUM_EXTRASEMIBOLD}
            text={getHeaderText()}
            customTextStyles={{color: ColorPalette.GREY_TEXT_500}}
          />
          <InfoIconPay
            size={19}
            color={ColorPalette.GREY_TEXT_400}
            style={undefined}
            strokeWidth={1.5}
          />
        </View>

        {(uploadStatus === 'initial' || (editMode && files.length === 0)) && (
          <View style={styles.uploadContainer}>
            <View style={styles.uploadBox}>
              <CloudManIcon style={undefined} size={70} />
              <Button
                text={getBrowseButtonText()}
                variant={ButtonVariant.PRIMARY}
                state={ButtonState.FILEUPLOAD}
                size={ButtonSize.SMALL}
                type={ButtonType.PRIMARY}
                onPress={handleBrowseFiles}
                withShadow
              />
            </View>
            <Typography
              variant={TypographyVariant.LMEDIUM_REGULAR}
              text="PNG, JPG, GIF up to 1024MB"
              customTextStyles={{color: ColorPalette.GREY_TEXT_100}}
            />
          </View>
        )}

        {/* Show add more button if files exist */}
        {uploadStatus === 'completed' && files.length > 0 && (
          <View style={{alignItems: 'center', marginTop: 16}}>
            <Button
              text="Add More Images"
              variant={ButtonVariant.PRIMARY}
              state={ButtonState.DEFAULT}
              size={ButtonSize.SMALL}
              type={ButtonType.OUTLINED}
              onPress={handleBrowseFiles}
              customStyles={{
                borderWidth: 1,
                borderColor: ColorPalette.PURPLE_300,
              }}
            />
          </View>
        )}
      </View>

      <AddModal
        isVisible={isAddModalVisible}
        onClose={() => setIsAddModalVisible(false)}
        buttons={modalButtons}
        showCloseIcon={true}
        containerStyle={{paddingVertical: 16}}
        footerStyle={{flexDirection: 'column', gap: 12}}
      />

      {uploadStatus === 'uploading' && (
        <View style={styles.uploadProgress}>
          <View style={styles.mainProgress}>
            <View style={styles.progressHeader}>
              <Typography
                text="Uploading 4 files"
                variant={TypographyVariant.LMEDIUM_EXTRABOLD}
                customTextStyles={{color: ColorPalette.GREY_TEXT_400}}
              />
              <CrossArrowsIcon style={undefined} size={18} />
            </View>
            <View style={styles.imageShowing}>
              {[1, 2, 3, 4, 5].map((_, index) => (
                <Image
                  key={index}
                  source={require('../../../../../../assets/images/sample.png')}
                  style={styles.sampleImage}
                />
              ))}
            </View>
          </View>
          <View
            style={[styles.progressLine, {width: `${uploadProgress}%`}]}></View>
          <View style={styles.progressPercent}>
            <Typography
              text={`525KB • ${uploadProgress}% uploading`}
              variant={TypographyVariant.LMEDIUM_REGULAR}
              customTextStyles={{color: ColorPalette.GREY_TEXT_100}}
            />
            <TouchableOpacity onPress={handleCancelUpload}>
              <CircleOutlineClose style={undefined} />
            </TouchableOpacity>
          </View>
        </View>
      )}

      {uploadStatus === 'completed' && files.length > 0 && (
        <View style={styles.showCaseContainer}>
          <View style={styles.showCaseHeader}>
            <Typography
              text={editMode ? 'Product Images' : 'Recent Uploaded'}
              variant={TypographyVariant.LMEDIUM_EXTRABOLD}
              customTextStyles={{color: ColorPalette.GREY_TEXT_500}}
            />
            <Typography
              text={`${files.length} items`}
              variant={TypographyVariant.PSMALL_MEDIUM}
              customTextStyles={{color: ColorPalette.GREY_TEXT_100}}
            />
          </View>
          <View style={{gap: getFigmaDimension(4)}}>
            {files.map(file => (
              <FileItem
                key={file.id}
                fileName={file.name}
                fileSize={file.size}
                fileDate={file.date}
                thumbnailSource={file.thumbnailSource}
                onDelete={() => handleDelete(file.id)}
                onOptimise={() => handleOptimize(file.id)}
                testID={`file-item-${file.id}`}
              />
            ))}
          </View>
        </View>
      )}

      {uploadStatus === 'initial' && !editMode && (
        <View style={styles.tipsContainer}>
          <View style={styles.mainTips}>
            <Typography
              variant={TypographyVariant.LMEDIUM_BOLD}
              text="Tips for you:"
              customTextStyles={{
                color: ColorPalette.GREY_TEXT_500,
              }}
            />

            <View style={styles.tipMatter}>
              <View style={styles.tipRow}>
                <Image
                  source={require('../../../../../../assets/images/spark.png')}
                  style={styles.tipIcon}
                />
                <Typography
                  variant={TypographyVariant.LMEDIUM_REGULAR}
                  text="Upload 4 clear photos with a white background. Make sure the product is easy to see."
                  customTextStyles={{
                    color: ColorPalette.GREY_TEXT_300,
                    flex: 1,
                  }}
                />
              </View>

              <View style={styles.tipRow}>
                <Image
                  source={require('../../../../../../assets/images/photos.png')}
                  style={styles.tipIcon}
                />
                <Typography
                  variant={TypographyVariant.PSMALL_REGULAR}
                  text="Take pictures from the front, side, close-up, and while in use."
                  customTextStyles={{
                    color: ColorPalette.GREY_TEXT_300,
                    flex: 1,
                  }}
                />
              </View>

              <View style={styles.tipRow}>
                <Image
                  source={require('../../../../../../assets/images/gallery.png')}
                  style={styles.tipIcon}
                />
                <Typography
                  variant={TypographyVariant.PSMALL_REGULAR}
                  text="Stand 50-55 cm away for clear, sharp images."
                  customTextStyles={{
                    color: ColorPalette.GREY_TEXT_300,
                    flex: 1,
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default UploadMediaStep;

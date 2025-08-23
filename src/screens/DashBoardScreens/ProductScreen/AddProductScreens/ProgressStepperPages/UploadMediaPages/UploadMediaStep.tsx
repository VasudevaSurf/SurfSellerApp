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
import {
  pickImagesFromGallery,
  takePhotoWithCamera,
  formatFileSize,
  validateImage,
  PickedImage,
  uploadMultipleImages,
  getMimeTypeFromExtension,
} from '../../../../../../utils/imagePicker';

interface FileData {
  id: string;
  name: string;
  size: string;
  date: string;
  thumbnailSource: any;
  isExisting?: boolean;
  originalUrl?: string;
  uri?: string; // For newly picked images
  relativePath?: string; // For uploaded images
  viewUrl?: string; // For uploaded images
  isUploaded?: boolean;
}

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
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [currentUpload, setCurrentUpload] = useState({current: 0, total: 0});

  const [files, setFiles] = useState<FileData[]>([]);

  // Pre-fill images if in edit mode
  useEffect(() => {
    if (editMode && formData.images && formData.images.length > 0) {
      console.log('🔄 Pre-filling images in edit mode:', formData.images);

      const preFilledFiles = formData.images.map(
        (imageUrl: string, index: number) => {
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
            id: `prefilled-${index}-${Date.now()}`, // More unique ID
            name: filename,
            size: estimatedSize,
            date: 'Uploaded',
            thumbnailSource: {uri: imageUrl}, // Use actual image URL
            isExisting: true,
            originalUrl: imageUrl, // Keep reference to original URL
            viewUrl: imageUrl, // For display purposes
            isUploaded: true,
          };
        },
      );

      setFiles(preFilledFiles);
      setUploadStatus('completed');

      console.log(
        '✅ Pre-filled files created:',
        preFilledFiles.map(f => ({
          id: f.id,
          name: f.name,
          originalUrl: f.originalUrl,
        })),
      );
    }
  }, [editMode, formData.images]);

  const handleDelete = (fileId: string) => {
    Alert.alert('Delete File', 'Are you sure you want to delete this file?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        onPress: () => {
          console.log('🗑️ Deleting file:', fileId);

          // Find the file being deleted
          const fileToDelete = files.find(file => file.id === fileId);
          const updatedFiles = files.filter(file => file.id !== fileId);
          setFiles(updatedFiles);

          // IMPORTANT: Update the form data to reflect the deletion
          if (fileToDelete) {
            // Remove from images array (both URLs and relative paths)
            const updatedImages = formData.images.filter(img => {
              // Handle both original URLs and view URLs
              return (
                img !== fileToDelete.originalUrl &&
                img !== fileToDelete.viewUrl &&
                img !== fileToDelete.uri
              );
            });

            // Remove from relative paths array if it exists
            let updatedRelativePaths = formData.imageRelativePaths || [];
            if (fileToDelete.relativePath) {
              updatedRelativePaths = updatedRelativePaths.filter(
                path => path !== fileToDelete.relativePath,
              );
            }

            console.log('📸 Image deletion - updating form data:', {
              deletedFile: {
                id: fileToDelete.id,
                name: fileToDelete.name,
                originalUrl: fileToDelete.originalUrl,
                viewUrl: fileToDelete.viewUrl,
                relativePath: fileToDelete.relativePath,
              },
              before: {
                images: formData.images.length,
                relativePaths: formData.imageRelativePaths?.length || 0,
              },
              after: {
                images: updatedImages.length,
                relativePaths: updatedRelativePaths.length,
              },
            });

            // Update the form data with the new arrays
            updateFormData({
              images: updatedImages,
              imageRelativePaths: updatedRelativePaths,
            });
          }

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

  const handleUploadStart = async (source: string) => {
    setIsAddModalVisible(false);
    setIsUploading(true);

    try {
      let result;

      switch (source) {
        case 'gallery':
          result = await pickImagesFromGallery({
            multiple: true,
            quality: 0.8,
            maxWidth: 1024,
            maxHeight: 1024,
          });
          break;

        case 'camera':
          result = await takePhotoWithCamera({
            quality: 0.8,
            maxWidth: 1024,
            maxHeight: 1024,
          });
          break;

        case 'drive':
          Alert.alert(
            'Coming Soon',
            'Drive integration will be available soon.',
          );
          setIsUploading(false);
          return;

        default:
          setIsUploading(false);
          return;
      }

      if (!result.success) {
        Alert.alert('Error', result.error || 'Failed to select images');
        setIsUploading(false);
        return;
      }

      if (result.images && result.images.length > 0) {
        // Validate images
        const validImages = [];
        for (const image of result.images) {
          const validation = validateImage(image);
          if (validation.valid) {
            validImages.push(image);
          } else {
            Alert.alert(
              'Invalid Image',
              validation.error || 'Invalid image selected',
            );
          }
        }

        if (validImages.length > 0) {
          console.log(
            '🚀 Starting upload process for',
            validImages.length,
            'new images',
          );
          setUploadStatus('uploading');
          setUploadProgress(0);
          setCurrentUpload({current: 0, total: validImages.length});

          // Upload images to server
          try {
            const uploadResult = await uploadMultipleImages(
              validImages,
              (current, total) => {
                console.log(`Uploading ${current}/${total}`);
                setCurrentUpload({current, total});
                const progress = total > 0 ? (current / total) * 100 : 0;
                setUploadProgress(progress);
              },
            );

            console.log('📤 Upload result:', uploadResult);

            if (
              uploadResult.success &&
              uploadResult.uploadedImages.length > 0
            ) {
              // Create new file entries for uploaded images
              const newFiles: FileData[] = uploadResult.uploadedImages.map(
                (image, index) => ({
                  id: `uploaded-${Date.now()}-${index}`,
                  name: image.fileName,
                  size: formatFileSize(image.fileSize),
                  date: new Date().toLocaleDateString(),
                  thumbnailSource: image.viewUrl
                    ? {uri: image.viewUrl}
                    : {uri: image.uri},
                  uri: image.uri,
                  relativePath: image.relativePath,
                  viewUrl: image.viewUrl,
                  isUploaded: true,
                  isExisting: false, // Mark as new image
                }),
              );

              const updatedFiles = [...files, ...newFiles];
              setFiles(updatedFiles);

              // ENHANCED: Update form data with proper separation of existing and new images
              const allUploadedFiles = updatedFiles.filter(
                file => file.isUploaded,
              );

              // Separate existing images (URLs) from newly uploaded images (relative paths)
              const existingImages = allUploadedFiles
                .filter(file => file.isExisting)
                .map(file => file.originalUrl || file.viewUrl || file.uri)
                .filter(url => url);

              const newImageUrls = allUploadedFiles
                .filter(file => !file.isExisting)
                .map(file => file.viewUrl || file.uri)
                .filter(url => url);

              const newRelativePaths = allUploadedFiles
                .filter(file => !file.isExisting && file.relativePath)
                .map(file => file.relativePath)
                .filter(path => path);

              // Combine all images for display
              const allImages = [...existingImages, ...newImageUrls];

              // Get all relative paths (both existing converted and new)
              const allRelativePaths = [
                ...(formData.imageRelativePaths || []), // Keep existing relative paths
                ...newRelativePaths, // Add new relative paths
              ];

              console.log('📸 Form data update after upload:', {
                existingImages,
                newImageUrls,
                newRelativePaths,
                allImages,
                allRelativePaths,
              });

              updateFormData({
                images: allImages,
                imageRelativePaths: allRelativePaths,
              });

              setUploadStatus('completed');

              // Show success message
              if (uploadResult.errors.length === 0) {
                Alert.alert(
                  'Success',
                  `${uploadResult.uploadedImages.length} image(s) uploaded successfully!`,
                );
              } else {
                const successCount = uploadResult.uploadedImages.length;
                const errorCount = uploadResult.errors.length;
                Alert.alert(
                  'Partial Success',
                  `${successCount} image(s) uploaded successfully, ${errorCount} failed.`,
                );
              }
            } else {
              // Handle upload failures...
              console.error('Upload failed:', uploadResult.errors);
              Alert.alert(
                'Upload Failed',
                'Failed to upload images. Please try again.',
              );
              setUploadStatus(files.length > 0 ? 'completed' : 'initial');
            }
          } catch (uploadError) {
            console.error('Upload error:', uploadError);
            Alert.alert('Upload Error', 'Upload failed. Please try again.');
            setUploadStatus(files.length > 0 ? 'completed' : 'initial');
          }
        }
      }
    } catch (error: any) {
      console.error('Selection error:', error);
      Alert.alert('Selection Error', 'Failed to select images');
    } finally {
      setIsUploading(false);
      setCurrentUpload({current: 0, total: 0});
    }
  };

  const handleCancelUpload = () => {
    // Note: In a real implementation, you might want to cancel ongoing uploads
    setUploadStatus(files.length > 0 ? 'completed' : 'initial');
    setUploadProgress(0);
    setCurrentUpload({current: 0, total: 0});
    setIsUploading(false);
  };

  const modalButtons = [
    {
      text: 'Upload from Gallery',
      onPress: () => handleUploadStart('gallery'),
      variant: ButtonVariant.PRIMARY,
      state: ButtonState.DEFAULT,
      type: ButtonType.PRIMARY,
      size: ButtonSize.MEDIUM,
      disabled: isUploading,
    },
    {
      text: 'Take a Photo',
      onPress: () => handleUploadStart('camera'),
      variant: ButtonVariant.PRIMARY,
      state: ButtonState.DEFAULT,
      type: ButtonType.OUTLINED,
      size: ButtonSize.MEDIUM,
      customStyles: styles.customButton,
      disabled: isUploading,
    },
    {
      text: 'Select from Drive',
      onPress: () => handleUploadStart('drive'),
      variant: ButtonVariant.PRIMARY,
      state: ButtonState.DEFAULT,
      type: ButtonType.OUTLINED,
      size: ButtonSize.MEDIUM,
      customTextStyles: styles.customText,
      disabled: isUploading,
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
                disabled={isUploading}
              />
            </View>
            <Typography
              variant={TypographyVariant.LMEDIUM_REGULAR}
              text="PNG, JPG, GIF up to 10MB"
              customTextStyles={{color: ColorPalette.GREY_TEXT_100}}
            />
          </View>
        )}

        {/* Show add more button if files exist */}
        {uploadStatus === 'completed' && files.length > 0 && !isUploading && (
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
                text={`Uploading ${currentUpload.current}/${currentUpload.total} images`}
                variant={TypographyVariant.LMEDIUM_EXTRABOLD}
                customTextStyles={{color: ColorPalette.GREY_TEXT_400}}
              />
              <CrossArrowsIcon style={undefined} size={18} />
            </View>
            <View style={styles.imageShowing}>
              {files.slice(0, 5).map((file, index) => (
                <Image
                  key={index}
                  source={file.thumbnailSource}
                  style={styles.sampleImage}
                />
              ))}
            </View>
          </View>
          <View
            style={[styles.progressLine, {width: `${uploadProgress}%`}]}></View>
          <View style={styles.progressPercent}>
            <Typography
              text={`${Math.round(uploadProgress)}% uploading`}
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

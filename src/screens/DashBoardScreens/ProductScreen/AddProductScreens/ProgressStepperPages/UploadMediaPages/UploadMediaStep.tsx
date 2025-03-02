import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import {Typography} from '../../../../../../components/UserComponents/Typography/Typography';
import {TypographyVariant} from '../../../../../../components/UserComponents/Typography/Typography.types';
import {ColorPalette} from '../../../../../../config/colorPalette';
import InfoIcon from '../../../../../../assets/icons/InfoIcon';
import {
  Button,
  ButtonSize,
  ButtonState,
  ButtonType,
  ButtonVariant,
} from '../../../../../../components/UserComponents/Button';
import {getFigmaDimension} from '../../../../../../helpers/screenSize';
import CloudManIcon from '../../../../../../assets/icons/NewProductIcons/CloudManIcon';
import {styles} from './UploadMediaStep.styles';
import CrossArrowsIcon from '../../../../../../assets/icons/NewProductIcons/CrossArrowsIcon';
import CloseCircleIcon from '../../../../../../assets/icons/CloseCircleIcon';
import CircleOutlineClose from '../../../../../../assets/icons/NewProductIcons/CircleOutlineClose';
import FileItem from '../../../../../../components/MainComponents/FileItem/FileItem';
import {AddModal} from '../../../../../../components/MainComponents/AddModal/AddModal';

const UploadMediaStep = () => {
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

  const handleDelete = (fileId: string) => {
    Alert.alert('Delete File', 'Are you sure you want to delete this file?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        onPress: () => {
          setFiles(files.filter(file => file.id !== fileId));
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
      }
    }, 500);
  };

  const handleCancelUpload = () => {
    setUploadStatus('initial');
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

  return (
    <View style={styles.container}>
      <View style={styles.mainHeader}>
        <View style={styles.headerContainer}>
          <Typography
            variant={TypographyVariant.LMEDIUM_EXTRABOLD}
            text="Product Images"
            customTextStyles={{color: ColorPalette.GREY_TEXT_500}}
          />
          <InfoIcon
            size={16}
            color={ColorPalette.IconColor}
            style={undefined}
          />
        </View>

        <View style={styles.uploadContainer}>
          <View style={styles.uploadBox}>
            <CloudManIcon style={undefined} size={70} />
            <Button
              text="Browse Files"
              variant={ButtonVariant.PRIMARY}
              state={ButtonState.DEFAULT}
              size={ButtonSize.SMALL}
              type={ButtonType.PRIMARY}
              onPress={handleBrowseFiles}
              customStyles={styles.buttonMain}
            />
          </View>
          <Typography
            variant={TypographyVariant.LMEDIUM_REGULAR}
            text="PNG, JPG, GIF up to 1024MB"
            customTextStyles={{color: ColorPalette.GREY_TEXT_100}}
          />
        </View>
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
              <Image
                source={require('../../../../../../assets/images/sample.png')}
                style={styles.sampleImage}
              />
              <Image
                source={require('../../../../../../assets/images/sample.png')}
                style={styles.sampleImage}
              />
              <Image
                source={require('../../../../../../assets/images/sample.png')}
                style={styles.sampleImage}
              />
              <Image
                source={require('../../../../../../assets/images/sample.png')}
                style={styles.sampleImage}
              />
              <Image
                source={require('../../../../../../assets/images/sample.png')}
                style={styles.sampleImage}
              />
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

      {uploadStatus === 'completed' && (
        <View style={styles.showCaseContainer}>
          <View style={styles.showCaseHeader}>
            <Typography
              text="Recent Uploaded"
              variant={TypographyVariant.LMEDIUM_EXTRABOLD}
              customTextStyles={{color: ColorPalette.GREY_TEXT_500}}
            />
            <Typography
              text="4 items"
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

      {uploadStatus === 'initial' && (
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

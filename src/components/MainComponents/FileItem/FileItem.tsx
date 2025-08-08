import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import ImageWithStarIcon from '../../../assets/icons/NewProductIcons/ImageWithStarIcon';
import TrashIcon from '../../../assets/icons/NewProductIcons/TrashIcon';
import {ColorPalette} from '../../../config/colorPalette';
import {Button, ButtonSize, ButtonType} from '../../UserComponents/Button';
import {Typography} from '../../UserComponents/Typography/Typography';
import {TypographyVariant} from '../../UserComponents/Typography/Typography.types';
import {styles} from './FileItem.styles';
import {FileItemProps} from './FileItem.types';

/**
 * FileItem: A component for displaying file information with optional actions
 *
 * @component
 * @param {FileItemProps} props - Props for the FileItem component
 * @returns {JSX.Element} The rendered FileItem component
 */
const FileItem: React.FC<FileItemProps> = ({
  fileName,
  fileSize,
  fileDate,
  thumbnailSource,
  onDelete,
  onOptimise,
  testID,
  customStyles,
}) => {
  // Check if the thumbnailSource is a URI object or a number
  const isUriSource =
    thumbnailSource &&
    typeof thumbnailSource === 'object' &&
    thumbnailSource.uri;
  const isNumberSource = typeof thumbnailSource === 'number';

  return (
    <View style={[styles.container, customStyles]} testID={testID}>
      <View style={styles.fileInfo}>
        <View style={styles.thumbnailContainer}>
          {isNumberSource ? (
            <>
              <Image source={thumbnailSource} style={styles.thumbnail} />
              {onDelete && (
                <TouchableOpacity
                  style={styles.deleteIconOverlay}
                  onPress={onDelete}
                  activeOpacity={0.7}>
                  <TrashIcon size={16} />
                </TouchableOpacity>
              )}
            </>
          ) : isUriSource ? (
            <>
              <Image source={thumbnailSource} style={styles.thumbnail} />
              {onDelete && (
                <TouchableOpacity
                  style={styles.deleteIconOverlay}
                  onPress={onDelete}
                  activeOpacity={0.7}>
                  <TrashIcon size={16} />
                </TouchableOpacity>
              )}
            </>
          ) : (
            <View style={styles.placeholderThumbnail}>
              <ImageWithStarIcon size={24} color="#9101CF" style={undefined} />
              {onDelete && (
                <TouchableOpacity
                  style={styles.deleteIconOverlay}
                  onPress={onDelete}
                  activeOpacity={0.7}>
                  <TrashIcon size={20} />
                </TouchableOpacity>
              )}
            </View>
          )}
        </View>

        <View style={styles.textContainer}>
          <Typography
            variant={TypographyVariant.LMEDIUM_MEDIUM}
            text={fileName}
            numberOfLines={1}
            customTextStyles={{color: ColorPalette.GREY_TEXT_400}}
          />
          <Typography
            variant={TypographyVariant.LSMALL_REGULAR}
            text={fileSize}
            customTextStyles={styles.fileSizeText}
          />
          <Typography
            variant={TypographyVariant.LSMALL_REGULAR}
            text={fileDate}
            customTextStyles={styles.fileDateText}
          />
        </View>
      </View>

      <View style={styles.actions}>
        {onOptimise && (
          <Button
            text="Optimise"
            size={ButtonSize.SMALL}
            type={ButtonType.PRIMARY}
            onPress={onOptimise}
            useGradient={true}
            customStyles={styles.optimiseButton}
            customTextStyles={styles.optimiseButtonText}
            IconComponent={() => (
              <ImageWithStarIcon
                size={16}
                color="white"
                style={styles.buttonIcon}
              />
            )}
          />
        )}
      </View>
    </View>
  );
};

export default FileItem;

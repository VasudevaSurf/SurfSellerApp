import {ImageSourcePropType, StyleProp, ViewStyle} from 'react-native';

/**
 * Props for the FileItem component
 *
 * @interface FileItemProps
 * @property {string} fileName - Name of the file to display
 * @property {string} fileSize - Size of the file (e.g., "240 KB")
 * @property {string} fileDate - Date of the file (e.g., "Aug 24 2025")
 * @property {ImageSourcePropType} [thumbnailSource] - Optional source for the file thumbnail image
 * @property {() => void} [onDelete] - Optional callback function when delete button is pressed
 * @property {() => void} [onOptimise] - Optional callback function when optimise button is pressed
 * @property {string} [testID] - Optional test ID for testing purposes
 * @property {StyleProp<ViewStyle>} [customStyles] - Optional custom styles for the container
 */
export interface FileItemProps {
  fileName: string;
  fileSize: string;
  fileDate: string;
  thumbnailSource?: ImageSourcePropType;
  onDelete?: () => void;
  onOptimise?: () => void;
  testID?: string;
  customStyles?: StyleProp<ViewStyle>;
}

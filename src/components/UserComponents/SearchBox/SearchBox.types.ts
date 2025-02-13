export interface SearchBoxProps {
    placeholder?: string;
    value: string;
    onChangeText: (text: string) => void;
    testID?: string;
    customContainerStyle?: any;
    customInputStyle?: any;
  }